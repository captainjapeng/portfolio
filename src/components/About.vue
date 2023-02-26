<template>
  <div class="row full-width">
    <div class="offset-6 col-5">
      <div class="title">
        About Myself
      </div>
      <div class="write-up">
        <p>
          Hello! My name is Jasper Agrante,
          I started learning to program when I was 10 years old because of the hit game
          Dota on Warcraft 3 which inspired me to create my own video game.
          Following online tutorials, I began learning OpenGL and C++, and when the first
          triangle appeared on the screen, I became fascinated.
        </p>

        <p>
          Today, having had the opportunity to work for several startups and having met
          mentors who have taught me a lot about entrepreneurship.
          I'm currently working at
          <a
            href="https://prismcode.tech/"
            target="_blank"
          >PrismCode</a>
          , we assist customers in finding digital solutions
          to their problems.
        </p>
      </div>
      <div class="q-pt-md">
        <q-btn
          label="Know about my works"
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
