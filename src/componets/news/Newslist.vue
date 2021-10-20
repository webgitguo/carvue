<template>
 <div>
     <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
					<router-link :to="'/home/newsinfo/'+ item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：
                                    {{item.add_time | dateFormat }}</span>
                                <span>点击次数：
                                    {{item.click}}次</span>
                            </p>    
                        </div>
					</router-link>
				</li>
			
			</ul>

</div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            newlist:[]
        }
    },
    created(){
        this.getNewslist()},
    methods: {
        getNewslist(){
            this.$http.get("api/getnewslist").then(
                reslut=>{
                    console.log(reslut.body)
                    if(reslut.body.status===0){
                        this.newlist = reslut.body.message
                        Toast('新闻加载成功')
                        
                    }else{
                        Toast('新闻加载失败')
                    }
                }
            )
        }
    },
}
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size: 15px;
            }
        .mui-ellipsis{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }    
        }
    }
</style>