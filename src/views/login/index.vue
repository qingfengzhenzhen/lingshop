<template>
  <div class="login" scroll="no">
    <van-nav-bar
      :title="iscli ? $t('login.login') : $t('login.register')"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <!-- 昵称 -->
      <van-field
        v-if="!iscli"
        v-model="NickName"
        name="NickName"
        :label="$t('edit.pet name')"
        :placeholder="$t('login.Please enter a') + $t('edit.pet name')"
        :rules="[
          {
            required: true,
            message: $t('login.Please enter a') + $t('edit.pet name'),
          },
        ]"
      />
      <!-- 账号 -->
      <van-field
        v-model="account"
        type="account"
        name="account"
        :label="$t('login.account number')"
        :placeholder="$t('login.Please enter a') + $t('login.account number')"
        :rules="[
          {
            required: true,
            message: $t('login.Please enter a') + $t('login.account number'),
          },
        ]"
      />
      <!-- 密码 -->
      <van-field
        v-model="password"
        name="pwd"
        type="password"
        :label="$t('login.password')"
        :placeholder=" $t('login.password')"
        :rules="[
          {
            required: true,
            pattern,
            message: $t('login.pattern'),
          },
        ]"
      />
      <!-- 国家 -->
      <van-field
        v-if="!iscli"
        v-model="Country"
        name="Country"
        :label="$t('login.country')"
        :placeholder="$t('login.Please enter a') + $t('login.country')"
        :rules="[
          {
            required: true,
            message: $t('login.Please enter a') + $t('login.country'),
          },
        ]"
      />
      <!-- 手机号码 -->
      <van-field
        v-if="!iscli"
        v-model="phone"
        name="Phone"
        :label="$t('edit.mobile phone number')"
        :placeholder="$t('login.Please enter a') + $t('edit.mobile phone number')"
        :rules="[
          {
            required: true,
            message: $t('login.Please enter a') + $t('edit.mobile phone number'),
          },
        ]"
      />
      <!-- 采购需求 -->
      <van-field
        v-if="!iscli"
        v-model="Demand"
        name="Demand"
        :label="$t('login.Purchase')"
        :placeholder="$t('login.Please enter a') + $t('login.Purchase')"
        :rules="[
          {
            required: true,
            message: $t('login.Please enter a') + $t('login.Purchase'),
          },
        ]"
      />
      <!-- 邮箱 -->
      <van-field
        v-if="!iscli"
        v-model="Email"
        name="Email"
        :label="$t('edit.email mailbox')"
        :placeholder="$t('login.Please enter a') + $t('edit.email mailbox')"
        :rules="[
          {
            required: true,
            message: $t('login.Please enter a') + $t('edit.email mailbox'),
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" ref="btn">{{
          iscli ? $t("login.login") : $t("login.register")
        }}</van-button>
      </div>
    </van-form>
    <div class="change">
      <span :class="{ cli: iscli }" @click="change2()">{{
        $t("login.login")
      }}</span>
      |
      <span :class="{ cli: !iscli }" @click="change()">{{
        $t("login.register")
      }}</span>
    </div>
  </div>
</template>

<script>
import { Toast, Notify } from "vant";
import { login, Register } from "@/api/login";
export default {
  data() {
    return {
      nickName: "",
      password: "",
      account: "",
      NickName: "",
      Country: "",
      phone: "",
      Demand: "",
      Email: "",
      iscli: true,
      pattern: /^\S{6,12}$/,
    };
  },
  created() {
    if(this.$route.query.is) {
      this.iscli = false
    }
  },
  methods: {
    // 登录或注册按钮
    async onSubmit(values) {
      Toast.loading({
        duration: 0,
        message: this.$t("edit.Loading"),
        forbidClick: true,
      });
      let data;
      if (this.iscli) {
        // this.$refs.btn.type="info"
        // this.$refs.btn.loadingText="加载中..."
        data = await login(values);
        Toast.clear();
        if (data.code == 414) {
          Notify({
            type: "warning",
            message: this.$t("add.Wrong password or account number"),
          });
          return;
        } else if (data.code == 200) {
          Notify({ type: "success", message: this.$t("add.Landing success") });
        }
      } else {
        data = await Register(values);
        Toast.clear();
        if (data.code == 200) {
          Notify({
            type: "success",
            message: this.$t(
              "add.Successfully registered, and logged in automatically"
            ),
          });
        } else if (data.code == 414) {
          Notify({
            type: "danger",
            message: this.$t("add.Account registered"),
          });
          return;
        }
      }
      localStorage.setItem("tk", data.token || data.data.token);
      localStorage.setItem("info", JSON.stringify(data || data.data));
      this.$store.commit("user/setData", data || data.data);
      if (this.$route.query.always) {
        this.$router.push({ path: this.$route.query.always, replace: true });
      } else {
        this.$router.push({ path: "/home", replace: true });
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    change() {
      if (this.iscli) {
        this.iscli = false;
        this.NickName = "";
        this.password = "";
        this.account = "";
      }
    },
    change2() {
      if (!this.iscli) {
        this.iscli = true;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep {
  .van-nav-bar {
    background-color: #ffffff00;
  }
  .van-nav-bar__content {
    .van-nav-bar__title,
    .van-icon {
      color: rgb(0, 0, 0);
    }
  }
  .van-cell {
    background-color: #ffffff00;
  }
}
.login {
  padding-top: 10vh;
  height: 90vh;
  background-image: url(@/assets/loginbg.jpeg);
  background-size: 100%;
}

.change {
  margin: 0 0 0 300px;
  span.cli {
    color: red;
  }
}
</style>