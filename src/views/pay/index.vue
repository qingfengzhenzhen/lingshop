<template>
  <div class="pay">
    <van-nav-bar
      :title="$t('pay.Product details')"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(v, i) in bannerList" :key="i"
        ><img :src="v" v-error alt=""
      /></van-swipe-item>
    </van-swipe>
    <div class="box">
      <h2>{{ info.name }}</h2>
      <div class="info">
        {{ info.descInfo }}
      </div>
      <div class="money">
        <span
          >￥{{
            typeList[0]
              ? typeList[0].sku[0].tPrice || typeList[0].sku[0].price
              : 0
          }}</span
        >
        <s v-if="typeList[0] ? typeList[0].sku[0].tPrice : 0"
          >￥{{ typeList[0] ? typeList[0].sku[0].price : 0 }}</s
        >
      </div>
      <div class="footer">
        <div>
          {{ $t("pay.check") }}：{{
            typeList[0] ? typeList[0].sku[0].specificName : 0
          }}
        </div>
        <div @click="isShow(1)">选择更多</div>
      </div>
    </div>
    <div class="text">{{ $t("pay.Product details") }}</div>
    <div ref="content" class="category" style="padding: 10px">
      <div class="key"><span>原产地: </span>111</div>
      <div class="key"><span>重量: </span>111</div>
      <div class="key"><span>商品用法: </span>111</div>
    </div>

    <div class="floor">
      <div class="box2">
        <van-button type="danger" @click="isShow(2)">{{
          $t("pay.add to cart")
        }}</van-button>
        <van-button type="warning" @click="isShow(3)">{{
          $t("pay.Immediate purchase")
        }}</van-button>
      </div>
    </div>

    <!-- 购物车弹出层 -->
    <van-popup
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <shop :isBtn="is" :data="typeList" :businessId="businessId"> </shop>
    </van-popup>

    <!-- 遮罩层 -->
    <van-overlay :show="show2" />
  </div>
</template>

<script>
import shop from "@/components/shop.vue";
import { Toast } from "vant";
import { getAttr, getInfo } from "@/api/pay.js";
export default {
  components: {
    shop,
  },
  data() {
    return {
      show: false, //购买组件
      is: 1, //shop中的按钮
      shopid: 0, // 商品id
      typeList: [],
      bannerList: [],
      info: {
        name: "",
      },
      businessId: 0,
      show2: false,
    };
  },
 async created() {
    Toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
    });
    this.show2 = true;

    // 获取数据
    this.shopid = this.$route.query.id;
    await this.getData();

    Toast.clear();
    this.show2 = false;
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    isShow(v) {
      this.is = v;
      this.show = true;
    },
    // 获取页面数据
    async getData() {
      let res = await getAttr({
        id: this.shopid,
      });
      let res2 = await getInfo({
        id: this.shopid,
      });
      console.log(res);
      if (res.code == 200) {
        res.data.forEach((v) => {
          v.sku.forEach((v2) => {
            v2.imagesUrls[0] = window.$http + v2.imagesUrls[0];
            this.bannerList.push(v2.imagesUrls[0]);
          });
        });
        this.typeList = res.data;
      }
      if (res2.code == 200) {
        this.businessId = res2.data.business.id;
        res2.data.image = window.$http + res2.image;
        res2.data.imageList = res2.data.imageList.map((v) => {
          return (v = window.$http + v);
        });
        this.info = res2.data;
        this.$refs.content.innerHTML = this.info.remark;
      }
      console.log(res2);
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep {
  .van-tabs__content {
    max-height: 90vh;
    overflow: auto;
  }

  .van-nav-bar__content {
    background-color: #ffffff;
    .van-nav-bar__title,
    .van-icon {
      color: rgb(0, 0, 0);
    }
  }
  .van-button--danger,
  .van-button--warning {
    width: 140px;
    height: 30px;
  }
  .my-swipe {
  aspect-ratio: 1 / 1;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    max-height: 350px;
    display: inline-block;
  }
}
}
.pay {
  padding: 5vh 0;
  background-color: #f7f7f7;
  min-height: 90vh;
}

.my-swipe img {
  width: 100%;
  // max-height: 350px;
  aspect-ratio: 1;
  min-height: 200px;
  object-fit: cover;
}
.key {
  padding: 2px 10px;
  font-size: 16px;
  span {
    display: inline-block;
    width: 100px;
    color: #999;
  }
}
.box {
  background-color: #fff;
  padding: 0 10px 10px;
  overflow: hidden;
  h2 {
    margin: 10px 0;
  }
  .info {
    color: #888;
  }
  .money {
    margin: 10px 0;
    span {
      font-size: 20px;
      color: red;
      font-weight: 600;
      margin-right: 10px;
    }
    s {
      color: #888;
    }
  }
  .footer {
    display: flex;
    padding: 10px;
    background-color: #f7f7f7;
    div:nth-child(1) {
      flex: 1;
    }
  }
}
.text {
  margin: 10px 0;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #39a9ed;
}
.floor {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  .box2 {
    border-radius: 40px;
    overflow: hidden;
    width: 280px;
    margin: 10px auto;
  }
}
</style>