<template>
  <div id="home">
      <!-- 导航栏 -->
      <nav-bar class="home-nav-bar">
        <div slot="center">购物街</div>
      </nav-bar>

      <tab-control :titles="titles" 
      @titleClick="titleClick" 
      class="fixed-tab-control" 
      ref="fixedTabControl"
      v-show="isTabFixed"></tab-control>
      

      <!-- 使用better-scroll封装滚动 -->
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              :pull-up-load="true"
              @pullingUp="loadMore"
              @scroll="contentScroll">
        <home-swiper :banners="banners"  @swiperImageLoad="swiperImageLoad"/>
        <home-recommend-view :recommends="recommends" />
        <home-feature-view/>
        <tab-control :titles="titles" @titleClick="titleClick" ref="tabControl"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <!-- <div @click="backTopClick">
      <back-top v-if="isBackTopShow" />
      </div> -->
      <!-- 监听组件点击事件：@click.native -->
      <back-top @click.native="backTopClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childCpn/HomeSwiper'
  import HomeRecommendView from './childCpn/HomeRecommendView'
  import HomeFeatureView from './childCpn/HomeFeatureView'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import NavBar from 'components/common/navbar/NavBar';  
  import Scroll from 'components/common/scroll/Scroll';  

  import { getHomeMultidata, getHomeGoods } from "network/home";

  import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
  import {BACK_POSITION} from 'common/const.js'

  const types = {
    0:'pop',
    1:'new',
    2:'sell'
  }

  export default{
    name:"Home",
    components:{
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl,
      GoodsList,
      NavBar,
      Scroll
    },
    mixins:[itemListenerMixin, backTopMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        titles:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        // itemImaListener:null,
        // newRefresh:null,
        isTabFixed:false,
        tabOffsetTop:0,
        saveY:0,
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      this._getHomeMultidata()

      this._getHomeGoods('pop')
      this._getHomeGoods('new')
      this._getHomeGoods('sell')

    },
    mounted(){
      // this.titleClick(0)
    },
    activated(){
      // console.log(this.$refs.scroll);

      this.$refs.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      // 保存y值
      this.saveY = this.$refs.scroll.getCurrentY()
      // 取消全局图片加载事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods:{
      _getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      _getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },
      titleClick(index){
        this.currentType = types[index]
        this.$refs.tabControl.currentIndex = index;
        this.$refs.fixedTabControl.currentIndex = index;
      },
      loadMore(){
        this._getHomeGoods(this.currentType)
        // console.log('我在加载更多');
      },
      contentScroll(position){
        this.isBackTopShow = (-position.y) > BACK_POSITION
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      }
    }
  }
</script>

<style scoped>

  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav-bar{
    background: var(--color-tint);
    color: #fff;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 50px;
    left: 0;
    right: 0;
  }

  .fixed-tab-control{
    position: relative;
    z-index: 9;
  }
</style>