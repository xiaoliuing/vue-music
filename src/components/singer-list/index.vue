<template>
  <ul class="singer-list">
    <li class="singer-list-item" v-for="item of list" :key="item.id" @click="skipDetail(item)">
      <img :src="item.picUrl" alt="">
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  name: 'SingerList'
})
export default class SingerList extends Vue {
@Prop({ type: Array, default: [] })list!: Array<{}>

@Emit()
public skipDetail (singer: {}) {
  console.log(singer)
  this.$emit('skipTo', singer)
}
}
</script>

<style lang="scss" scoped>
.singer-list {
  .singer-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid $color-border-1;
    img {
      width: 45px;
      border-radius: 4px;
      margin-right: 20px;
    }
    span {
      font-size: $font-size-large;
    }
  }
}
</style>
