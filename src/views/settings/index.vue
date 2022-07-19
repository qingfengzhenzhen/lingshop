<template>
  <div class="settings">
    <!-- 标题 -->
    <van-nav-bar :title="title" fixed left-arrow @click-left="onClickLeft" />
    <br>
    <br>
    <br>
    <van-field name="slider" label="亮度">
  <template #input>
    <van-slider v-model="value" @change="onChange" :min="1000" :max="2000"/>
  </template>
</van-field>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return{
        title:this.$t('add.set up'),
        value: 1000,
    }
  },
  methods:{
    onClickLeft() {
        this.$router.back()
    },onChange(value) {
      Toast('当前值：' + value);
      document.querySelector("html").style=`filter: brightness(${1000/value})`
    },
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
}
.settings {
  height: 100vh;
  background-color: #eee;
}

</style>