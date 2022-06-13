<template>
  <div class="order">
    <!-- 标题 -->
    <van-nav-bar :title="$t('user.purchase order')" fixed left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active">
      <van-tab :title="$t('order.obligation')">
        <!--未展开 -->
        <div v-for="(v, i) in orderList" :key="i" class="box">
          <div class="Unexpanded">
            <div class="top">
              {{$t("order.order number")}}: {{ v.orderCode }}
              <span style="float: right; color: red">{{$t('order.obligation')}}</span>
            </div>
            <div v-if="v.is">
              <div class="content">
                <div class="img">
                  <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                </div>
                <div class="img">
                  <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                </div>
                <div class="img">
                  <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                </div>
                <div @click="isExpanded(v)" class="details">
                  展开共{{ v.num }}件<van-icon name="arrow" />
                </div>
              </div>
              <div class="footer">
                <van-icon name="delete-o" />
                <van-button round type="info" @click="toPay()">{{$t('order.To pay')}}</van-button>
              </div>
            </div>
            <div v-else>
              <div class="content2">
                <div
                  class="list"
                  v-for="(v2) in v.children"
                  :key="v2.id"
                >
                  <div class="img">
                    <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                  </div>
                  <div class="data">
                    <div class="box1">
                      <span>{{ v2.title }}</span>
                      <span style="float: right">￥{{ v2.money }}</span>
                    </div>
                    <div class="box2">
                      <span>颜色:{{ v2.color }}</span
                      ><span style="float: right"
                        ><van-icon name="cross" />{{ v2.mount }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="key"><span>{{$t('order.consignee')}}: </span>{{ v.name }}</div>
              <div class="key"><span>{{$t('order.contact number')}}: </span>{{ v.mobile }}</div>
              <div class="key"><span>{{$t('order.Transit address')}}: </span>{{ v.address }}</div>
              <div class="footer">
                <span style="color: #999">共{{ v.num }}件商品，金额：</span
                ><span style="color: red; flex: 1">￥{{ v.total }}</span>
                <van-button round type="info" @click="toPay()">{{$t('order.To pay')}}</van-button>
              </div>
              <div style="text-align: right; padding: 0 10px 10px 0">
                <span @click="isExpanded(v)">{{$t('order.pack up')}}<van-icon name="arrow-up" /></span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="$t('order.Already paid')">内容 2</van-tab>
      <van-tab :title="$t('order.To be transported')">内容 3</van-tab>
      <van-tab :title="$t('order.off the stocks')">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      orderList: [
        {
          orderCode: "123123213",
          name: "小明",
          mobile: "1231231",
          address: "深圳市龙华区xxx号",
          num: 6,
          total: "8888.00",
          is: 1,
          children: [
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:1
            },
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:2
            },
          ],
        },
         {
          orderCode: "123123213",
          name: "小明",
          mobile: "1231231",
          address: "深圳市龙华区xxx号",
          num: 6,
          total: "8888.00",
          is: 1,
          children: [
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:1
            },
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:2
            },
          ],
        },
         {
          orderCode: "123123213",
          name: "小明",
          mobile: "1231231",
          address: "深圳市龙华区xxx号",
          num: 6,
          total: "8888.00",
          is: 1,
          children: [
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:1
            },
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:2
            },
          ],
        },
         {
          orderCode: "123123213",
          name: "小明",
          mobile: "1231231",
          address: "深圳市龙华区xxx号",
          num: 6,
          total: "8888.00",
          is: 1,
          children: [
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:1
            },
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:2
            },
          ],
        },
         {
          orderCode: "123123213",
          name: "小明",
          mobile: "1231231",
          address: "深圳市龙华区xxx号",
          num: 6,
          total: "8888.00",
          is: 1,
          children: [
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:1
            },
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:2
            },
          ],
        },
         {
          orderCode: "123123213",
          name: "小明",
          mobile: "1231231",
          address: "深圳市龙华区xxx号",
          num: 6,
          total: "8888.00",
          is: 1,
          children: [
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:1
            },
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:2
            },
          ],
        },
         {
          orderCode: "123123213",
          name: "小明",
          mobile: "1231231",
          address: "深圳市龙华区xxx号",
          num: 6,
          total: "8888.00",
          is: 1,
          children: [
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:1
            },
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:2
            },
          ],
        },
         {
          orderCode: "123123213",
          name: "小明",
          mobile: "1231231",
          address: "深圳市龙华区xxx号",
          num: 6,
          total: "8888.00",
          is: 1,
          children: [
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:1
            },
            {
              title: "asdad",
              color: "白色",
              money: "888.00",
              mount: 1,
              id:2
            },
          ],
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/user");
    },
    isExpanded(v) {
      v.is==1?v.is=0:v.is=1
    },
    toPay() {
      this.$router.push('/submit')
    }
  },
};
</script>

<style scoped lang="scss">
.order {
  background-color: #f3f3f3;
  padding: 45px 0;
  height: 90vh;
}

.box {
  margin: 20px;
  border-radius: 20px;
  background-color: #fff;
  .top {
    padding: 14px;
  }
  .content {
    padding: 20px 10px;
    border-top: 1px #eee solid;
    border-bottom: 1px #eee solid;
    display: flex;
    align-items: center;
    .img {
      width: 80px;
      display: inline-block;
      height: 60px;
      background-color: #333;
      margin-right: 10px;
    }
    .details {
      display: inline-block;
    }
  }
  .footer {
    padding: 10px;
    display: flex;
    align-items: center;
    .van-icon {
      font-size: 20px;
      flex: 1;
    }
    .van-button {
      height: 35px;
      padding-left: 30px;
      padding-right: 30px;
      background-color: #f69900;
      border: 0;
    }
  }
  .content2 {
    padding: 10px 10px;
    border-top: 1px #eee solid;
    border-bottom: 1px #eee solid;
    margin-bottom: 10px;
    .list {
      overflow: hidden;
      display: flex;
      align-items: center;
      .data {
        flex: 1;
        margin: 0 5px 0 10px;
      }
      .img {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
      }
      .box1 {
        font-weight: 600;
      }
      .box2 {
        margin-top: 5px;
        color: #999;
        font-size: 10px;
      }
    }

    .list:nth-child(n + 2) {
      border-top: 1px #eee solid;
    }
  }
  .key {
    padding: 2px 10px;
    span {
      color: #999;
    }
  }
}
::v-deep {
  .van-tabs__content{
  max-height: 90vh;
  overflow: auto;
}
  .van-nav-bar__content {
    background-color: #ffffff;
    .van-nav-bar__title,
    .van-icon {
      color: rgb(0, 0, 0);
    }
  }
}
</style>