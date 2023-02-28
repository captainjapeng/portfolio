<template>
  <q-page
    :style-fn="pageStyle"
    :padding="$q.screen.lt.md"
    @wheel="onWheel"
  >
    <q-carousel
      v-model="page"
      control-color="primary"
      transition-prev="slide-down"
      transition-next="slide-up"
      vertical
      animated
      swipeable
      navigation
      keep-alive
      class="fit bg-transparent text-white"
    >
      <q-carousel-slide
        name="intro"
        class="flex flex-center"
      >
        <intro @next="page = `about`" />
      </q-carousel-slide>

      <q-carousel-slide
        name="about"
        class="flex flex-center"
      >
        <about @next="page = `works`" />
      </q-carousel-slide>
      <q-carousel-slide
        name="works"
        class="flex flex-center"
      >
        <works @next="page = `skills`" />
      </q-carousel-slide>
      <q-carousel-slide
        name="skills"
        class="flex flex-center"
      >
        <skills @next="page = `contact`" />
      </q-carousel-slide>
      <q-carousel-slide
        name="contact"
        class="flex flex-center"
      >
        <contact />
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref, watch } from 'vue'
import { throttle } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import Intro from 'src/components/Intro.vue'
import About from 'src/components/About.vue'
import Works from 'src/components/Works.vue'
import Skills from 'src/components/Skills.vue'
import Contact from 'src/components/Contact.vue'

const PAGES = [
  'intro',
  'about',
  'works',
  'skills',
  'contact'
]

export default defineComponent({
  name: 'IndexPage',
  components: { Intro, About, Works, Skills, Contact },
  setup() {
    const route = useRoute()
    const page = ref(route.params.page as string || 'intro')

    const router = useRouter()
    watch(page, val => {
      router.replace(`/${val}`)
    })

    onUpdated(() => {
      page.value = route.params.page as string || 'intro'
    })

    const onWheel = throttle(function(ev: WheelEvent) {
      const delta = ev.deltaY // + for scroll down, - for scroll up
      const currIdx = PAGES.findIndex(el => page.value === el)
      const offset = delta / Math.abs(delta) // normalize value between -1 to 1
      const newIdx = Math.max(0, Math.min(currIdx + offset, PAGES.length - 1))
      page.value = PAGES[newIdx]
    }, 2000)

    function pageStyle(offset: number, height: number) {
      return {
        height: offset
          ? `calc(${height}px - ${offset}px)`
          : `${height}px`
      }
    }

    return { page, pageStyle, onWheel }
  }
})
</script>

<style lang="sass" scoped>
:deep(.title)
  color: $primary
  font-size: 64px
  font-family: 'Nunito', sans-serif
  font-weight: 700

:deep(.subtitle)
  font-size: 28px

:deep(.write-up)
  font-size: 24px

@media screen and (max-width: $breakpoint-xs-max)
  :deep(.title)
    font-size: 28px

  :deep(.subtitle)
    font-size: 20px

  :deep(.write-up)
    font-size: 16px

</style>
