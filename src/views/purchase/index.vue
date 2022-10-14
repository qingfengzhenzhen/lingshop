<template>
  <div class="box">
    <div class="swipe">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        :show-indicators="false"
        indicator-color="white"
      >
        <van-swipe-item
          v-for="v in banner"
          :key="v.id"
          @click="toLink(v.linkUrl)"
          ><img :src="v.imageUrl" :alt="v.alt" v-error
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="bgc" style="backgroundColor:#fff">
      <!-- 轮播图 -->
      <!-- 功能列表 -->
      <div class="funList">
        <div
          v-for="(v, i) in funArr"
          :key="i"
          class="fun"
          @click="
            () => {
              $router.push({path:'/goodsType',query:{
                id:v.id
              }});
            }
          "
        >
          <div class="icon">
            <img :src="v.icon" alt=""  v-error/>
          </div>
          <p>
            {{ v.name }}
          </p>
        </div>
      </div>
    </div>
    <!-- 热门商品 -->
    <div class="bgc">
      <div class="title" @click="toList()">
        {{ $t("home.the most popular commodities") }}
        <div></div>
        <van-icon name="arrow" />
      </div>
      <div class="shopList">
        <ul>
          <li v-for="v in shopList" :key="v.id" @click="goPay(v.id)">
            <div class="article">
              <img v-error :src="v.image" alt="" />
            </div>
            <p class="text1">{{ v.name }}</p>
            <p class="text2">{{ v.descInfo }}</p>
            <div class="shop">
              <span style="display: inline-block; width: 80px">
                <span class="mon"
                  >￥{{ v.sku ? v.sku.tPrice || v.sku.price : "" }}</span
                ><s v-if="v.sku ? v.sku.tPrice : 0"
                  >￥{{ v.sku ? v.sku.price : "" }}</s
                >
              </span>
              <div><img src="../../assets/shopIcon.png" alt="" /></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <van-overlay :show="show" />
  </div>
</template>

<script>
import { getPay, getbanner } from "@/api/shop";
import {  GetCategory } from "@/api/pay";
import { Toast } from "vant";
export default {
  name: "home",
  data() {
    return {
      show: false,
      funArr: [], // 功能列表
      shopList: [
        {
          title: "主标题1111111111111111111111111111",
          title2: "副标题",
          mon: "10$",
          tomon: "9$",
        },
        {
          title: "主标题",
          title2: "副标题",
          mon: "10$",
          tomon: "9$",
        },
        {
          title: "主标题",
          title2: "副标题",
          mon: "10$",
          tomon: "9$",
        },
        {
          title: "主标题",
          title2: "副标题",
          mon: "10$",
          tomon: "9$",
        },
      ], //商品列表
      banner: [
        {
          alt: "qwe",
          categoryId: 6,
          createTime: "2022-06-21 09:51:13",
          empId: 2,
          endTime: null,
          id: 7,
          imageUrl:
            "http://47.107.152.228:8881/Client/banner/2021/10/06/%E5%8D%83%E5%9B%BE_7bea4b58ff2dc52e289b50b4c60847d9_90046_%E6%AF%92%E9%9C%B8%E7%9C%8B%E5%9B%BE.png",
          linkUrl: null,
          sort: 123,
          startTime: "2022-06-01 00:00:00",
          status: 1,
          type: 2,
          upEmpId: 0,
        },
      ],
    };
  },
  async created() {
    Toast.loading({
      duration: 0,
      message: this.$t('edit.Loading'),
      forbidClick: true,
    });
    this.show = true;
    // 热门数据
    let res = await getPay({
      pageIndex: 1,
      pageSize: 4,
      // productName: "string",
      // categoryId: 0,
      // status: 0,
      // applyStatus: "string",
      // isDelete: 0,
      // search: "string",
      // featuresId: 0
    });
    if (res.code == 200) {
      res.data.forEach((v) => {
        if(v.image) {
          v.image = "http://8.129.38.70:8007" + v.image;
        }
      });
      this.shopList = res.data;
    }

    // 获取轮播图
    let bannerList = await getbanner({
      categoryId: 8,
    });
    if (bannerList.code == 200) {
      this.banner = [];
      bannerList.data.forEach((v) => {
        if(v.imageUrl) {
          v.imageUrl = "http://8.129.38.70:8007" + v.imageUrl;
        }
      });
      this.banner.push(...bannerList.data);
    }

    let category = await GetCategory({});
    if (category.code == 200) {
      category.data.forEach((v) => {
        v.icon = "http://8.129.38.70:8007" + v.icon;
      });
      this.funArr = category.data;
    }

    Toast.clear();
    this.show = false;
  },
  methods: {
    toLink(v) {
      if(v) {
        window.location.href = v;
      }
    },
    onChange(index) {
      console.log(index);
    },
    toList() {
      this.$router.push("/paylist");
    },
    // 跳转商品详情
    goPay(id) {
      this.$router.push({
        path: "/pay",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #eee;
  padding-bottom: 50px;
}
.bgc {
  overflow: hidden;
  background-color: #f9f9f9;
  padding: 0 20px;
  margin-bottom: 10px;
}
.swipe {
  overflow: hidden;
  .img {
    width: 100%;
    height: 200px;
    background-color: #eee;
  }
}
.funList {
  display: grid;
  grid: 'myArea myArea myArea myArea';
  grid-template-columns: 25% 25% 25% 25%;
  // justify-content: space-between;
  overflow: hidden;
  // flex-wrap: wrap;
  .fun {
    float: left;
    margin: 10px 0;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
    .icon {
      height: 60px;
      width: 60px;
      border-radius: 15px;
      margin: 0 auto;
      margin-bottom: 10px;
      overflow: hidden;
    }
  }
}
.my-swipe {
  height: 160px;
  img {
    // height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  width: 120px;
  height: 200px;
  text-align: center;
  display: inline-block;
}
.title {
  height: 20px;
  font-size: 20px;
  position: relative;
  padding-left: 10px;
  margin: 15px 0;
  .van-icon {
    position: absolute;
    right: 0;
    font-size: 20px;
    top: 6px;
  }
  div {
    position: absolute;
    left: 0;
    top: 6px;
    height: 15px;
    border-left: 4px blue solid;
  }
}
.my {
  height: 100px;
  background-color: rgb(124, 124, 124);
}
.shopList {
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 47%;
      background-color: #fff;
      margin: 10px 0;
      .article {
        // height: 100px;
        img {
          aspect-ratio: 1;
          width: 100%;
    object-fit: cover;
          min-height: 150px;
        }
      }
      p {
        padding-left: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .text1 {
        font-size: 16px;
        margin: 5px 0;
      }

      .text2 {
        font-size: 14px;
        color: #999;
      }
      .shop {
        margin: 10px 0;
        .mon {
          color: red;
          font-size: 18px;
          margin: 0 4px;
        }
        div {
          display: inline-block;
          vertical-align: bottom;
          margin-left: 50px;
        }
      }
    }
    li:nth-child(2n-1) {
      margin-right: 6%;
    }
  }
}
</style>