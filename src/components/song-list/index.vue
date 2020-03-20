<template>
  <ul class="song-list">
    <div class="play"><i class="iconfont iconbofang"></i>随机播放</div>
    <li class="song-list-item" v-for="(item, index) of list" :key="item.id" @click="player(index)">
      <h1>{{ item.name }}</h1>
      <h2>{{ name }}</h2>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  name: 'SongList'
})
export default class SongList extends Vue {
  @Prop({ type: Array, default: [] })list!: Array<{}>
  @Prop({ type: String, default: '' })name!: string

  public player (index: number) {
    this._player(index)
  }

  @Emit()
  public _player (index: number): void {
    this.$emit('onPlayer', this.list, index)
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  background: #fff;
  border-radius: 20px;
  .play {
    height: 30px;
    border-bottom: 1px solid $color-border-1;
    color: $color-theme;
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: $font-size-small-x;
    i {
      margin-right: 2px;
    font-size: $font-size-large;

    }
  }
  .song-list-item {
    display: flex;
    flex-direction: column;
    padding: 15px 4%;
    border-bottom: 1px solid $color-border-1;
    h1 {
      font-size: $font-size-large-x;
      margin-bottom: 10px;
    }
    h2 {
      font-size: $font-size-medium;
      color: $color-text-ggg;
    }
  }
}
</style>
