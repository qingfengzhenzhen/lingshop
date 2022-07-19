<template>
  <div class="category">
    <van-nav-bar
      :title="$t('home.News detail')"
      left-arrow
      @click-left="onClickleft"
      fixed
    />
    <div style="padding-top: 5vh" ref="content"></div>
  </div>
</template>

<script>
import { GetNewInfo } from "@/api/categoty";
export default {
  data() {
    return {
      info: {},
    };
  },
  async mounted() {
    let newInfo = await GetNewInfo({
      id: this.$route.query.id,
    });
    console.log(newInfo);
    if (newInfo.code == 200) {
      this.info = newInfo.data;
      this.$refs.content.innerHTML = this.info.remark;
    }
  },
  methods: {
    onClickleft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.category {
  padding: 10px;
  img {
    min-width: 100%;
    max-width: 100% !important;
  }
}
</style>