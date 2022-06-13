<template>
  <div class="shopCart">
    <van-nav-bar :title="$t('home.shoppingCart')" fixed />
    <!-- <van-nav-bar title="购物车" fixed left-arrow @click-left="onClickLeft" /> -->

    <div v-for="(v, i) in list" :key="i" class="list">
      <div class="b1">
        <van-checkbox v-model="v.check" @click="check(i)"></van-checkbox>
      </div>
      <div class="b2">
        <van-image
          width="80"
          height="80"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="b3">
        <div class="top">
          <p class="van-ellipsis">{{ v.title }}</p>
          <van-icon name="delete" />
        </div>
        <div class="type">
          {{ v.color }}
        </div>
        <div class="money">￥{{ v.money }}</div>
        <div><van-stepper v-model="v.mount" @change="check()" /></div>
      </div>
    </div>

    <!-- 提交 -->
    <van-submit-bar :price="count" :label="$t('shopCart.add up to')" :button-text="$t('shopCart.Submit order')" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="all()">{{$t("shopCart.check all")}}</van-checkbox>
    </van-submit-bar>
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
          money: "888.05",
          mount: 1,
          id: 1,
          check: false,
        },
        {
          title: "asdad",
          color: "白色",
          money: "888.00",
          mount: 1,
          id: 2,
          check: false,
        },
        {
          title: "asdad",
          color: "白色",
          money: "888.00",
          mount: 1,
          id: 2,
          check: false,
        },
        {
          title: "asdad",
          color: "白色",
          money: "888.00",
          mount: 1,
          id: 2,
          check: false,
        },
        {
          title: "asdad",
          color: "白色",
          money: "888.00",
          mount: 1,
          id: 2,
          check: false,
        },

      ],
      count: 0,
      checked: false,
    };
  },
  methods: {
    // onClickLeft() {
    //   this.$router.go(-1);
    // },
    onSubmit() {},
    // 全选按钮
    all() {
      this.list.forEach((v) => {
        v.check = this.checked;
      });
      this.check();
    },
    // 点击是否选择
    check(index) {
      let is = this.list.every((v) => v.check);
      this.checked = is;
      this.count = 0;
      let num = "";
      this.list.forEach((v, i) => {
        if (v.check) {
          if (/./g.test(v.money)) {
            num = (v.money + "").replaceAll(".", "");
          } else {
            num = v.money + "00";
          }
          this.count += Number(num) * v.mount;
        }
      });
    },
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
  .van-submit-bar {
    bottom: 50px;
  }
}
.shopCart {
  padding-top: 6.2vh;
  padding-bottom: 12vh;
  background-color: #f3f3f3;
  min-height: 81.8vh;
}
.list {
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 0;
  margin-bottom: 5px;
  background-color: #fff;
  .b1 {
    margin: 0 5px;
  }
  .b2 {
    border-radius: 10px;
    overflow: hidden;
  }
  .b3 {
    flex: 1;
    padding-left: 20px;
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 140px;
      }
    }
    .type {
      color: #888;
      font-size: 12px;
    }
    .money {
      color: red;
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>