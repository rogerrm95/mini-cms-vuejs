<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style>

.content {
  grid-area: content;
  overflow: auto;

  background-color: rgb(238, 238, 238);
  padding: 20px;
}
</style>