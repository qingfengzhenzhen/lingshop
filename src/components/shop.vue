<template>
  <div class="shop">
    <div class="top">
      <van-image
        width="100"
        height="100"
        :src="data[0].sku[type].imagesUrls[0]"
      />
      <div class="title">
        <div class="van-multi-ellipsis--l2 text">
          {{ data[0].sku[type].productName }}
        </div>
        <div class="mon">
          ￥{{ data[0].sku[type].tPrice || data[0].sku[type].price }}
        </div>
      </div>
    </div>
    <div v-for="(item, index) in data" :key="item.id">
      <p class="bay">{{ item.name }}</p>
      <div class="label">
        <div
          :class="{
            red:
              index == 0
                ? type == i
                : index == 1
                ? type1 == i
                : index == 2
                ? type2 == i
                : index == 3
                ? type3 == i
                : fasle,
          }"
          v-for="(v, i) in item.sku"
          :key="v.id"
          @click="isType(i, index, v.specificName)"
        >
          {{ v.specificName }}
        </div>
        <!-- <div>2</div>
      <div>3</div> -->
      </div>
    </div>
    <div class="count">
      <div>{{ $t("pay.count") }}</div>
      <div><van-stepper :max="data[0].sku[type].number" v-model="value" /></div>
    </div>
    <div class="floot" v-if="is">
      {{ $t("add.No address has been added yet") }}，<a
        @click="
          $router.push({ path: '/address', query: { form: $route.fullPath } })
        "
        >{{ $t("add.Go to add") }}</a
      >
    </div>
    <div v-if="this.data[0].sku[this.type].number" class="floor">
      <div v-if="isBtn == 1" class="box1">
        <van-button @click="CreateOrder1(1)" type="danger">{{
          $t("pay.add to cart")
        }}</van-button>
        <van-button @click="CreateOrder1(2)" type="warning">{{
          $t("pay.Immediate purchase")
        }}</van-button>
      </div>
      <div v-if="isBtn == 2" class="box2">
        <van-button @click="CreateOrder1(1)" type="danger">{{
          $t("pay.add to cart")
        }}</van-button>
      </div>
      <div v-if="isBtn == 3" class="box3">
        <van-button @click="CreateOrder1(2)" type="warning">{{
          $t("pay.Immediate purchase")
        }}</van-button>
      </div>
    </div>
    <div v-else class="floor">
      <div class="box2">
        <van-button type="danger">{{
          $t("add.This commodity is temporarily out of stock.")
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { CartChange } from "@/api/shop.js";
import { GetDefaultAddress } from "@/api/address.js";
import { Toast, Notify } from "vant";
export default {
  props: ["isBtn", "data", "businessId"],
  data() {
    return {
      value: 1,
      type: 0,
      is: false,
      name: [],
      name1: [],
      type1: 0,
      type2: 0,
      type3: 0,
    };
  },
  async created() {
    let a = await GetDefaultAddress({});
    this.is = !a.data;
    this.data.forEach((v) => {
      this.name.push(v.name);
      this.name1.push(v.sku[0].specificName);
    });
  },
  methods: {
    async CreateOrder1(is) {
      let a = await GetDefaultAddress({});
      console.log(a);
      if (a.data) {
        this.$store.commit("order/setAddress", a.data);
        // 立即购买
        if (is == 2) {
          // 删除订单加入购物车部分
          if (localStorage.getItem("isDel")) {
            let res1 = await CartChange({
              type: 3,
              ids: localStorage.getItem("isDel"),
            });
            console.log(res1);
            localStorage.removeItem("isDel");
          }
          //
          let res1 = await CartChange({
            type: 1,
            car: {
              skuId: this.data[0].sku[this.type].id,
              productId: this.data[0].sku[this.type].productId,
              numbers: this.value,
              businessId: this.businessId,
            },
            isNew: true,
          });
          let nameall = "";
          this.name.forEach((v, i) => {
            if (this.name.length - 1 == i) {
              nameall += `${v}:${this.name1[i]}`;
            } else {
              nameall += `${v}:${this.name1[i]},`;
            }
          });
          if (res1.code == 200) {
            this.$router.push("/submit");
            localStorage.removeItem("isDel");
            localStorage.setItem("isDel", res1.data.id);

            this.$store.commit("order/setPay", [
              {
                mount: this.value,
                id: res1.data.id,
                title: this.data[0].sku[this.type].productName,
                // color: this.data[0].sku[this.type].specificName,
                money:
                  this.data[0].sku[this.type].tPrice ||
                  this.data[0].sku[this.type].price,
                src: this.data[0].sku[this.type].imagesUrls[0],
                // name: this.data[0].name,
                name: nameall,
              },
            ]);
            console.log(this.$store.state.order);
          }
        } else {
          // 加入购物车
          let res = await CartChange({
            type: 1,
            car: {
              skuId: this.data[0].sku[this.type].id,
              productId: this.data[0].sku[this.type].productId,
              numbers: this.value,
              businessId: this.businessId,
            },
          });
          console.log(res);
          if (res.code == 200) {
            Toast.success(this.$t("add.Shopping cart added successfully"));
          }
        }
      } else if (a.code == 401) {
        Toast.fail("请先登录");
      } else {
        Toast.fail(
          this.$t(
            "add.There is no default address Please go to the address management page to add an address first"
          )
        );
      }
    },
    isType(i, index, name) {
      if (index == 0) {
        if (i != this.type) {
          this.type = i;
        }
      } else if (index == 1) {
        if (i != this.type1) {
          this.type1 = i;
        }
      } else if (index2 == 1) {
        if (i != this.type2) {
          this.type2 = i;
        }
      } else {
        if (i != this.type3) {
          this.type3 = i;
        }
      }
      this.name1[index] = name;
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
  .van-stepper__input {
    width: 50px;
  }
   .van-image__img{
    object-fit: cover;
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
    margin: 5px 0 0 10px;
    .text {
      font-size: 20px;
      height: 55px;
      margin-bottom: 23px;
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
.floot {
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 20;
  a {
    color: red;
  }
}
</style>