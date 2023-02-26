<template>
  <div class="row full-width">
    <div class="offset-6 col-5">
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
            size="xl"
            outline
            rounded
            class="q-px-xl"
          />
          <q-btn
            label="See my skills"
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
</template>
