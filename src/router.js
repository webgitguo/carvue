import VueRouter from 'vue-router'

//导入对应路由组件
import Home from './componets/tabbar/Home.vue'
import Rember from './componets/tabbar/Rember.vue'
import Shopcar from './componets/tabbar/Shopcar.vue'
import Search from './componets/tabbar/Search.vue'
import Newslist from './componets/news/Newslist.vue'
import Newsinfo from './componets/news/Newsinfo.vue'
import Photolist from './componets/photo/Photolist.vue'
import Photoinfo from './componets/photo/Photoinfo.vue'
import Goodslist from './componets/goods/Goodslist.vue'
import Goodsinfo from './componets/goods/Goodsinfo.vue'
import Goodsdesc from './componets/goods/Goodsdesc.vue'
import Goodscomment from './componets/goods/Goodscomment.vue'



// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
    {path:'/rember',component:Rember},
    {path:'/shopcar',component:Shopcar},
    {path:'/search',component:Search},
    {path:'/home/newslist',component:Newslist},
    {path:'/home/newsinfo/:id',component:Newsinfo},
    {path:'/home/photolist',component:Photolist},
    {path:'/home/photoinfo/:id',component:Photoinfo},
    {path:'/home/goodslist',component:Goodslist},
    {path:'/home/goodsinfo/:id',component:Goodsinfo},
    {path:'/home/goodsdesc/:id',component:Goodsdesc,name:'goodsdesc'},
    {path:'/home/goodscomment/:id',component:Goodscomment,name:'goodscomment'}
  ],
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router