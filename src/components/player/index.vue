<template>
  <div class="player" v-if="getPlayList.length > 0">
    <transition name="screen"
      @enter='enter'
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="screen-player" v-show="getFullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="getCurrentSong.al.picUrl">
        </div>
        <div class="top">
          <div class="back" @click="closePlayer">
            <i class="iconfont iconfanhui"></i>
          </div>
          <h1 class="title">{{ getCurrentSong.name }}</h1>
          <h2 class="subtitle">{{ getCurrentSong.ar[0].name }}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="imgAnsition">
                <img :src="getCurrentSong.al.picUrl" alt="" class="image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="iconfont iconsort"></i>
            </div>
            <div class="icon i-left">
              <i @click="prec" class="iconfont iconshangyishou"></i>
            </div>
            <div class="icon i-center" @click="togglePlay">
              <i :class="`iconfont ${playClass}`"></i>
            </div>
            <div class="icon i-right">
              <i @click="next" class="iconfont iconxiayizhen"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont iconxihuan"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!getFullScreen" @click="openPlayer">
        <div class="icon">
          <img width="40" height="40" :src="getCurrentSong.al.picUrl">
        </div>
        <div class="text">
          <h2 class="name">{{ getCurrentSong.name }}</h2>
          <p class="desc">{{ getCurrentSong.ar[0].name }}</p>
        </div>
        <div class="control" @click.stop="togglePlay">
          <i :class="`iconfont ${playClass} iii`"></i>
        </div>
        <div class="control">
          <i class="iconfont iconsuijisenlin ii"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="url" @canplay="ready" @error="error"></audio>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action, Mutation, State } from 'vuex-class'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import animations from 'create-keyframe-animation'
import { getSongUrl } from '../../api/singer'

@Component({
  name: 'Player'
})
export default class Player extends Vue {
  @State public currentIndex!: number
  @Getter public getFullScreen!: (state: {}) => boolean
  @Getter public getPlayList!: (state: {}) => []
  @Getter public getCurrentSong!: (state: {}) => {}
  @Getter public getPlaying!: (state: {}) => boolean
  @Action public updateFullScreen!: (flag: boolean) => void
  @Mutation('SET_PLAYING') public setPlaying!: (flag: boolean) => void
  @Mutation('SET_CURRENT_INDEX') public setCurrentIndex!: (index: number) => void
  url = ''
  songReady = false // 表示歌曲是否准备好，没有阻止用户频繁切换歌曲

  $refs!: {
    cdWrapper: HTMLDivElement;
    audio: HTMLAudioElement;
  }

  // 定义computed
  get playClass () {
    return this.getPlaying ? 'iconicon_zanting' : 'iconzanting1'
  }

  get imgAnsition () {
    return this.getPlaying ? 'play' : 'play pause'
  }

  @Watch('getCurrentSong')
  watchUrl () {
    this._getMusicUrl()
  }

  @Watch('getPlaying')
  watchPlaying (newVal: boolean) {
    const audio = this.$refs.audio
    if (audio) {
      newVal ? audio.play() : audio.pause()
    }
  }

  public async _getMusicUrl () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const res = await getSongUrl(this.getCurrentSong.id)
    this.url = res.data.data[0].url
    this.$nextTick(() => {
      this.$refs.audio.play()
    })
  }

  public togglePlay () {
    console.log(this.getPlaying)
    this.setPlaying(!this.getPlaying)
  }

  public closePlayer () {
    this.updateFullScreen(false)
  }

  public openPlayer () {
    this.updateFullScreen(true)
  }

  public next () {
    if (!this.songReady) {
      return
    }
    let index = 1 + this.currentIndex
    if (index === this.getPlayList.length) {
      index = 0
    }
    this.setCurrentIndex(index)
    if (!this.getPlaying) {
      this.togglePlay()
    }
    this.songReady = false
  }

  public prec () {
    if (!this.songReady) {
      return
    }
    let index = this.currentIndex - 1
    if (index === -1) {
      index = this.getPlayList.length - 1
    }
    this.setCurrentIndex(index)
    if (!this.getPlaying) {
      this.togglePlay()
    }
    this.songReady = false
  }

  public ready () {
    this.songReady = true
  }

  public error () {
    console.log('1111')
  }

  public enter (el: any, done: any) {
    const { x, y, scale } = this._getPOSAndScale()

    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      60: {
        transform: 'translate3d(0, 0, 0) scale(1.1)'
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    }

    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    })

    animations.runAnimation(this.$refs.cdWrapper, 'move', done)
  }

  public afterEnter () {
    animations.unregisterAnimation('move')
    this.$refs.cdWrapper.style.animation = ''
  }

  public leave (el: any, done: any) {
    this.$refs.cdWrapper.style.transition = 'all .4s'
    const { x, y, scale } = this._getPOSAndScale()
    this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    this.$refs.cdWrapper.addEventListener('transitionend', done)
  }

  public afterLeave () {
    this.$refs.cdWrapper.style.transition = ''
    this.$refs.cdWrapper.style.transform = ''
  }

  public _getPOSAndScale () {
    const targetWidth = 40
    const paddingLeft = 30
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const scale = targetWidth / width
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    return {
      x, y, scale
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  .screen-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-sub-theme;
    .background {
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(30px);
      .filter {
        position: absolute;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.6;
      }
      .filterR {
        position: absolute;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.4;
        &.filterR-enter-active, &.filterR-leave-active {
          transition: all  0.3s
        }
        &.filterR-leave-to, &.filterR-enter {
          opacity: 0
        }
        &.filterR-leave {
          opacity: 0.4;
        }
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 50;
        transform: rotate(-90deg);
        i {
          font-size: 30px;
          color: $color-theme-l;
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        padding-top: 10px;
        line-height: 20px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        font-weight: bold;
        color: $color-text-l;
      }
      .subtitle {
        width: 70%;
        margin: 0 auto;
        padding-top: 6px;
        line-height: 20px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-small-x;
        color: $color-text-l;
      }
    }
    .middle {
      display: flex;
      align-items: center;
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        &.middleL-enter-active, &.middleL-leave-active {
          transition: all 0.3s
        }
        &.middleL-enter, &.middleL-leave-to {
          opacity: 0
        }
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 15px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text-l;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
            color: $color-text-gg;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme-l;
          &.disable {
            color: $color-theme;
          }
          i {
            font-size: 30px;
          }
          .mode {
            font-size: 25px;
          }
          &.i-left {
            text-align: right;
          }
          &.i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 50px;
            }
          }
          &.i-right {
            text-align: left;
          }
          .icon-like {
            color: $color-theme;
          }
        }
      }
    }
    &.screen-enter-active, &.screen-leave-active {
      transition: all 0.4s;
      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.screen-enter, &.screen-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(1, -100px, 0);
      }
      .bottom {
        transform: translate3d(1, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-sub-theme;
    &.mini-enter-active, &.mini-leave-active {
      transition: all, .4s;
    }
    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 10px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      overflow: hidden;
      .name {
       margin-bottom: 8px;
       line-height: 14px;
       @include no-wrap();
       font-size: $font-size-medium-x;
       color: $color-theme-l;
      }
      .desc {
       @include no-wrap();
        font-size: $font-size-small;
        color: #D3C2B5;
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      color: #fff;
      .ii {
        font-size: 30px;
      }
      .iii {
        font-size: 36px;
      }
      // .icon-play-mini, .icon-pause-mini, .icon-playlist, .iconfont {
      //   font-size: 30px;
      //   color: $color-theme-d;
      // }
      // .iconfont {
      //   position: relative;
      //   left: -5px;
      //   top: -3px;
      // }
      // .fa-play {
      //   color: $color-theme-d;
      //   font-size: 14px;
      //   position: absolute;
      //   left: 12px;
      //   top: 8.5px;
      // }
      // .fa-stop {
      //   color: $color-theme-d;
      //   font-size: 12px;
      //   position: absolute;
      //   left: 11px;
      //   top: 10px;
      // }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(180deg);
  }
}
</style>
