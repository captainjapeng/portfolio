<template>
  <div class="row full-width">
    <div class="col-9 offset-md-6 col-md-5">
      <div class="title">
        My works
      </div>
      <div class="subtitle">
        Come check out the awesome stuff I've made over the years!
      </div>
      <div class="q-pt-md">
        <div class="row q-gutter-md">
          <q-btn
            label="Explore"
            color="orange"
            :size="$q.screen.xs ? `md` : `xl`"
            outline
            rounded
            class="text-weight-bolder q-px-xl"
            @click="visible = true"
          />
          <q-btn
            label="See my skills"
            color="white"
            :size="$q.screen.xs ? `md` : `xl`"
            outline
            rounded
            class="q-px-xl"
            @click="$emit(`next`)"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Explore Dialog -->
  <q-dialog
    v-model="visible"
    maximized
  >
    <background class="bg-black absolute-full" />
    <q-card class="bg-transparent flex flex-center">
      <div class="absolute-top-right">
        <q-btn
          v-close-popup
          color="white"
          label="Close"
          flat
          style="z-index: 1"
        />
      </div>
      <q-scroll-area
        visible
        dark
        class="fit"
        style="max-height: 90vh"
      >
        <div class="q-pa-md full-width">
          <div class="row q-col-gutter-md">
            <div
              v-for="item in items"
              :key="item.title"
              class="col-12 col-sm-4 col-md-3"
            >
              <q-card class="column no-wrap work-item bordered full-height">
                <q-responsive
                  v-if="item.media?.type.startsWith(`video`)"
                  :ratio="16 / 9"
                  class="overflow-hidden"
                >
                  <video
                    controls
                    preload="none"
                    :poster="item.media.poster"
                    controlslist="nodownload"
                    playsinline
                    style="object-fit: cover"
                  >
                    <source
                      :src="item.media.url"
                      :type="item.media.type"
                    >
                  </video>
                </q-responsive>
                <q-img
                  v-else-if="item.media?.type.startsWith(`image`)"
                  :src="item.media.url"
                  :ratio="16 / 9"
                  class="col-auto cursor-pointer"
                  @click="zoomUrl = item.media.url"
                />
                <div class="col-auto q-pa-md">
                  <div class="title row items-center no-wrap q-col-gutter-xs">
                    <div class="col">
                      {{ item.title }}
                    </div>
                    <q-space />
                    <div
                      v-if="item.disclaimer"
                      class="col-auto"
                    >
                      <q-icon
                        name="warning"
                        color="orange-5"
                      >
                        <q-tooltip>
                          {{ item.disclaimer }}
                        </q-tooltip>
                      </q-icon>
                    </div>
                  </div>
                  <!-- eslint-disable vue/no-v-html -->
                  <div
                    class="short-description"
                    v-html="item.shortDescription"
                  />
                  <!-- eslint-enable vue/no-v-html -->
                  <div
                    v-if="item.employer"
                    class="tag"
                  >
                    <q-icon
                      name="work"
                      color="primary"
                      class="q-mr-sm"
                    />
                    <a
                      :href="item.employer.url"
                      referrerpolicy="no-referrer"
                    >
                      {{ item.employer.name }}
                    </a>
                  </div>
                  <div
                    v-if="item.year"
                    class="tag"
                  >
                    <q-icon
                      name="event"
                      color="primary"
                      class="q-mr-sm"
                    />
                    <span>
                      {{ item.year }}
                    </span>
                  </div>
                </div>
                <q-space />
                <div
                  v-if="item.link"
                  class="col-auto text-right q-px-md"
                >
                  <q-btn
                    :label="item.link.label"
                    :href="item.link.url"
                    :size="$q.screen.xs ? `md` : `lg`"
                    target="_blank"
                    flat
                    referrerpolicy="no-referrer"
                    class="text-weight-bolder"
                  />
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-card>
  </q-dialog>

  <!-- Zoom Dialog -->
  <q-dialog
    :model-value="!!zoomUrl"
    @hide="zoomUrl = ''"
  >
    <q-card class="bordered zoom-card">
      <div class="absolute-top-right q-pa-sm">
        <q-btn
          v-close-popup
          icon="close"
          color="primary"
          round
          style="z-index: 1"
        />
      </div>
      <q-img :src="zoomUrl" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Background from 'src/components/Background.vue'
import Portfolio from 'assets/works/portfolio.jpg'
import GroupPB from 'assets/works/group-pb.jpg'
import PanicButtonVideo from 'assets/works/panic-button.mp4'
import PanicButtonPoster from 'assets/works/panic-button.jpg'
import TravelSafeVideo from 'assets/works/travelsafe.mp4'
import TravelSafePoster from 'assets/works/travelsafe.png'
import SwapTayo from 'assets/works/swaptayo.jpg'
import FruitNinjaVideo from 'assets/works/fruit-ninja.mp4'
import FruitNinjaPoster from 'assets/works/fruit-ninja.jpg'
import PrismVerseVideo from 'assets/works/prismverse.mp4'
import PrismVersePoster from 'assets/works/prismverse.jpg'
import Chat from 'assets/works/chat.jpg'
import Leaderboard from 'assets/works/leaderboard.png'
import PrismNet from 'assets/works/prismnet.png'

export default defineComponent({
  components: { Background },
  emits: ['next'],
  setup() {
    const visible = ref(false)
    const zoomUrl = ref('')

    const PrismCode = {
      name: 'Prism Code Philippines Inc.',
      url: 'https://prismcode.tech'
    }

    const Imergex = {
      name: 'Imergex Information Technology Inc.',
      url: 'http://imergex.com/'
    }

    const items = [
      {
        title: 'My Portfolio',
        year: '2023',
        media: { url: Portfolio, type: 'image' },
        link: { label: 'View Code', url: 'https://github.com/captainjapeng/portfolio' },
        shortDescription: 'The source code for this website that you\'re viewing. ' +
          'Built using <a href="https://quasar.dev/" target="_blank">Quasar</a>, ' +
          'Hosted on <a href="https://pages.cloudflare.com/" target="_blank">CF Pages</a>, ' +
          'and email functionality by <a href="https://workers.cloudflare.com/" target="_blank">CF Worker</a> ' +
          '& <a href="https://sendgrid.com/" target="_blank">Sendgrid</a> all for free.'
      },
      {
        title: 'Pinoy Fruit Slice',
        year: '2022',
        media: {
          url: FruitNinjaVideo,
          poster: FruitNinjaPoster,
          type: 'video/mp4'
        },
        link: { label: 'Visit Site', url: 'https://prismcode.tech/page15.html' },
        shortDescription: 'A Fruit Ninja like game but with a Pinoy twist!',
        disclaimer: 'Creative artworks not created by me.',
        employer: PrismCode
      },
      {
        title: 'PrismNet',
        year: '2022',
        media: { url: PrismNet, type: 'image' },
        shortDescription: 'Feasibility study for a background segmentation',
        employer: PrismCode
      },
      {
        title: 'EvA (Game Backend)',
        year: '2022',
        media: { url: Leaderboard, type: 'image' },
        link: { label: 'Visit Site', url: 'https://prismcode.tech/games.html' },
        shortDescription: 'A real-time game leaderboard backend with gameplay recording and security features that can handle 30K concurrent users.',
        disclaimer: 'Creative artworks not created by me.',
        employer: PrismCode
      },
      {
        title: 'PrismVerse',
        year: '2022',
        media: {
          url: PrismVerseVideo,
          poster: PrismVersePoster,
          type: 'video/mp4'
        },
        link: { label: 'Visit Site', url: 'https://prismcode.tech/games.html' },
        shortDescription: 'Feasibility study for a virtual world where users can conduct their events.',
        employer: PrismCode
      },
      {
        title: 'Group Photobooth',
        year: '2021',
        media: { url: GroupPB, type: 'image' },
        link: { label: 'Visit Site', url: 'https://prismcode.tech/photobooth.html' },
        shortDescription: 'A virtual photobooth that allows multiple users to take a photo together.',
        disclaimer: 'Creative artworks not created by me.',
        employer: PrismCode
      },
      {
        title: 'EvA (Chat Backend)',
        year: '2020',
        media: { url: Chat, type: 'image' },
        link: { label: 'Visit Site', url: 'https://prismcode.tech/virtual-events.html' },
        shortDescription: 'A chat messaging backend that supports stickers, videos, and links. It was later on reworked to handle 100K concurrent users.',
        disclaimer: 'Creative artworks not created by me.',
        employer: PrismCode
      },
      {
        title: 'Travel Safe',
        year: '2017',
        media: {
          url: TravelSafeVideo,
          poster: TravelSafePoster,
          type: 'video/mp4'
        },
        link: { label: 'Visit Facebook', url: 'https://www.facebook.com/GetTravelSafe' },
        shortDescription: 'An android app that tracks the user’s real-time location and allows them to share it ' +
          'with other people via link to be able to monitor their travel.',
        employer: Imergex
      },
      {
        title: 'Swap Tayo',
        year: '2016',
        media: { url: SwapTayo, type: 'image' },
        link: { label: 'Visit Site', url: 'http://swaptayo.imergex.com/' },
        shortDescription: 'a Tinder-like android app for selling or bartering items with other users. ' +
          'The app allows users to find items and initiate chat to send their offers.',
        employer: Imergex
      },
      {
        title: 'PAN!C Button',
        year: '2016',
        media: {
          url: PanicButtonVideo,
          poster: PanicButtonPoster,
          type: 'video/mp4'
        },
        link: { label: 'Visit Site', url: 'http://panicbutton.imergex.com/' },
        shortDescription: 'An android app that sends calls and sends sms to your selected emergency contacts. ' +
          'It also has a search & rescue feature by using the device\'s Wi-Fi Hotspot',
        employer: Imergex
      }
    ]

    return { visible, zoomUrl, items }
  }
})
</script>

<style lang="sass" scoped>
.galaxy-name
  font-size: 24px
  text-align: center

.planet
  font-size: 32px
  text-align: center
  color: $primary
  border: 3px solid white
  border-radius: 50%
  width: 200px

.bordered
  border-radius: 32px
  border: 3px solid $secondary

.work-item
  background: rgba(black, 0.8)
  color: white

  > .q-img, video
    border-bottom: 3px solid $secondary

  .title
    color: $primary
    font-size: 24px
    font-family: 'Nunito', sans-serif
    font-weight: 700

  .short-description
    font-size: 20px
    line-height: 1.1em

  .tag
    color: $primary
    font-size: 18px

.zoom-card
  width: 1800px
  max-width: 100vh
  max-height: 100vh

  @media screen and (max-height: $breakpoint-xs-max)
    max-width: unset
</style>
