<template>
  <div class="society">
    <div class="list" v-for="(v, i) in list" :key="i">
      <div class="jing">精选</div>
      <p>{{ v.title }}</p>
      <span>{{ v.views }}人已看</span>
      <div class="views">
        点击查看
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "标题",
          views: "1000",
        },{
          title: "标题",
          views: "1000",
        },{
          title: "标题",
          views: "1000",
        },{
          title: "标题",
          views: "1000",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.society {
    padding: 10px 0 50px ;
    }
.list {
    overflow: hidden;
    margin: 10px 10px;
  background-color: rgb(86, 94, 91);
  color:#fff;
  position: relative;
  p {
    margin: 20px 0 10px 20px;
    font-size: 20px;
    font-weight: 700;
  }
  span {
    opacity: 0.6;
    font-size: 13px;
    padding-left: 20px;
  }
  .jing {
    position: absolute;
    top: 15px;
    right: 20px;
  }
  .views {
    margin: 30px 0 20px 20px ;
  }
}
</style>