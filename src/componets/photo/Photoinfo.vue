<template>
 <div class="photoinfo-container">
     <!-- 头部区域 -->
    
         <h3>{{photoinfo.title}}</h3>
         <p class="subtitle"> 
             <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
             <span>点击：{{photoinfo.click}} 次</span>
         </p>
         
         <hr>
    

     <!-- 缩略图区域 -->
     <div class="suoluetu">
          <vue-preview :slides="list"></vue-preview>
     </div>
    
     <!-- 图片内容区域 -->
      <div class="content" v-html="photoinfo.content"></div>

     <!-- 评论组件区域 -->
      <cmt-box :id="id"></cmt-box>
</div>
</template>

<script>
//导入评论子组件
import comment from "../subcomponents/comment.vue"

export default {
        data() {
            return {
                id:this.$route.params.id,
                photoinfo:{},
                list:[]
            }
        },
        created() {
            this.getphotoinfo(),
            this.getphotosulue()
        },
        methods: {
            getphotoinfo(){
                this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                        if(result.body.status===0){
                            this.photoinfo=result.body.message[0]
                        }else{
                            console.log('获取失败')
                        }
                })
            },
            getphotosulue(){
                this.$http.get("api/getthumimages/" + this.id).then(result=>{
                    if(result.body.status===0){
                        result.body.message.forEach(item=>{
                            item.w=600;
                            item.h=400;
                            item.msrc=item.src//小图像，到时候让后端传个小图像
                        });
                        this.list=result.body.message;
                    }
                })
            }
        },
       
        //注册子组件
        components:{
            'cmt-box':comment
        }
}
</script>

<style  lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
        }
    .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    //此处需用全局样式（在main.js引入lib/css/suoluetu.css全局样式）更改缩略图样式，否则不会生效
    //  .suoluetu{
    //     .my-gallery{
    //         display: flex;
    //         flex-wrap: wrap;
    //         figure{
    //             display: flex;
    //            flex-wrap: wrap;
    //         img{
    //             width: 60px;
    //             height: 80px;
    //         }
    //         }
            
    //     }
        
    
     
}
 
    

        
</style>
