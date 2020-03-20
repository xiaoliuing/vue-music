<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import BScroll from 'better-scroll'

@Component({
  name: 'Scroll'
})
export default class Scroll extends Vue {
  @Prop({ type: Number, default: 1 })probeType!: number
  @Prop({ type: Boolean, default: true })click!: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ type: Array, default: null })data!: any
  @Prop({ type: Boolean, default: false })listenScroll!: boolean
  @Prop({ type: Boolean, default: false })pullup!: boolean
  @Prop({ type: Number, default: 20 })refreshDelay!: number

  private scroll: any

  private mounted () {
    setTimeout(() => {
      this._initScroll()
    })
  }

  $refs!: {
    wrapper: HTMLDivElement;
  }

  @Watch('data')
  watchData () {
    setTimeout(() => {
      this.refresh()
    }, this.refreshDelay)
  }

  public _initScroll () {
    if (!this.$refs.wrapper) {
      return
    }
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: this.click
    })

    if (this.listenScroll) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      this.scroll.on('scroll', (pos: any) => {
        _this.$emit('scroll', pos)
      })
    }
    if (this.pullup) {
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.$emit('scrollToEnd')
        }
      })
    }
  }

  public enable () {
    this.scroll && this.scroll.enable()
  }

  public disable () {
    this.scroll && this.scroll.disable()
  }

  public refresh () {
    this.scroll && this.scroll.refresh()
  }

  public scrollTo (...args: Array<any>) {
    // eslint-disable-next-line prefer-spread
    this.scroll && this.scroll.scrollTo.apply(this.scroll, args)
  }

  public scrollToElement (...args: Array<any>) {
    // eslint-disable-next-line prefer-spread
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, args)
  }
}
</script>

<style>

</style>
