<template>
  <div class="sell">
    <div class="top"></div>
    <div class="witnessList">
      <ul>
        <li v-for="(v, i) in witnessList" :key="i">
          <p class="title1">{{ v.title }}</p>
          <p class="title2">{{v.title2}}</p>
          <div class="foolt">
            <span>点击进入</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      witnessList:[
        {
          title:'标题',
          title2:'123'
        },
         {
          title:'标题',
          title2:'123'
        },
         {
          title:'标题',
          title2:'123'
        },
         {
          title2:'123',
          title:'标题'
        }
      ]
    }
  }
};
</script>

<style scoped lang="scss">
.sell {
  padding:0 20px 60px;
}
.top {
  height: 120px;
  background-color: red;
  border-radius: 20px;
  margin: 20px 0;
}
.witnessList {
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 49%;
      height: 130px;
      background-color: rgb(253, 180, 180);
      margin: 4px 0;
      position: relative;
      overflow: hidden;
      .title1 {
        margin: 20px 0 10px 10px;
        font-size: 18px;
      }
      .title2 {
        margin: 0 0 10px 10px;
        font-size: 14px;
      }
      .foolt {
        padding: 3px 5px;
        display: inline-block;
        background-color: #e3adac;
        margin-left: 10px;
        border: 1px #e3ada1 solid;
        span {
          font-size: 10px;
        }
      }
    }
    li:nth-child(2n-1) {
      margin-right: 2%;
    }
    padding-bottom: 5px;
  }
}
</style>