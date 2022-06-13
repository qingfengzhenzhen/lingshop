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
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="account"
        type="account"
        name="account"
        :label="$t('login.account number')"
        :placeholder="$t('login.Please enter a') + $t('login.account number')"
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="pwd"
        :label="$t('login.password')"
        :placeholder="$t('login.Please enter a') + $t('login.password')"
        :rules="[
          {
            required: !iscli,
            pattern,
            message: '密码格式为6-12位任意非空字符',
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
import { Toast } from "vant";
import { login, Register } from "@/api/login";
export default {
  data() {
    return {
      nickName: "12321321",
      password: "123123123",
      account: "123123123",
      iscli: true,
      pattern: /^\S{6,12}$/,
    };
  },
  methods: {
    // 登录或注册按钮
    async onSubmit(values) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      let data;
      if (this.iscli) {
        // this.$refs.btn.type="info"
        // this.$refs.btn.loadingText="加载中..."
        data = await login(values);
        if (data.code == 414) {
          Toast.loading({
            message: "加载中...",
            forbidClick: false,
          });
          Toast.fail("密碼或账号錯誤");
          return;
        } else if (data.code == 200) {
          Toast.loading({
            message: "加载中...",
            forbidClick: false,
          });
          Toast.success("登录成功");
        }
      } else {
        data = await Register(values);
        Toast.loading({
          message: "加载中...",
          forbidClick: false,
        });
        Toast.success("注册成功，已登录");
      }
      console.log(data);
      localStorage.setItem("tk", data.data.token);
      this.$store.commit("user/setData", data.data);
      this.$router.push("/home");
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    change() {
      if (this.iscli) {
        this.iscli = false;
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