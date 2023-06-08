<template>
  <div class="type-nav">
    <div class="container">
      <!--通过事件委派实现-->
      <div @mouseleave="outindex" @mouseenter="showlist">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 事件委派 -->
            <div class="all-sort-list2" @click="gosearch">
              <div
                class="item"
                v-for="(c1, index) in result"
                :key="c1.categoryId"
                :class="{ cur: currentindex == index }"
              >
                <h3 @mouseenter="enterindex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 用js实现子级菜单的显示与隐藏 v-show="currentindex == index"-->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentindex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
  name: "Typenav",
  data() {
    return {
      currentindex: -1,
      show: true,
    };
  },
  //到组件挂载完毕，也就是后，home的数据显示出来时，就可以像服务器获取数据
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  methods: {
    //节流，在5毫秒之内只是执行一次
    enterindex: _.throttle(function (index) {
      this.currentindex = index;
    }, 50),
    outindex() {
      this.currentindex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    gosearch() {
      //如果一开始就通过编程式路由去写的话，如果有一百个a链接的话会很麻烦
      //通过事件委派实现单击跳转，但是单击的每个子命令都会触发，要实现只有字被单击才出发，所以通过事件目标找到a链接才跳转
      let element = event.target;
      //获取节点的自定义属性与属性值dateset属性，返回的是对象，所以用解构方法去写
      const { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //一层层去判断，首先得是a链接，其次1id，2id，3id
      //这里的categoryname，category1id和search里面getparams中的数据是连起来的
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryname: categoryname };
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }
        //合并数据，一共两个可以跳到search页面的方法
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          //通过编程式路由导航方式实现跳转
          //this.$router.push({name:'',query:{id:,title:}})
          this.$router.push(location);
        }
      }
    },
    showlist() {
      this.show = true;
    },
  },
  computed: {
    //规定computed配合...mapState一起使用
    ...mapState({
      result: (state) => {
        return state.home.result;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // 不通过css实现二级和三级的显示与隐藏联动
          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
        // 鼠标移动上去的颜色
        .cur {
          background-color: rgb(62, 167, 236);
        }
      }
    }
    .sort-enter {
      height: 0;
      transform: rotate(0deg);
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
>
