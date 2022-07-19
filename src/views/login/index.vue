<template>
  <div class="login" scroll="no">
    <van-nav-bar
      :title="iscli ? $t('login.login') : $t('login.register')"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-if="!iscli"
        v-model="nickName"
        name="nickName"
        :label="$t('login.user name')"
        :placeholder="$t('login.Please enter a') + $t('login.user name')"
        :rules="[{ required: true, message: $t('login.Please enter a') + $t('login.user name') }]"
      />
      <van-field
        v-model="account"
        type="account"
        name="account"
        :label="$t('login.account number')"
        :placeholder="$t('login.Please enter a') + $t('login.account number')"
        :rules="[{ required: true, message: $t('login.Please enter a') + $t('login.account number') }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="pwd"
        :label="$t('login.password')"
        :placeholder="$t('login.Please enter a') + $t('login.password')"
        :rules="[
          {
            required: true,
            pattern,
            message: $t('login.pattern'),
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
      iscli: true,
      pattern: /^\S{6,12}$/,
    };
  },
  methods: {
    // 登录或注册按钮
    async onSubmit(values) {
      Toast.loading({
        duration: 0,
        message: this.$t('edit.Loading'),
        forbidClick: true,
      });
      let data;
      if (this.iscli) {
        // this.$refs.btn.type="info"
        // this.$refs.btn.loadingText="加载中..."
        data = await login(values);
          Toast.clear();
        if (data.code == 414) {
          Notify({ type: "warning", message: this.$t('add.Wrong password or account number')});
          return;
        } else if (data.code == 200) {
          Notify({ type: "success", message: this.$t("add.Landing success") });
        }
      } else {
        data = await Register(values);
        Toast.clear();
        if (data.code == 200) {
          Notify({ type: "success", message: this.$t("add.Successfully registered, and logged in automatically") });
        } else if (data.code == 414) {
          Notify({ type: "danger", message:this.$t("add.Account registered") });
          return
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
        this.nickName = "";
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