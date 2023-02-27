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
            color="white"
            :size="$q.screen.xs ? `md`: `xl`"
            outline
            rounded
            class="q-px-xl"
            @click="visible = true"
          />
          <q-btn
            label="See my skills"
            color="white"
            :size="$q.screen.xs ? `md`: `xl`"
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
    maximized
  >
    <background class="bg-black absolute-full" />
    <q-card class="bg-transparent  flex flex-center">
      <div class="absolute-top-right">
        <q-btn
          v-close-popup
          color="white"
          label="Close"
          flat
        />
      </div>
      <div>
        <div
          v-for="galaxy, idx in galaxies"
          :key="idx"
        >
          <div class="col-auto galaxy-name text-primary text-weight-bolder q-mt-lg q-mb-md">
            Galaxy: {{ galaxy.name }}
          </div>
          <div class="row justify-center q-col-gutter-md">
            <div
              v-for="planet, planetIdx in galaxy.planets"
              :key="`${idx}-${planetIdx}`"
              class="col-auto"
            >
              <q-responsive
                :ratio="1"
                class="planet cursor-pointer non-selectable"
              >
                <div class="relative-position">
                  <div class="absolute-center text-bold">
                    {{ planet.name }}
                  </div>
                </div>
              </q-responsive>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Background from 'src/components/Background.vue'

export default defineComponent({
  components: { Background },
  emits: ['next'],
  setup() {
    const visible = ref(false)

    const galaxies = [
      {
        name: 'Prism Code Philippines Inc.',
        planets: [
          { name: 'EvA' },
          { name: 'Virtual Event' },
          { name: 'Photobooth' },
          { name: 'Registration' },
          { name: 'Metaverse' },
          { name: 'PrismNet' }
        ]
      },
      {
        name: 'Imergex Information Technologies, Inc.',
        planets: [
          { name: 'Travel Safe' },
          { name: 'Swap Tayo' },
          { name: 'Pan!c Button' }
        ]
      }
    ]

    return { visible, galaxies }
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
  border: 1px solid white
  border-radius: 50%
  width: 200px
</style>
