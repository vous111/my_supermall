import {debounce} from "common/utils.js"
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null,
      newRefresh:null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);

    this.itemImgListener = ()=>{
      // console.log('newRefresh');
      this.newRefresh();
    }

    // 监听itemImageLoad事件，调用this.itemImgListener
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isBackTopShow:false
    }
  },
  methods:{
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    imageLoad(){
      this.newRefresh()
      this.getThemeTopYs()
    },
  }

}