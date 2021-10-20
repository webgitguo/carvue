<template>
<div class="goods-contaner">
    <div  class="goods-list">
        <!-- 商品列表区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                           <mt-switch v-model="$store.getters.getgoodsSelected[item.id]" @change="Selectedchange(item.id,$store.getters.getgoodsSelected[item.id])"></mt-switch>
                           <img :src="item.thumb_path">
                           <div class="info">
                                <h1>{{item.title}}}</h1>
                                <p>
                                    <span class="price">￥{{item.sell_price}}</span>
                                    <numbox :initcount="$store.getters.getGoodscount[item.id]" :goodsid="item.id" ></numbox>
                                    
                                    <!-- item.id是为了删除state中car的商品数据 i是为了删除goodslist中的商品数据 -->
                                    <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                                </p>
                           </div>
                        </div>
                    </div>
                </div>
         <!-- 结算区域  -->
            	<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
                        <div class="left">
                        <p>总计（不含运费）</p>
						<p>
                            已勾选商品<span>{{$store.getters.getGoodsCountandAmount.count}}</span>件，总价：<span>￥{{$store.getters.getGoodsCountandAmount.amount}}</span>
                        </p>
                        
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
    </div>
</div>
</template>

<script>
import numbox from '../subcomponents/shopcarbox.vue'
export default {
    data() {
        return {
            goodslist:[]
        }
    },
    created() {
        this.getgoodslist()
    },
    methods: {
        getgoodslist(){ 
            //获取store中所有商品的id，然后拼出一个用逗号隔开的数组
             var idArr = [];
             this.$store.state.car.forEach(item=>idArr.push(item.id))
            if(idArr.length<= 0){
                return;
            }
            this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result=>{
                if(result.body.status===0){
                        this.goodslist=result.body.message
                }
            })
        },
          remove(id,index){
            this.goodslist.splice(index,1);
            this.$store.commit('removeFromcar',id);
    },
    Selectedchange(id,value){
       this.$store.commit('updateGoodsSelected',{id,selected:value})
    }
 },
  
    components:{
        numbox
    },

}
</script>

<style lang="scss" scoped>
     .goods-contaner{
          background-color: #eee;
          overflow: hidden;
         .goods-list{
             .mui-card-content-inner{
                 display: flex;
                 align-items: center;
                 img{
                 width: 60px;
                 height: 60px;
                 }
                 
                 .info{
                     h1{font-size: 13px;}
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                     
                    .price{
                    color: red;
                    font-weight: bold;} 
             } 
         }
     }       
        .jiesuan{
            display: flex;
            justify-content: space-between;//两端对齐
            align-items: center;//纵向居中
            span{
                color: red;
                font-size: 16px;
                font-weight: bold;
            }
        }
     }
</style>