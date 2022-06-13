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
          ><img
            src="http://47.107.152.228:8881/Client/banner/2021/10/06/%E5%8D%83%E5%9B%BE_7bea4b58ff2dc52e289b50b4c60847d9_90046_%E6%AF%92%E9%9C%B8%E7%9C%8B%E5%9B%BE.png"
            alt=""
        /></van-swipe-item>
        <van-swipe-item
          ><img
            src="http://47.107.152.228:8881/Client/banner/2021/10/06/%E5%8D%83%E5%9B%BE_7bea4b58ff2dc52e289b50b4c60847d9_90046_%E6%AF%92%E9%9C%B8%E7%9C%8B%E5%9B%BE.png"
            alt=""
        /></van-swipe-item>
        <van-swipe-item
          ><img
            src="http://47.107.152.228:8881/Client/banner/2021/10/06/%E5%8D%83%E5%9B%BE_7bea4b58ff2dc52e289b50b4c60847d9_90046_%E6%AF%92%E9%9C%B8%E7%9C%8B%E5%9B%BE.png"
            alt=""
        /></van-swipe-item>
        <van-swipe-item
          ><img
            src="http://47.107.152.228:8881/Client/banner/2021/10/06/%E5%8D%83%E5%9B%BE_7bea4b58ff2dc52e289b50b4c60847d9_90046_%E6%AF%92%E9%9C%B8%E7%9C%8B%E5%9B%BE.png"
            alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="bgc">
      <!-- 轮播图 -->
      <!-- 功能列表 -->
      <div class="funList">
        <div v-for="(v, i) in funArr" :key="i" class="fun">
          <div class="icon">
            <van-icon :name="v.icon" color="#1989fa" />
          </div>
          <p>
            {{ v.tit }}
          </p>
        </div>
      </div>
    </div>
    <!-- 热门商品 -->
    <div class="bgc">
      <div class="title">
        {{ $t("home.the most popular commodities") }}
        <div></div>
        <van-icon name="arrow" />
      </div>
      <div class="shopList">
        <ul>
          <li v-for="(v, i) in shopList" :key="i">
            <div class="article">
              <img v-error src="111" alt="" />
            </div>
            <p class="text1">{{ v.title }}</p>
            <p class="text2">{{ v.title2 }}</p>
            <div class="shop">
              <span class="mon">￥{{ v.mon }}</span
              ><s>￥{{ v.tomon }}</s>
              <div><img src="../../assets/shopIcon.png" alt="" /></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      funArr: [
        {
          icon: "chat-o",
          tit: "21321313",
          to: "",
        },
        {
          icon: "chat-o",
          tit: "21321313",
          to: "",
        },
        {
          icon: "chat-o",
          tit: "21321313",
          to: "",
        },
        {
          icon: "chat-o",
          tit: "21321313",
          to: "",
        },
        {
          icon: "chat-o",
          tit: "21321313",
          to: "",
        },
        {
          icon: "chat-o",
          tit: "21321313",
          to: "",
        },
        {
          icon: "chat-o",
          tit: "21321313",
          to: "",
        },
        {
          icon: "chat-o",
          tit: "21321313",
          to: "",
        },
      ], // 功能列表
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
    };
  },
  methods: {
    onChange(index) {
      console.log(index);
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .fun {
    margin: 10px 0;
    text-align: center;
    width: 25%;
    .van-icon {
      font-size: 50px;
    }
    .icon {
      background-color: #9999cc;
      height: 60px;
      width: 60px;
      border-radius: 15px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
}
.my-swipe {
  img {
    height: 100%;
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
  background-color: #39a9ed;
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
          width: 100%;
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