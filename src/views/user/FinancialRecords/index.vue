<template>
  <div class="info">
    <van-nav-bar title="财务记录" fixed left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div v-for="v,i in list" :key="i">
        <span class="s1">{{v.text}}</span>
        <span class="s2">{{v.money}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {
                    text:"商品购买",
                    money:120
                },
                  {
                    text:"物流支付",
                    money:200
                },
                  {
                    text:"在线充值",
                    money:50
                }
            ],
        }
    },
  methods: {
    onClickLeft() {
      this.$router.back();
    } ,
  }
};
</script>

<style lang='scss' scoped>


.info {
  background-color: #f4f8fb;
  min-height: 95vh;
  padding-top: 5vh;
  .box {
    margin: 10px;
    padding: 0 10px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 1px rgba(189, 191, 255, 0.591);
    & > div {
      margin: 10px 0;
    }
    div:nth-child(n+2){
        padding-top: 10px;
        border-top:1px solid rgb(219, 219, 219)
    }
    .s1 {
      display: inline-block;
      width: 180px;
    }
    .s2 {
      color: #0053b9;
    }
  }
}

::v-deep {
  .van-nav-bar__content {
    background-color: #ffffff;
  }
}

</style>