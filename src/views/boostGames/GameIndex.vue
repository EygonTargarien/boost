<template>
	<div class="section">
		<div class="container">
			<div class="section__head">
				<div class="title title--section"><span>Select games for boosting</span></div>
			</div>

			<div class="board">
				<ul class="board__list" v-if="hasLoadGames">
					<li class="board__item" v-for="(game, i) in games">
						<div class="board__card" :style="{'background-image': `url(${game.promo}`}">
							<router-link :to="`/boost-games/${game.id}`" class="board__logo">
								<img :src="game.logo" alt="">
							</router-link>

							<div class="board__options">
								<router-link :to="`/boost-games/${game.id}`" class="board__option">
									<v-icon name="eye"></v-icon>
								</router-link>
								<div class="board__option" @click="onSave(game)">
									<v-icon name="edit"></v-icon>
								</div>
								<div class="board__option" @click="onDelete(game.id)">
									<v-icon name="trash-alt"></v-icon>
								</div>
							</div>
						</div>
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
</template>

<script>
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/eye';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/trash-alt';
	import VIcon from 'vue-awesome/components/Icon';
	import GameSave from './GameSave';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostGames');

	export default {
		name: 'game-index',
		components: {
			VIcon
		},
		data(){
			return{
				hasLoadGames: false
			}
		},

		computed:{
			...mapState([
				'games'
			])
		},

		created(){
			this.getGames();
		},

		methods: {
			...mapActions([
				'GET_GAMES',
			]),

			onSave(game){
				this.$modal.show(GameSave, {game: game}, $MODAL_OPTIONS.default);
			},

			onDelete(id){

			},

			getGames(){
				this.GET_GAMES().then(() => {
					this.hasLoadGames = true;
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
			box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
			position: relative;
			height: 150px;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			&:before{
				content: '';
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				border-radius: 5px;
				background: rgba(0,0,0,0.6);
				transition: all 0.3s;
			}
			&:hover {
				box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
				&:before{
					background: rgba(0,0,0,0.7);
				}
				.board__options{
					opacity: 1;
				}
			}
			&--plus {
				background: rgba(255, 255, 255, 0.3);
				cursor: pointer;
				box-shadow: none;
				padding: 0;
				height: 150px;
				&:before{
					display: none;
				}
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
		&__logo{
			position: relative;
			max-width: 100px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			transform: translateY(-25px);
			cursor: pointer;
			transition: all 0.3s;
			&:hover{
				opacity: 0.8;
			}
			img{
				max-height: 100%;
			}
		}

		&__options{
			width: 100%;
			display: flex;
			justify-content: center;
			transition: all 0.3s;
			position: absolute;
			bottom: 15px;
			left: 0;
			opacity: 0.3;
		}
		&__option{
			padding: 5px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10px;
			width: 40px;
			height: 40px;
			margin: 0 5px;
			/*background: rgba(255,255,255,0.3);*/
			line-height: 0;
			transition: all 0.3s;
			svg{
				fill: #fff;
			}
			&:hover{
				background: rgba(255,255,255,0.8);
				svg{
					fill: $c_main;
				}
			}
		}
	}
</style>
