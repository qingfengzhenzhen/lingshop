<template>
  <div class="details">
    <van-nav-bar :title="$t('logistics.Logistics details')" fixed left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div class="icon"><van-icon name="logistics" /></div>
      <div class="top">
        <div style="margin: 10px 0">
          <span class="s1">承运公司：</span>
          <span class="s2">{{ 222 }}</span>
        </div>
        <div>
          <span class="s1">{{$t('logistics.tracking number')}}：</span>
          <span class="s2">{{ 222 }}</span>
        </div>
      </div>
    </div>
    <div class="box2" style="margin-top: 20px">
      <div class="title">订单跟踪</div>
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang='scss' scoped>
.details {
  background-color: #f4f8fb;
  min-height: 95vh;
  padding-top: 5vh;
  .box {
    background-color: #fff;
    padding: 30px;
    display: flex;
    .icon {
      width: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(255, 86, 86);
      border-radius: 50px;
      ::v-deep .van-icon {
        font-size: 40px;
        padding: 10px;
        color: rgb(255, 86, 86);
        background-color: #fff;
        border-radius: 50px;
      }
    }
    .top {
      height: 70px;
      margin-left: 20px;
      .s1 {
        color: #888;
      }
    }
  }
  .box2 {
    background-color: #fff;
    padding-bottom: 10px;
    .title {
      padding: 20px;
      border-bottom: 1px #eee solid;
    }
  }
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
</style>