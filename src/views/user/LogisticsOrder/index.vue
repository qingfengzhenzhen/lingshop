<template>
  <div>
    <a href="#" onclick="BSL.getClipboard('getClipboard')">当前剪切板内容</a>
    {{ r }}
    <br />
    {{ b }}
    <hr />
    <img
      src="http://8.129.38.70:8007/Resource/Photo/2022/07/08/36d13128785544dc96c5fca760cb3afc.jpg"
      class="bslImgClick"
      @click="
        imgs(
          'http://8.129.38.70:8007/Resource/Photo/2022/07/08/36d13128785544dc96c5fca760cb3afc.jpg'
        )
      "
    />
    <br />
    <a href="#" onclick="BSL.Vibrator()">调用震动</a>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      r: "",
      b: "",
    };
  },
  methods: {
    getClipboard(result) {
      alert(result);
    },
    imgs(a) {
      let datas = new Array();
      datas[0] = a;
      let titles = new Array();
      titles[0] = "";
      BSL.ShowImages(datas, titles, 3);
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>