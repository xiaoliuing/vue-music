<template>
  <div class="newso-list">
    <h1 class="list-title">最新音乐</h1>
    <ul class="new-list">
      <li class="new-list-item" v-for="item of list" :key="item.id">
        <div class="item-wrap">
          <img :src="item.picUrl" alt="">
          <div class="item-title">
            <h1>{{item.name}}</h1>
            <p><i class="iconfont iconyiliao biaoshi"></i><span v-for="art of item.song.artists" :key="art.id">{{art.name}}</span>-{{ item.song.album.name }}</p>
          </div>
        </div>
        <i class="iconfont iconbofang item-play"></i>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'NewSongs'
})
export default class NewSongs extends Vue {
  @Prop({ type: Array, default: [] })list!: Array<{}>
}
</script>

<style lang="scss" scoped>
.newso-list {
  .list-title {
    font-size: $font-size-medium-x;
    color: $color-theme;
    margin: 20px 0 20px 10px;
    border-left: 5px solid $color-theme;
    padding-left: 10px;
  }
  .new-list {
    width: 100%;
    box-sizing: border-box;
    padding-left: 4%;
    .new-list-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $color-border-1;
      padding: 10px 4% 10px 0;
      align-items: center;
      .item-wrap {
        display: flex;
        flex-direction: row;
        img {
          width: 46px;
          border-radius: 4px;
          margin-right: 10px;
        }
        .item-title {
          h1 {
            font-size: $font-size-large-x;
            color: $color-text;
          }
          p {
            margin-top: 10px;
            font-size: $font-size-medium;
            color: $color-text-g;
            .biaoshi {
              color: #FE672E;
              margin-right: 6px;
            }
          }
        }
      }
      .item-play {
        font-size: 36px;
        color: $color-text-ggg;
      }
    }
  }
}
</style>
