<template>
  <div class="logistics">
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="输入快递单号查询包裹信息"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <van-tabs v-model="active">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('add.No more')"
          @load="onLoad"
        >
          <!-- 标签选择 -->
          <van-tab v-for="item,index in tabList" :key="index" :title="item.title">
            <div class="box">
              <div class="top">
                <div>
                  <span class="s1"
                    >{{ $t("logistics.tracking number") }}：</span
                  >
                  <span class="s2">{{ 222 }}</span>
                </div>
                <div>
                  <span class="s1">{{ $t("logistics.creation time") }}：</span>
                  <span class="s1">{{ 222 }}</span>
                </div>
              </div>
              <div class="content">
                <div class="address1">
                  <div>深圳市</div>
                  <div class="text">张小三</div>
                </div>
                <div class="flow">
                  <div class="t1">
                    <van-icon color="#2673c5" size="20" name="arrow" />
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <van-icon color="#2673c5" size="20" name="arrow" />
                  </div>
                  <div class="text" style="color: red">
                    {{ $t("logistics.not sign") }}
                  </div>
                </div>
                <div class="address2">
                  <div>深圳市</div>
                  <div class="text">张小三</div>
                </div>
              </div>
              <div class="footer">
                <van-button
                  type="info"
                  size="mini"
                  to="/OrderDetails"
                  plain
                  color="#888"
                  >{{ $t("logistics.relevant documents") }}</van-button
                >
                <van-button
                  type="info"
                  size="mini"
                  plain
                  color="#888"
                  to="/details"
                  >{{ $t("logistics.Logistics details") }}</van-button
                >
                <van-button
                  type="info"
                  size="mini"
                  plain
                  color="#888"
                  to="/info"
                  >{{ $t("logistics.Goods information") }}</van-button
                >
                <van-button
                  type="info"
                  size="mini"
                  plain
                  color="#888"
                  to="/expense"
                  >{{ $t("logistics.Order fee") }}</van-button
                >
              </div>
            </div>
          </van-tab>
        </van-list>
      </van-pull-refresh>
    </van-tabs>
  </div>
</template>

<script>
import { GetNewList } from "@/api/shop";
export default {
  data() {
    return {
      value: "",
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
      page: 0,
      // tab列表
      tabList:[
        {
          title:this.$t('logistics.Unscheduled')
        },
         {
          title:this.$t('logistics.Arrange')
        },
         {
          title:this.$t('logistics.off the stocks')
        },
         {
          title:this.$t('logistics.all')
        },
      ]
    };
  },
  methods: {
    onSearch() {
      console.log("搜索");
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async onLoad() {
      if (this.refreshing) {
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
        this.loading = false;

        // 完成结束
        this.finished = true;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.search {
  background-color: #0e67c1;
}
.logistics {
  background-color: #f4f8fb;
  max-height: 100vh;
  overflow: hidden;
}
::v-deep {
  .van-search {
    background-color: #ffffff00;
  }
  .van-tabs__content {
    max-height: 84vh;
    min-height: 84vh;
    margin-bottom: 10vh;
    overflow: auto;
  }
  .van-pull-refresh {
    min-height: 80vh;
  }
  .van-search__action {
    color: #fff;
  }
  .van-button--plain.van-button--info {
    border-radius: 8px;
  }
  .van-pull-refresh__track{
    min-height: 80vh;
  }
  
}

.box {
  padding: 8px;
  margin: 10px;
  border-radius: 5px;
  background-color: #fff;
  .top {
    .s1 {
      color: #888;
      font-size: 12px;
    }
    .s2 {
      font-size: 12px;
      color: #2673c5;
    }
    border-bottom: 1px solid #eee;
  }
  .content {
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 10px;
    .flow {
      .t1 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 3px 0 5px;
      }
      .point {
        display: inline-block;
        width: 6px;
        background-color: #2673c5;
        height: 6px;
        border-radius: 10px;
        margin: 0 8px;
      }
    }
    & > div > div {
      margin: 5px 0;
    }
    .text {
      font-size: 12px;
      color: #888;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>