import Vue from 'vue';
import App from './App.vue';


// 引入index.vue组件
import index from './components/index.vue';

// 引入detail.vue组件
import detail from './components/detail.vue';

// 引入shopCart.vue组件
import shopcart from './components/shopcart.vue'

// 引入checkorder.vue组件
import checkOrder from './components/checkOrder.vue'

// 引入login.vue组件
import login from './components/login.vue'

// 引入router包
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 引入iView插件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 引入放大镜插件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 引入Vuex
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    shopCartData: JSON.parse(window.localStorage.getItem('cartData')) || {}
  },

  mutations: {
    // 添加购物车
    addCart(state, opt) {
      if (state.shopCartData[opt.id] == undefined) {
        Vue.set(state.shopCartData, opt.id, opt.buyCount);
      } else {
        state.shopCartData[opt.id] += opt.buyCount;
      }
    },
    // 修改购物车数据
    updateCart(state,opt){
        state.shopCartData[opt.id] = opt.newCount
    },
    // 删除对应的id数据
    delById(state,id){
        Vue.delete(state.shopCartData,id)
    }
  },
  // vuex的计算属性
  getters: {
    cartGoodCount(state) {
      let totalConut = 0;
      for (const key in state.shopCartData) {
          totalConut += state.shopCartData[key]       
      }
      return totalConut;
    }
  }
})

// 导入moment包
import moment from 'moment';

Vue.filter('times', function (value) {
  return moment(value).format("YYYY年MM月DD日");
})
Vue.filter('times1', function (value) {
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
})




// 引入懒加载插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  error: require('./assets/元首.gif'),
  loading: require('./assets/惊讶.gif'),
})

// 引入axios全局
import axios from "axios";
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://111.230.232.110:8899';

// 引入轮播包
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 规则
const routes = [
  {
    path: '/',
    component: index
  },
  // 主页组件
  {
    path: '/index',
    component: index
  },
  // 商品详情组件
  {
    path: '/detail/:goodId',
    component: detail
  },
  // 购物车组件
  {
    path: '/shopcart',
    component: shopcart
  },
  // 订单
  {
    path:'/checkOrder',
    component: checkOrder
  },
  // 登录
  {
    path: '/login',
    component: login
  }
]

// 创建router实例化对象
const router = new VueRouter({
  routes
})

// 设置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  if (to.path == '/checkOrder') {
      axios.get("site/account/islogin").then(response =>{
        // console.log(response);
        if(response.data.code === "nologin"){
          router.push('/index')
        }else{
          next()
        }  
      })
  }else{
    next()
  }
  
  
})

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // 挂载到根实例上
  router,
  store
}).$mount('#app')

window.onbeforeunload = function () {
  window.localStorage.setItem('cartData', JSON.stringify(store.state.shopCartData));
}