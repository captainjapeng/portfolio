<template>
  <div class="row full-width">
    <div class="offset-2 col-4">
      <div class="title">
        My Skills
      </div>
      <div class="subtitle">
        Here are some of techs I've learned over time while solving various problems.
      </div>
      <div class="q-pt-md">
        <div class="row q-gutter-md">
          <q-btn
            label="Explore"
            color="white"
            size="xl"
            outline
            rounded
            class="q-px-xl"
            @click="visible = true"
          />
          <q-btn
            label="Contact Me"
            color="white"
            size="xl"
            outline
            rounded
            class="q-px-xl"
            @click="$emit(`next`)"
          />
        </div>
      </div>
    </div>
  </div>

  <q-dialog
    v-model="visible"
    persistent
    maximized
  >
    <q-card class="bg-black flex flex-center">
      <div class="absolute-top-right">
        <q-btn
          v-close-popup
          color="white"
          label="Close"
          flat
        />
      </div>
      <q-scroll-area
        visible
        dark
        class="fit"
        style="max-height: 90vh"
      >
        <div>
          <div
            v-for="galaxy, idx in galaxies"
            :key="idx"
            class="row q-col-gutter-md q-mt-sm"
          >
            <div class="offset-1 col-2 galaxy-name text-primary text-weight-bolder q-mt-sms q-mb-xs">
              {{ galaxy.name }}
            </div>
            <div class="col">
              <div class="row q-col-gutter-md">
                <div
                  v-for="content, contentIdx in galaxy.contents"
                  :key="`${idx}-${contentIdx}`"
                  class="content col-auto"
                >
                  <q-avatar
                    rounded
                    size="64px"
                  >
                    <q-img
                      v-if="content.icon"
                      :src="`/stack/${content.icon}`"
                      width="80%"
                    />
                  </q-avatar>
                  <div class="text-white text-bold q-mt-xs">
                    {{ content.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['next'],
  setup() {
    const visible = ref(false)

    const layers = [
      {
        name: 'Frontend',
        color: 'red',
        contents: [
          { name: 'Vue.js', icon: 'vue.svg' },
          { name: 'Quasar', icon: 'quasar.png' },
          { name: 'Three.js', icon: 'threejs.svg' },
          { name: 'Fabric.js', icon: 'fabricjs.png' },
          { name: 'Video.js', icon: 'videojs.jpg' }
        ]
      },
      {
        name: 'Protocols',
        contents: [
          { name: 'GraphQL', icon: 'graphql.svg' },
          { name: 'Apollo Federation', icon: 'apollostack.svg' },
          { name: 'REST', icon: 'globe-solid.svg' }
        ]
      },
      {
        name: 'Backend',
        contents: [
          { name: 'Node.js', icon: 'nodejs-icon.svg' },
          { name: 'Golang', icon: 'gopher.svg' },
          { name: 'Deno', icon: 'deno.svg' },
          { name: 'Apollo Federation', icon: 'apollostack.svg' },
          { name: 'NGINX', icon: 'nginx.svg' }
        ]
      },
      {
        name: 'Data & Communications',
        contents: [
          { name: 'PostgreSQL', icon: 'postgresql.svg' },
          { name: 'Redis', icon: 'redis.svg' },
          { name: 'RediSearch', icon: 'redis.svg' },
          { name: 'NATS.io', icon: 'nats-icon.svg' },
          { name: 'Cockroachdb', icon: 'cockroachdb.png' }
        ]
      },
      {
        name: 'Infrastructure',
        contents: [
          { name: 'Kubernetes', icon: 'kubernetes.svg' },
          { name: 'Docker', icon: 'docker-icon.svg' },
          { name: 'Traefik', icon: 'traefik.png' },
          { name: 'Linkerd', icon: 'linkerd.svg' },
          { name: 'Locust.io', icon: 'locustio.png' },
          { name: 'Helm', icon: 'helm.svg' },
          { name: 'Prometheus', icon: 'prometheus.svg' },
          { name: 'Grafana', icon: 'grafana.svg' },
          { name: 'Thanos', icon: 'thanos.png' }
        ]
      },
      {
        name: 'Cloud Providers',
        contents: [
          { name: 'Google Cloud Platform', icon: 'google-cloud.svg' },
          { name: 'Cloudflare', icon: 'cloudflare.svg' },
          { name: 'Digital Ocean', icon: 'digital-ocean.png' },
          { name: 'Vultr', icon: 'vultr-icon.svg' },
          { name: 'BunnyCDN', icon: 'bunny-net-icon.svg' }
        ]
      }
    ]

    return { visible, galaxies: layers }
  }
})
</script>

<style lang="sass" scoped>
.galaxy-name
  font-size: 24px
  text-align: right

.content
  font-size: 16px
  line-height: 16px
  text-align: center
  width: 8%

.q-avatar
  background-color: white

  :deep(img)
    filter: drop-shadow(0 0 2px rgba(black, 0.5))
</style>
