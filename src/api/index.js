//当前这个模块: API进行统一管理
import requests from './request';
import mockrequest from './mockrequest'
//三级联动接口
///api/product/getBaseCategoryList get
//发请求:axios发请求返回结果Promise对象
export const regCategorylist = ()=> requests({url:'/product/getBaseCategoryList',method:'get'})

export const regCategorybanner = ()=> mockrequest({url:'/banners',method:'get'})

export const floorlist = () => mockrequest({url:'/floors',method:'get'})

//请求search数据
//当前这个接口【获取搜索模块的数据】，给服务器传递一个默认参数【至少是一个空对象】
export const regetsearch = (params) => requests({url:'/list',method:'post',data:params})

//请求detail数据
export const reggoodslist = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

//请求detail数据


//请求添加到购物车数据
export const regdetail = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//请求获取购物车列表 /api/cart/cartList
export const regcarlist = () => requests({url:'/cart/cartList',method:'get'})

//获取删除购物车商品api/cart/deleteCart/{skuId}
export const regdeletecarlist = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//获取切换商品选中的状态 /api/cart/checkCart/{skuId}/{isChecked}
export const regchecked = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码
export const  regregister = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册用户 /api/user/passport/register
export const userregister = (data) => requests({url:'/user/passport/register',data,method:'post'})

//登录 /api/user/passport/login
export const getuserlogin = (data) => requests({url:"/user/passport/login",data,method:'post'})

//获取用户信息,需要带着用户token像服务器要用户信息 /api/user/passport/auth/getUserInfo
export const getuserinfo = () => requests({url:"/user/passport/auth/getUserInfo",method:'get'})

//退出登录 /api/user/passport/logout
export const outregister = () => requests({url:"/user/passport/logout",method:'get'})

//获取订单交易页信息  /api/order/auth/trade
export const gettradeinfo = () => requests({url:"/order/auth/trade",method:'get'})

//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const getorder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息 /api/payment/weixin/createNative/{orderId}
export const getorderpay = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//查询支付订单状态/api/payment/weixin/queryPayStatus/{orderId}\
export const orderstatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单列表 /api/order/auth/{page}/{limit}
export const getmyorderlist = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})
