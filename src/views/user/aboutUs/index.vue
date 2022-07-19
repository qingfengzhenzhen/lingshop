<template>
  <div class="aboutUs">
    <!-- 标题 -->
    <van-nav-bar :title="title" fixed left-arrow @click-left="onClickLeft" />
    <div class="info">
      <div class="children">
        <span> {{$t("user.name of the company")}}: </span>
        <span>
          {{ info.companyName }}
        </span>
      </div>
      <div class="children">
        <span> {{$t("user.Company mailbox")}}: </span>
        <span>
          {{ info.email }}
        </span>
      </div>
      <div class="children">
        <span> {{$t("user.contact number")}}: </span>
        <span>
          {{ info.phone }}
        </span>
      </div>
      <div class="children">
        <span> {{$t("user.contacts")}}: </span>
        <span>
          {{ info.person }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCompanyInfo } from "@/api/user.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: this.$t("user.About us"),
      info: {
        address: null,
        companyName: "凌达",
        email: "sales1@lindatrans.com",
        id: 2,
        person: "Vivian Deng",
        phone: "15899880301",
      },
    };
  },
  async mounted() {
    let a = await GetCompanyInfo();
    if (a.code == 200) {
      this.info = a.data;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/user");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .van-nav-bar__content {
    background-color: #4480f9;
    .van-nav-bar__title,
    .van-icon {
      color: #fff;
    }
  }
}
.aboutUs{
    padding-top: 5vh;
    min-height: 95vh;
    background-image: url("@/assets/aboutUs.png");
    background-size: 100% 100%;
    .info {
        overflow: hidden;
            margin:  10px ;
            border:1px solid rgb(119, 194, 255);
        .children {
            display: flex;
            span {
                width: 100px;
                padding:10px;
            }
            span:nth-child(2n) {
                flex:1;
            } 
        }
    }
}
</style>