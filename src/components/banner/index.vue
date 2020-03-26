<template>
  <div class="banner" ref="banner">
    <div class="banner-group" ref="bannerGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) of dots" :key="item" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { addClass } from '../../utils/addDomClass'
import BScroll from 'better-scroll'

@Component({
  name: 'Banner'
})
export default class Banner extends Vue {
  @Prop({ type: Boolean, default: true })loop!: boolean
  @Prop({ type: Boolean, default: true })autoPlay!: boolean
  @Prop({ type: Number, default: 4000 })interval!: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private children: any = [];
  private banner: any
  private dots: Array<{}> = [];
  private currentPageIndex = 0;
  private timer = 0

  public $refs!: {
    bannerGroup: HTMLDivElement;
    banner: HTMLDivElement;
  }

  private mounted () {
    setTimeout(() => {
      this.setBannerWidth()
      this.initDots()
      this.initBanner()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => { // 自适应视口变化
      this.setBannerWidth(true)
    })
  }

  public setBannerWidth (ifSize = false) { // 设置宽度
    this.children = this.$refs.bannerGroup.children
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let width = 0
    const bannerWidth: number = this.$refs.banner.clientWidth // 获取每个轮播图的宽

    for (let i = 0; i < this.children.length; i++) { // 循环每个轮播图，加上class，设置宽度
      const child = this.children[i]
      addClass(child, 'banner-item')
      child.style.width = bannerWidth + 'px'
      width += bannerWidth
    }

    if (this.loop || ifSize) { // 循环轮播需要无缝连接
      width += 2 * bannerWidth
    }
    this.$refs.bannerGroup.style.width = width + 'px' // 设置所轮播图宽度
  }

  public initBanner () {
    this.banner = new BScroll(this.$refs.banner, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.loop,
        threshold: 0.3,
        speed: 400
      },
      bounce: false,
      stopPropagation: true
      // click: true 防止点击事件冲突
    })

    this.banner.on('scrollEnd', () => { // 添加监听每次滑动结束触发的事件
      const pageIndex: number = this.banner.getCurrentPage().pageX // 获取当前轮播索引
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        clearTimeout(this.timer)
        this._play()
      }
    })
  }

  public initDots () { // 初始进度点个数
    this.dots = new Array(this.children.length)
  }

  public _play () { // 图片轮播
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.banner.next()
    }, this.interval)
  }

  beforeDestroy () {
    this.timer && clearTimeout(this.timer)
    window.removeEventListener('resize', () => {
      this.setBannerWidth(true)
    })
  }
}
</script>

<style lang="scss" scoped>
.banner {
  min-height: 1px;
  .banner-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .banner-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;;
        width: 100%
      }
    }
  }
  .dots {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 9px;
  text-align: center;
  // font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 13px;
        border-radius: 5px;
        background: $color-theme;
      }
    }
  }
}
</style>
