<template>
  <div>
    <router-view />
    <keep-alive>
    <van-tabbar route v-model="active">
      <van-tabbar-item replace icon="wap-home" to="/home">{{$t('home.home')}}</van-tabbar-item>
      <van-tabbar-item replace icon="shopping-cart" to="/purchase">{{$t('home.purchase')}}</van-tabbar-item>
      <van-tabbar-item replace icon="logistics" to="/logistics">{{$t('home.logistics')}}</van-tabbar-item>
      <van-tabbar-item replace icon="shop" to="/sell">{{$t('home.sell')}}</van-tabbar-item>
      <van-tabbar-item replace icon="friends" to='/society'>{{$t('home.society')}}</van-tabbar-item>
      <van-tabbar-item replace icon="cart" to='/shopCart'>{{$t('home.shoppingCart')}}</van-tabbar-item>
      <van-tabbar-item replace icon="manager" to='/user'>{{$t('home.my')}}</van-tabbar-item>
    </van-tabbar>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>