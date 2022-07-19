<template>
  <div class="address">
    <!-- 标题 -->
    <van-nav-bar
      :title="$t('user.Address management')"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="add">
      <van-button @click="to()" round style="width: 100%" color="#4480f9">
        {{ $t("address.Add delivery address") }}
      </van-button>
    </div>
    <!-- 地址列表 -->
    <div v-for="(v, i) in addressList" :key="i" class="box">
      <span class="name">{{ v.signer }}</span>
      <span class="mobile">{{ v.phone }}</span>
      <div class="text">
        <p class="van-ellipsis">
          {{ v.countryName + v.proviceName + v.cityName + v.areaName }}
        </p>
        <p class="van-ellipsis">
          {{ v.address }}
        </p>
      </div>
      <div class="footer">
        <div v-if="v.is_default" class="iconDefault">
          <div>
            <van-icon name="success" />
          </div>
          <span>{{ $t("address.Default address") }}</span>
        </div>
        <div v-else @click="change(v.id,i)" class="icon">
          <div></div>
          <span>{{ $t("address.Select this address") }}</span>
        </div>
        <div class="btn">
          <div @click="edit(v)">
            <van-icon name="edit" /> {{ $t("address.edit") }}
          </div>
          <div @click="isdelete(v.id,v.is_default)">
            <van-icon name="delete-o" /> {{ $t("address.delete") }}
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑框 -->
    <van-popup  v-model="show">
      <addressList :data="editData" @isShow="isHide()"></addressList>
    </van-popup>
  </div>
</template>

<script>
import { getAddress, delAddress, SetDefaultAddress } from "@/api/address.js";
import { Dialog, Toast } from "vant";
import addressList from "./add.vue";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    addressList,
  },
  data() {
    return {
      addressList: [
      
      ],
      editData: {
        name: "王小明",
        address: "深圳市龙华区1231231111111111111111",
        DetailedAddress: "深南大道xxxx号",
        mobile: "123123123",
        isDefault: 1,
      },
      show: false,
      pattern: /\d{6}/,
    };
  },
  async created() {
    let a = await getAddress();
    this.addressList = a.data;
    if(this.addressList.length==1) {
      await this.change(this.addressList[0].id,0)
    }
  },
  methods: {
    onClickLeft() {
      // if(this.$route.query.form){
      //   this.$router.push(this.$route.query.form);
      // }else {
        this.$router.back()
      // }
    },
    // 编辑按钮
    edit(v) {
      this.editData = v;
      this.show = true;
    },

    // 校验不通过时触发
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    async change(id,index) {
      await SetDefaultAddress({ id,isDefault:true });
      this.addressList.forEach((v,i)=>{
        if(i==index) {
          v.is_default = true
        }else {
          v.is_default = false
        }
      })
    },
    async isHide() {
      let a = await getAddress();
      this.addressList = a.data;
      this.show = false;
    },
    to() {
      this.$router.push("/addAddress" + `?form=${this.$route.query.form}`);
      // this.$router.back();
    },
    // 删除地址
    isdelete(id,is) {
      Dialog.confirm({
        title: "提示",
        message: this.$t('add.Delete this address?'),
      })
        .then(async () => {
          let a = await delAddress({
            id,
          });
          if (a.code == 200) {
            Toast.success(this.$t("add.Delete succeeded"));
            // 获取新的地址 
            let a = await getAddress();
            this.addressList = a.data;
            // 判断删除是否为默认地址如果为默认就将第一个设置为默认地址
            if(is &&this.addressList[0]) {
                await SetDefaultAddress({ id:this.addressList[0].id,isDefault:true });
                this.addressList[0].is_default = true
            }
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
.van-popup--center {
  width: 100%;
  height: 100%;
}
.address {
  background-color: #f3f3f3;
  // padding: 50px 0;
  min-height: 88.5vh;
}
.add {
  width: 90%;
  margin: 5%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 1000;
}
::v-deep {
  .van-nav-bar__content {
    background-color: #4480f9;
    .van-nav-bar__title,
    .van-icon {
      color: #fff;
    }
  }
}
.box {
  width: 80%;
  margin: 15% auto 0;
  background-color: #fff;
  padding: 20px;
  font-weight: 600;
  border-radius: 10px;

  

  .name {
    font-size: 18px;
    margin-right: 10px;
  }
  .mobile {
    font-size: 16px;
  }
  .text {
    font-weight: 400;
    font-size: 12px;
    margin: 8px 0;
    border-bottom: 1px solid rgb(233, 233, 233);
  }
  p {
    color: #666;
  }
  .footer {
    display: flex;
    margin-top: 15px;
    justify-content: center;
    align-items: center;
    .icon,
    .iconDefault {
      flex: 1;
      display: flex;
      align-items: center;
      div {
        border-radius: 10px;
        margin-right: 8px;
      }
    }
    .icon div {
      display: inline-block;
      height: 20px;
      width: 20px;
      border: 1px #666 solid;
    }
    .iconDefault {
      div {
        border: 0;
        line-height: 26px;
        height: 22px;
        width: 22px;
        color: #fff;
        text-align: center;
        background-image: linear-gradient(-45deg, #8c63fd, #30c7fa);
      }
    }
    .btn {
      display: flex;
      .van-icon {
        font-weight: 600;
        margin-left: 10px;
        font-size: 18px;
      }
    }
  }
}
 .box:nth-child(n+4){
    margin-top:6%
  }

</style>