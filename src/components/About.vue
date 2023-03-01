<template>
  <div class="row full-width">
    <div class="col-9 offset-md-6 col-md-5">
      <div class="title">
        About Myself
      </div>
      <div class="write-up">
        <p>
          Hello!
          I started learning how to code when I was 10 years old because of the hit game
          Dota on Warcraft 3 which got me inspired to build my own video game.
          Following online tutorials, I began studying OpenGL and C++, and when the first
          triangle appeared on the screen, I became fascinated.
        </p>

        <p>
          Throughout the years, I have had the opportunity to work for several startups
          that helped me develop my expertise and also meet mentors who have taught
          me a lot about business and entrepreneurship.
        </p>
        <p>
          I'm currently working at
          <a
            href="https://prismcode.tech/"
            target="_blank"
          >PrismCode</a>,
          where we assist customers in finding digital solutions to their problems and
          unlocking possibilities.
        </p>
      </div>
      <div class="q-pt-md">
        <q-btn
          label="Know about my works"
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
</template>
