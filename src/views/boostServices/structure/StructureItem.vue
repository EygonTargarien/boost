<template>
	<div class="str">
		<div class="str__card">
			<div class="str__slider" v-if="hasRange" :style="{'background-image': `url(${require('@img/card_bg.png')}`}">
				<div class="str__range">
					<span></span>
				</div>
			</div>

			<div class="str__grid">
				<div class="str__coll">
					<div class="str__block" :style="{'background-image': `url(${require('@img/card_bg.png')}`}">

						<div class="str__options" v-if="hasSliderSingle">
							<div class="str__num">15</div>
							<div class="str__range str__range--single">
								<span></span>
							</div>
						</div>

						<div class="str__options" v-if="hasLevel">
							<div class="str__img">
								<img :src="require('@img/user_superadmin_inverse.png')" alt="">
							</div>
							<div class="str__label">level</div>
							<div class="str__label" v-if="hasDivision">division</div>
						</div>

						<div class="str__options" v-if="hasRange">
							<div class="str__img">
								<img :src="require('@img/user_superadmin_inverse.png')" alt="">
							</div>
							<div class="str__label str__label--text">10 points</div>
						</div>

					</div>
				</div>

				<div class="str__coll">
					<div class="str__params">
						<div class="str__params">parameter</div>
						<div class="str__params">parameter</div>
						<div class="str__params">parameter</div>
					</div>
					<div class="str__total" :style="{'background-image': `url(${require('@img/card_bg.png')}`}">
						<div class="str__price">1000$</div>
						<div class="str__btn">buy</div>
					</div>
				</div>

				<div class="str__coll">
					<div class="str__block" :style="{'background-image': `url(${require('@img/card_bg.png')}`}">

						<div class="str__options" v-if="hasSliderSingle">
							<div class="str__img">
								<img :src="require('@img/user_superadmin_inverse.png')" alt="">
							</div>
						</div>

						<div class="str__options" v-if="hasSlider">
							<div class="str__num">15</div>
							<div class="str__range str__range--single">
								<span></span>
							</div>
						</div>

						<div class="str__options" v-if="hasLevel && !hasSlider">
							<div class="str__img">
								<img :src="require('@img/user_superadmin_inverse.png')" alt="">
							</div>
							<div class="str__label">level</div>
							<div class="str__label" v-if="hasDivision">division</div>
						</div>

						<div class="str__options" v-if="hasRange">
							<div class="str__img">
								<img :src="require('@img/user_superadmin_inverse.png')" alt="">
							</div>
							<div class="str__label str__label--text">10 points</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'structure-item',
		props: ['constr'],
		data(){
			return{

			}
		},
		computed: {
			hasRange(){
				return this.constr.indexOf('range') !== -1
			},
			hasLevel(){
				return this.constr.indexOf('level') !== -1
			},
			hasDivision(){
				return this.constr.indexOf('division') !== -1
			},
			hasSlider(){
				return this.constr.indexOf('slider') !== -1
			},
			hasSliderSingle(){
				return this.constr.indexOf('slider_single') !== -1
			}
		}
	};
</script>

<style scoped lang=scss>
	.str{
		&__slider{
			height: 30px;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			border-radius: 5px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.3);
			margin-bottom: 15px;
			position: relative;
		}
		&__range{
			position: absolute;
			left: 20px;
			right: 20px;
			top: 50%;
			display: block;
			height: 2px;
			background: $c_main;
			span{
				display: block;
				width: 50%;
				position: absolute;
				height: 2px;
				left: 30%;
				background: $c_alt;
				&:before{
					content: '';
					width: 15px;
					height: 15px;
					right: -0px;
					top: 50%;
					transform: translateY(-50%);
					display: block;
					position: absolute;
					background: #fff;
					box-shadow: 0 1px 8px rgba(0,0,0,0.3);
					border-radius: 50%;
				}
				&:after{
					content: '';
					width: 15px;
					height: 15px;
					left: -0px;
					top: 50%;
					transform: translateY(-50%);
					display: block;
					position: absolute;
					background: #fff;
					box-shadow: 0 1px 8px rgba(0,0,0,0.3);
					border-radius: 50%;
				}
			}
			&--single{
				position: relative;
				top: initial;
				left: 0;
				right: 0;
				span{
					width: 0;
					left: 50%;
					&:after{
						display: none;
					}
				}
			}
		}

		&__grid{
			display: flex;
			margin-left: -5px;
			margin-right: -5px;
		}
		&__coll{
			padding: 0 5px;
			width: 33.333%;
		}
		&__block{
			min-height: 100px;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			border-radius: 5px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.3);
			padding: 10px 5px 5px;
		}
		&__total{
			min-height: 50px;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			border-radius: 5px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.3);
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 8px;
			padding-bottom: 8px;
		}
		&__price{
			font-size: 12px;
			font-weight: bold;
			margin-bottom: 5px;
		}
		&__btn{
			width: 30px;
			height: 15px;
			font-size: 10px;
			background: $c_alt;
			border-radius: 5px;
			color: #fff;
			text-align: center;
		}
		&__params{
			font-size: 12px;
			margin-bottom: 10px;
			text-align: center;
		}
		&__img{
			height: 35px;
			text-align: center;
			line-height: 0;
			margin-bottom: 10px;
			img{
				max-height: 100%;
			}
		}
		&__label{
			background: rgba(255, 255, 255, 0.3);
			border-radius: 5px;
			display: block;
			margin-bottom: 5px;
			font-size: 10px;
			text-transform: uppercase;
			position: relative;
			text-align: left;
			padding: 2px 5px;
			&:before{
				content: "";
				display: block;
				width: 5px;
				height: 5px;
				border-top: 1px solid #313131;
				border-right: 1px solid #313131;
				position: absolute;
				right: 5px;
				top: 6px;
				transform: rotate(135deg);
			}
			&:last-child{
				margin-bottom: 0;
			}
			&--text{
				text-align: center;
				&:before{
					display: none;
				}
			}
		}
		&__num{
			font-size: 20px;
			text-align: center;
			font-weight: bold;
			font-family: $f_alt;
			margin-bottom: 20px;
		}
	}
</style>
