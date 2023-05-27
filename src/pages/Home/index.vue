<template>
  <div>
    <Typenav></Typenav>
    <Container></Container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
     <Floor></Floor>
    <Brand></Brand>
    
  </div>
</template>

<script>
import Container from '@/pages/Home/Container'
import Recommend from '@/pages/Home/Recommed'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
export default {
  name:'Home',
  components:{
    Container,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  }

}
</script>

<style>

</style>