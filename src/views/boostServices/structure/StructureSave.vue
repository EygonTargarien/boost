<template>
	<div class="vmodal vmodal--ease">
		<button class="vmodal__close" @click="$emit('close')">
			<v-icon name="times"></v-icon>
		</button>

		<div class="vmodal__container">
			<div class="vmodal__main">
				<div class="form">
					<div class="form__head">
						<div class="form__icon">
							<v-icon name="cubes"></v-icon>
						</div>
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} structure type</div>
					</div>

					<div class="const">
						<ul class="const__list">
							<li class="const__item" v-for="(type, key) in CONSTRUCTOR_TYPES">
								<div class="const__card"
										:class="{'has-active': key === service.item.layout_key}"
										@click="onSetConstructorType(key)">

									<structure-item :constr="type"></structure-item>

									<div class="const__selected">
										<img :src="require('@img/selected.png')" alt="">
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/cubes';
	import VIcon from 'vue-awesome/components/Icon';
	import StructureItem from './StructureItem';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostService');

	export default {
		name: 'structure-save',
		components:{
			VIcon,
			StructureItem
		},

		computed: {
			...mapState([
				'CONSTRUCTOR_TYPES',
				'service'
			]),

			hasEdit(){
				return !!this.service.item.layout_key;
			}
		},

		methods: {
			...mapMutations([
				'SET_CONSTRUCTOR_TYPE'
			]),

			onSetConstructorType(key){
				if (this.hasEdit) {
					if (confirm('Attention! Changing the type of calculator, data will be lost !!!')) {
						this.setType(key);
					}

				} else {
					this.setType(key);
				}
			},

			setType(key){
				this.SET_CONSTRUCTOR_TYPE(key);
				this.$emit('close');
			}
		}
	};
</script>

<style scoped lang=scss>
	.const{
		padding-top: 20px;
		&__list{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-left: -15px;
			margin-right: -15px;
		}
		&__item{
			padding: 0 15px;
			margin-bottom: 30px;
			width: 33.333%;
		}
		&__card{
			background: #fff;
			padding: 20px 10px;
			border-radius: 5px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.2);
			position: relative;
			cursor: pointer;
			transition: all 0.3s;
			&.has-active{
				pointer-events: none;
				box-shadow: 0 3px 10px rgba(0,0,0,0.4);
				&:before{
					background: rgba(0,0,0,0.0);
				}
				.const__selected{
					display: block;
				}
			}
			&:hover{
				box-shadow: 0 3px 10px rgba(0,0,0,0.4);
			}
			&:before{
				content: '';
				display: block;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				position: absolute;
				border-radius: 5px;
				background: rgba(0,0,0,0.15);
			}
		}
		&__selected{
			display: none;
			max-width: 160px;
			width: 100%;
			font-weight: bold;
			font-family: $f_alt;
			color: $c_alt;
			font-size: 30px;
			text-transform: uppercase;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
