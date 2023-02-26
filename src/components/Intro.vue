<template>
  <div class="row full-width">
    <div class="offset-2 col-4">
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
          size="xl"
          outline
          rounded
          class="q-px-xl"
          @click="$emit(`next`)"
        />
      </div>
    </div>
  </div>
</template>
