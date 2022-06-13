<template>
  <div class="user">
    <div class="top">
      <div class="title">{{$t("user.PersonalCenter")}}</div>
      <div class="box">
        <div class="name">
          <van-image
            round
            width="60px"
            height="60px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span v-if="userInfo">{{ userInfo.name }}</span>
          <span v-else @click="login()">{{$t("user.goLogin")}}</span>
        </div>
        <ul>
          <li v-for="(v, i) in userList" :key="i">
            <van-icon v-if="v.icon" :name="v.icon" /> 
            <div v-else :class="v.img">

            </div>
            <!-- <img v-else style="    transform: scale(0.3);
    filter: grayscale(1);" src="../../assets/iconfbook.png" alt=""> -->
            &nbsp;{{ v.value }}
          </li>
        </ul>
      </div>
    </div>
    <div class="box" style="margin-top: 80px">
      <div
        class="funcList"
        @click="to(v.url)"
        v-for="(v, i) in funList"
        :key="i"
      >
        <List :iconName="v.icon">
          {{ v.text }}
        </List>
      </div>
    </div>
    <div class="box">
      <div
        class="funcList"
        @click="to(v.url)"
        v-for="(v, i) in funList2"
        :key="i"
      >
        <List :iconName="v.icon">
          {{ v.text }}
        </List>
      </div>
    </div>
    <div class="box">
       <div
        class="funcList"
        @click="show=true"
      >
      <!--  切换语言 -->
        <List iconName="exchange">
          {{ $t('user.changeLang') }}
        </List>
      </div>
    </div>
  <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
import List from "@/components/list.vue";
import { Dialog, Toast } from "vant";
export default {
  components: {
    List,
  },
  data() {
    return {
      userList: [],
      funList: [
        {
          icon: "column",
          text: this.$t("user.editData"),
        },
        {
          icon: "map-marked",
          text: this.$t("user.Address management"),
          url: "/address",
        },
        
      ],
      funList2: [
        {
          icon: "balance-list",
          text: this.$t("user.purchase order"),
          url: "/order",
        },
        {
          icon: "friends",
          text: "编辑资料",
        },
        {
          icon: "friends",
          text: this.$t("user.log out"),
          url: "out",
        },
      ],
      userInfo: null,
      show: false,
      actions: [{ name: '简体中文' }, { name: '繁体中文' }],
    };
  },
  computed: {},
  // 初始化数据
  created() {
    this.get();
  },
  methods: {
    to(v) {
      // 退出按钮不是跳转
      if (v == "out") {
        if (localStorage.getItem("tk")) {
          Dialog.confirm({
            title: "提示",
            message: "您确定要退出登录吗？",
          })
            .then(() => {
              // on confirm
              Toast.success("退出成功");
              localStorage.clear("tk");
              this.$store.commit("user/setData", null);
              this.get();
            })
            .catch(() => {
              // on cancel
            });
        }else{
              Toast.fail("请先去登录");
          
        }
      } else {
        // 其他的按钮直接跳转
        this.$router.push(v + "?form=user");
      }
    },
    // 登录按钮
    login() {
      this.$router.push("/login");
    },
    // 数据初始化
    get() {
      this.userInfo = this.$store.state.user.data;
      this.userList = [
        {
          icon: "info-o",
          value: this.userInfo ? this.userInfo.id || "--" : "--",
        },
        {
          icon: "phone-circle-o",
          value: this.userInfo ? this.userInfo.phone || "--" : "--",
        },
        {
          icon: "comment",
          value: this.userInfo ? this.userInfo.shopId || "--" : "--",
        },
        {
          img: "fbook",
          value: this.userInfo ? this.userInfo.ip || "--" : "--",
        },
      ];
      console.log(this.userInfo);
    },
    
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if(item.name =='简体中文') {
          this.$i18n.locale = 'zh';
          localStorage.setItem('lang','zh')
          this.$router.go(0)
        }else {
          this.$i18n.locale = 'tw';
          localStorage.setItem('lang','tw')
          this.$router.go(0)
        }
        this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.user {
  background-color: #cbdcff;
  height: 100vh;
}
.title {
  color: #fff;
}
.top {
  background-color: #0580ff;
  height: 170px;
  border-radius: 0 0 10px 10px;
  .title {
    text-align: center;
    font-size: 18px;
    padding: 10px 0 20px;
  }
}
.box {
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
  margin: 10px;
  .name {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    span {
      font-size: 20px;
      margin-left: 15px;
      font-weight: 600;
    }
  }
  .funcList:nth-child(n + 2) {
    // border-top: 1px #eee solid;
    padding-top: 20px;
  }
}
ul {
  overflow: hidden;
  li {
    float: left;
    width: 49%;
    margin: 10px 0;
  }
  li:nth-child(2n-1) {
    margin-right: 2%;
  }
}
.fbook {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url("@/assets/iconfbook.png");
  background-size: 100% 100%;
  filter: grayscale(1);
}
</style>