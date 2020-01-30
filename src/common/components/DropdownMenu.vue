<template>
	<div class="drop" :class="{'has-active': hasActive}">
		<div class="drop__head">
			<button class="btn ripple ripp btn--icon" :class="{'has-active': hasActive}" @click="hasActive = !hasActive">
				<v-icon v-if="icon" :name="icon"></v-icon>
			</button>
		</div>

		<div class="drop__cnt">
			<slot></slot>
		</div>

		<div class="drop__dim" @click="hasActive = false"></div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/bell';
	import VIcon from 'vue-awesome/components/Icon'

	export default {
		name: 'dropdown-menu',
		components:{
			VIcon
		},
		props: {
			icon: String
		},
		data(){
			return{
				hasActive: false
			}
		}
	};
</script>

<style scoped lang=scss>
	.drop{
		position: relative;
		&.has-active{
			.drop__cnt{
				top: 110%;
				opacity: 1;
				visibility: visible;
			}
			.drop__dim{
				opacity: 1;
				visibility: visible;
			}
		}
		&__dim{
			position: fixed;
			transition: all 0.3s;
			opacity: 0;
			visibility: hidden;
			z-index: 10;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
		&__cnt{
			position: absolute;
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s;
			right: 0;
			top: 130%;
			z-index: 11;
			background: #fff;
			padding: 5px;
			border-radius: 5px;
			width: 250px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.2);
		}
	}
</style>
