<template>
	<div class="section">
		<div class="container">
			<div class="section__head">
				<div class="title title--section"><span>Level award</span></div>
			</div>

			<div class="board">
				<ul class="board__list">
					<li class="board__item" v-for="(level, i) in levels">
						<div class="board__card"
								:style="{'background-image': `url(${require('@img/card_bg.png')}`}">
							<div class="board__hot" v-if="level.hasHot">
								<img :src="require('@img/hot.png')" alt="">
							</div>

							<div class="board__icon">
								<img :src="require('@img/level.png')" alt="">
								<span>{{i}}</span>
							</div>

							<div class="board__main">
								<div class="board__reward">
									<div class="board__level">+ <span>300</span> DC</div>
									<div class="board__cashback">+ <span>1%</span> cashback</div>
								</div>

								<div class="board__options">
									<div class="board__option" @click="onSave(level)">
										<v-icon name="edit"></v-icon>
									</div>
									<div class="board__option" @click="onDelete(level.id)">
										<v-icon name="trash-alt"></v-icon>
									</div>
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
	import 'vue-awesome/icons/trash-alt';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/plus';
	import VIcon from 'vue-awesome/components/Icon';
	import LevelSave from './LevelSave';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('level');

	export default {
		name: 'level-index',
		components:{
			VIcon,
		},
		data(){
			return{
				hasLoadLevels: false
			}
		},

		computed:{
			...mapState([
				'levels'
			])
		},

		created(){
			this.getLevels();
		},

		methods: {
			...mapActions([
				'GET_LEVELS',
				'DELETE_LEVEL'
			]),

			onSave(level){
				this.$modal.show(LevelSave, {level: this.level}, $MODAL_OPTIONS.default);
			},

			onDelete(id){
				if (confirm('Do you want delete?')){
					this.DELETE_LEVEL(id).then(() => {
						this.getLevels();
					})
				}
			},

			getLevels(){
				this.GET_LEVELS().then(() => {
					this.hasLoadLevels = false
				})
			}
		}
	};
</script>

<style scoped lang=scss>
	.board{
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
			//height: 140px;
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
				height: 240px;
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
		&__main{
			border-top: 1px solid $c_main;
			padding-top: 5px;
			width: 80%;
			margin: 10px auto 0;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		&__icon{
			max-width: 100px;
			position: relative;
			span{
				font-size: 50px;
				position: absolute;
				top: 46%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-weight: bold;
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
		&__title{
			font-size: 14px;
			text-align: center;
			max-width: 80%;
			margin: 0 auto;
			border-bottom: 1px solid $c_border;
			margin-bottom: 5px;
			padding-bottom: 5px;
		}

		&__reward{
			font-size: 14px;
			padding-top: 4px;
			span{
				font-weight: bold;
			}
		}

		&__options{
			width: 100%;
			left: 0;
			display: flex;
			justify-content: center;
			transition: all 0.3s;
			border-top: 1px solid $c_main;
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
