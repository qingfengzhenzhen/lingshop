<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar :title="title" fixed left-arrow @click-left="onClickLeft" />
    <div style="padding-top: 50px">
      <van-form validate-first @failed="onFailed">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="editData.address"
          name="address"
          placeholder="小区/写字楼/学校"
          :label="$t('address.delivery address')"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="editData.DetailedAddress"
          name="exAddress"
          :label="$t('address.number plate')"
          placeholder="例：8号楼808室"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="editData.name"
          name="name"
          placeholder="您的名字"
          :label="$t('address.name')"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="editData.mobile"
          name="mobile"
          placeholder="配送员联系您的手机号"
          :label="$t('address.cell-phone number')"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <van-field :label="$t('address.Check box group')">
          <template #input>
            <div class="tag">家</div>
            <div class="tag">公司</div>
            <div class="tag">学校</div>
          </template>
        </van-field>
        <div style="margin: 16px auto; width: 80%">
          <van-button round block type="info" native-type="submit"
            >{{$t('address.preserve')}}</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      editData: {
        name: "",
        address: "",
        DetailedAddress: "",
        mobile: "",
        isDefault: 1,
      },
      show: false,
      pattern: /\d{6}/,
      title:this.$t('address.Add delivery address')
    };
  },
  mounted() {
      if(this.data) {
        this.editData=this.data
        this.title=this.$t('address.edit delivery address')
      }
  },
  methods: {
    // 校验不通过时触发
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    onClickLeft() {
      console.log(this.data);
      if (this.data) {
        this.$emit("isShow"); 
      } else {
        this.$router.push("/address" + `?form=${this.$route.query.form}`);
      }
    },
  },
  watch: {
    data() {
      this.editData=this.data
    }
  }
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