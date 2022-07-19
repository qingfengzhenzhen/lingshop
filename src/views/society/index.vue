<template>
  <div class="society">
    <div class="list" v-for="(v, i) in list" :key="i" :style="{backgroundImage:`url(${v.imageUrl||error})`,backgroundSize:'100% 100%'}" @click="()=>{$router.push({path:'/category',query:{id:v.id}})}">
      <div class="jing">精选</div>
      <p>{{ v.title }}</p>
      <span>{{ v.prevNumber }}人已看</span>
      <div class="views">
        点击查看
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import { GetNewList } from "@/api/shop";
export default {
  data() {
    return {
      list: [
      ],
    };
  },
  async created() {
    await this.get();
  },
  methods: {
    async get() {
      let newList = await GetNewList({
        CategoryId: 6,
      });

      

      if (newList.code == 200) {
               this.list = newList.data.filter((v) => {
          if (v.imageUrl) {
            v.imageUrl = "http://8.129.38.70:8007" + v.imageUrl;
          }
          if (v.status) {
            return true;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.society {
  padding: 10px 0 50px;
}
.list {
  overflow: hidden;
  margin: 10px 10px;
  color: #fff;
  position: relative;
  p {
    margin: 20px 0 10px 20px;
    font-size: 20px;
    font-weight: 700;
  }
  span {
    opacity: 0.6;
    font-size: 13px;
    padding-left: 20px;
  }
  .jing {
    position: absolute;
    top: 15px;
    right: 20px;
  }
  .views {
    margin: 30px 0 20px 20px;
  }
}
</style>