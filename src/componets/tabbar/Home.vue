<template>
 <div>

     <!-- 轮播图 -->
     <box-comments :lunbotulist="lunbotulist" :isfull="true"></box-comments>
        <!-- 九宫格到六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9" ul>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../image/menu1.png">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../image/menu2.png">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../image/menu3.png">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="">
		                    <img src="../../image/menu4.png">
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="">
		                    <img src="../../image/menu5.png">
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="">
		                    <img src="../../image/menu6.png">
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		           
		        </ul>        

    
</div>
</template>

<script>
import lunbotu from '../subcomponents/lunbotu.vue'
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            lunbotulist:[]
        };
       
    },
    created(){
        this.getlunbotu()
    },
     methods: {
          getlunbotu(){
            this.$http.get("api/getlunbo").then(result =>{
                // console.log(result.body);
                if(result.body.status===0){
                    this.lunbotulist =result.body.message
                    Toast('加载成功')
                }else{
                    Toast('加载轮播图失败')
                }
            })
          }  
        },
        components:{
            'box-comments':lunbotu
        },
		
	
}
</script>

<style  lang="scss" scoped>
   
    .mui-grid-view.mui-grid-9{
          background-color: #fff;
          border: 0
      }
    .mui-grid-view.mui-grid-9 .mui-media{
          border: 0;
       }
    img{
        height: 60px;
        width: 60px;
    }
    .mui-media-body{
        font-size: 13px
    }

</style>