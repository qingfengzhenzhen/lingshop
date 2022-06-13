<template>
  <div class="pay">
    <van-nav-bar :title="$t('pay.Product details')" fixed left-arrow @click-left="onClickLeft" />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item><img src="@/assets/pay/111.jpg" alt="" /></van-swipe-item>
      <van-swipe-item><img src="@/assets/pay/111.jpg" alt="" /></van-swipe-item>
      <van-swipe-item><img src="@/assets/pay/111.jpg" alt="" /></van-swipe-item>
      <van-swipe-item><img src="@/assets/pay/111.jpg" alt="" /></van-swipe-item>
    </van-swipe>
    <div class="box">
      <h2>商品名称</h2>
      <div class="info">
        商品的信息商品的信息商品的信息商品的信息商品的信息商品的信息商品的信息
      </div>
      <div class="money">
        <span>￥148.00</span>
        <s>￥148.00</s>
      </div>
      <div class="footer">
        <div>{{$t('pay.check')}}：蓝色/白色</div>
        <div @click="isShow(1)">选择更多</div>
      </div>
    </div>
    <div class="text">{{$t('pay.Product details')}}</div>
    <div>
      <div class="key"><span>原产地: </span>111</div>
      <div class="key"><span>重量: </span>111</div>
      <div class="key"><span>商品用法: </span>111</div>
    </div>



    <div class="floor">
      <div class="box2">
      <van-button type="danger" @click="isShow(2)">{{$t('pay.add to cart')}}</van-button>
      <van-button  type="warning" @click="isShow(3)">{{$t('pay.Immediate purchase')}}</van-button>
      </div>
    </div>

    <!-- 购物车弹出层 -->
    <van-popup v-model="show" closeable round position="bottom" :style="{ height: '60%' }" >
      <shop :isBtn="is" >
      </shop>
    </van-popup>

  </div>

</template>

<script>
import shop from '@/components/shop.vue'
export default {
  components:{
    shop
  },
  data() {
    return {
      show:false,
      is:1
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    isShow(v) {
      this.$router.go(1)
      this.is = v
      this.show=true
    }
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
  .van-button--danger,.van-button--warning{
    width: 140px;
    height: 30px;
  }
}
.pay {
  padding-top: 5vh;
  background-color: #f7f7f7;
  min-height: 95vh;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  height: 400px;
  text-align: center;
  background-color: #39a9ed;
  display: inline-block;
}
.my-swipe img {
  width: 100%;
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
      flex:1
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
.floor{
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