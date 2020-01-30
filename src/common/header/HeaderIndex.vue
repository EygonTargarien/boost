<template>
	<div class="header"
			:class="{'has-hide': !hasOpenMenu}"
			:style="{'background-image': 'url(' + require('@img/header_bg.jpg') + ')'}">
		<div class="header__head">
			<router-link to="/" class="header__logo"><i>C</i>R<i>M</i> <span>boosting</span></router-link>

			<div class="header__user">
				<div class="user" v-if="hasUser">
					<router-link :to="`/contacts/${user.id}`" class="user__logo">
						<img :src="require('@img/user_superadmin.png')" alt="">
					</router-link>
					<div class="user__name">{{user.name || 'User'}}</div>
					<router-link :to="`/contacts/${user.id}`" class="user__show">
						<v-icon name="eye"></v-icon>
					</router-link>
				</div>
			</div>
		</div>

		<div class="header__main">
			<header-menu></header-menu>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/eye';
	import VIcon from 'vue-awesome/components/Icon';
	import HeaderMenu from './HeaderMenu';

	export default {
		name: 'header-index',
		components: {
			HeaderMenu,
			VIcon
		},

		computed: {
			hasOpenMenu(){
				return $store.state.hasOpenMenu;
			},

			hasUser(){
				return $store.state.auth.user;
			},

			user(){
				return $store.state.auth.user;
			}
		},
	};
</script>

<style scoped lang=scss>
	.header{
		position: fixed;
		left: 0;
		width: 230px;
		height: 100%;
		top: 0;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.5);
		transition: all 0.3s;
		padding-top: 140px;
		padding-bottom: 20px;
		user-select: none;
		&.has-hide{
			width: 68px;
			.header__head{
				padding: 0 10px;
			}
			.header__main{
				padding: 0 10px;
			}
			.header__logo{
				span{
					opacity: 0;
					visibility: hidden;
				}

			}
			.user__show{
				opacity: 0;
				visibility: hidden;
			}
			.user__name{
				opacity: 0;
				visibility: hidden;
			}

		}
		&:before{
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0,0,0,0.8);
		}
		&__head{
			position: absolute;
			left: 0;
			width: 100%;
			top: 0;
			padding: 0 20px;
			transition: all 0.3s;
		}
		&__main{
			position: relative;
			height: 100%;
			overflow-y: auto;
			overflow-x: hidden;
			padding: 0 20px;
			transition: all 0.3s;
			&::-webkit-scrollbar {
				width: 1px;
				background-color: transparent;
			}
			&::-webkit-scrollbar-track {
				border-radius: 5px;
				background-color: transparent;
			}
			&::-webkit-scrollbar-thumb {
				border-radius: 5px;
				-webkit-box-shadow: inset 0 0 6px $c_main_light_1;
				background-color: $c_main_light_1;
			}
		}
		&__logo{
			white-space: nowrap;
			text-transform: uppercase;
			color: #fff;
			letter-spacing: 5px;
			word-spacing: 7px;
			font-size: 19px;
			padding: 10px 0;
			font-weight: bold;
			font-family: $f_alt;
			display: inline-block;
			&:hover{
				i{
					color: $c_alt;
				}
			}
			span{
				transition: all 0.3s;
			}
			i{
				transition: all 0.3s;
				font-style: initial;
			}
		}
		&__user{
			border-top: 1px solid $c_border_light;
			border-bottom: 1px solid $c_border_light;
		}
	}

	.user{
		display: flex;
		align-items: center;
		padding: 10px 0;
		padding-right: 20px;
		position: relative;
		&__logo{
			width: 48px;
			line-height: 0;
			margin-right: 10px;
			flex-shrink: 0;
			transition: all 0.3s;
			&:hover{
				opacity: 0.8;
			}
		}
		&__name{
			color: #fff;
			font-size: 14px;
			letter-spacing: 2px;
			transition: all 0.3s;
		}
		&__show{
			position: absolute;
			right: 5px;
			line-height: 0;
			top: 27px;
			opacity: 1;
			visibility: visible;
			svg{
				fill: #fff;
				&:hover{
					fill: $c_alt;
				}
			}
		}
	}
</style>
