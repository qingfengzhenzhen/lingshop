<template>
  <div class="order">
    <!-- 标题 -->
    <van-nav-bar
      :title="$t('user.purchase order')"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('add.No more')"
          @load="onLoad"
        >
          <van-tab :title="$t('order.obligation')">
            <!--未展开 -->

            <div v-for="(v, i) in orderList" :key="i" class="box">
              <div class="Unexpanded">
                <div class="top">
                  {{ $t("order.order number") }}: {{ v.orderCode }}
                  <span style="float: right; color: red">{{
                    $t("order.obligation")
                  }}</span>
                </div>
                <div v-if="v.is">
                  <div class="content">
                    <div style="flex: 1; ">
                      <div class="img" v-for="v2 in v.children" :key="v2.id">
                        <van-image :src="v2.src" />
                      </div>
                    </div>
                    <div @click="isExpanded(v)" class="details">
                     {{ $t('add.Expand size')+v.num  }} {{$t('add.piece')}}<van-icon name="arrow" />
                    </div>
                  </div>
                  <div class="footer">
                    <van-icon @click="del(v)" name="delete-o" />
                    <van-button round type="info" @click="toPay()">{{
                      $t("order.To pay")
                    }}</van-button>
                  </div>
                </div>
                <div v-else>
                  <div class="content2">
                    <div class="list" v-for="v2 in v.children" :key="v2.id">
                      <div class="img">
                        <van-image :src="v2.src" />
                      </div>
                      <div class="data">
                        <div class="box1">
                          <span>{{ v2.title }}</span>
                          <span style="float: right">￥{{ v2.money }}</span>
                        </div>
                        <div class="box2">
                          <span>{{ v2.type }}:{{ v2.color }}</span
                          ><span style="float: right"
                            ><van-icon name="cross" />{{ v2.mount }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="key">
                    <span>{{ $t("order.consignee") }}: </span>{{ v.name }}
                  </div>
                  <div class="key">
                    <span>{{ $t("order.contact number") }}: </span
                    >{{ v.mobile }}
                  </div>
                  <div class="key">
                    <span>{{ $t("order.Transit address") }}: </span
                    >{{ v.address }}
                  </div>
                  <div class="footer">
                    <span style="color: #999">{{ $t('add.A total of')+v.num+$t("add.items goods")+","+$t("add.sum of money")}}：</span
                    ><span style="color: red; flex: 1">￥{{ v.total }}</span>
                    <van-button round type="info" @click="toPay()">{{
                      $t("order.To pay")
                    }}</van-button>
                  </div>
                  <div style="text-align: right; padding: 0 10px 10px 0">
                    <span @click="isExpanded(v)"
                      >{{ $t("order.pack up") }}<van-icon name="arrow-up"
                    /></span>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab :title="$t('order.Already paid')">内容 2</van-tab>
          <van-tab :title="$t('order.To be transported')">内容 3</van-tab>
          <van-tab :title="$t('order.off the stocks')">内容 4</van-tab>
        </van-list>
      </van-pull-refresh>
    </van-tabs>
  </div>
</template>

<script>
import { GetOrderList, CancelOrder } from "@/api/order.js";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      orderList: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 0,
    };
  },
  async created() {
    await this.onLoad();
  },
  methods: {
    onClickLeft() {
      this.$router.push("/user");
    },
    isExpanded(v) {
      v.is == 1 ? (v.is = 0) : (v.is = 1);
    },
    toPay() {
      // this.$router.push("/submit");
    },
    async del(v) {
      Dialog.confirm({
        title: "提示",
        message: this.$t("add.Delete this order?"),
      })
        .then(async () => {
          let res1 = await CancelOrder({
            code: v.orderCode,
          });
          if (res1.code == 200) {
            Toast.success(this.$t("add.Delete succeeded"));
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.refreshing = true;
            await this.onRefresh();
          }
        })
        .catch(() => {});
    },
    async getData(is) {
      this.page++;
      let res = await GetOrderList({
        PageIndex: this.page,
        PageSize: 10,
      });
      // this.orderList = [];
      if (res.code == 200) {
        res.data.forEach((v) => {
          let num = 0;
          let allMon = 0;
          let children = [];
          v.items[0].items.forEach((v2) => {
            allMon += (v2.price || v2.yPrice) * v2.numbers;
            num += v2.numbers;
            let src = "http://8.129.38.70:8007" + v2.image;
            children.push({
              title: v2.productName,
              color: v2.specificName,
              money: v2.price || v2.yPrice,
              mount: v2.numbers,
              id: v2.id,
              src,
              type: v2.featuresName,
            });
          });

          this.orderList.push({
            orderCode: v.code,
            name: v.signer,
            mobile: v.phone,
            address:
              v.takeAddress.countryName +
              v.takeAddress.proviceName +
              v.takeAddress.cityName +
              v.takeAddress.areaName,
            num: num,
            total: allMon,
            is: 1,
            children,
            id: v.id,
          });
        });
        if (is) {
          let count = res.totalCount;
          this.loading = false;
          if (this.orderList.length >= count) {
            this.finished = true;
          }
        }
      }
    },
    async onLoad() {
      if (this.refreshing) {
        this.orderList = [];
        this.page = 0;
        this.refreshing = false;
      } else {
        this.finished = true;
      }

      await this.getData(1);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style scoped lang="scss">
.order {
  background-color: #f3f3f3;
  // padding: 45px 0;
  height: 95vh;
    padding-top: 5vh;

}

.box {
  margin: 20px;
  border-radius: 20px;
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
      width: 28%;
      display: inline-block;
      height: 70px;
      margin: 2%;
    }
    .details {
      display: inline-block;
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
  .key {
    padding: 2px 10px;
    span {
      color: #999;
    }
  }
}
::v-deep {
  .van-image {
    width: 100%;
    height: 100%;
  }
  .van-tabs__content {
    max-height: 94vh;
    overflow: auto;
  }
  .van-nav-bar__content {
    background-color: #ffffff;
    .van-nav-bar__title,
    .van-icon {
      color: rgb(0, 0, 0);
    }
  }
    .van-image__error, .van-image__img, .van-image__loading{
object-fit: cover;
  }
  .van-image__error,
  .van-image__loading {
    // left: 25px;
  }
  .van-pull-refresh__track {
    min-height: 87vh;
  }
}
.content ::v-deep .van-image__error,
.content ::v-deep .van-image__loading {
  // left: 40px;
  // top: 17px;
}
</style>