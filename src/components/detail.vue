<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                 <!-- 放大镜组件 -->
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                           <div class="stock-box">
                                                <!-- element-ui的计数器组件 -->
                                                <el-input-number v-model="buyNum" @change="numChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                    <a @click="selectIndex=0" href="javascript:;" :class="{selected:selectIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectIndex=1" href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" v-show="selectIndex==0" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="selectIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="message" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！">
                                                </textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" @click="subComment" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-show="comments.length!=0" v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | times1}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                     <div v-show="comments.length!=0" class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 使用iView的分页插件 -->
                                        <Page :current="pageIndex" @on-page-size-change=" sizeChange" @on-change="pageChange" :total="totalcount" placement='top' :page-size-opts='[10,20,30,40]' :page-size=10 show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                           <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                           </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | times}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "detail",
  data: function() {
    return {
      goodId: "",
      //商品详情
      goodsinfo: {},
      //热卖列表
      hotgoodslist: [],
      //图片列表
      imglist: [],
      //选择数量
      buyNum: 1,
      //评论内容
      comments: [],
      // 发表的评论信息
      message: "",
      //页码
      pageIndex: 1,
      //页容量
      pageSize: 10,
      // 标记tab栏显示哪个 0 :1
      selectIndex: 0,
      // 总条数默认  
      totalcount:0,
      // 放大镜图片数据
      images:{
          normal_size:[ 
            {
              id:1,
              url: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=157947955,3237432318&fm=26&gp=0.jpg"
            },
            {
              id:2, 
              url:"http://b-ssl.duitang.com/uploads/item/201506/27/20150627133944_XwfiJ.jpeg"
            }]
        },
        zoomerOptions:{ 
            // 放大倍数 
            zoomFactor:5,
            // 放大样式 
            pane:"container-round",
            // 多久出来
            hoverDelay:300, 
            // 类前缀
            namespace:"inline-zoomer-hahaha",
            // 点击移动
            move_by_click:true,
            // 滚动图片张数
            scroll_items:5,
            // 颜色
            choosed_thumb_border_color:"#FF327A",
            }
  } 
  },
     
   
  methods: {
      //   购买数量改变触发
    numChange() {
      console.log('已改变');
    },
    getGoodInfo() {
        // 每次请求之前 清空 图片数组 
        this.images.normal_size = [];
        this.$axios.get("/site/goods/getgoodsinfo/"+this.goodId).then(response => {
        // 商品详情
        this.goodsinfo = response.data.message.goodsinfo;
        // 热卖商品列表
        this.hotgoodslist = response.data.message.hotgoodslist;
        // 图片列表
        this.imglist = response.data.message.imglist;

        let tem_normal_size = [];
        this.imglist.forEach(a => {
            tem_normal_size.push({
                id:a.id,
                url:a.thumb_path
            })
        });
        this.images.normal_size = tem_normal_size;
      });
    },

    // 获取评论
    getComments() {
      this.$axios
        .get(
          `/site/comment/getbypage/goods/${this.goodId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          this.comments = response.data.message;
          this.pageSize = response.data.pageSize;
          this.pageIndex = response.data.pageIndex;
          this.totalcount = response.data.totalcount;   
        });
    },
    // 修改页码
    pageChange(pageNum){

        this.pageIndex = pageNum;
        // 重新获取数据
        this.getComments();
    },
    // 修改页容量
    sizeChange(pageSize){
        this.pageSize = pageSize;
        this.pageIndex = 1;
        // 重新获取数据
        this.getComments();

    },
    // 提交评论
    subComment(){
        if(this.message ==''){
            this.$Message.warning("嘤嘤嘤٩(๑>◡<๑)۶,写点东东呗!");
            return;
        }
        // 发送评论,传递数据
        this.$axios.post("/site/validate/comment/post/goods/" + this.goodId,{
            commentTxt:this.message  
        }).then(response => {
            console.log(response);
            
            // 回到第一页的数据
            this.pageIndex = 1;
            this.getComments();
            // 清空文本框内容
            this.message = "";
            this.$Message.success("master,评论发表成功了哟!");


        })
    }
  },
  created() {
    this.goodId = this.$route.params.goodId;
    // 抽取
    this.getGoodInfo();
    // 获取评论数据
    this.getComments();
  },
  watch:{
      $route(to,from){
      // 渲染页面
      this.goodId = to.params.goodId;
      // 重新获取数据
      this.getGoodInfo();
      // 重新获取评论
      this.getComments();
      // 购买数量修改为1
      this.buyNum = 1;
      
      }
  }
};
</script>

<style>
.tab-content img {
  display: block;
}
.pic-box {
  width: 395px;
  /* height: 320px; */
}
.inline-zoomer-hahaha-zoomer-box {
  width: 300px;

  height: 300px;
}
.preview-box img {
  height: 250px;
}
.control-box {
  height: 50px;
}
.control {
  margin: 0 auto;
}
.control-box > div {
  float: left;
  height: 50px;
}
.control-box .thumb-list img {
  width: 50px;
  height: 50px;
  float: left;
}
</style>

