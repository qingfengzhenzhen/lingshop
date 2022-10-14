<template>
  <div class="goodsType">
    <van-nav-bar
      :title="$t('home.commodity classification')"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <van-sidebar v-model="activeKey" @change="chenge()">
      <van-sidebar-item v-for="(v, i) in typeList" :key="i" :title="v.name" />
    </van-sidebar>
    <div class="content">
      <van-sidebar v-model="type" @change="chenge2()">
        <van-sidebar-item
          v-for="(v, i) in goodsType"
          :key="i"
          :title="v.featuresName"
        />
      </van-sidebar>
    </div>
    <div class="content2">
      <ul>
        <li
          v-for="(v, i) in goodsType[type] ? goodsType[type].items : []"
          :key="i"
          @click="()=>{$router.push({
            path:'/pay',
            query:{
              id:v.id
            }
          })}"
        >
          <img :src="v.image" v-error alt="" />
          <p class="van-ellipsis">{{v.productName}}</p>
        </li>
      </ul>
    </div>
    <van-overlay :show="show" />
  </div>
</template>

<script>
import { Toast } from "vant";
import { GetProductByCategory, GetCategoryAll } from "@/api/pay";
export default {
  data() {
    return {
      activeKey: 0,
      typeList: [],
      goodsType: [],
      id: "",
      show: false,
      type: 0,
    };
  },
  async created() {
    Toast.loading({
      duration: 0,
      message: this.$t('edit.Loading'),
      forbidClick: true,
    });
    this.show = true;

    // id 的获取
    let id = localStorage.getItem("id")||this.$route.query.id


    let category = await GetCategoryAll({businessid:1});
    if (category.code == 200) {
      category.data.forEach((v, i) => {
        if (v.id == id) {
          this.activeKey = i;
        }
      });
      this.typeList = category.data;
    }
    await this.getData(id);
    this.show = false;
    Toast.clear();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async chenge() {
      this.type=0
      Toast.loading({
        duration: 0,
        message: this.$t('edit.Loading'),
        forbidClick: true,
      });
      this.show = true;
     localStorage.setItem("id",this.typeList[this.activeKey].id)
      await this.getData(this.typeList[this.activeKey].id);
      Toast.clear();
      this.show = false;
    },
    chenge2() {
    },

    async getData(id) {
      let categoryInfo = await GetProductByCategory({
        categoryId: id,
      });
      if (categoryInfo.code == 200) {
        this.goodsType = categoryInfo.data;
        if (this.goodsType[this.type]) {
          this.goodsType[this.type].items.forEach((v) => {
            v.image = "http://8.129.38.70:8007" + v.image;
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsType {
  padding-top: 5vh;
}
::v-deep {
  .van-sidebar {
    height: 95vh;
    background-color: #f7f8fa;
  }
  .van-sidebar-item--select,
  .van-sidebar-item--select:active {
    background-color: rgb(203, 203, 203);
  }
}
.content {
  ::v-deep {
    .van-sidebar {
      background-color: rgb(252, 252, 252);
    }
    .van-sidebar-item--select,
    .van-sidebar-item--select:active {
      background-color: rgb(233, 233, 233);
    }
  }

  position: absolute;
  top: 5vh;
  right: 0;
  width: 336px;
  height: 95vh;
}
.content2 {
  position: absolute;
  top: 5vh;
  right: 0;
  width: 256px;background-color: #fff;  
  height: 95vh;
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 45%;
      height: 160px;
      text-align: center;
      img {
        width: 100%;
        height: 120px;
      }
    }
    li:nth-child(2n) {
      margin-left:10%;
    }
  }
}
</style>