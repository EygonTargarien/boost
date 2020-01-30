<template>
	<div class="info" :class="{'has-warning': hasWarning}">
		<div class="info__icon">
			<v-icon name="exclamation-circle" ></v-icon>
		</div>

		<div class="info__msg">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/exclamation-circle';
	import VIcon from 'vue-awesome/components/Icon';

	export default {
		name: 'info-msg',
		components:{
			VIcon
		},
		props:{
			type: {
				type: String,
				required: true
			}
		},

		computed: {
			hasWarning(){
				return this.type === 'warning'
			}
		}
	};
</script>

<style scoped lang=scss>
	.info{
		border-radius: 5px;
		display: flex;
		align-items: center;
		padding: 10px 20px;
		background: #fff;
		box-shadow: 0 2px 8px rgba(0,0,0,0.3);
		&.has-warning{
			background: rgba(255,262,0, 0.2);
			svg{
				fill: orange;
			}
		}
		&__icon{
			flex-shrink: 0;
			margin-right: 20px;
			svg{
				width: 30px;
				height: 30px;
			}
		}
		&__msg{
			font-size: 18px;
			font-family: $f_alt;
		}
	}
</style>
