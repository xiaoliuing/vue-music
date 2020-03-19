<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="banner-container" v-if="bannerList.length">
        <banner>
          <div v-for="imgInfo of bannerList" :key="imgInfo.imageUrl">
            <a href="#">
              <img :src="imgInfo.imageUrl" alt="">
            </a>
          </div>
        </banner>
      </div>
      <song-sheet :list="songSheetList" />
      <new-songs :list="newSongList" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getBannerList, getSongList, getNewSongsList } from '../../api/recommend'
import Banner from '../../components/banner/index.vue'
import SongSheet from '../../components/song-sheet/index.vue'
import NewSongs from '../../components/new-songs/index.vue'

@Component({
  name: 'Recommend',
  components: {
    Banner,
    SongSheet,
    NewSongs
  }
})
export default class Recommend extends Vue {
  // data
  private bannerList: Array<{}> = []
  private songSheetList: Array<{}> = []
  private newSongList: Array<{}> = []

  private mounted () {
    this.getBanner()
    this.getSongSheet()
    this.getNewSongs()
  }

  // methods
  public async getBanner () {
    const res = await getBannerList()
    this.bannerList = res.data.banners.slice(0, 5)
  }

  public async getSongSheet () {
    const res = await getSongList()
    this.songSheetList = res.data.result.slice(0, 9)
  }

  public async getNewSongs () {
    const res = await getNewSongsList()
    this.newSongList = res.data.result
    console.log(res)
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  padding-top: 10px;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .banner-container {
      position: relative;
      width: 94%;
      margin-left: 3%;
      border-radius: 8px;
      overflow: hidden;
    }
  }
}
</style>
