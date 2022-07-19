<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar :title="title" fixed left-arrow @click-left="onClickLeft" />
    <div style="padding-top: 50px">
      <van-form validate-first @failed="onFailed" @submit="submit">
        <!-- 目的地 -->
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value1"
          label="目的地"
          placeholder="点击选择国家"
          @click="showPicker1 = true"
          :rules="[{ required: true, message: '请输入正确内容' }]"
        />
        <!-- 省 -->
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value2"
          label="省/州"
          placeholder="点击选择省/州"
          @click="showPicker2 = true"
          :rules="[{ required: true, message: '请输入正确内容' }]"
        />

        <!-- 城市 -->
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value3"
          label="城市"
          placeholder="点击选择城市"
          @click="showPicker3 = true"
          :rules="[{ required: true, message: '请输入正确内容' }]"
        />

        <!-- 区 -->
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value4"
          label="区"
          placeholder="点击选择区"
          @click="showPicker4 = true"
          :rules="[{ required: true, message: '请输入正确内容' }]"
        />

        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="editData.address"
          name="exAddress"
          :label="$t('address.number plate')"
          placeholder="例：8号楼808室"
          required
          :rules="[{ required: true, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="editData.signer"
          name="name"
          placeholder="您的名字"
          required
          :label="$t('address.name')"
          :rules="[{ required: true, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="editData.phone"
          name="mobile"
          placeholder="配送员联系您的手机号"
          required
          :label="$t('address.cell-phone number')"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field :label="$t('address.Check box group')">
          <template #input>
            <div class="tag">家</div>
            <div class="tag">公司</div>
            <div class="tag">学校</div>
          </template>
        </van-field>
        <div style="margin: 16px auto; width: 80%">
          <van-button round block type="info" native-type="submit">{{
            $t("address.preserve")
          }}</van-button>
        </div>
      </van-form>
    </div>

    <!-- 选择器弹框 国 -->
    <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns1"
        @confirm="onConfirm1"
        @cancel="showPicker1 = false"
      />
    </van-popup>

    <!-- 选择器弹框 省 -->
    <van-popup v-model="showPicker2" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @confirm="onConfirm2"
        @cancel="showPicker2 = false"
      />
    </van-popup>
    <!-- 选择器弹框 城市 -->
    <van-popup v-model="showPicker3" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns3"
        @confirm="onConfirm3"
        @cancel="showPicker3 = false"
      />
    </van-popup>
    <!-- 选择器弹框 区 -->
    <van-popup v-model="showPicker4" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns4"
        @confirm="onConfirm4"
        @cancel="showPicker4 = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getCountry, getArea, Address, getAddress } from "@/api/address.js";
import { Toast } from "vant";
export default {
  props: ["data"],
  data() {
    return {
      editData: {
        phone: "",
        signer: "",
        address: "",
      },
      // 选择器数据
      columns1: [],
      columns2: [],
      columns3: [],
      columns4: [],
      // 地址信息
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      // 地址选择数据
      data1: null,
      data2: null,
      data3: null,
      data4: null,
      // 获取到1的id
      id1: 0,
      id2: 0,
      id3: 0,
      id4: 0,

      show: false,
      title: this.$t("address.Add delivery address"),
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,

      // 地址id
      addressId: null,

      // 是否为默认地址
      isDefault: null,
    };
  },
  async mounted() {
    await this.undata();
  },
  methods: {
    // 校验不通过时触发
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },

    async undata() {
      console.log(this.data);
      // 当传递data时
      if (this.data) {
        this.columns1 = [];
        this.columns2 = [];
        this.columns3 = [];
        this.columns4 = [];

        this.title = this.$t("address.edit delivery address");
        this.editData = this.data;
        this.id1 = this.data.countryId;
        this.id2 = this.data.provice;
        this.id3 = this.data.city;
        this.id4 = this.data.area;
        this.value1 = this.data.countryName;
        this.value2 = this.data.proviceName;
        this.value3 = this.data.cityName;
        this.value4 = this.data.areaName;
        this.isDefault = this.data.is_default;
        // 根据国家id获取省
        let res1 = await getArea({
          countryId: this.id1,
        });
        this.data2 = res1.data;
        res1.data.forEach((v) => {
          this.columns2.push(v.name);
        });
        //  根据省id获取城市
        let res2 = await getArea({
          parentId: this.id2,
          countryId: this.id1,
        });
        this.data3 = res2.data;
        res2.data.forEach((v) => {
          this.columns3.push(v.name);
        });
        // 根据城市id 获取区
        let res3 = await getArea({
          parentId: this.id3,
          countryId: this.id1,
        });
        this.data4 = res3.data;
        res3.data.forEach((v) => {
          this.columns4.push(v.name);
        });

        // 地址id
        this.addressId = this.data.id;
      }
      let a = await getCountry();
      a.data.forEach((v) => {
        this.columns1.push(v.country_name);
      });
      this.data1 = a.data;
    },

    // 校验通过时
    async submit(value) {
      console.log(value);

      let res = await Address({
        phone: value.mobile,
        signer: value.name,
        countryId: this.id1,
        provice: this.id2,
        city: this.id3,
        area: this.id4,
        address: value.exAddress,
        id: this.addressId || 0,
        is_default: this.isDefault,
      });
      if (this.data) {
        Toast.success("修改成功");
      } else {
        Toast.success("添加成功");
      }
      this.onClickLeft();
    },

    onClickLeft() {
      if (this.data) {
        this.$emit("isShow");
      } else {
        // this.$router.push("/address" + `?form=${this.$route.query.form}`);
        this.$router.back()
      }
    },
    // 国
    async onConfirm1(value, index) {
      if (this.value1 != value) {
        this.value2 = "";
        this.value3 = "";
        this.value4 = "";
        this.columns2 = [];
        this.columns3 = [];
        this.columns4 = [];
      } else {
        this.showPicker1 = false;
        return;
      }
      this.value1 = value;
      this.id1 = this.data1[index].id;
      this.showPicker1 = false;
      let res = await getArea({
        countryId: this.id1,
      });
      this.data2 = res.data;
      res.data.forEach((v) => {
        this.columns2.push(v.name);
      });
    },
    // 省
    async onConfirm2(value, index) {
      if (this.value2 != value) {
        this.value3 = "";
        this.value4 = "";
        this.columns3 = [];
        this.columns4 = [];
      } else {
        this.showPicker2 = false;
        return;
      }
      this.id2 = this.data2[index].id;

      this.value2 = value;
      this.showPicker2 = false;
      let res = await getArea({
        parentId: this.data2[index].id,
        countryId: this.id1,
      });
      this.data3 = res.data;
      res.data.forEach((v) => {
        this.columns3.push(v.name);
      });
    },
    // 城市
    async onConfirm3(value, index) {
      if (this.value3 != value) {
        this.value4 = "";
        this.columns4 = [];
      } else {
        this.showPicker3 = false;
        return;
      }
      this.id3 = this.data3[index].id;

      this.value3 = value;
      this.showPicker3 = false;

      let res = await getArea({
        parentId: this.data3[index].id,
        countryId: this.id1,
      });
      this.data4 = res.data;
      res.data.forEach((v) => {
        this.columns4.push(v.name);
      });
    },
    // 区
    async onConfirm4(value, index) {
      this.id4 = this.data4[index].id;
      this.value4 = value;
      this.showPicker4 = false;
    },
  },
  watch: {
    async data() {
      await this.undata();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .van-nav-bar__content {
    background-color: #4480f9;
    .van-nav-bar__title,
    .van-icon {
      color: #fff;
    }
  }
  .van-cell {
    background-color: #fff;
  }
  .tag {
    margin: 0 5px;
    padding: 0 20px;
    border-radius: 8px;
    background-color: #eee;
  }
}
</style>