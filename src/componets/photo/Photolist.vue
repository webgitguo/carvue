// 引入MUI tap-top-webview-main样式
<template>
 <div>
     <div id="slider" class="mui-slider1 ">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id==0 ? 'mui-active':'']" v-for="item in cates" :key="item.id" @tap="getphotocateid(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
                <ul class="photo-list">
                    <router-link :to="'/home/photoinfo/'+item.id" v-for="item in list" :key="item.id" tag="li">
                        <img v-lazy="item.img_url">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <div class="info-body">{{item.zhaiyao}}</div>
                        </div>
                        
                    </router-link>
                </ul>
			</div>


</div>


</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data() {
        return {
           cates:[],
           list:[]
        }
    },
    created() {
        this.getallcategroy(),
        this.getphotocateid()
    },
    mounted(){
            mui('.mui-scroll-wrapper').scroll({
    deceleration:0.0005
});
    },
    
    methods: {
        getallcategroy(){
            this.$http.get("api/getimgcategory").then(result=>{
                if(result.body.status===0){
                    result.body.message.unshift({title:"全部",id:0});
                    this.cates = result.body.message
                    console.log("图片加载成功")
                }
            })
        },
        getphotocateid(cateId){
                this.$http.get("api/getimages/"+cateId).then(result=>{
                    if(result.body.status === 0){
                            this.list= result.body.message;
                    }else{
                        console.log('获取失败')
                    }
                })
        }
    },

}
</script>

<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }
    .mui-slider {
    
    z-index: 1;
    overflow: hidden;
    width: 100%;
}
    .photo-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }
        .info{
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color:rgba(0,0,0,0.4);
            max-height: 84px;
            h1{
                font-size: 14px;
                
            }
            .info-body{
                font-size: 13px;
                
                
                
            }
        }
    }
    }
    
</style>