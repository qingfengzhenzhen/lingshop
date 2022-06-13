<template>
  <div class="shop">
    <div class="top">
      <van-image
        width="100"
        height="100"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="title">
        <div class="van-multi-ellipsis--l2 text">
          12312312312312321312321321321312111111111111111111111
        </div>
        <div class="mon">￥1111</div>
      </div>
    </div>
    <p class="bay">女装</p>
    <div class="label">
      <div class="red">1</div>
      <div>2</div>
      <div>3</div>
    </div>
    <div class="count">
      <div>{{ $t("pay.count") }}</div>
      <div><van-stepper v-model="value" /></div>
    </div>
    <div class="floor">
      <div v-if="isBtn == 1" class="box1">
        <van-button @click="CreateOrder()" type="danger">{{ $t("pay.add to cart") }}</van-button>
        <van-button @click="CreateOrder()" type="warning">{{
          $t("pay.Immediate purchase")
        }}</van-button>
      </div>
      <div v-if="isBtn == 2" class="box2">
        <van-button type="danger">{{ $t("pay.add to cart") }}</van-button>
      </div>
      <div v-if="isBtn == 3" class="box3">
        <van-button @click="CreateOrder()" type="warning">{{
          $t("pay.Immediate purchase")
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { CreateOrder } from "@/api/shop.js";
export default {
  props: ["isBtn"],
  data() {
    return {
      value: 1,
    };
  },
  methods: {
  async CreateOrder() {
      let res = await CreateOrder({
        cartIds: [0],
        remark: "123",
        addressId: 0,
        payType: 0,
      });
    console.log(res);
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep {
  .box3,
  .box2 {
    .van-button--danger,
    .van-button--warning {
      width: 280px;
      height: 30px;
    }
  }
}
.shop {
  margin: 40px 20px 20px;
}
.top {
  display: flex;
  justify-content: space-between;
  .title {
    width: 70%;
    .text {
      text-align: right;
      font-size: 20px;
      height: 45px;
      margin-bottom: 40px;
      word-wrap: break-word;
    }
    .mon {
      color: red;
    }
  }
}
.bay {
  margin: 20px 0 10px;
}
.label {
  div {
    padding: 2px 12px;
    background-color: #eee;
    margin-right: 8px;
    border-radius: 10px;
    display: inline-block;
  }
  .red {
    background-color: rgb(255, 181, 181);
    color: rgb(255, 81, 81);
  }
}
.count {
  div:nth-child(1) {
    flex: 1;
  }
  display: flex;
  align-content: center;
  margin: 20px 0;
}
.floor {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  .box1,
  .box2,
  .box3 {
    border-radius: 40px;
    overflow: hidden;
    width: 280px;
    margin: 10px auto;
  }
}
</style>