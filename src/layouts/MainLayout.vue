<template>
  <q-layout
    view="lHh Lpr lFf"
    class="bg-black"
  >
    <q-header
      elevated
      class="bg-transparent"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="~assets/logo.png"
            width="48px"
          />
        </q-toolbar-title>
        <q-btn
          label="Intro"
          to="intro"
          size="lg"
          color="primary"
          flat
        />
        <q-btn
          label="About"
          to="about"
          size="lg"
          color="primary"
          flat
        />
        <q-btn
          label="Works"
          to="works"
          size="lg"
          color="primary"
          flat
        />
        <q-btn
          label="Skills"
          to="skills"
          size="lg"
          color="primary"
          flat
        />
        <q-btn
          label="Contact"
          to="contact"
          size="lg"
          color="primary"
          flat
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {}
  }
})
</script>

<style lang="sass" scoped>

</style>
