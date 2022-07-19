<template>
  <div class="paylist">
    <van-nav-bar
      :title="$t('home.Customer Testimonials')"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
       :finished-text="$t('add.No more')"
        @load="onLoad"
      >
        <div v-for="v in list" :key="v.id" class="list"  @click="()=>{$router.push({
            path:'/category',
            query:{
              id:v.id
            }
          })}">
          <div class="b2" >
            <van-image :src="v.imageUrl" />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { GetNewList } from "@/api/shop";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 0,
    };
  },
  methods: {
    async onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.page = 0;
        this.refreshing = false;
      }
      this.page = this.page + 1;
      let res = await await GetNewList({
      CategoryId: 4,
      pageIndex: this.page,
      pageSize: 10,
    });
      if (res.code == 200) {
        res.data.forEach((v) => {
          v.imageUrl = "http://8.129.38.70:8007" + v.imageUrl;
        });
        let count = res.totalCount;
        this.list.push(...res.data);
        this.loading = false;
        if (this.list.length >= count) {
          this.finished = true;
        }
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.paylist {
  padding-top: 5vh;
}
::v-deep {
  .van-nav-bar__content {
    background-color: #ffffff;
    .van-nav-bar__title,
    .van-icon {
      color: rgb(0, 0, 0);
    }
  }

  .van-pull-refresh__track{
    min-height: 87vh;
  }
  .van-image__error, .van-image__img, .van-image__loading{
object-fit: cover;
  }
}
.list {
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: #fff;
  .b2 {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    height: 150px;
    .van-image{
      width: 100%;
      height: 100%;
    }
  }
}
</style>