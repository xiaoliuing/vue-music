<template>
  <div class="recommend-list">
    <h1 class="list-title">热门歌单推荐</h1>
    <ul class="list-wrap">
      <li class="list-item" v-for="item of list" :key="item.id">
        <img :src="item.picUrl" alt="">
        <div class="list-item-listen">
          <i class="iconfont iconkefu icon"></i>
          {{Math.floor(item.playCount / 10000) }}万
        </div>
        <div class="list-item-tips">
          {{ item.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'SongSheet'
})
export default class SongSheet extends Vue {
  @Prop({ type: Array, default: [] })list!: Array<{}>
}
</script>

<style lang="scss" scoped>
.recommend-list {
  .list-title {
    height: 65px;
    line-height: 65px;
    font-size: $font-size-medium-x;
    color: $color-theme;
    margin-left: 10px;
  }
  .list-wrap {
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0 0.6%;
    .list-item {
      width: 31.3%;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        border-radius: 6px;
      }
      .list-item-listen {
        position: absolute;
        top: 6px;
        right: 6px;
        display: flex;
        flex-direction: row;
        color: $color-text-lm;
        font-size: $font-size-small-x;
        .icon {
          margin-right: 4px;
          font-size: $font-size-small;
        }
      }
      .list-item-tips {
        font-size: $font-size-medium;
        box-sizing: border-box;
        margin: 4px 4px 10px 4px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
