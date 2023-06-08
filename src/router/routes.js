import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSucess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//二级路由
import Myorder from '@/pages/Center/Myorder'
import Buyorder from '@/pages/Center/Buyorder'

export default[
        {
            //传参，看一下点击的时候那个图片
            path:'/center',
            component:Center,
            meta:{show:true},
            children: [
                {path:'myorder',
                 component:Myorder
                },
                {path:'buyorder',
                component:Buyorder
               },
               {
                path:'/center',
                redirect:'/center/myorder'
               }
            ]
        },
        {
            //传参，看一下点击的时候那个图片
            path:'/paysuccess',
            component:PaySuccess,
            meta:{show:true}
        },
        {
            //传参，看一下点击的时候那个图片
            path:'/pay',
            component:Pay,
            meta:{show:true},
            beforeEnter(to,from,next) {
                console.log(from.path);
                if(from.path == '/trade') {
                    next()
                }else {
                    next(false)
                }
            }
        },
        {
            //传参，看一下点击的时候那个图片
            path:'/trade',
            component:Trade,
            meta:{show:true},
            //独享守卫，只有前一个路由是shopcart才能跳到trade路由
            beforeEnter(to,from,next) {
                console.log(from.path);
                if(from.path == '/shopcart') {
                    next()
                }else {
                    next(false)
                }
            }
        },
        {
            //传参，看一下点击的时候那个图片
            path:'/shopcart',
            component:ShopCart,
            meta:{show:true}
        },
        {
            //传参，看一下点击的时候那个图片
            path:'/addcartSucess',
            name:'addCartSucess',
            component:AddCartSucess,
            meta:{show:true}
        },
        {
            //传参，看一下点击的时候那个图片
            path:'/detail/:skuId',
            component:Detail,
            meta:{show:true}
        },
        {
            path:'/home',
            component:Home,
            //路由元信息，key是配置自带的名字
            meta:{show:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{show:false}
        },
        {
            name:'search',
            path:'/search/:keyword?',                  
            //component:Search,
            component: ()=>import('@/pages/Search'), //图片懒加载，更加快速,用户访问的时候才会执行
            meta:{show:true},
            props:true
        },
        //重定向，在项目跑起来的时候，访问/,立马让他定向到首页
        {
            path:'*',
            redirect:'/home'

        }
        

    ]
