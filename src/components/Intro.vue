<template>
  <div class="row full-width">
    <div class="col-9 offset-md-2 col-md-4">
      <div class="title">
        Hi I'm Jasper!
      </div>
      <div class="subtitle">
        I'm a full-stack software engineer based in the Philippines
        specializing in backend architecture and infrastructure.
      </div>
      <div class="q-pt-md">
        <q-btn
          label="Begin Journey"
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
</template>
