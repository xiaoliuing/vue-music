<template>
  <div class="singer-detail">
    <div class="header" ref="header">
      <div class="back" @click="goBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <h1 class="title">{{ getSinger.name }}</h1>
    </div>
    <div class="pic-info" ref="singerImg">
      <img :src="getSinger.picUrl" alt="">
    </div>
    <scroll :data="singerSongs" @scroll="scroll" class="list" ref="list" :listenScroll="true" :probeType="3">
      <song-list :list="singerSongs" :name="getSinger.name"></song-list>
    </scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { getSingerDetail } from '../../api/singer'
import Scroll from '../../components/scroll/index.vue'
import SongList from '../../components/song-list/index.vue'
import { State } from '../../store/state'

@Component({
  name: 'SingerDetail',
  components: {
    SongList,
    Scroll
  }
})
export default class SingerDetail extends Vue {
  @Getter public getSinger!: (arg: State) => {}
  private singerArt = {}
  private singerSongs = []
  private scrollY = 0
  private timer = 0
  private imgHeight = 0
  private flag = true

  public created () {
    this.getSingerInfo()
  }

  $refs!: {
    singerImg: HTMLDivElement;
    header: HTMLDivElement;
  }

  private mounted () {
    this.imgHeight = this.$refs.singerImg.clientHeight
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs.list.$el.style.top = this.imgHeight - 100 + 'px'
  }

  public async getSingerInfo () {
    const id = this.$route.params.id
    const res = await getSingerDetail(id)
    this.singerSongs = res.data.hotSongs
    console.log(res)
  }

  public goBack () {
    this.$router.go(-1)
  }

  public scroll (pos: any) { // 滑动事件，获取偏移量 x y  做图片和导航动画
    this.scrollY = Math.floor(pos.y)
    if (!this.timer) {
      requestAnimationFrame(() => {
        if (this.scrollY > 0 && this.scrollY < 50) {
          // 图片下拉放大动画
          this.$refs.singerImg.style.transform = `scale(${this.scrollY / 150 + 1})`
        } else if (this.scrollY < 0) {
          // 图片往上运动动画
          this.$refs.singerImg.style.marginTop = Math.floor(this.scrollY / 4) + 'px'
        }
        if (this.scrollY < -120 && this.scrollY > -195) {
          if (this.flag) {
            this.flag = false
          }
          // 导航透明动画
          this.$refs.header.style.backgroundColor = `rgba(130, 96, 67, ${(-120 - this.scrollY) / 75})`
        } else if (this.scrollY > -120) {
          if (!this.flag) {
            this.$refs.header.style.backgroundColor = 'rgba(130, 96, 67, 0)'
            this.flag = true
          }
        }
        this.timer = 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-text-gg;
  .header {
    width: 100%;
    position: fixed;
    z-index: 102;
    height: 44px;
    line-height: 44px;
    background: rgba(130, 96, 67, 0);
    .back {
      position: absolute;
      left: 10px;
      color: $color-theme-l;
      i {
        font-size: $font-size-large;
      }
    }
    .title {
      text-align: center;
      color: $color-theme-l;
      font-size: $font-size-large;
    }
  }
  .pic-info {
    z-index: 101;
    img {
      width: 100%;
    }
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
  }
}

</style>
