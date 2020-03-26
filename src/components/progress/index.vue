<template>
  <div class="progress-bar" ref="wrapper" @click="cProgress">
    <div class="pro-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
        ref="btn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({
  name: 'Progress'
})
export default class Progress extends Vue {
  @Prop({ type: String, default: '0.00' })durTime!: string

  wrapWidth = 0
  touch: {flag: boolean;startX: number;left: number} = { flag: true, startX: 0, left: 0 }

  $refs!: {
    wrapper: HTMLDivElement;
    progress: HTMLDivElement;
    btn: HTMLDivElement;
  }

  private mounted () {
    this.wrapWidth = this.$refs.wrapper.clientWidth
  }

  @Watch('durTime')
  watchDurTime (newTime: string) { // 侦听当前播放时间
    if (Number(newTime) > 0 && this.touch.flag) {
      const num: number = ((this.wrapWidth * Number(newTime)) | 0)
      this._offset(num)
    }
  }

  public _offset (num: number) { // 改变进度条宽度和滑块位置
    this.$refs.progress.style.width = num + 'px'
    this.$refs.btn.style.transform = `translate3d(${num}px, 0, 0)`
  }

  public cProgress (e: any) { // 点击进度条实现快进
    this._offset(e.offsetX)
    this.progress(e.offsetX / this.wrapWidth)
  }

  @Emit()
  public progress (offset: number) {
    this.$emit('onProgress', offset)
  }

  public progressTouchStart (e: TouchEvent) {
    this.touch.flag = true
    this.touch.startX = e.touches[0].pageX
    this.touch.left = this.$refs.progress.clientWidth
  }

  public progressTouchMove (e: TouchEvent) {
    if (!this.touch.flag) {
      return null
    }
    const deltaX = e.touches[0].pageX - this.touch.startX
    const offsetWidth = Math.min(this.wrapWidth, Math.max(0, this.touch.left + deltaX))
    this._offset(offsetWidth)
  }

  public progressTouchEnd () {
    this.touch.flag = false
    this.progress(this.$refs.progress.clientWidth / this.wrapWidth)
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .pro-inner {
    position: relative;
    top: 14px;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: yellow;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -14px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 11px;
        left: 7px;
        box-sizing: border-box;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
      }
    }
  }
}
</style>
