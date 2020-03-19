<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="span-tab">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="span-tab">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="span-tab">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="span-tab">搜索</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Tab extends Vue {}
</script>

<style lang="scss" scoped>
@import 'common/scss/variable.scss';

.tab {
  position: fixed;
  top: 44px;
  z-index: 99;
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  background: $color-theme;
  .tab-item {
    flex: 1;
    text-align: center;
    .span-tab {
      padding-bottom: 5px;
      color: $color-text-l;
    }
    &.router-link-active {
      span {
        font-weight: bold;
        color: $color-text-l;
        border-bottom: 2px solid $color-text-l
      }
    }
  }
}
</style>
