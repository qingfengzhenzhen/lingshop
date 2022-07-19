<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      :title="$t('user.editData')"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <div style="padding-top: 50px">
      <!-- 通过 validator 进行函数校验 -->
      <van-form @submit="submit" @failed="onFailed">
        <van-field
          v-model="editData.name"
          name="name"
          :placeholder="$t('edit.pet name')"
          required
          :label="$t('edit.pet name')"
          :rules="[{ required: true, message: $t('login.Please enter a')+$t('edit.pet name') }]"
        />
          <van-field
          v-model="editData.phone"
          name="mobile"
          :placeholder="$t('edit.mobile phone number')"
          required
          :label="$t('address.cell-phone number')"
          :rules="[{ required: true, message: $t('login.Please enter a')+$t('edit.mobile phone number') }]"
        />
   
       <van-field
          v-model="editData.faceBook"
          name="facebook"
        :placeholder="'您在facebook的'+$t('edit.account number')"
          label="FaceBook"
        />
          <van-field
          v-model="editData.twitter"
          name="Twitter"
        :placeholder="'您在Twitter的'+$t('edit.account number')"
          label="Twitter"
        />
          <van-field
          v-model="editData.instagram"
          name="Instagram"
        :placeholder="'您在Instagram的'+$t('edit.account number')"
          label="Instagram"
        />
          <van-field
          v-model="editData.tikTok"
          name="TikTok"
        :placeholder="'您在TikTok的'+$t('edit.account number')"
          label="TikTok"
        />
          <van-field
          v-model="editData.email"
          name="email"
          :placeholder="'您的'+$t('edit.email mailbox')"
          required
          :label="
            $t('edit.email mailbox')"
          :rules="[{ required: true, message: $t('login.Please enter a')+$t('edit.email mailbox') }]"
        />
        <div style="margin: 16px auto; width: 80%">
          <van-button round block type="info" native-type="submit">{{
            $t("address.preserve")
          }}</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {SetUserInfo} from '@/api/user'
import {Dialog, Toast } from "vant";
export default {
  props: ["data"],
  data() {
    return {
      editData: {
        phone: "",
        name: "",
        faceBook:'',
        twitter:'',
        instagram:'',
        tikTok:'',
        email:""
      },
      info:{}
    };
  },
  mounted() {
     this.info =this.$store.state.user.data|| JSON.parse(localStorage.getItem("info"));
      if(this.info) {
        if(this.info.data) {
          this.editData = this.info.data
        }
      }
  },
  methods: {
    // 校验不通过时触发
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    // 校验通过时
    async submit(value) {
        console.log(this.editData);

     let   res =  await SetUserInfo(this.editData)
        if(res.code==200) {
          this.info.data=this.editData
          localStorage.setItem("info" , JSON.stringify(this.info))
          localStorage.setItem("tk" , res.data.token)
        }
        Toast.success(this.$t('add.Modified successfully'))
        this.$router.back()
    },
    onClickLeft() {
      Dialog.confirm({
        title: "提示",
        message: this.$t('add.Cancel editing?'),
      })
        .then(async () => {
          this.$router.back();
        })
        .catch(() => {});
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
  .van-cell {
    background-color: #fff;
  }
  .tag {
    margin: 0 5px;
    padding: 0 20px;
    border-radius: 8px;
    background-color: #eee;
  }
}
</style>