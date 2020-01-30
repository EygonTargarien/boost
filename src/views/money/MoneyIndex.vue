<template>
	<div class="section">
		<div class="container">
			<div class="section__head">
				<div class="title title--section"><span>Dark coin packages</span></div>
			</div>

			<div class="coin">
				<ul class="coin__list">
					<li class="coin__item" v-for="coin in coins">
						<div class="coin__card"
								:style="{'background-image': `url(${require('@img/card_bg.png')}`}">
							<div class="coin__hot" v-if="coin.hasHot">
								<img :src="require('@img/hot.png')" alt="">
							</div>

							<div class="coin__icon">
								<img :src="require('@img/coin.png')" alt="">
							</div>

							<div class="coin__price">
								<span class="coin__pMain">{{coin.cost}}</span>
								<span class="coin__pBonus">+ <span>{{coin.bonus}}</span> DC</span>
							</div>

							<div class="coin__options">
								<div class="coin__option" @click="onSave(coin)">
									<v-icon name="edit"></v-icon>
								</div>
								<div class="coin__option" @click="onDelete(coin.id)">
									<v-icon name="trash-alt"></v-icon>
								</div>
							</div>
						</div>
					</li>

					<li class="coin__item">
						<div class="coin__card coin__card--plus">
							<div class="coin__plus" @click="onSave(null)">
								<v-icon name="plus"></v-icon>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/trash-alt';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/plus';
	import VIcon from 'vue-awesome/components/Icon';
	import MoneySave from './MoneySave';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('money');

	export default {
		name: 'money-index',
		components:{
			VIcon,
		},
		data(){
			return{
				hasLoadCoins: false
			}
		},

		computed:{
			...mapState([
				'coins'
			])
		},

		created(){
			this.getCoins();
		},

		methods: {
			...mapActions([
				'GET_COINS'
			]),

			onSave(coin){
				this.$modal.show(MoneySave, {coin: coin}, $MODAL_OPTIONS.default);
			},

			onDelete(id){
				if (confirm('Do you want delete?')){
					this.DELETE_ITEM(id).then(() => {
						this.getCoins();
					})
				}
			},

			getCoins(){
				this.GET_COINS().then(() => {
					this.hasLoadCoins = false
				})
			}
		}
	};
</script>

<style scoped lang=scss>
	.coin{
		&__list{
			display: flex;
			flex-wrap: wrap;
			margin: 0 -15px;
		}
		&__item{
			width: 20%;
			padding: 0 15px;
			margin-bottom: 30px;
		}
		&__card{
			height: 140px;
			background: #fff;
			border-radius: 5px;
			transition: all 0.3s;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-shadow: 0 2px 8px rgba(0,0,0,0.2);
			position: relative;
			padding-top: 12px;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			&:hover{
				box-shadow: 1px 3px 8px rgba(0,0,0,0.3);
			}
			&--plus{
				background: rgba(255,255,255,0.3);
				cursor: pointer;
				box-shadow:none;
				padding: 0;
				&:hover{
					background: #fff;
					box-shadow: 0 2px 8px rgba(0,0,0,0.2);
					svg{
						width: 70px;
						height: 70px;
					}
				}
			}
		}
		&__icon{
			max-width: 40px;
		}
		&__plus{
			display: flex;
			width: 100%;
			height: 100%;
			align-items: center;
			justify-content: center;
			svg{
				width: 60px;
				height: 60px;
				fill: rgba(0,0,0,0.2);
			}
		}
		&__price{
			display: flex;
			align-items: center;
			font-size: 16px;
			font-weight: bold;
		}
		&__pBonus{
			padding-left: 5px;
			span{
				color: $c_alt;
			}
		}

		&__options{
			width: 100%;
			left: 0;
			display: flex;
			justify-content: center;
			transition: all 0.3s;
			border-top: 1px solid $c_main;
			max-width: 80%;
			margin-top: 10px;
			padding-top: 5px;
		}
		&__option{
			padding: 5px;
			cursor: pointer;

			&:hover{
				svg{
					fill: $c_alt;
				}
			}
		}
		&__hot {
			position: absolute;
			width: 70px;
			right: -4px;
			top: 6px;
			transform: rotate(30deg);
			box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
			line-height: 0;
		}
	}
</style>
