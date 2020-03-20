<template>
  <div class="singer">
    <div class="singer-title">热门歌手</div>
    <singer-list :list="singersList" @skipTo="singerSkip"/>
    <transition name="singer">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SingerList from '../../components/singer-list/index.vue'
import { getSingerList } from '../../api/singer'
import { Action } from 'vuex-class'

@Component({
  name: 'singer',
  components: {
    SingerList
  }
})
export default class Singer extends Vue {
  @Action public setSinger!: (arg: {}) => void
  private singersList: Array<{}> = []
  private mounted () {
    this.getSingers()
  }

  public async getSingers () {
    const res = await getSingerList()
    this.singersList = res.data.artists
  }

  public singerSkip (singer: {id: string}) {
    this.setSinger(singer)
    this.$router.push({
      path: `/singer/detail/${singer.id}`
    })
  }
}
</script>

<style lang="scss" scoped>
.singer {
  box-sizing: border-box;
  padding-left: 3%;
  padding-top: 20px;
  .singer-title {
    font-size: $font-size-medium-x;
    color: $color-theme;
    margin: 0 0 20px 10px;
    border-left: 5px solid $color-theme;
    padding-left: 10px;
  }

  .singer-enter-active, .singer-leave-active {
    transition: all .3s ease;
  }
  .singer-enter, .singer-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
  .singer-enter-to, .singer-leave {
    opacity: 1;
  }
}
</style>
