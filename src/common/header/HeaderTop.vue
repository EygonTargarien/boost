<template>
	<div class="header">
		<div class="header__main">
			<button class="btn btn--icon"  @click="hasOpenMenu = !hasOpenMenu">
				<v-icon v-if="hasOpenMenu" name="ellipsis-v"></v-icon>
				<v-icon v-else name="bars"></v-icon>
			</button>


			<div class="currency" v-if="hasLoadCurrencies">
				<div class="currency__label">1$ = </div>
				<div class="currency__item" v-for="currency in currencies">
					<div class="currency__card">{{currency.rate}} {{currency.code}}</div>
				</div>
				<div class="currency__item">
					<!--TODO set DC course-->
					<div class="currency__card">250 DC</div>
				</div>
			</div>
		</div>

		<div class="header__options">
			<div class="header__option">

				<div class="menu">
					<ul class="menu__list">
						<li class="menu__item">
							<router-link to="/contacts" class="btn btn--icon">
								<v-icon name="address-book"></v-icon>
							</router-link>
						</li>
						<li class="menu__item">
							<router-link to="/boost-games" class="btn btn--icon">
								<v-icon width="25" height="25" name="gamepad"></v-icon>
							</router-link>
						</li>
					</ul>
				</div>
			</div>

			<div class="header__option">
				<dropdown-menu icon="bell">
					<ul class="list">
						<li class="list__item">Lorem ipsum dolor sit amet.</li>
						<li class="list__item">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</li>
						<li class="list__item">Lorem ipsum dolor sit amet.</li>
						<li class="list__item">Lorem ipsum dolor sit amet.</li>
					</ul>
				</dropdown-menu>
			</div>

			<div class="header__option">
				<button class="btn ripple clRipple btn--icon" @click="onLogout">
					<v-icon name="sign-out-alt"></v-icon>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/ellipsis-v';
	import 'vue-awesome/icons/bars';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/sign-out-alt';
	import VIcon from 'vue-awesome/components/Icon';

	import DropdownMenu from '@components/DropdownMenu';
	import { mapState } from 'vuex';

	export default {
		name: 'header-top',
		components: {
			VIcon,
			DropdownMenu
		},
		data(){
			return{
				hasLoadCurrencies: false
			}
		},

		computed: {
			...mapState({
				currencies: state => state.common.currencies
			}),

			hasOpenMenu: {
				get(){
					return $store.state.hasOpenMenu;
				},
				set(status){
					$store.commit('SET_OPEN_MENU', status)
				}
			}
		},

		created(){
			this.getCurrencies()
		},

		methods: {
			onLogout(){
				$store.dispatch('AUTH_LOGOUT').then(() => {
					$router.push({name: 'login'});
				})
			},

			getCurrencies(){
				$store.dispatch('GET_CURRENCIES').then(() => {
					this.hasLoadCurrencies = true;
				});
			}
		}
	};
</script>

<style scoped lang=scss>
	.header{
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		box-shadow: 0 2px 8px rgba(0,0,0,0.2);
		background: #fff;
		&__options{
			display: flex;
			align-items: center;
		}
		&__main{
			display: flex;
			align-items: center;
		}
	}

	.list{
		&__item{
			font-size: 12px;
			padding: 10px 10px;
			transition: all 0.1s;
			display: flex;
			align-items: center;
			border-radius: 5px;
			cursor: pointer;
			&:hover{
				background: $c_alt;
				color: #fff;
				box-shadow: 0 2px 8px rgba(0,0,0,0.2);
			}
		}
	}

	.currency{
		display: flex;
		align-items: center;
		font-family: $f_alt;
		font-size: 13px;
		margin-left: 10px;
		&__label{
			margin-right: 5px;
		}
		&__item{
			padding: 0 5px 0 0;
			display: flex;
			align-items: center;
			&:after{
				content: '/';
				display: inline-block;
				padding-left: 5px;
			}
			&:last-child{
				&:after{
					display: none;
				}
			}
		}
	}

	.menu{
		padding-right: 10px;
		margin-right: 10px;
		position: relative;
		&:before{
			content: '';
			display: block;
			position: absolute;
			top: 9px;
			right: 0;
			width: 1px;
			background: $c_border;
			bottom: 9px;
		}
		&__list{
			display: flex;
			align-items: center;
		}
		&__link{
			padding: 5px;
			line-height: 0;
			display: flex;
		}
	}
</style>
