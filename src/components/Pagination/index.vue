<template>
   <div class="pagination">
   
    <button :disabled="pageno==1" @click="$emit('getpageone',pageno-1)">上一页</button>
    <!-- 颜色效果加不上，不知道为啥 -->
    <button v-if="ispage.start > 1"  @click="$emit('getpageone',1)" :class="{activee:pageno==1}">1</button>
    <button v-if="ispage.start > 2">···</button>
    <button  v-for="(item,index) in ispage.end" :key="index" v-if="item  >= ispage.start" @click="$emit('getpageone',item)">{{item}}</button>
    <button v-if="ispage.end < totalpage-1">···</button>
    <button v-if="ispage.end < totalpage"  @click="$emit('getpageone',totalpage)">{{totalpage}}</button>
    <button @click="$emit('getpageone',pageno+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>

</template>

<script>
export default {
    name:'Pagnation',
    props:['pageno','pagesize','total','continues'],
    computed: {
      //计算总共多少页
      totalpage() {
        return Math.ceil(this.total/this.pagesize)
      },
      //判断页数是否大于连续页数
      ispage() {
        const {pageno,pagesize,total,continues,totalpage} = this
        //设置开始和结束页数
        let start = 0
        let end = 0
        //如果连续页数大于一共页数
        if(continues > totalpage) {
          start = 1 , end = totalpage
        }else {
          //如果是滴6页就是45678
          start = pageno - parseInt(continues/ 2)
          end = pageno + parseInt(continues / 2)

          //如果开始页小于1，那么设置，最小为1
          if(start < 1) {
            start = 1
            end = continues
          }
          //如果结束页数大于总页数
          if(end>totalpage) {
            end = totalpage
            start = totalpage - continues + 1
          }
        }
        return {start,end}
      }
    }
}
</script>

<style lang="less" scoped>

 .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
     
    }
    
  }

</style>