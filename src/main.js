// 入口文件
import Vue from 'vue'


// 导入路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//引入router.js
import router from './router.js'

//注册vuex(公共数据仓储)
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state:{//this.$store.state.xxx   <= 使用方法
      car
  },
  mutations:{//this.$store.commit.('方法的名称'，'按需传递唯一的参数')   <= 使用方法
    AddTocar(state,goodsinfo){
      //点击加入购物车，把商品信息保存到state的car中
      //1.如果购物车中已有要加入的商品信息，则只需更新商品数量即可
      //如果没有，则直接把商品信息push到car中即可

      //假设在car中没有找到商品数据
      var flag=false

        state.car.some(item=>{   
          if(item.id==goodsinfo.id){
            item.count += parseInt(goodsinfo.count)
            flag = true
            return true
          }
        })

        //如果最终循环完毕得到的flag还是false，则直接把商品信息push到car中
        if(!flag){
            state.car.push(goodsinfo)
        }
        //当更新car后，将car中的数据保存在本地的 localStorage中
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    updategoodsinfo(state,goodsinfo){
      //修改购物车中商品数量的值
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormcar(state,id){
        state.car.some((item,i)=>{
          if(item.id==id){
            state.car.splice(i,1)
            return true;
          }
        })
        //将删除完后的购物车数据同步到本地数据中去
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{//this.$store.getters.xxx   <= 使用方法
      getAllcount(state){
        var c= 0;
        state.car.forEach(item=>{
          c += item.count
        })
        return c
      },
      getGoodscount(state){
        var o=[];
        state.car.forEach(item=>{
          o[item.id] = item.count
        })
        return o
      },
      getgoodsSelected(state){
        var o={};
        state.car.forEach(item=>{
          o[item.id]=item.selected
        })
        return o
      },
      getGoodsCountandAmount(state){
        var o={
          count:0,
          amount:0
        }
        state.car.forEach(item=>{
          if(item.selected){
            o.count += item.count
            o.amount += item.count*item.price
          }
        })
        return o
      }
  }

})


//导入moment
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern = "YYY-MMM-DD HH-mm-ss"){
   return moment(dataStr).format(pattern)
})


//导入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
Vue.http.options.emulateJSON = true;
// Vue.http.options.emulateJSON = true;


//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/css/suoluetu.css'
// import './lib/mui/fonts/mui-icon-extra.ttf'

// 按需导入mint-ui组件
import  MintUI from 'mint-ui'
import 'mint-ui/lib/style.css' 
Vue.use(MintUI)

// Vue.use(Lazyload);//懒加载
// Vue.component(Swipe.name, Swipe);//九宫格
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Header.name,Header);//底部状态栏
// Vue.component(Button.name,Button)//按钮


//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



// 导入App根组件
import app from './App.vue'
var vm = new Vue({
  el:'#app',
  render:c =>c(app),
  router,//挂载router到VM实例上
  store//挂载store到VM实例上
})