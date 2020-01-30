<template>
	<div class="menu" :class="{'has-hide': !hasOpenMenu}">
		<ul class="menu__list">
			<li class="menu__item" v-for="menu in menuList" v-if="menu.hasAccess">
				<template v-if="menu.path">
					<div class="menu__head">
						<router-link :to="menu.path" class="menu__link ripple" :class="{'not-active': menu.path === '/' }">
							<div class="menu__icon">
								<v-icon :name="menu.icon"></v-icon>
							</div>
							<div class="menu__label">{{menu.name}}</div>
						</router-link>
					</div>

				</template>

				<template v-else>
					<div class="menu__head has-sub">
						<div class="menu__link ripple">
							<div class="menu__icon">
								<v-icon :name="menu.icon"></v-icon>
							</div>
							<div class="menu__label">{{menu.name}}</div>
						</div>
					</div>
				</template>

				<div class="menu__sub" v-if="menu.submenu">
					<ul class="sub">
						<li class="sub__item" v-for="sub in menu.submenu">
							<router-link :to="sub.path" class="sub__link ripple">
								<div class="sub__abr">{{sub.abr}}</div>
								<div class="sub__name">{{sub.name}}</div>
							</router-link>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import 'vue-awesome/icons/brands/elementor';
	import 'vue-awesome/icons/address-book';
	import 'vue-awesome/icons/tools';
	import 'vue-awesome/icons/chart-line';
	import 'vue-awesome/icons/wallet';
	import 'vue-awesome/icons/microchip';
	import 'vue-awesome/icons/book';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/gamepad';
	import VIcon from 'vue-awesome/components/Icon'

	export default {
		name: 'header-menu',
		components: {
			VIcon
		},
		data(){
			return {

			}
		},

		computed: {
			menuList(){
				return [
					{
						name: 'Dashboard',
						hasAccess: true,
						icon: 'brands/elementor',
						path: '/',
					},
					{
						name: 'Settings',
						hasAccess: true,
						icon: 'cog',
						submenu: [
							{
								name: 'System settings',
								abr: 'SS',
								path: '/settings'
							},
							{
								name: 'Coin packages',
								abr: 'CP',
								path: '/money'
							},
							{
								name: 'Achievements',
								abr: 'A',
								path: '/achievements'
							},
							{
								name: "Level award",
								abr: 'LA',
								path: '/level'
							},
							{
								name: "Promo codes",
								abr: 'PC',
								path: '/promo-codes'
							},
						]
					},
					{
						name: 'Contacts',
						hasAccess: true,
						icon: 'address-book',
						path: '/contacts'
					},
					{
						name: 'Boost services',
						hasAccess: true,
						icon: 'gamepad',
						path: '/boost-games'
					},
					{
						name: 'Text Content',
						hasAccess: true,
						icon: 'book',
						submenu: [
							{
								name: 'Translates',
								abr: 'T',
								path: '/translates'
							},
							{
								name: 'FAQ',
								abr: 'F',
								path: '/faq'
							},
						]
					},
					{
						name: 'Technical data',
						hasAccess: this.accessDev,
						icon: 'microchip',
						submenu: [
							{
								name: 'List of roles',
								abr: 'LR',
								path: '/roles'
							},
							{
								name: 'Languages',
								abr: 'L',
								path: '/languages'
							},
							{
								name: 'Translate modules',
								abr: 'TM',
								path: '/translate-modules'
							}
						]
					},
				]
			},

			hasOpenMenu(){
				return $store.state.hasOpenMenu;
			},

			accessDev(){
				return $store.getters.accessDev;
			}
		},

		mounted(){
			let $arrList = document.querySelectorAll('.has-sub'),
				$wrapList = document.querySelectorAll('.menu__item');

			$arrList.forEach(el => {
				el.addEventListener( "click" ,e => {
					let $arr = e.currentTarget,
						$wrap = $arr.parentElement;

					//$store.commit('SET_OPEN_MENU', true);

					if($wrap.classList.contains('has-active')){
						$wrap.classList.remove('has-active');
						return false;
					}

					$wrapList.forEach(item => {
						item.classList.remove('has-active');
					});

					$wrap.classList.add('has-active');
				});
			})
		},

	};
</script>

<style scoped lang=scss>
	.menu{
		&.has-hide{
			.menu__head{
				&:before{
					opacity: 0;
					visibility: hidden;
				}
			}
			.menu__label{
				opacity: 0;
				visibility: hidden;
			}
			.sub__name{
				opacity: 0;
				visibility: hidden;
			}
		}
		&__item{
			margin-bottom: 8px;
			&.has-active{
				.menu__sub{
					max-height: 500px;
					opacity: 1;
					visibility: visible;
				}
				.menu__head{
					background: rgba(255,255,255,0.3);
					&:before{
						top: 22px;
						transform: rotate(180deg);
					}
				}
			}
		}
		&__link{
			display: flex;
			align-items: center;
			cursor: pointer;
			overflow: hidden;
			position: relative;
			border-radius: 5px;
			&.router-link-active{
				background: $c_alt_light;
			}
			&.not-active{
				background: none;
			}
			&.router-link-exact-active{
				background: $c_alt_light;
			}
		}
		&__head{
			position: relative;
			border-radius: 5px;
			transition: all 0.3s;
			&:before{
				content: '';
				display: none;
				position: absolute;
				right: 15px;
				top: 23px;
				width: 0;
				height: 0;
				border-left: 4px solid transparent;
				border-right: 4px solid transparent;
				border-top: 4px solid #fff;
				transition: all 0.3s;
			}
			&:hover{
				background: rgba(255,255,255,0.1);
			}
			&.has-sub{
				&:before{
					display: block;
				}
			}
		}
		&__icon{
			width: 48px;
			height: 48px;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			svg{
				width: 25px;
				height: 25px;
				fill: #fff;
			}
		}
		&__label{
			color: #fff;
			transition: all 0.3s;
			position: relative;
			font-size: 14px;
		}
		&__sub{
			max-height: 0;
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s;
		}
	}

	.sub{
		padding-top: 10px;
		&__item{
			margin-bottom: 10px;
		}
		&__link{
			display: flex;
			align-items: center;
			height: 48px;
			border-radius: 5px;
			transition: all 0.3s;
			overflow: hidden;
			position: relative;
			&:hover{
				background: rgba(255,255,255,0.2);
			}
			&.router-link-active{
				background: $c_alt_light;
			}
		}
		&__abr{
			width: 48px;
			text-align: center;
			color: #fff;
			font-family: $f_alt;
			flex-shrink: 0;
			text-transform: uppercase;
		}
		&__name{
			font-size: 14px;
			color: #fff;
			position: relative;
			transition: all 0.3s;
			display: block;
			white-space: nowrap;

		}
	}
</style>
