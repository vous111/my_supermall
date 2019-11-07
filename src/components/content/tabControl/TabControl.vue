<template>
	<div class="tab-control">
		<div
			v-for="(item, index) in titles"
			:key="index"
			@click="itemClick(index)"
			class="item"
			:class="{active: currentIndex === index}"
		>
			<span>{{ item }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabControl",
		props: {
			titles: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			};
		},
		created(){
			this.$bus.$on('changeCurrentIndex', this.changeCurrentIndex)
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index;
				this.$emit("titleClick", index);
			},
			changeCurrentIndex(index){
				this.currentIndex = index
			}
		}
	};
</script>

<style scoped>
	.tab-control {
		height: 40px;
    line-height: 40px;
		display: flex;
		text-align: center;
    font-size: 14;
    background-color: #fff;
	}
	.item {
		flex: 1;
	}
  .item span{
    padding: 5px; 
    /* 为了给span增加内容宽度 */
  }

  .active{
    color: var(--color-high-text);
  }
	.active span{
		border-bottom: 2px solid var(--color-tint);
	}
</style>
