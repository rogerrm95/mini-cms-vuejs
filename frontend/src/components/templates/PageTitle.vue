<template>
  <div class="page-title">
      <h1>
          <i :class="icon" v-if="icon"></i>
          {{ main }}
      </h1>
      <h2>
          {{ sub }}
      </h2>
      <hr>
  </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon','main','sub']
}
</script>

<style>

.page-title h1{
    margin: 0px;
}
@media (max-width: 505px){ .page-title h1{ font-size:2rem }}

.page-title h2{
    color: grey;
    margin-top: 5px;
    font-size: 1.3rem;
}
@media (max-width: 505px){ .page-title h2{ font-size:1rem }}
</style>