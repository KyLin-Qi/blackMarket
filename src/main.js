import Vue from 'vue';
import App from './App.vue';


// 引入index.vue组件
import index from './components/index.vue';

// 引入detail.vue组件
import detail from './components/detail.vue';

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
    addCart(state, opt) {
      if (state.shopCartData[opt.id] == undefined) {
        Vue.set(state.shopCartData, opt.id, opt.buyCount);
      } else {
        state.shopCartData[opt.id] += opt.buyCount;
      }
    },
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
  {
    path: '/index',
    component: index
  },
  {
    path: '/detail/:goodId',
    component: detail
  }
]

// 创建router实例化对象
const router = new VueRouter({
  routes
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