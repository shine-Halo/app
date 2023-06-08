<template>
  <div>
    <Typenav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="getparams.categoryname">
              {{ getparams.categoryname }}<i @click="removelist">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="getparams.keyword">
              {{ getparams.keyword }}<i @click="removekeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="getparams.trademark">
              {{ getparams.trademark.split(":")[1]
              }}<i @click="removetrademark">×</i>
            </li>
            <!-- 属性值面包屑 -->
            <li
              class="with-x"
              v-for="(item, index) in getparams.props"
              :key="index"
            >
              {{ item.split(":")[1] }}<i @click="removeprops(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademark="trademark" @attrlist="attrlist" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isone }" @click="ordersort('1')">
                  <a
                    >综合<span
                      v-show="isone"
                      class="iconfont"
                      :class="{
                        'icon-direction-up': isup,
                        'icon-arrowdown': isdown,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: istwo }" @click="ordersort('2')">
                  <a
                    >销量<span
                      v-show="istwo"
                      class="iconfont"
                      :class="{
                        'icon-direction-up': isup,
                        'icon-arrowdown': isdown,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(item, index) in goodsList"
                :key="item.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"
                      ><img v-lazy="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagnation
            :pageno="getparams.pageno"
            :pagesize="getparams.pagesize"
            :total="total"
            :continues="5"
            @getpageone="getpageone"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "search", //注意老师的是大写
  data() {
    return {
      getparams: {
        category1id: "",
        category2id: "",
        category3id: "",
        categoryname: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",
        pageno: 1,
        pagesize: 3,
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    Object.assign(this.getparams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getsearchlist();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total: (state) => state.search.regetsearch.total,
    }),
    isone() {
      return this.getparams.order.indexOf("1") != -1;
    },
    istwo() {
      return this.getparams.order.indexOf("2") != -1;
    },
    isup() {
      return this.getparams.order.indexOf("asc") != -1;
    },
    isdown() {
      return this.getparams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    //因为不是只需要请求一次数据，每次搜索名字还是单机名字都需要一个新的数据，所以写到方法里，都可以调用
    getsearchlist() {
      this.$store.dispatch("regetsearch", this.getparams);
    },
    //删除分类面包屑
    removelist() {
      //当点击了删除按钮后，要把name删掉，id也删掉，重新发送网络请求，写成undefined可以不占位
      this.getparams.categoryname = undefined;
      this.getparams.category1id = undefined;
      this.getparams.category2id = undefined;
      this.getparams.category3id = undefined;
      this.getsearchlist();
      //将路由路径改为search，并且搜索的params要留着
      this.$router.push({ name: "search", params: this.$route.params });
    },
    //删除关键字面包屑
    removekeyword() {
      this.getparams.keyword = undefined;
      this.getsearchlist();

      //要删除搜索框中的字，在header组件中才能删除，所以要使用全局总线进行传参
      this.$bus.$emit("clear");

      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //利用自定义事件实现子向父传值
    trademark(val) {
      this.getparams.trademark = `${val.tmId}:${val.tmName}`;
      this.getsearchlist();
    },
    //属性值的子向父传值
    attrlist(attr, item) {
      // console.log(attr,item);
      let props = `${attr.attrId}:${item}:${attr.attrName}`;
      //判断如果选中了重复，不写入数组中
      if (this.getparams.props.indexOf(props) == -1) {
        this.getparams.props.push(props);
      }
      this.getsearchlist();
    },
    //删除属性值面包屑
    removeprops(index) {
      //数组的删除方法，如果用.props为undefined那么就会全部被删除
      this.getparams.props.splice(index, 1);
      this.getsearchlist();
    },
    //删除品牌面包屑
    removetrademark() {
      this.getparams.trademark = undefined;
      this.getsearchlist();
    },
    //点击升序降序
    ordersort(num) {
      //console.log(num);通过传参知道点击的是1还是2
      //知道了初始值是啥
      let orginsort = this.getparams.order;
      let originnum = orginsort.split(":")[0];
      let originletter = orginsort.split(":")[1];
      let neworigin = "";
      if (num == originnum) {
        neworigin = `${originnum} : ${originletter == "desc" ? "asc" : "desc"}`;
      } else {
        neworigin = `${num} : ${"desc"}`;
      }
      this.getparams.order = neworigin;
      this.getsearchlist();
    },
    //自定义组件传值
    getpageone(num) {
      this.getparams.pageno = num;
      this.getsearchlist();
    },
  },
  //在mounted中只能请求一次数据，每次点击之后在路由query和params数据都会更改，所以要监听route
  watch: {
    //$router和getparams是同级的，所以不需要写在this中
    $route() {
      //必须要设为空，不然会一直都在上面
      this.getparams.category1id = "";
      this.getparams.category2id = "";
      this.getparams.category3id = "";
      //在请求前先合并数据
      Object.assign(this.getparams, this.$route.query, this.$route.params);
      this.getsearchlist();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 0px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 0px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 50px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -2px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 3px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
