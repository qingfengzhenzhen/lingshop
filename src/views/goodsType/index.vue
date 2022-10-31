<template>
  <div class="goodsType">
    <van-nav-bar
      :title="$t('home.commodity classification')"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <van-sidebar v-model="activeKey" @change="chenge()">
      <van-sidebar-item v-for="(v, i) in goodsType" :key="i" :title="v.name" />
    </van-sidebar>
    <div class="content">
      <van-sidebar v-model="type" v-if="typeList[0]" @change="chenge2()">
        <van-sidebar-item
          v-for="(v, i) in typeList"
          :key="i"
          :title="v.name"
        />
      </van-sidebar>
    </div>
    <div class="content2" style="width:80.4%" v-if="shop[0]">
      <ul>
        <li
          v-for="(v, i) in shop"
          :key="i"
          @click="()=>{$router.push({
            path:'/pay',
            query:{
              id:v.id
            }
          })}"
        >
          <img :src="v.image" v-error alt="" />
          <p class="van-ellipsis">{{v.productName}}</p>
        </li>
      </ul>
    </div>
    <div class="content2" v-else-if="shop2[0]"  >
      <ul>
        <li
          v-for="(v, i) in shop2"
          :key="i"
          @click="()=>{$router.push({
            path:'/pay',
            query:{
              id:v.id
            }
          })}"
        >
          <img :src="v.image" v-error alt="" />
          <p class="van-ellipsis">{{v.productName}}</p>
        </li>
      </ul>
    </div>
    <van-overlay :show="show" />
  </div>
</template>

<script>
import { Toast } from "vant";
import { GetProductByCategory, GetCategory } from "@/api/pay";
export default {
  data() {
    return {
      activeKey: 999,
      typeList: [],
      goodsType: [],
      id: "",
      show: false,
      type: 999,
      shop:[],
      shop2:[]
    };
  },
  async created() {
    Toast.loading({
      duration: 0,
      message: this.$t('edit.Loading'),
      forbidClick: true,
    });
    this.show = true;

    // id 的获取'

    let id = this.$route.query.id

    let category = await GetCategory({
      parentId:id
    });
    // let category = await GetCategoryAll({businessid:1});
    if (category.code == 200) {
      category.data.forEach((v, i) => {
        if (v.id == id) {
          this.goodsType =[v]
        }
      });
      this.goodsType = category.data;
    }
    let res = await GetProductByCategory({
        categoryId:id
    });
    res.data.forEach((v)=>{
        v.image = window.$http +v.image
    })
    this.shop = res.data

    this.show = false;
    Toast.clear();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async chenge() {
      this.type = 999
      Toast.loading({
        duration: 0,
        message: this.$t('edit.Loading'),
        forbidClick: true,
      });
      this.show = true;
      // localStorage.setItem("id",this.goodsType[this.activeKey].featuresId)
        await this.getData(this.goodsType[this.activeKey].id
      ,'1');
      Toast.clear();
      this.show = false;
    },
    async chenge2() {
     let res = await GetProductByCategory({
        categoryId: this.typeList[this.type].id
      });
       res.data.forEach((v)=>{
        v.image = window.$http +v.image
    })
      this.shop2 = res.data
    },

    async getData(id,is) {
      if(is) {
        let category = await GetCategory({
          parentId:id
        });
        // let category = await GetCategoryAll({businessid:1});
        if (category.code == 200) {
          category.data.forEach((v, i) => {
            if (v.id == id) {
              this.typeList =[v]
            }
          });
          this.typeList = category.data;
        }
      }
        let res = await GetProductByCategory({
          categoryId:id
        });
         res.data.forEach((v)=>{
            v.image = window.$http +v.image
        })
        this.shop = []
        this.shop2 = res.data
    
    //   let categoryInfo = await GetProductByCategory({
    //     categoryId: id,
    //   });
    //   if (categoryInfo.code == 200) {
    //     if(is) {
    //        this.typeList = categoryInfo.data;
    //       if (this.typeList[this.type]) {
    //       this.typeList[this.type].items.forEach((v) => {
    //         v.image = window.$http + v.image;
    //       });
    //       }
    //       if(this.typeList[0]) {
    //         let res = await GetProductByCategory({
    //             categoryId: this.typeList[0].featuresId,
    //         });
    //         this.shop = res.data
    //       }
    //     }else {
    //       this.goodsType = categoryInfo.data;
    //       //  if (this.goodsType[this.activeKey]) {
    //       //   this.goodsType[this.activeKey].forEach((v) => {
    //       //   v.image = window.$http + v.image;
    //       // });
    //       // }
    //     }
    //   }
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsType {
  padding-top: 5vh;
}
::v-deep {
  .van-sidebar {
    height: 95vh;
    background-color: #f7f8fa;
  }
  .van-sidebar-item--select,
  .van-sidebar-item--select:active {
    background-color: rgb(203, 203, 203);
  }
}
.content {
  ::v-deep {
    .van-sidebar {
      background-color: rgb(252, 252, 252);
    }
    .van-sidebar-item--select,
    .van-sidebar-item--select:active {
      background-color: rgb(233, 233, 233);
    }
  }

  position: absolute;
  top: 5vh;
  right: 0;
  width: 336px;
  height: 95vh;
}
.content2 {
  position: absolute;
  top: 5vh;
  right: 0;
  width: 256px;background-color: #fff;  
  height: 95vh;
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 45%;
      height: 160px;
      text-align: center;
      img {
        width: 100%;
        height: 120px;
        object-fit: cover;
      }
    }
    li:nth-child(2n) {
      margin-left:10%;
    }
  }
}
</style>