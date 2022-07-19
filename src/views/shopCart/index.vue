<template>
  <div class="shopCart">
    <van-nav-bar
      :title="$t('home.shoppingCart')"
      :right-text="$t('edit.Delete selected')"
      @click-right="onClickRight"
      fixed
    />
    <!-- <van-nav-bar title="购物车" fixed left-arrow @click-left="onClickLeft" /> -->

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('add.No more')"
        @load="onLoad"
      >
        <div v-for="(v, i) in list" :key="i" class="list">
          <div class="b1">
            <van-checkbox v-model="v.isCheck" @click="check(v)"></van-checkbox>
          </div>
          <div class="b2">
            <van-image width="80" height="80" :src="v.product.image" />
          </div>
          <div class="b3">
            <div class="top">
              <p class="van-ellipsis">{{ v.product.sku.productName  }}</p>
              <van-icon @click="del(v)" name="delete" />
            </div>
            <div class="type">
              {{ v.product.sku.specificName }}
            </div>
            <div class="money">
              ￥{{ v.product.sku.tPrice || v.product.sku.price }}
            </div>
            <div>
              <van-stepper
                v-model="v.numbers"
                :max="v.product.sku.number"
                @change="check(v)"
              />
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 提交 -->
    <van-submit-bar
      :price="count"
      :label="$t('shopCart.add up to')"
      :button-text="$t('shopCart.Submit order')"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="all()">{{
        $t("shopCart.check all")
      }}</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
// 这个购物车，要不搞个，只要没到未付款 就不算库存 ，在下单的时候计算库存还够不够，只要不下单就减库存
import { GetMyCartProject, CartChange } from "@/api/shop.js";
import { GetDefaultAddress } from "@/api/address.js";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      is: 1,
      list: [],
      count: 0,
      checked: false,

      // 下拉加载
      loading: false,
      finished: false,
      refreshing: false,
      page: 0,

      // 总条数
      allPage: 0,
    };
  },
  async created() {
    // await this.getData();
    // this.onLoad(11);
    // if (this.$store.state.order.pay ||!localStorage.getItem("isDel")) {
    if (localStorage.getItem("isDel")) {
      let res1 = await CartChange({
        type: 3,
        // ids: this.$store.state.order.pay[0].id||localStorage.getItem("isDel"),
        ids:localStorage.getItem("isDel"),
      });
    }
    localStorage.removeItem('isDel')
  },
  methods: {
    // onClickLeft() {
    //   this.$router.go(-1);
    // },
    // 提交订单
    async onSubmit() {
      let arr = [];
      this.list.forEach((v) => {
        if (v.isCheck) {
          arr.push({
            title: v.product.name,
            color: v.product.sku.productName,
            money: v.product.sku.tPrice || v.product.sku.price,
            mount: v.numbers,
            id: v.id,
            //
            name: "类型",
            src: v.product.image,
          });
        }
      });
      if (arr[0]) {
        let a = await GetDefaultAddress({});
        if (a.data) {
          this.$store.commit("order/setAddress", a.data);
          this.$store.commit("order/setPay", arr);
          localStorage.setItem('isDel',"true")
          // this.$store.commit("order/setPay", arr);
          this.$router.push("/submit");
        } else {
          Toast.fail("请先去添加一个地址");
        }
      }
    },
    // 全选按钮
    async all() {
      let ids = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].isCheck != this.checked) {
          this.list[i].isCheck = this.checked;
          ids.push(this.list[i].id);
        }
      }
      ids = ids.join(",");
      await CartChange({
        type: 4,
        ids,
        isCheck: this.checked,
      });
      this.check();
    },
    // 获取购物车数据
    async getData() {
      let a = await GetMyCartProject({
        pageIndex: this.page,
        pageSize: 10,
      });
      console.log(a);
      if (a.code == 200) {
        console.log(a.data);
        a.data.forEach((v) => {
          v.product.image = "http://8.129.38.70:8007" + v.product.image;
        });
        this.allPage = a.totalCount;
        this.list = a.data;
        this.check();
      }
    },
    // 点击是否选择
    async check(value) {
      this.checked = this.list.every((v) => v.isCheck);
      this.count = 0;
      let num = "";
      this.list.forEach((v, i) => {
        if (v.isCheck) {
          num = (v.product.sku.tPrice || v.product.sku.price) * 100;
          this.count += num * v.numbers;
        }
      });
      if (value) {
        await CartChange({
          type: 0,
          ids: value ? value.id + "" : 0,
          setNumber: value ? value.numbers : 0,
        });
        await CartChange({
          type: 4,
          ids: value ? value.id + "" : 0,
          isCheck: value ? value.isCheck : 0,
        });
      }
    },
    // 删除
    del(v) {
      Dialog.confirm({
        title: "提示",
        message: this.$t('add.Delete this address?'),
      })
        .then(async () => {
          let res1 = await CartChange({
            type: 3,
            ids: v.id + "",
          });
          if (res1.code == 200) {
            Toast.success(this.$t("add.Delete succeeded"));
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.onRefresh();
          }
        })
        .catch(() => {});
    },

    // 加载
    async onLoad(v) {
      // if (this.allPage) {
      if (this.refreshing) {
        this.list = [];
        this.page = 1;
        this.refreshing = false;
      } else {
        this.page += 1;
      }
      // 不在下来刷新状态中时
      // if (!this.refreshing) {
      // }

      let a = await GetMyCartProject({
        pageIndex: this.page,
        pageSize: 10,
      });
      if (a.code == 200) {
        a.data.forEach((v) => {
          v.product.image = "http://8.129.38.70:8007" + v.product.image;
        });

        this.list.push(...a.data);
        // if (v) {
        //   this.list.push(...a.data);
        // } else {
        //   this.list.unshift(...a.data);
        // }

        this.check();
        this.allPage = a.totalCount;
        if (this.list.length >= this.allPage) {
          this.finished = true;
        }

        this.loading = false;
      } else {
        this.finished = true;
      }
      // }
      //  else {
      //   this.finished = true;
      //   this.refreshing = false;
      // }
    },
    // 下拉
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.refreshing = true;
      this.onLoad();
    },

    onClickRight() {
      Dialog.confirm({
        title: "提示",
        message: this.$t('edit.Delete selected'),
      })
        .then(async () => {
          let ids = [];
          this.list.forEach((v, i) => {
            if (v.isCheck) {
              ids.push(v.id);
            }
          });
          ids = ids.join(",");
          let res1 = await CartChange({
            type: 3,
            ids,
          });
          if (res1.code == 200) {
            Toast.success(this.$t("add.Delete succeeded"));
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.onRefresh();
          }
        })
        .catch(() => {});
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
  .van-image__error, .van-image__img, .van-image__loading{
    object-fit: cover;
  }
  .van-pull-refresh {
    min-height: 80vh;
  }
  .van-submit-bar {
    bottom: 50px;
  }
  .van-pull-refresh__track {
    min-height: 80vh;
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