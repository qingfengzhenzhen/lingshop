<template>
  <div class="submit">
    <van-nav-bar :title="$t('submit.submit order')" fixed left-arrow @click-left="onClickLeft" />
    <!-- 收货地址 -->
    <div @click="toPush()" class="box">
      <div style="flex: 1">
        <span class="name">王小明</span>
        <span class="mobile">123123123</span>
        <div class="text">
          <div>
            <div class="btn">{{$t("submit.default")}}</div>
          </div>
          <div>
            <p class="van-ellipsis">深圳市龙华区1231231111111111111111</p>
            <p class="van-ellipsis">深南大道xxxx号</p>
          </div>
        </div>
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="info">
      <div v-if="is">
        <div class="content">
          <div class="img">
            <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div class="img">
            <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div class="img">
            <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div @click="isExpanded()" class="details">
            展开共6件<van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="content2">
          <div class="list" v-for="v2 in list" :key="v2.id">
            <div class="img">
              <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="data">
              <div class="box1">
                <span>{{ v2.title }}</span>
                <span style="float: right">￥{{ v2.money }}</span>
              </div>
              <div class="box2">
                <span>{{$t("submit.color")}}:{{ v2.color }}</span
                ><span style="float: right"
                  ><van-icon name="cross" />{{ v2.mount }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <span style="color: #999">共6件商品，金额：</span
          ><span style="color: red; flex: 1">￥1111</span>
        </div>
        <div style="text-align: right; padding: 0 10px 10px 0">
          <span @click="isExpanded()">收起<van-icon name="arrow-up" /></span>
        </div>
      </div>
      <div class="floor">
        <div>
          <span> {{$t('submit.transportation expenses')}} </span>
          <span> {{$t('submit.freight free')}} </span>
        </div>
        <div>
          <span> {{$t('submit.coupon')}}  </span>
          <span> {{$t('submit.No coupons yet')}}  </span>
        </div>
        <div>
          <span> {{$t('submit.Subtotal Amount (Yuan)')}} </span>
          <span style="color: red"> ￥123123 </span>
        </div>
      </div>
    </div>


    <!-- 支付方式 -->
    <div class="floor pay">
       <div>
          <span> {{$t('submit.mode of payment')}} </span>
          <span> {{$t('submit.Online payment')}} </span>
        </div>
        <div>
          <span> {{$t('submit.Order remarks')}} </span>
          <span style="color:#888"> {{$t('submit.Please enter comments')}}</span>
        </div>
    </div>
    <!-- 提交 -->
    <div class="submitBtn">
      <div>
        {{$t('submit.amount payable')}}:<span style="font-size:16px; color:red">￥123123</span>
      </div>
      <van-button type="warning">{{$t('submit.submit order')}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is: 1,
      list: [
        {
          title: "asdad",
          color: "白色",
          money: "888.00",
          mount: 1,
          id: 1,
        },
        {
          title: "asdad",
          color: "白色",
          money: "888.00",
          mount: 1,
          id: 2,
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push('/order');
    },
    isExpanded() {
      this.is == 1 ? (this.is = 0) : (this.is = 1);
    },
    toPush() {
      this.$router.push('/address'+'?form=submit')
    }
  },
};
</script>

<style lang='scss' scoped>
::v-deep {
  .van-nav-bar__content {
    background-color: #ffffff;
    .van-nav-bar__title,
    .van-icon {
      color: rgb(0, 0, 0);
    }
  }
}
.submit {
  padding-top: 5vh;
  background-color: #f3f3f3;
  min-height: 95vh;
}
.box {
  width: 90%;
  margin: 5% auto;
  background-color: #fff;
  padding: 10px;
  font-weight: 600;
  border-radius: 10px;
  display: flex;
  align-items: center;
  .name {
    font-size: 18px;
    margin-right: 15px;
  }
  .mobile {
    font-size: 16px;
  }
  .text {
    display: flex;
    font-weight: 400;
    font-size: 12px;
    margin: 8px 0;
    justify-items: center;
    .btn {
      padding: 3px 15px;
      background-color: #0277fe;
      margin: 5px 15px 0 0;
      border-radius: 20px;
      color: #fff;
    }
  }
  p {
    color: #666;
  }
  .icon {
    font-size: 30px;
  }
}
.info {
  background-color: #fff;
  border-radius: 10px;
  width: 95%;
  margin: 5% auto;
  .content {
    padding: 20px 10px;
    border-top: 1px #eee solid;
    border-bottom: 1px #eee solid;
    display: flex;
    align-items: center;
    .img {
      width: 80px;
      display: inline-block;
      height: 60px;
      background-color: #333;
      margin-right: 10px;
    }
    .details {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }
  .footer {
    padding: 10px;
    display: flex;
    align-items: center;
    .van-icon {
      font-size: 20px;
      flex: 1;
    }
    .van-button {
      height: 35px;
      padding-left: 30px;
      padding-right: 30px;
      background-color: #f69900;
      border: 0;
    }
  }
  .content2 {
    padding: 10px 10px;
    border-top: 1px #eee solid;
    border-bottom: 1px #eee solid;
    margin-bottom: 10px;
    .list {
      overflow: hidden;
      display: flex;
      align-items: center;
      .data {
        flex: 1;
        margin: 0 5px 0 10px;
      }
      .img {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
      }
      .box1 {
        font-weight: 600;
      }
      .box2 {
        margin-top: 5px;
        color: #999;
        font-size: 10px;
      }
    }

    .list:nth-child(n + 2) {
      border-top: 1px #eee solid;
    }
  }
}
.floor {
  overflow: hidden;
  div {
    margin: 10px;
    display: flex;
    justify-content: space-between;
  }
}
.pay {
  width: 90%;
  margin: 5% auto;
  background-color: #fff;
  padding: 10px;
    border-radius: 10px;
}
.submitBtn{
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  &>div:nth-child(1) {
    flex:1;
    padding-left:20px;
    line-height: 40px;
    font-size: 10px;
  }
}
</style>