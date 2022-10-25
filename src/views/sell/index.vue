<template>
  <div class="sell">
    <div class="top">
      <img
        :src="banner.imageUrl"
        alt=""
        v-error
        @click="goRouter(banner.linkUrl)"
      />
    </div>
    <div class="witnessList">
      <ul>
        <li
          v-for="(v, i) in witnessList"
          @click="
            () => {
              $router.push({ path: '/category', query: { id: v.id } });
            }
          "
          :key="i"
          :style="{
            backgroundImage: `url(${v.imageUrl || error})`,
            backgroundSize: '100% 100%',
          }"
        >
          <p class="title1">{{ v.title }}</p>
          <p class="title2">{{ v.descInfo }}</p>
          <div class="foolt">
            <span>点击进入</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { GetNewList, getbanner } from "@/api/shop";
export default {
  data() {
    return {
      witnessList: [],
      banner: {},
      error: "",
    };
  },
  async created() {
    await this.get();
  },
  methods: {
    async get() {
      let newList = await GetNewList({
        CategoryId: 5,
      });
      let bannerList = await getbanner({
        categoryId: 5,
      });
      if (bannerList.code == 200) {
        bannerList.data.forEach((v) => {
          v.imageUrl = window.$http + v.imageUrl;
        });
        this.banner = bannerList.data[0];
      }


      if (newList.code == 200) {
       this.witnessList= newList.data.filter((v) => {
          if (v.imageUrl) {
            v.imageUrl = window.$http + v.imageUrl;
          }
          if (v.status) {
            return true;
          }
        });
      }
    },
    goRouter(to) {
      if (to) {
        window.location.href = to;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sell {
  padding: 0 20px 60px;
}
.top {
  height: 120px;
  border-radius: 20px;
  margin: 20px 0;
  overflow: hidden;box-shadow: 1px 1px 6px 1px #aaa;
  img {
    width: 100%;
    height: 100%;object-fit: cover;
  }
}
.witnessList {
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 49%;
      height: 130px;
      margin: 4px 0;
      position: relative;
      overflow: hidden;
      .title1 {
        margin: 20px 0 10px 10px;
        font-size: 18px;
      }
      .title2 {
        margin: 0 0 10px 10px;
        font-size: 14px;
      }
      .foolt {
        padding: 3px 5px;
        display: inline-block;
        margin-left: 10px;
        border: 1px #e3ada1 solid;
        span {
          font-size: 10px;
        }
      }
    }
    li:nth-child(2n-1) {
      margin-right: 2%;
    }
    padding-bottom: 5px;
  }
}
</style>