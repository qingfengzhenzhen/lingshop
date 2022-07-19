<template>
  <div class="submit">
    <van-nav-bar
      :title="$t('submit.submit order')"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 收货地址 -->
    <div @click="toPush()" class="box">
      <div style="flex: 1">
        <span class="name" style="height: 25px">{{ addressInfo.signer }}</span>
        <span class="mobile">{{ addressInfo.phone }}</span>
        <div class="text">
          <div>
            <div class="btn" v-if="addressInfo.is_default">
              {{ $t("submit.default") }}
            </div>
            <div v-else></div>
          </div>
          <div>
            <p class="van-ellipsis">
              {{
                addressInfo.countryName +
                addressInfo.proviceName +
                addressInfo.cityName +
                addressInfo.areaName
              }}
            </p>
            <p class="van-ellipsis">{{ addressInfo.address }}</p>
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
          <div style="flex: 1">
            <div class="img" v-for="v in list" :key="v.id">
              <van-image :src="v.src" />
            </div>
          </div>

          <div @click="isExpanded()" class="details">
            {{ $t('add.Expand size')+count+$t('add.piece') }}<van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="content2">
          <div class="list" v-for="v2 in list" :key="v2.id">
            <div class="img">
              <van-image :src="v2.src" />
            </div>
            <div class="data">
              <div class="box1">
                <span>{{ v2.title }}</span>
                <span style="float: right">￥{{ v2.money }}</span>
              </div>
              <div class="box2">
                <span>{{ v2.name }}:{{ v2.color }}</span
                ><span style="float: right"
                  ><van-icon name="cross" />{{ v2.mount }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <span style="color: #999">{{ $t('add.A total of')+count+$t("add.items goods")+","+$t("add.sum of money") }}：</span
          ><span style="color: red; flex: 1">￥{{ allMon }}</span>
        </div>
        <div style="text-align: right; padding: 0 10px 10px 0">
          <span @click="isExpanded()">{{$t('add.pack up')}}<van-icon name="arrow-up" /></span>
        </div>
      </div>
      <div class="floor">
        <div>
          <span> {{ $t("submit.transportation expenses") }} </span>
          <span> {{ $t("submit.freight free") }} </span>
        </div>
        <div>
          <span> {{ $t("submit.coupon") }} </span>
          <span> {{ $t("submit.No coupons yet") }} </span>
        </div>
        <div>
          <span> {{ $t("submit.Subtotal Amount (Yuan)") }} </span>
          <span style="color: red"> ￥{{ allMon }} </span>
        </div>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="floor pay">
      <div>
        <span> {{ $t("submit.mode of payment") }} </span>
        <span> {{ $t("submit.Online payment") }} </span>
      </div>
      <div>
        <span> {{ $t("submit.Order remarks") }} </span>
        <span style="color: #888">
          <van-field
            v-model="input"
            rows="1"
            autosize
            type="textarea"
            :placeholder="$t('submit.Please enter comments')"
          />
        </span>
      </div>
    </div>
    <!-- 提交 -->
    <div class="submitBtn">
      <div>
        {{ $t("submit.amount payable") }}:<span
          style="font-size: 16px; color: red"
          >￥{{ allMon }}</span
        >
      </div>
      <van-button type="warning" @click="submit">{{
        $t("submit.submit order")
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { CreateOrder } from "@/api/shop";
import { Toast, Notify } from "vant";
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
          //
          name: "颜色",
          src: "11",
        },
      ],
      addressInfo: {
        addFree: 0,
        addType: 0,
        address: "10086号",
        area: 5719,
        areaName: "美国",
        city: 5718,
        cityName: "美国",
        countryId: 1,
        countryName: "美国",
        createTime: "2022-06-15 11:49:48",
        id: 87,
        is_default: true,
        memberId: 21532,
        phone: "12312",
        provice: 5717,
        proviceName: "美国",
        signer: "123",
      },

      // 件数
      count: 0,
      // 总金额
      allMon: 0,
      // 备注
      input: "",
    };
  },
  async created() {
    if (!this.$store.state.order.pay) {
      //
      Toast.fail(this.$t("add.Order data loss"));
      this.$router.back();
      return;
    }
    this.addressInfo = this.$store.state.order.address;
    this.list = this.$store.state.order.pay;
    this.list.forEach((v) => {
      // 件数
      this.count += v.mount;
      // 金额
      this.allMon += Number(v.money) * v.mount;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    isExpanded() {
      this.is == 1 ? (this.is = 0) : (this.is = 1);
    },
    toPush() {
      this.$router.push("/selectAddress");
    },

    // 提交订单
    async submit() {
      let arr = [];
      this.list.forEach((v) => {
        arr.push(v.id);
      });
      let res2 = await CreateOrder({
        cartIds: arr,
        addressId: this.addressInfo.id,
        remark: this.input,
      });
      if (res2.code == 200) {
        Notify({ type: "success", message: this.$t("add.Order submitted successfully") });
        this.$router.back();
        this.$store.commit("order/setPay", null);
        localStorage.removeItem('isDel')
      }else {
        Notify({ type: "warning", message: this.$t("add.Order submission failed") });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep {
  .van-image {
    width: 100%;
    height: 100%;
  }
  .van-nav-bar__content {
    background-color: #ffffff;
    .van-nav-bar__title,
    .van-icon {
      color: rgb(0, 0, 0);
    }
  }
  .van-image__error,
  .van-image__loading {
    // left: 25px;
  }
  .van-cell {
    padding: 0;
    margin: 0 !important;
  }
}
.content ::v-deep .van-image__error,
.content ::v-deep .van-image__loading {
  // left: 40px;
  // top: 17px;
}
.submit {
  padding: 5vh 0;
  background-color: #f3f3f3;
  min-height: 90vh;
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
      height: 80px;
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
      align-items: center;padding: 7px 0;
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
.submitBtn {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  & > div:nth-child(1) {
    flex: 1;
    padding-left: 20px;
    line-height: 40px;
    font-size: 10px;
  }
}
</style>