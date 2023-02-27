<template>
  <div class="row full-width">
    <q-form
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
      </div>
      <div class="q-pt-md">
        <q-btn
          type="submit"
          label="Submit"
          color="white"
          :size="$q.screen.xs ? `md`: `xl`"
          outline
          rounded
          class="q-px-xl"
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { validate as validateEmail } from 'email-validator'

export default defineComponent({
  setup() {
    const form = reactive({
      name: '',
      email: '',
      message: ''
    })

    function onSubmit() {
      console.log('submitted', { ...form })
    }

    function isRequired(val: string) {
      return !val ? 'This field is required' : true
    }

    function isEmail(val: string) {
      return validateEmail(val) || 'Must be a valid email address'
    }

    return { form, isRequired, isEmail, onSubmit }
  }
})
</script>
