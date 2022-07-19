<template>
  <div class="address">
    <!-- 标题 -->
    <van-nav-bar
      title="选择地址"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
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
          <div @click="select(v)">
            <van-icon name="success" />  选择该地址
          </div>
        
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getAddress, SetDefaultAddress } from "@/api/address.js";
import { Toast } from "vant";
export default {
  components: {
  },
  data() {
    return {
      addressList: [
        {
          addFree: 0,
          addType: 0,
          address: "10086号",
          area: 84,
          areaName: "山海关区",
          city: 81,
          cityName: "秦皇岛市",
          countryId: 86,
          countryName: "中国",
          createTime: "2022-06-15 09:51:34",
          destinationId: 0,
          id: 78,
          memberId: 21532,
          phone: "12312",
          provice: 39,
          proviceName: "河北省",
          signer: "3123",
        },
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
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  
    select(v) {
        this.$store.commit('order/setAddress',v)
        Toast.success("更改成功")
        this.$router.back() 
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
  padding: 50px 0;
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
  margin: 5% auto;
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
</style>