<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item,index) in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="checkchange(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
        
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changenum('sub',-1,item)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="item.skuNum" @click="changenum('change',$event.target.value*1,item)">
            <a href="javascript:void(0)" class="plus" @click="changenum('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum * item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deletedata(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        <!-- <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods2.png">
            <div class="item-msg">华为（MIJIA） 华为metaPRO 30 浴霸4摄像 超清晰</div>
          </li>
         
          <li class="cart-list-con4">
            <span class="price">5622.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">5622</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods3.png">
            <div class="item-msg">iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用</div>
          </li>
         
          <li class="cart-list-con4">
            <span class="price">11399.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">11399</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked=" ischeck&&cartInfoList.length>0" @click="selectall">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteall">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{sum}}</i>
        </div>
        <div class="sumbtn">
          <router-link  class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { throttle } from "lodash";
  export default {
    name: 'ShopCart',
    mounted() {
      this.regcarlist()
    },
    computed: {
      ...mapGetters(['cartlist']),
      cartInfoList() {
        return this.cartlist.cartInfoList || []
      },
      sum() {
        let he = 0
        this.cartInfoList.forEach(item => {
          he += (item.skuNum * item.skuPrice)
        })
         return he
      },
      ischeck() {
           return this.cartInfoList.every((item) => item.isChecked == 1)
          }
        
    },
    methods: {
      regcarlist() {
        this.$store.dispatch('regcarlist')
      },
      //中间的num代表最后改变的值
      //使用节流，在一秒中内才改变
     changenum: _.throttle(async function(type,num,item) {
         switch(type) {
          case 'sub':
          num = item.skuNum > 1  ? -1 : 0
          break;
          case 'add':
          num = 1
          break;
          case 'change':
            //如果最后输入的值是非法的值或者小于0的话变为0
          if(isNaN(num) || num < 0) {
            num = 0
          }else {
            //最终得值减去一开始的值
            num = parseInt(num) - item.skuNum
          }
          break;        
        }
         try {
              await this.$store.dispatch('regdetail',{skuId:item.skuId,skuNum:num}) 
              this.regcarlist()
          } catch (error) {
            
          }   
      }, 1000), 
        
      //删除单机的购物车
      async deletedata(item) {
        try {
          await this.$store.dispatch('regdeletecarlist',item.skuId)
          this.regcarlist()
        } catch (error) {
          alert(error.message)
        }
       
      },

      //判断全选按钮是否应该被选中
       async checkchange(item,event) {
        try {
           let isChecked = event.target.checked ? '1' : '0'
           await this.$store.dispatch('regchecked',{skuId:item.skuId,isChecked:isChecked})
           this.regcarlist()
        } catch (error) {
          alert(error.message)
        }
       
      },

      //删除全部选中的商品
      async deleteall() {
        try {
          await this.$store.dispatch('deleteall')
          this.regcarlist()
        } catch (error) {
          alert(error.message)
        }

      },

      //全选按钮和单选按钮一致
       async selectall(event) {
        //判断全选按钮当前什么状态
       let isChecked = event.target.checked ? '1' : '0'
        try {
          await this.$store.dispatch('selectall',isChecked)
          this.regcarlist()
        } catch (error) {
          
        }
        
      }

     } 
  }

 
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 15%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 35%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>