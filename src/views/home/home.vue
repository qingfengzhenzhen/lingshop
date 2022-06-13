<template>
  <div class="box">
    <div class="bgc">
      <!-- 搜索框 -->
      <div class="search">
        <van-icon name="search" /><input
          type="text"
          :value="inpVal"
          placeholder="搜索商品名字"
        />
      </div>
      <!-- 轮播图 -->
      <div class="swipe">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          :show-indicators="false"
          indicator-color="white"
        >
          <van-swipe-item v-for="v in bannerList" :key="v.id"
            ><img :src="v.imageUrl" alt=""
          /></van-swipe-item>
        </van-swipe>
      </div>
      <!-- 功能列表 -->
      <div class="funList">
        <div
          v-for="(v, i) in funArr"
          @click="goRouter(v.to)"
          :key="i"
          class="fun"
        >
          <div class="icon">
            <van-icon :name="v.icon" color="#fff" />
          </div>
          <p>
            {{ v.tit }}
          </p>
        </div>
      </div>
    </div>
    <div class="bgc">
      <div class="introduce">
        <img src="@/assets/jieshao.png" alt="" />
      </div>
      <div class="title">
        {{ $t("home.contact us") }}
        <div></div>
      </div>
      <div class="my"></div>
      <div class="title">
        {{ $t("home.Pay attention to us") }}
        <div></div>
      </div>
      <!-- 关注列表 -->
      <div class="funList">
        <div v-for="(v, i) in interestArr" :key="i" class="fun">
          <div class="icon"></div>
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
          <li v-for="(v, i) in shopList" :key="i" @click="goPay()">
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
    <!-- 客户见证 -->
    <div class="bgc">
      <div class="title">
        {{ $t("home.Customer Testimonials") }}
        <div></div>
        <van-icon name="arrow" />
      </div>
      <div class="witnessList">
        <ul>
          <li v-for="(v, i) in witnessList" :key="i">
            <div class="emblem">&nbsp;NEW</div>
            <p>{{ v.title }}</p>
            <div class="foolt">
              <span>点击进入</span>
              <div></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getPay, getbanner, geticon } from "@/api/shop";
export default {
  name: "home",
  data() {
    return {
      funArr: [
        {
          icon: "shopping-cart",
          tit: this.$t("home.purchase"),
          to: "/purchase",
        },
        {
          icon: "logistics",
          tit: this.$t("home.logistics"),
          to: "/logistics",
        },
        {
          icon: "chat-o",
          tit: this.$t("home.customs clearance"),
          to: "",
        },
        {
          icon: "shop",
          tit: this.$t("home.sell"),
          to: "/sell",
        },
      ], // 功能列表
      inpVal: "", //搜索值
      interestArr: [{}, {}, {}], //关注列表
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
      ],
      witnessList: [
        {
          title: "标题",
        },
        {
          title: "标题",
        },
        {
          title: "标题",
        },
        {
          title: "标题",
        },
      ],
      bannerList: [
        {
          alt: null,
          categoryId: 0,
          createTime: "2022-06-11 00:00:00",
          empId: 1,
          endTime: null,
          id: 3,
          imageUrl: "../../assets/error.png",
          linkUrl: "",
          sort: 1,
          startTime: null,
          status: 1,
          type: 1,
          upEmpId: 1,
        },
      ],
    };
  },
  async mounted() {
    let res = await getPay({
      pageIndex: 1,
      pageSize: 10,
      // productName: "string",
      // categoryId: 0,
      // status: 0,
      // applyStatus: "string",
      // isDelete: 0,
      // search: "string",
      // featuresId: 0
    });
    let banner = await getbanner({});
    let icon = await geticon({});
    console.log(icon);
    banner.data.forEach((v) => {
      v.imageUrl = "http://8.129.38.70:8007" + v.imageUrl;
    });
    this.bannerList = banner.data;
    console.log(banner);
    console.log(res);
  },
  created() {
    console.log("初始化");
  },
  methods: {
    onChange(index) {
      console.log(index);
    },
    goPay() {
      this.$router.push("/pay");
    },
    goRouter(to) {
      this.$router.replace(to);
    },
    toList() {
      this.$router.push('/paylist')
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #eee;
}
.bgc {
  overflow: hidden;
  background-color: #f9f9f9;
  padding: 0 20px;
  margin-bottom: 10px;
  .introduce {
    border-radius: 50px;
    overflow: hidden;
    margin: 10px 0;
    img {
      width: 100%;
    }
  }
}
.search {
  height: 40px;
  padding: 5px;
  line-height: 40px;
  border: 1px rgb(215, 215, 215) solid;
  border-radius: 15px;
  margin: 10px 0;
  input {
    border: 0;
    font-size: 18px;
    background-color: rgba(17, 17, 17, 0);
  }
  .van-icon {
    font-size: 25px;
    margin: 0 10px;
  }
}
.swipe {
  overflow: hidden;
  img {
    width: 100%;
    height: 200px;
    background-color: #eee;
  }
}
.funList {
  display: flex;
  justify-content: space-between;
  .fun {
    margin: 10px 0;
    text-align: center;
    .van-icon {
      font-size: 45px;
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
.witnessList {
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 47%;
      height: 100px;
      background-color: rgb(253, 180, 180);
      margin: 10px 0;
      position: relative;
      overflow: hidden;
      .emblem {
        text-align: center;
        position: absolute;
        top: 10px;
        right: -30px;
        font-size: 10px;
        width: 100px;
        background-color: #fff;
        transform: rotateZ(45deg);
      }
      p {
        margin: 10px;
        font-size: 18px;
      }
      .foolt {
        position: absolute;
        bottom: 10px;
        left: 10px;
        span {
          font-size: 10px;
        }
      }
    }
    li:nth-child(2n-1) {
      margin-right: 6%;
    }
    padding-bottom: 50px;
  }
}
</style>