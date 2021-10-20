<template>
 <div class="goodsinfo-container">
	 		<!-- 购物车小球 -->
			 <transition
			 @before-enter="beforeEnter"
			 @enter="enter"
			 @after-enter="afterEnter">
				 <div class="ball" v-if="ballflag" ref="ball"></div>
			 </transition>
	 		
            <!-- 商品轮播图区域 -->
			<div class="mui-card">
				
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						 <box-comments :lunbotulist="lunbotulist" :isfull="false"></box-comments>
					</div>
				</div>
			</div>
            <!-- 商品购买区域 -->
			
			
			<div class="mui-card">
				<div class="mui-card-header">{{goodsinfolist.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价<del>￥{{goodsinfolist.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfolist.sell_price}}</span>
						</p>

						<p>购买数量：<box-num @func="getCount" :max="goodsinfolist.stock_quantity"> </box-num></p>
						
						<p>
							<mt-button type="primary" size="small" >立即购买</mt-button>
							<mt-button type="danger" size="small" @click="goshopcar">加入购物车</mt-button>
						</p>
					</div>
				</div>
				
			</div>
            <!-- 商品参数区域 -->
			<div class="mui-card">
				<div class="mui-card-header"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品编号：{{goodsinfolist.goods_no}}</p>
						<p>库存情况：{{goodsinfolist.stock_quantity}}</p>
						<p>上架时间:{{goodsinfolist.add_time | dateFormat}}</p>
					</div>
				
				</div>
					   
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍 </mt-button>
					<mt-button type="danger" size="large" plain @click="gocomment(id)">商品详情</mt-button>
				</div>
			</div>

</div>
</template>

<script>
import lunbotu from '../subcomponents/lunbotu.vue'
import numbox from '../subcomponents/numbox.vue'
export default {
	data() {
		return {
			lunbotulist:[],
			id:this.$route.params.id,//将路由参数对象中的id挂载到data上，方便后期调用
			goodsinfolist:{},
			ballflag:false,//控制小球隐藏显示的标识符
			selectedcount:1

		}
	},
	
	created() {
		this.getgoodslunbo();
		this.getgoodsinfo()
	},
	methods: {
		getgoodslunbo(){
			this.$http.get("api/getthumimages/" + this.id).then(result=>{
				if(result.body.status===0){
					  result.body.message.forEach(item => {
                            item.img = item.src;
						});
						 this.lunbotulist = result.body.message;
				}
				else{
					console.log("失败")
				}
			})
		},
		getgoodsinfo(){
			this.$http.get("api/goods/getinfo/" + this.id).then(result=>{
				if(result.body.status===0){
					this.goodsinfolist=result.body.message[0]
				}
			})
		},
		godesc(id){
			//使用编程式导航跳转到 图文介绍页面
			this.$router.push({name:'goodsdesc',params:{id}});
		},
		gocomment(id){
			//跳转到评论页面
			this.$router.push({name:'goodscomment',params:{id}});
		},
		goshopcar(){
			//加入购物车
			this.ballflag=!this.ballflag;
			var goodsinfo={
				id:this.id,
				count:this.selectedcount,
				price:this.goodsinfolist.sell_price,
				selected:true
			};
			this.$store.commit("AddTocar",goodsinfo);
		},
		beforeEnter(el){
			el.style.transform="translate(0,0)";
		},
		enter(el,done){
			el.offsetWidth;
			// 获取小球在页面中的位置上
			const ballPosition= this.$refs.ball.getBoundingClientRect();
			// 获取购物车徽标在页面中的位置
			const badgePosition= document.getElementById("badge").getBoundingClientRect();
			const x=badgePosition.left-ballPosition.left;
			const y=badgePosition.top-ballPosition.top;


			el.style.transform=`translate(${x}px,${y}px)`;
			el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
			done();
		},
		afterEnter(el){
			this.ballflag=!this.ballflag
			
		},
		getCount(count){
			this.selectedcount=count;
			console.log(this.selectedcount)
		}
	},
	components:{
		'box-comments':lunbotu,
		'box-num':numbox
	},

}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
		background-color: #eee;
		overflow: hidden;

		.now_price{
		color: red;
		font-size: 16px;
		font-weight: bold;
	}
	.mui-card-footer{
		display: block;
		button{
			margin: 8px 0;
		}
	}
	.ball{
		background-color: red;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		position: absolute;
		z-index: 99;
		top:390px;
		left: 144px;

	}
}
	
    
	
</style>