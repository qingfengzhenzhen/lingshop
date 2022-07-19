<template>
  <div id="app" >
    <transition name="component-fade" mode="out-in">
    <router-view/>
</transition>
  </div>
</template>

<script>
export default {
}
</script>


<style>
  #app {
    padding: 0px;
    margin: 0px;
    font-size: 14px;
    min-height: 100vh;
    background-color: rgb(243, 243, 243);
    overflow: hidden;
  }
  p {
    padding: 0;
    margin: 0;
  }
</style>
