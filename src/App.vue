<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view class="content" />
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import MHeader from './views/header/index.vue'
import Tab from './views/tab/index.vue'
import Player from './components/player/index.vue'

@Component({
  components: {
    MHeader,
    Tab,
    Player
  }
})
export default class App extends Vue {
}
</script>

<style lang='scss'>

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    margin-top: 88px;
  }
}
</style>
