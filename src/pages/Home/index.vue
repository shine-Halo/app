<template>
  <div>
    <Typenav></Typenav>
    <Container></Container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(item,index) in getfloorlist" :key="item.id" :floorlist="item"></Floor>
    <Brand></Brand>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Container from '@/pages/Home/Container'
import Recommend from '@/pages/Home/Recommed'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { computed } from 'vue'
export default {
  name:'Home',
  components:{
    Container,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
    mounted() {
        this.$store.dispatch("getfloorlist")
        //获取用户信息在首页显示，服务器要知道我是谁才能返回相应信息，需要token
        //this.$store.dispatch('getuserinfo')
    },

  computed: {
    ...mapState({
      getfloorlist: (state) => {
        return state.home.floorlist;
      }
    })
} 

}

</script>

<style>

</style>