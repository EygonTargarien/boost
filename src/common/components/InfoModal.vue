<template>
	<div class="info" >
		<div class="info__head">
			<v-icon name="info-circle"></v-icon>
		</div>
		<div class="info__main" :class="{'to-right': side === 'right'}">
			<div class="info__title">{{title}}</div>
			<div class="info__text">{{text || '-'}}</div>
			<span class="info__arr"></span>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/info-circle';
	import VIcon from 'vue-awesome/components/Icon';

	export default {
		name: 'info-modal',
		components:{
			VIcon
		},
		props:{
			text:{
				type: String
			},
			side:String,
			title: String
		}
	};
</script>

<style scoped lang=scss>
	.info{
		display: inline-block;
		width: 16px;
		height: 16px;
		position: relative;
		font-family: $f_alt;
		&:hover{
			.info__head{
				svg{
					fill: $c_alt;
				}
			}
			.info__main{
				opacity: 1;
				visibility: visible;
			}
		}
		&__head{
			cursor: pointer;
			line-height: 0;
			svg{
				fill: $c_border;
			}
		}
		&__main{
			opacity: 0;
			visibility: hidden;
			width: 180px;
			position: absolute;
			z-index: 1;
			bottom: 100%;
			left: 50%;
			transform: translate(-50%, 0);
			background: #fff;
			border-radius: 5px;
			padding: 5px 10px;
			box-shadow: 0 1px 8px rgba(0,0,0,0.3);
			&.to-right{
				left: 150%;
				top: 50%;
				bottom: initial;
				transform: translate(0%, -50%);
				.info__arr{
					left: -4px;
					top: 50%;
					bottom: initial;
					transform: translate(0, -50%);
				}
			}
		}
		&__arr{
			content: '';
			position: absolute;
			width: 8px;
			height: 8px;
			display: block;
			transform: translate(-100%, 0);
			left: 50%;
			bottom: -4px;
			&:before{
				content: '';
				display: block;
				background: #fff;
				width: 100%;
				height: 100%;
				transform: rotate(45deg)
			}
		}
		&__title{
			font-size: 10px;
			border-bottom: 1px solid $c_border;
			color: $c_text;
			margin-bottom: 2px;
			font-weight: bold;
			text-transform: uppercase;
		}
		&__text{
			font-size: 12px;
			text-transform: none;
			font-weight: normal;
			color: $c_text;
		}
	}
</style>
