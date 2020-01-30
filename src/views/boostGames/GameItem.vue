<template>
	<div class="section">
		<div class="container">
			<div class="section__head">
				<div class="title title--section"><span>Boost services by {{game.title}}</span></div>
				<div class="section__options">
					<div class="section__option">
						<router-link class="btn" to="/boost-games">Back to games</router-link>
					</div>
				</div>
			</div>

			<div class="service">
				<div class="board">
					<ul class="board__list">
						<li class="board__item" v-for="(service, i) in game.services">
							<router-link :to="`/service/${service.id}`" class="board__card"
									:style="{'background-image': `url(${require('@img/card_bg.png')}`}">
								<div class="board__logo">
									<img :src="game.logo" alt="">
								</div>
								<div class="board__title">{{service.title}}</div>
							</router-link>
						</li>

						<li class="board__item">
							<div class="board__card board__card--plus">
								<div class="board__plus" @click="onSave(null)">
									<v-icon name="plus"></v-icon>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/plus';
	import VIcon from 'vue-awesome/components/Icon';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostGames');

	export default {
		name: 'game-item',
		components: {
			VIcon
		},
		props:['id'],
		data(){
			return{
				hasLoadServices: false
			}
		},

		computed:{
			...mapState([
				'game'
			])
		},

		created(){
			this.getGame();
		},

		methods: {
			...mapActions([
				'GET_GAME',
			]),

			getGame(){
				this.GET_GAME(this.id).then(() => {
					this.hasLoadServices = false
				})
			}
		}
	};
</script>

<style scoped lang=scss>
	.board {
		&__list {
			display: flex;
			flex-wrap: wrap;
			margin: 0 -15px;
		}
		&__item {
			width: 20%;
			padding: 0 15px;
			margin-bottom: 30px;
		}
		&__card {
			background: #fff;
			border-radius: 5px;
			transition: all 0.3s;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
			position: relative;
			height: 150px;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			padding: 10px 20px;
			&:before{
				content: '';
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				border-radius: 5px;
				background: rgba(0,0,0,0.0);
				transition: all 0.3s;
			}
			&:hover {
				box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
				color: $c_text;
				&:before{
					background: rgba(0,0,0,0.1);
				}
			}
			&--plus {
				background: rgba(255, 255, 255, 0.3);
				cursor: pointer;
				box-shadow: none;
				padding: 0;
				height: 150px;
				&:hover {
					background: #fff;
					box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
					svg {
						width: 70px;
						height: 70px;
					}
				}
			}
		}
		&__plus {
			display: flex;
			width: 100%;
			height: 100%;
			align-items: center;
			justify-content: center;
			svg {
				width: 60px;
				height: 60px;
				fill: rgba(0, 0, 0, 0.2);
			}
		}
		&__title{
			text-transform: uppercase;
			font-weight: bold;
			text-align: center;
			font-size: 14px;
		}
		&__logo{
			max-width: 100px;
			height: 60px;
		}
	}
</style>
