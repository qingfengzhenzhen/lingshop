<template>
  <div class="box">
    <div class="bgc">
      <!-- 搜索框 -->
      <div class="search">
        <van-icon name="search" /><input
          type="text"
          :value="inpVal"
          :placeholder="$t('add.Search commodity name')"
          @keydown="enter"
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
          <van-swipe-item
            v-for="v in bannerList"
            :key="v.id"
            @click="goRouter(v.linkUrl)"
            ><img :src="v.imageUrl" v-error alt=""
          /></van-swipe-item>
          <van-swipe-item v-if="!bannerList[0]"
            ><img :src="error" alt=""
          /></van-swipe-item>
        </van-swipe>
      </div>
      <!-- 功能列表 -->
      <img @click="$router.push({path:'/login',query:{
        is:1
      }})" style="width:100%;margin:10px 0" :src="info.register" alt="">

      <!-- <div class="funList">
        <div
          v-for="(v, i) in funArr"
          @click="goRouter(v.linkUrl)"
          :key="i"
          class="fun"
        >
          <div
            class="icon"
            :style="{
              backgroundImage: `url(${v.icon || error})`,
              backgroundSize: '100% 100%',
            }"
          ></div>
          <p>
            {{ v.name }}
          </p>
        </div>
      </div> -->
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
    <!-- 客户见证 -->
    <div class="bgc">
      <div
        class="title"
        @click="
          () => {
            $router.push('/witnessList');
          }
        "
      >
        {{ $t("home.Customer Testimonials") }}
        <div></div>
        <van-icon name="arrow" />
      </div>
      <div class="witnessList">
        <ul>
          <li
            v-for="(v, i) in witnessList"
            :key="i"
            :style="{
              backgroundImage: `url(${v.imageUrl || error})`,
              backgroundSize: '100% 100%',
            }"
            @click="
              () => {
                $router.push({ path: '/category', query: { id: v.id } });
              }
            "
          >
            <div class="emblem">&nbsp;NEW</div>
            <p class="van-ellipsis">{{ v.title }}</p>
            <div class="foolt">
              <span>{{$t('add.Click to enter')}}</span>
              <div></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
     <div class="bgc">
      <div
        class="introduce"
        @click="
          show2 = true;
          $refs.vdo.src = info.video;
        "
      >
        <img :src="info.vBgImage" alt="" />
      </div>
      <div class="title">
        {{ $t("home.Pay attention to us") }}
        <div></div>
      </div>
      <!-- 关注列表 -->
      <div class="funList">
        <div v-for="(v, i) in interestArr" :key="i" class="fun">
          <div class="icon2">
            <van-image
              @click="goRouter(v.link)"
              cover
              :src="v.logo"
              :alt="v.alt"
            />
          </div>
        </div>
      </div>
      <div class="title">
        {{ $t("home.contact us") }}
        <div></div>
      </div>
      <div
        class="my"
        :style="{
          backgroundImage: `url(${info.bgImage || error})`,
          backgroundSize: '100% 100%',
        }"
      >
        <div class="children">
          <span> {{$t("user.name of the company")}}: </span>
          <span>
            {{ info.companyName }}
          </span>
        </div>
        <div class="children">
          <span> {{$t("user.Company mailbox")}}: </span>
          <span>
            {{ info.email }}
          </span>
        </div>
        <div class="children">
          <span> {{$t("user.contact number")}}: </span>
          <span>
            {{ info.phone }}
          </span>
        </div>
        <div class="children">
          <span> {{$t("user.contacts")}}: </span>
          <span>
            {{ info.person }}
          </span>
        </div>
      </div>
      
    </div>
    <van-overlay :show="show" />
    <van-overlay :show="show2" @click="Unshow">
      <div class="wrapper">
        <video ref="vdo" controls autoplay></video>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  getPay,
  getbanner,
  GetPlugins,
  GetNewList,
  GetCategory,
} from "@/api/shop";
import { GetCompanyInfo } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "home",
  data() {
    return {
      show2: false,
      show: false,
      funArr: [], // 功能列表
      inpVal: "", //搜索值
      interestArr: [], //关注列表
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
          imageUrl:
            "https://img2.baidu.com/it/u=2512074596,339734779&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          linkUrl: "",
          sort: 1,
          startTime: null,
          status: 1,
          type: 1,
          upEmpId: 1,
        },
      ],
      error:
        "https://img2.baidu.com/it/u=2512074596,339734779&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
      info: {
        id: 2,
        companyName: "凌达",
        person: "Vivian Deng",
        phone: "15899880301",
        address: null,
        email: "sales1@lindatrans.com",
        bgImage: null,
        vBgImage: '',
        video: null,
      },
    };
  },
  async created() {
    Toast.loading({
      duration: 0,
      message: this.$t('edit.Loading'),
      forbidClick: true,
    });
    this.show = true;
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
    // 轮播图
    let banner = await getbanner({
      categoryId: 0,
    });

    if (res.code == 200) {
      res.data.forEach((v) => {
        v.image = window.$http + v.image;
      });
      this.shopList = res.data;
    }
    if (banner.code == 200) {
      banner.data.forEach((v) => {
        v.imageUrl = window.$http + v.imageUrl;
      });
      this.bannerList = banner.data;
    }
    // 热门数据

    let newList = await GetNewList({
      CategoryId: 4,
      pageIndex: 1,
      pageSize: 4,
    });

    if (newList.code == 200) {
      this.witnessList = newList.data.filter((v) => {
        if (v.imageUrl) {
          v.imageUrl = window.$http + v.imageUrl;
        }
        if (v.status) {
          return true;
        }
      });
    }

    // 关注我们
    let plugins = await GetPlugins();
    if (plugins.code == 200) {
      plugins.data.forEach((v) => {
        v.logo = window.$http + v.logo;
      });
      this.interestArr = plugins.data;
    }

    // 获取功能列表
    let a = await GetCompanyInfo();
    if (a.code == 200) {
      this.info = a.data;
      this.info.bgImage = window.$http + this.info.bgImage;
      this.info.vBgImage = window.$http + this.info.vBgImage;
      this.info.register = window.$http + this.info.registerImage;
      this.info.video = window.$http + this.info.video;
    }
    // 图标
    // let category = await GetCategory({
    //   parentId: 0,
    //   PageIndex: 1,
    //   PageSize: 4,
    // });
    // if (category.code == 200) {
    //   category.data.forEach((v) => {
    //     v.icon = window.$http + v.icon;
    //   });
    //   this.funArr = category.data;
    // }
    this.$refs.vdo.pause();
    Toast.clear();
    this.show = false;
  },
  methods: {
    Unshow() {
      this.show2 = false;
      this.$refs.vdo.pause();
    },
    onChange(index) {
      console.log(index);
    },
    goPay(id) {
      this.$router.push({
        path: "/pay",
        query: {
          id,
        },
      });
    },
    goRouter(to) {
      if (to) {
        window.location.href = to;
      }
    },
    toList() {
      this.$router.push("/paylist");
    },
    enter(e) {
      console.log();
      if (e.keyCode == 13) {
      this.$router.push("/paylist");
        console.log("搜索");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .van-image {
    height: 100%;
  }
}
.box {
  background-color: #eee;
  margin-bottom: 60px;
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
  border-radius: 10px;
  margin: 10px 0;
  color: #999;
  input {
    border: 0;
    font-size: 18px;
    background-color: rgba(17, 17, 17, 0);
  }
  .van-icon {
    font-size: 25px;
    font-weight: 600;
    margin: 0 10px;
    transform: translate(2px,3px);
  }
}
.swipe {
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    0.3px 0.5px 0.7px #e3eaf8,
    0.8px 1.6px 2px -0.8px #e3eaf8,
    2.1px 4.1px 5.2px -1.7px #e3eaf8,
    5px 10px 12.6px -2.5px #e3eaf8;    
  img {
    width: 100%;
    height: 170px;
    background-color: #eee;

  }
}
.funList {
  display: flex;
  justify-content: space-around;
  margin: 0 -20px;
  .fun {
    margin: 10px 0;
    text-align: center;
    .van-icon {
      font-size: 45px;
    }
    .icon {
      height: 60px;
      width: 60px;
      border-radius: 15px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .icon2 {
      height: 60px;
      width: 60px;
      border-radius: 15px;
      overflow: hidden;
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  height: 170px;
  width: 120px;
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
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-flow: column;
  padding-left: 30px;
  .children {
    display: flex;
    span {
      color: #fff;
      width: 80px;
    }
    span:nth-child(2n) {
      flex: 1;
    }
  }
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
    object-fit: cover;
          min-height: 150px;
          aspect-ratio: 1;
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
        height: 19px;
      }

      .text2 {
        font-size: 14px;
        height: 16px;
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
  }
}
.wrapper {
  width: 70%;
  margin: 300px auto 0;
  video {
    width: 100%;
  }
}
</style>