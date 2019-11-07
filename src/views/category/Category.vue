<template>
	<div id="category">
		<nav-bar class="category-nav-bar">
			<div slot="center">商品分类</div>
		</nav-bar>

		<scroll class="side-scroll">
			<side-control :sideItems="categories" @sideClick="sideClick"></side-control>
		</scroll>

		<scroll class="content-scroll" ref="scroll" :probe-type="3">
      <sub-category class="subcategory" :subItems="subcategories" @subImageLoad="subImageLoad"> </sub-category>
      <category-detail class="category-detail" :detailGoods="categoryDetail" @detailClick="detailClick" ></category-detail>
			<!-- <sub-category class="subcategory" :subItems="categoryData[sideCurrentIndex].subcategories"> </sub-category> -->
		</scroll>
	</div>
</template>

<script>
	import SubCategory from "./childCpn/SubCategory.vue";
	import SideControl from "./childCpn/SideControl";
	import CategoryDetail from "./childCpn/CategoryDetail";

	import NavBar from "components/common/navbar/NavBar";
	import Scroll from "components/common/scroll/Scroll";


	import {
		getCategory,
		getSubcategory,
		getCategoryDetail
	} from "network/category.js";

	import {itemListenerMixin} from "common/mixin.js"

  const types = {
    0:'pop',
    1:'new',
    2:'sell'
  }

	export default {
		name: "Category",
		components: {
			SubCategory,
      SideControl,
      CategoryDetail,
			NavBar,
			Scroll,
		},
		data() {
			return {
				categories: [],
				categoryData: {},
        sideCurrentIndex: 0,
        detailCurrentIndex:0,
        subcategories:[],
        categoryDetail:[]
			};
		},
		mixins:[itemListenerMixin],
		created() {
			// 1.获取侧边栏分类,并初始化分类数据
			this._getCategory();
    },
    computed:{
      // showSubcategories(){
      //   return this.categoryData[this.sideCurrentIndex].subcategories
      // },
      // showCategoryDetail(){
      //   return this.categoryData[this.sideCurrentIndex].categoryDetail
      // },
    },
		methods: {
			_getCategory() {
				getCategory().then(res => {
					// 1.获取所有类别
					this.categories = res.data.category.list;
					// 2.初始化分类数据
					for (let i = 0; i < this.categories.length; i++) {
						this.categoryData[i] = {
							subcategories: [], //这里可以不用写字符串
							categoryDetail: []
							// categoryDetail: {
							//   'pop': [],
							//   'new': [],
							//   'sell': []
							// }
						};
					}

					// 3.请求第一页数据,因为sideCurrentIndex初始化为0,再请求第一页详情数据中的pop分类
          this._getSubcategory(0);
				});
			},
			_getSubcategory(index) {
				// 1.获取对应的maitkey
				const maitkey = this.categories[index].maitKey;
				// 2.请求数据
				getSubcategory(maitkey).then(res => {
          // console.log(res);
          this.subcategories = res.data.list
					this.categoryData[index].subcategories = res.data.list;
        });

        // 请求第一页详情数据中的pop分类
        this._getCategoryDetail(0, 'pop')
        
			},
			_getCategoryDetail(index,type) {
				// 1.获取对应的miniWallKey
        const miniWallKey = this.categories[index].miniWallkey;
        getCategoryDetail(miniWallKey, type).then(res=>{
					this.categoryData[index].categoryDetail[type] = res
          this.categoryDetail = res
        })
      },
      sideClick(index){
				this.sideCurrentIndex = index
				this._getSubcategory(index)
				// 每次点击都请求是否会增加服务器负载？？？
				
				// 将scroll返回到顶部
				this.$refs.scroll.scrollTo(0, 0)
				// 将detailCurrentIndex置为0
				if(this.detailCurrentIndex !== 0){
					this.detailCurrentIndex = 0;

					// 如何改变孙子组件tab-control里面的currentIndex？？？
					// 1.使用$bus
					this.$bus.$emit('changeCurrentIndex', 0)
				}

        // console.log(this.categoryData[index].subcategories);
        // 如果没有之前保存的数据，请求
        // if(this.categoryData[index].subcategories.length === 0)
        //   this._getSubcategory(index)
        // else{
        //   // 如果有，改变值
        //   let type = types[this.detailCurrentIndex]
        //   this.subcategories = this.categoryData[this.sideCurrentIndex].subcategories
        //   this.categoryDetail = this.categoryData[this.sideCurrentIndex].categoryDetail[type]
        // } 
			},
			detailClick(index){
				this.detailCurrentIndex = index
				let type = types[index]
				this._getCategoryDetail(this.sideCurrentIndex, type)

				// if(!this.categoryData[this.sideCurrentIndex].categoryDetail[type]){
				// 	this._getCategoryDetail(this.sideCurrentIndex, type)
				// }else{
				// 	this.categoryDetail = this.categoryData[this.sideCurrentIndex].categoryDetail[type]
				// }
			},
			subImageLoad(){
				// 在mixin封装好了
				this.itemImgListener()
			}
		}
	};
</script>

<style scoped>
	#category {
		height: 100vh;
		position: relative;
	}

	.category-nav-bar {
		/* position: fixed;
    width: 100%;
    background-color: var(--color); */
		background: var(--color-tint);
		color: #fff;
	}

	.side-scroll,
	.content-scroll {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 50px;
	}
	.side-scroll {
		left: 0;
		width: 100px;
	}
	.content-scroll {
		right: 0;
		width: calc(100% - 100px);
	}

	.content {
		display: flex;
		/* width: calc(100%-100px); */
		background-color: #ccc;
		flex-flow: column wrap;
		/* left: 100px; */
	}
</style>
