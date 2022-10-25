<template>
  <div class="paylist">
    <van-nav-bar
      :title="$t('pay.Product details')"
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
            path:'/pay',
            query:{
              id:v.id
            }
          })}">
          <div class="b2">
            <van-image width="100" height="100" :src="v.image" />
          </div>
          <div class="b3">
            <div class="top">
              <p class="van-multi-ellipsis--l2">{{ v.name }}</p>
            </div>
            <div class="money">￥{{  v.sku ? v.sku.tPrice || v.sku.price : "" }}</div>
            <br>
            <div class="info">{{ v.expand ? v.expand.shopNumber : 0 }}{{$t('add.pieces have been sold')}}</div>
            <div class="shopping">
              <img src="../../assets/shopIcon.png" alt="" />
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getPay } from "@/api/shop";
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
        console.log(this.list);
        this.page = 0;
        this.refreshing = false;
      }
      this.page = this.page + 1;
      let res = await getPay({
        pageIndex: this.page,
        pageSize: 10,
      });
      if (res.code == 200) {
        res.data.forEach((v) => {
          v.image = window.$http + v.image;
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
  .van-image__error, .van-image__img, .van-image__loading{
    object-fit: cover;
  }
 
  .van-pull-refresh__track{
    min-height: 87vh;
  }
}
.list {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: #fff;
  .b2 {
    border-radius: 10px;
    overflow: hidden;
  }
  .b3 {
    position: relative;
    flex: 1;
    padding-left: 20px;
    .top {
      width: 100%;
      height: 45px;
      font-size: 16px;
    }
    .type {
      color: #888;
      font-size: 12px;
    }
    .money {
      color: red;
      font-weight: 600;
      font-size: 16px;
    }
    .info {
      color: #888;
      font-size: 12px;
    }
    .shopping {
      position: absolute;
      top: 50px;
      right: 2px;
    }
  }
}
</style>