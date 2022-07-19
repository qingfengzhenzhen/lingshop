<template>
  <div class="userList">
    <van-icon :name="iconName" :color="color" />
    <div style="flex:1">
    &nbsp;
      <slot ></slot> 
    </div>
      <van-icon  name="arrow" />
  </div>
  <!-- friends -->
</template>

<script>
export default {
  props:["iconName","color"]
}
</script>

<style scoped>
.userList {
  display: flex;
  align-items: center;
}
.van-icon{
  font-size: 20px;
}
</style>