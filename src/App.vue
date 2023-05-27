<template>
<div>
  <Header></Header>
  <!--v-show控制底部是否显示-->
  <Footer v-show="$route.meta.show"></Footer>
</div>

 
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  components:{
    Header,
    Footer
  }
  
}
</script>

<style>

</style>
