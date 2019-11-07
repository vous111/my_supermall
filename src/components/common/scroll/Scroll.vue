<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";

	export default {
		name: "Scroll",
		props: {
			probeType: {
				type: Number,
				default: 2
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			};
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			});
			// console.log(this.scroll);

			// this.scroll.on 监听当前实例上的钩子函数
			if (this.probeType === 3 || this.probeType === 2) {
				this.scroll.on("scroll", position => {
					this.$emit("scroll", position);
				});
			}

			// 监听上拉事件
			if (this.pullUpLoad) {
				this.scroll.on("pullingUp", () => {
					this.$emit("pullingUp");
				});
			}
		},
		methods:{
			refresh(){
				this.scroll && this.scroll.refresh()
			},
			finishPullUp(){
				if(this.pullUpLoad){
					this.scroll.finishPullUp();
				}
			},
			scrollTo(x,y,time=500){
				this.scroll && this.scroll.scrollTo(x,y,time)
			},
			getCurrentY(){
				return this.scroll.y ? this.scroll.y : 0
			}
		}
	};
</script>

<style scoped></style>
