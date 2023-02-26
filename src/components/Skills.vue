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
</template>
