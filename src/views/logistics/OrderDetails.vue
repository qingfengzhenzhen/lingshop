<template>
  <div class="details">
    <van-nav-bar :title="$t('logistics.Order fee')" fixed left-arrow @click-left="onClickLeft" />
    <div class="box">
          <div class="Unexpanded">
            <div class="top">
              {{$t('order.order number')}}: 12313
              <span style="float: right; color: red">待付款</span>
            </div>
            <div>
              <div class="content2">
                <div
                  class="list"
                >
                  <div class="img">
                    <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                  </div>
                  <div class="data">
                    <div class="box1">
                      <span>123123123</span>
                      <span style="float: right">￥1111</span>
                    </div>
                    <div class="box2">
                      <span>{{$t('submit.color')}}:蓝色</span
                      ><span style="float: right"
                        ><van-icon name="cross" />123213</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer">
                  <div style="flex:1"></div>
                <span style="color: #999">共2件商品，{{$t("shopCart.add up to")}}</span
                ><span style="color: red;">￥2222</span>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.push("/logistics");
    },
  },
};
</script>

<style lang='scss' scoped>
.details {
  background-color: #f4f8fb;
  min-height: 95vh;
  padding-top: 5vh;
}

::v-deep {
  .van-nav-bar__content {
    background-color: #ffffff;
    .van-nav-bar__title,
    .van-icon {
      color: rgb(0, 0, 0);
    }
  }
  .van-steps--vertical {
    margin: 10px;
  }
  .van-step--vertical .van-step__circle-container {
    top: 52px;
  }
  .van-step--vertical .van-step__line {
    top: 52px;
  }
}
.box {
  margin: 20px;
  background-color: #fff;
  .top {
    padding: 14px;
  }
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
    }
  }
  .footer {
    padding: 0 10px 20px;
    display: flex;
    align-items: center;
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
</style>