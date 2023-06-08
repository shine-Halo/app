<template>
  <div class="spec-preview">
    <img :src="skuImage.imgUrl"  />
    <div class="event"  @mousemove="handlerl" ></div>
    <div class="big">
      <img :src="skuImage.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="site"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        currentindex: 0 
      }
    },
    props:['skuImageList'],
    mounted() {
      this.$bus.$on('samechange',(item) => {
        this.currentindex = item
      })
    },
    computed: {
      //这样写解决父组件给zoom传值的时候数据还没传到因此空数组里面每值情况
      skuImage() {
        return this.skuImageList[this.currentindex] || {}
      }
    },
    methods: {
      //放大镜功能
      handlerl(event) {
        //ref就相当于真实的dom元素
        let site = this.$refs.site
        let big= this.$refs.big
        //offsetX从里面框中间位置到外边框的距离，offsetwidth指的是里面框的宽度
        let left = event.offsetX - (site.offsetWidth/2)
        let top = event.offsetY - (site.offsetHeight/2)
        if(left < 0) left =0
        if(left >= site.offsetWidth) left= site.offsetWidth
         if(top < 0) top =0
        if(top >= site.offsetHeight) top= site.offsetHeight
        site.style.left = left + "px"
        site.style.top = top + "px"
        big.style.left = -2 *left + "px"
        big.style.top = -2 * top + "px"

      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>