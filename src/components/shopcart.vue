<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-show="goodList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="goodList.length!=0" v-for="item in goodList" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="" style="width: 65px;">
                                    </td>
                                        <td>{{item.title}}</td>
                                        <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number v-model="item.buycount"    @change="countChange(item.id,$event)" :min="1" label="描述文字">
                                        </el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <button type="button" @click="delOne(item.id)" class="el-button el-button--danger is-circle">
                                            <i class="el-icon-delete"></i>
                                        </button>
                                        </td>
                                    </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                <div class="cart-foot clearfix">
                    <div class="right-box">
                        <router-link to="/index">
                        <button class="button">继续购物</button>
                        </router-link>
                        <router-link to="/checkOrder">
                        <button class="submit">立即结算</button>
                        </router-link>
                    </div>
                </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
  name: "shopCart",
  data: function() {
    return {
    // 商品的数据详情
      goodList: []
    };
  },
  created() {
    // id数据
    let ids = "";
    // console.log(this.$store.state.shopCartData);
    for (const key in this.$store.state.shopCartData) {
      // console.log(key);
      ids += key;
      ids += ",";
    }
    // 去掉最后一个逗号
    // -1表示从倒数第二个
    ids = ids.slice(0, -1);

    this.$axios.get(`/site/comment/getshopcargoods/${ids}`).then(response => {
      this.goodList = response.data.message;
      response.data.message.forEach(e => {
        //   当前购买数量 = vuex的购买数量
         e.buycount = this.$store.state.shopCartData[v.id];
         this.$set(v,'selected',true);
      });
    });
  },
  methods:{
    // 改变数据  
    countChange(id,newCount) {
          this.$store.commit('updateCart',{
              id,
              newCount
          })
      },
    // 删除数据
    delOne(id) {
      this.$confirm("嘤嘤嘤,确定不买吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除Vuex中的数据
          this.$store.commit('delById',id)
          // 以及当前这个组件中的数据
          this.goodList.forEach((v, index) => {
            if (v.id == id) {
              this.goodList.splice(index, 1);
            }
          });
          // 提示用户
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
    // 计算属性
  computed:{
    // 选中个数 
      selectedNum(){
          // 累加选中的个数 
          let totalNum = 0;
          this.goodList.forEach(e => {
              if (e.selected == true) {
                    totalNum += e.buycount;              
              }
          });
          return totalNum

      },
    //  选中的总价格
      selectedPrice(){
          let totalPrice = 0;
          this.goodList.forEach(e => {
              if (e.selected == true) {
                  totalPrice += e.sell_price*e.buycount
              }
          });
          return totalPrice
      }
  }
};
</script>


<style>
</style>