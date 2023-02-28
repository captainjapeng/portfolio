import { validate as validateEmail } from 'email-validator'
import sanitizeHtml from 'sanitize-html'

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  SENDGRID_KEY: string
  TEMPLATE_ID: string
  SENDER_EMAIL: string
  SENDER_NAME: string
  CAPTCHA_SECRET: string
}

interface ContactInput {
  token: string
  name: string
  email: string
  message: string
}

export default {
  async fetch(
    request: Request,
    env: Env
    // ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      const body = await request.json<ContactInput>()

      if (!validateEmail(body.email)) {
        return createJsonError(400, 'Invalid email format.')
      }

      if (!await validateCaptchaToken(env, body.token)) {
        return createJsonError(400, 'Captcha challenge failed.')
      }

      body.name = sanitizeHtml(body.name)
      body.message = sanitizeHtml(body.message)

      const customer = {
        email: body.email,
        name: body.name
      }

      const sender = {
        email: env.SENDER_EMAIL,
        name: env.SENDER_NAME
      }

      // Send email to customer
      let emailResp = await sendEmail(env, {
        template_id: env.TEMPLATE_ID,
        from: sender,
        personalizations: [
          {
            to: [customer],
            dynamic_template_data: {
              email: body.email,
              name: body.name,
              message: body.message
            }
          }
        ]
      })

      if (emailResp?.errors?.length > 0) {
        return createJsonError(500, emailResp.errors[0])
      }

      // Send email to ourselves
      emailResp = await sendEmail(env, {
        template_id: env.TEMPLATE_ID,
        from: sender,
        reply_to: customer,
        personalizations: [
          {
            to: [sender],
            dynamic_template_data: {
              email: body.email,
              name: body.name,
              message: body.message
            }
          }
        ]
      })

      if (emailResp?.errors?.length > 0) {
        return createJsonError(500, emailResp.errors[0])
      }

      return new Response(JSON.stringify({ success: true }))
    }

    return new Response('404 Not Found', { status: 404 })
  }
}

async function sendEmail(env: Env, payload: any) {
  const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.SENDGRID_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (resp.status === 202) {
    return { success: true }
  }

  return resp.json<any>()
}

function createJsonError(code: number, error: any) {
  return new Response(JSON.stringify({ error }), { status: code })
}

async function validateCaptchaToken(env: Env, token: string): Promise<boolean> {
  const form = new FormData()
  form.set('response', token)
  form.set('secret', env.CAPTCHA_SECRET)

  const resp = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    body: form
  })

  const json = await resp.json<any>()
  return json.success
}
