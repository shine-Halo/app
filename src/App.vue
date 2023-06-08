<template>
<div>
  <Header></Header>
    <router-view></router-view> 
  <!--v-show控制底部是否显示-->
  <Footer v-show="$route.meta.show"></Footer>
</div>

 
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  //本来写在typenav组件中，但是每次切换到home和search都会往服务器发送数据，这个组件只会执行一次，所以写在里请求数据
  mounted(){
      this.$store.dispatch('cateorylist')
  },
  components:{
    Header,
    Footer
  }
  
}
</script>

<style>

</style>
