<template>
  <div id="detail">
    <!-- 导航栏 -->
    <!-- <detail-nav-bar @navClick="navClick" ref="detailNavBar"></detail-nav-bar> -->
    <!-- 这是用来显示返回和购物车的navbar -->
    <detail-nav-bar ref="detailNavBar1" class="detail-nav-bar1"></detail-nav-bar>

    <!-- 这是有整体功能的navbar -->
    <detail-nav-bar @navClick="navClick" ref="detailNavBar" class="detail-nav-bar" :titles="['商品','参数','评论','推荐']"></detail-nav-bar>


    <scroll class="detail-content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- <div>{{$store.state.cartList}}</div> -->
      <detail-swiper :topImages="topImages" ref="detailSwiper" @swiperImgLoad="swiperImgLoad"></detail-swiper>
      <detail-base-info :goods="goods" ref="baseInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"  @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" :imageType="3" ref="recommend"></goods-list>

    </scroll>

    <back-top @click.native="backTopClick" v-show="isBackTopShow"></back-top>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <!-- <div class="el-icon-loading"></div> -->


  </div>
</template>

<script>
  import DetailNavBar from "./childCpn/DetailNavBar"
  import DetailSwiper from "./childCpn/DetailSwiper"
  import DetailBottomBar from "./childCpn/DetailBottomBar"
  import DetailBaseInfo from "./childCpn/DetailBaseInfo"
  import DetailShopInfo from "./childCpn/DetailShopInfo"
  import DetailGoodsInfo from "./childCpn/DetailGoodsInfo"
  import DetailParamInfo from "./childCpn/DetailParamInfo"
  import DetailCommentInfo from "./childCpn/DetailCommentInfo"

  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"
  import GoodsList from 'components/content/goods/GoodsList';


  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'

  import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
  import {BACK_POSITION} from 'common/const.js'
  import {debounce} from 'common/utils.js'

  import {mapActions} from 'vuex';

  export default{
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBottomBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      BackTop,
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopYs:null,
        currentIndex:0,
        baseInfoTopY:0,
        detailNavBarHeight:0
      }
    },
    mixins:[itemListenerMixin, backTopMixin],
    created(){
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid获取数据
      getDetail(this.iid).then(res =>{
        // console.log(res);
        const data = res.result
        // 1. 获取顶部轮播数据
        this.topImages = data.itemInfo.topImages
        // 2. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3. 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 4. 保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 5. 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list
      })

        // 4.给getThemeTopYs赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopYs = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        // 因为scrollContent位置改变了，所以要减去顶部导航栏的高度
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-this.detailNavBarHeight)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-this.detailNavBarHeight)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-this.detailNavBarHeight)
        // 将this.themeTopYs新增一个最大值
        // this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
    }, 200)
    },
    methods:{
      ...mapActions(['addCart']),
      contentScroll(position){
        this.isBackTopShow = (-position.y) > BACK_POSITION
        this.isTabFixed = (-position.y) > this.tabOffsetTop

        for(let i in this.themeTopYs){
          i=parseInt(i)
          // 其实只用判断 positionY >= this.themeTopYs[i]就行了
         if(this.$refs.detailNavBar.currentIndex !== i && -position.y >= this.themeTopYs[i]){
            this.$refs.detailNavBar.currentIndex = i
          }
        }

        // 增加一个功能，当Y值为0时，先使得tabbar背景为透明，增加另一个tabbar
        
        // 使用dom
        // this.$refs.detailNavBar.$el.getElementsByClassName('ccenter')[0].style.opacity = -position.y/300
        // console.log(this.$refs.detailNavBar.$el.getElementsByClassName('ccenter')[0].style.opacity);
        // console.log(this.$refs.detailNavBar.$el);

        // 只有组件才有$el，子节点已经是dom树
        // 使用$refs
        // console.log(this.$refs.detailNavBar.$refs.navCenter.$el);
        // this.$refs.detailNavBar.$refs.navCenter.style.opacity = -position.y/300

        
        // if(this.baseInfoTopY>-position.y)
        // 1.先增加detailNavBar的透明度
        this.$refs.detailNavBar.$el.style.opacity = -position.y/this.baseInfoTopY
        // 2.减少detailNavBar下left和right的透明度

        const colorChange = Math.abs(0.5 - (-position.y/this.baseInfoTopY))*255*2
          const bgColorChange = Math.abs(0.5 - (-position.y/this.baseInfoTopY))*0.6*2
        // 分为两部分，第一部分是先改变detailNavBar1
        if(-position.y/this.baseInfoTopY<0.5){

          this.$refs.detailNavBar1.$refs.navLeft.style.opacity = 1 - (-position.y/this.baseInfoTopY)*2
          this.$refs.detailNavBar1.$refs.navRight.style.opacity = 1 - (-position.y/this.baseInfoTopY)*2

          // 使detailNavBar1下left和right的背景变为白色
          this.$refs.detailNavBar1.$refs.navIconLeft.style.backgroundColor = this.$refs.detailNavBar1.$refs.navIconRight.style.backgroundColor = "rgba(0,0,0,"+(bgColorChange)+")"
          this.$refs.detailNavBar.$refs.navIconLeft.style.backgroundColor = this.$refs.detailNavBar.$refs.navIconRight.style.backgroundColor = "rgba(0,0,0,"+(bgColorChange)+")"
          this.$refs.detailNavBar1.$refs.navIconLeft.style.color = this.$refs.detailNavBar1.$refs.navIconRight.style.color = "rgb("+colorChange+","+colorChange+","+colorChange+")"
        }
        else{
          // 滑动到下半部分的时候，开始
          this.$refs.detailNavBar.$refs.navIconLeft.style.color = this.$refs.detailNavBar.$refs.navIconRight.style.color = "rgb("+(255-colorChange)+","+(255-colorChange)+","+(255-colorChange)+")"
          this.$refs.detailNavBar.$refs.navIconLeft.style.backgroundColor = this.$refs.detailNavBar.$refs.navIconRight.style.backgroundColor = "rgba(0,0,0,0)"


        }

        // color: rgba(255, 255, 255);
        // background-color: rgba(0, 0, 0, .6);

        // color: rgba(0, 0, 0);
        // background-color: rgba(0, 0, 0, 0);

      },
      navClick(index){
        if(this.$refs.scroll.scroll.y < 0 ){
          this.currentIndex = index
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)

        }

      },
      imageLoad(){
        this.newRefresh()
        this.getThemeTopYs()
      },
      swiperImgLoad(){
        // 获取baseInfo到navbar的高度
        // this.swiperTopY = this.$refs.detailSwiper.$el.clientHeight - this.$refs.detailNavBar.$el.clientHeight
        this.baseInfoTopY = this.$refs.detailSwiper.$el.offsetHeight - this.$refs.detailNavBar.$el.offsetHeight
        this.detailNavBarHeight = this.$refs.detailNavBar.$el.offsetHeight
        // console.log(this.baseInfoTopY);
      },
      addToCart(){
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        this.addCart(product).then(res=>{
          // console.log('这是$toast--->',this.$toast.methods['show']());
          this.$toast.show(res) 
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 1;
  }
  .detail-content{
    position: absolute;
    /* top: 44px; */
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow: hidden;
  }

  .detail-nav-bar{
    opacity:0;
    background-color: #fff;
  }
</style>