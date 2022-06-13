<template>
  <div class="info">
      <van-nav-bar :title="$t('logistics.Goods information')" fixed left-arrow @click-left="onClickLeft" />
      <div class="box">
          <div>
              <span class="s1">{{$t('logistics.Main number')}}</span>
              <span class="s2">1231231</span>
          </div>
           <div>
              <span class="s1">{{$t('logistics.Branch number')}}</span>
              <span class="s2"></span>
          </div>
           <div>
              <span class="s1">{{$t('logistics.description of goods')}}</span>
              <span class="s2"></span>
          </div>
           <div>
              <span class="s1">{{$t('logistics.Chinese name')}}</span>
              <span class="s2"></span>
          </div>
          <div>
              <span class="s1">{{$t('logistics.creation time')}}</span>
              <span class="s2"></span>
          </div>
      </div>
           <div class="box">
          <div>
              <span class="s1">{{$t('logistics.Number of goods')}}</span>
              <span class="s2"></span>
          </div>
           <div>
              <span class="s1">{{$t('logistics.actual weight')}}</span>
              <span class="s2"></span>
          </div>
           <div>
              <span class="s1">{{$t('logistics.volume')}}</span>
              <span class="s2"></span>
          </div>
           <div>
              <span class="s1">{{$t('logistics.charged weight')}}</span>
              <span class="s2"></span>
          </div>
          <div>
              <span class="s1">计费重量</span>
              <span class="s2"></span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
methods:{
    onClickLeft() {
        this.$router.push('/logistics')
    }
}
}
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
      &>div{
          margin: 10px 0 ;
      }
      .s1 {
          display: inline-block;
          width: 80px;
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