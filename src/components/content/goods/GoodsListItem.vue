<template>
	<div class="goods-item" @click="itemClick">
		<img :src="showImage" @load="imageLoad" alt="图片加载失败"/>
		<div class="goods-info">
			<p>{{ goodsItem.title }}</p>
			<span class="price">{{ goodsItem.price }}</span>
			<span class="collect">{{ goodsItem.cfav }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "GoodsListItem",
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {};
				}
			},
			imageType:{
				type:Number,
				default:1
			}
		},
		methods: {
			imageLoad() {
				this.$bus.$emit("itemImageLoad");
			},
			itemClick(){
				this.$router.push('./detail/' + this.goodsItem.iid)
			}
		},
		computed: {
			showImage() {
				switch(this.imageType){
					case 1:return this.goodsItem.show.img
					case 2:return this.goodsItem.img
					case 3:return this.goodsItem.image
				}
				// return (this.goodsItem.img || this.goodsItem.show.img) || this.goodsItem.image;
			}
		}
	};
</script>

<style scoped>
	.goods-item {
		width: 48%;
		position: relative;
		margin-bottom: 5px;
	}

	.goods-item img {
		width: 100%;
		border-radius: 5px;
	}

	.goods-info {
		margin-top: 5px;
		text-align: center;
		font-size: 10px;
	}

	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.goods-info .price {
		color: var(--color-tint);
	}

	.goods-info .collect {
		position: relative;
		margin-left: 20px;
	}

	.goods-info .collect::before {
		content: "";
		position: absolute;
		left: -14px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>
