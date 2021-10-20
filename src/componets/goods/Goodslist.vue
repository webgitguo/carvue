<template>
    <div class="goods-list">
        <router-link :to="'/home/goodsinfo/'+item.id" class="goods-photo" v-for="item in list" :key="item.id" tag="div">
            <img :src="item.img_url">
            <h1 class="tittle">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
               
            </div>
             
            
        </router-link>
        <mt-button type="danger" size="large" @click="getmore" >加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex:1,
            list:[]
        }
    },
    created() {
        this.getgoodslist()
        
    },
    methods: {
        getgoodslist(){
            this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.list=this.list.concat(result.body.message);
                }
            })
        },
        getmore(){
        this.pageindex++;
        this.getgoodslist();
    }
    }
    
}
</script>

<style lang="scss" scoped>
.goods-list{
     display: flex;
     flex-wrap: wrap;
    //  justify-content: space-around;
     padding: 7px;
     justify-content: space-between;
    .goods-photo{
       width: 49%;
       border: 1px solid #ccc;
       box-shadow: 0 0 8px #ccc;
       margin:3px 0;
       padding: 2px;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       min-height: 293px;
       img{
           width: 100%;
       }
        .tittle{
            font-size: 14px;
        }
        .info{
            
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
            .price{
                .now{
                    color:red;
                    font-size: 16px;
                    font-weight: bold
                }
                .old{
                    text-decoration:line-through;
                    font-size: 13px;
                    margin-left: 10px;
                }
            }
        }
    }
}




</style>