<template>
 <div>
     <!-- 轮播图组件 -->
	<mt-swipe :auto="4000">
        <mt-swipe-item v-for=" item in lunbotulist" :key="item.img">
            <img :src="item.img" :class="{'full':isfull}">
        </mt-swipe-item>
     </mt-swipe>
</div>
</template>

<script>
export default {
    props:["lunbotulist","isfull"]
}
</script>

<style lang= "scss" scoped>
  .mint-swipe {
        height: 200px;
        
        .mint-swipe-item {
            text-align: center;
            img {
                height: 100%;
                //width: 100%;
            }
            .full {
                width: 100%;
            }
        }
    }
</style>