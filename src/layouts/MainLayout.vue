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
        <q-toolbar-title v-if="$q.screen.gt.xs">
          <q-img
            src="~assets/logo.png"
            width="48px"
          />
        </q-toolbar-title>
        <q-btn
          label="Intro"
          to="intro"
          :size="$q.screen.xs ? `md` : `lg`"
          color="primary"
          flat
        />
        <q-btn
          label="About"
          to="about"
          :size="$q.screen.xs ? `md` : `lg`"
          color="primary"
          flat
        />
        <q-btn
          label="Works"
          to="works"
          :size="$q.screen.xs ? `md` : `lg`"
          color="primary"
          flat
        />
        <q-btn
          label="Skills"
          to="skills"
          :size="$q.screen.xs ? `md` : `lg`"
          color="primary"
          flat
        />
        <q-btn
          label="Contact"
          to="contact"
          :size="$q.screen.xs ? `md` : `lg`"
          color="primary"
          flat
        />
      </q-toolbar>
    </q-header>

    <background class="absolute-full" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Background from 'src/components/Background.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: { Background },
  setup() {
    return {}
  }
})
</script>

<style lang="sass" scoped>

</style>
