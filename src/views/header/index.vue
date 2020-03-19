<template>
  <div class="m-header">
    <h1 class="text">My Music</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.m-header {
  position: fixed;
  height: 44px;
  z-index: 99;
  width: 100%;
  text-align: center;
  color: $color-theme-l;
  font-size: 0;
  background: $color-theme;
  .text {
    line-height: 44px;
    font-size: $font-size-large;
  }
}
</style>
