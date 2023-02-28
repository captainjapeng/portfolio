<template>
  <div class="row full-width">
    <q-form
      v-if="!sent"
      class="col-9 offset-md-2 col-md-4"
      @submit.prevent="onSubmit"
    >
      <div class="title">
        Contact Me
      </div>
      <div class="subtitle">
        <q-input
          v-model="form.name"
          :rules="[isRequired]"
          label="Name"
          color="primary"
          outlined
          rounded
          dark
        />
        <q-input
          v-model="form.email"
          :rules="[isRequired, isEmail]"
          label="Email"
          color="primary"
          outlined
          rounded
          dark
        />
        <q-input
          v-model="form.message"
          :rules="[isRequired]"
          label="Message"
          type="textarea"
          color="primary"
          outlined
          rounded
          dark
        />
        <vue-hcaptcha
          :sitekey="siteKey"
          @verify="onVerified"
          @reset="form.token = ``"
          @error="form.token = ``"
        />
      </div>
      <div class="q-pt-md">
        <q-btn
          :loading="loading"
          :disable="!form.token"
          :size="$q.screen.xs ? `md` : `xl`"
          type="submit"
          label="Submit"
          color="white"
          outline
          rounded
          class="q-px-xl"
        />
      </div>
    </q-form>

    <div
      v-else
      class="col-9 offset-md-2 col-md-4"
    >
      <div class="title">
        Thank you for contacting.
      </div>
      <div class="subtitle">
        You should receive an email copy of your inquiry.
      </div>
      <div class="subtitle q-pt-md">
        <q-btn
          :size="$q.screen.xs ? `md` : `xl`"
          label="Send again"
          color="white"
          outline
          rounded
          class="q-px-xl"
          @click="reset()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { validate as validateEmail } from 'email-validator'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { Notify } from 'quasar'

export default defineComponent({
  components: { VueHcaptcha },
  setup() {
    const captchaRef = ref<VueHcaptcha>(null as any)
    const siteKey = ref(process.env.CAPTCHA_SITE_KEY)
    const form = reactive({
      token: '',
      name: '',
      email: '',
      message: ''
    })
    const loading = ref(false)
    const sent = ref(false)

    async function onSubmit() {
      try {
        loading.value = true
        const resp = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify(form)
        })

        if (resp.status === 200) {
          sent.value = true
        } else {
          const json = await resp.json()
          Notify.create({
            message: json.error,
            color: 'negative'
          })
          captchaRef.value.reset()
        }
      } finally {
        loading.value = false
      }
    }

    function onVerified(token: string) {
      form.token = token
    }

    function reset() {
      form.token = ''
      form.name = ''
      form.email = ''
      form.message = ''
      sent.value = false
    }

    function isRequired(val: string) {
      return !val ? 'This field is required' : true
    }

    function isEmail(val: string) {
      return validateEmail(val) || 'Must be a valid email address'
    }

    return {
      siteKey,
      form,
      loading,
      sent,
      isRequired,
      isEmail,
      onSubmit,
      onVerified,
      reset
    }
  }
})
</script>
