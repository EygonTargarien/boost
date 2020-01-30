<template>
	<div class="section">
		<div class="container">
			<div class="section__head">
				<div class="title title--section service__mainTitle">
					<div class="service__logo" :style="{'background-image': `url(${require('@img/card_bg.png')}`}">
						<img :src="game.logo" alt="">
						<span>{{game.title}}</span>
					</div>
					<div class="service__title">
						<form-text-edit	v-model="title"
								class="has-service"
								:label="`Service title (${lang.code})`"
								:translate="service.item.title[this.DEFAULT_LANG.code]"
								:hasTranslate="hasTranslate"
								name="title"></form-text-edit>
					</div>
				</div>
				<div class="section__options">
					<div class="section__option">
						<div class="service__status">
							<form-checkbox v-model="is_active"
									class="_m-0"
									label="Active"
									name="is_active"></form-checkbox>
						</div>

					</div>
					<div class="section__option has-lang">
						<form-select v-model="lang"
								class="_m-0"
								:notEmpty="true"
								:options="languages"
								label="Language"
								option_label="name"
								option_id="code"
								name="language"></form-select>
					</div>

					<div class="section__option">
						<router-link class="btn" :to="`/boost-games/${service.game_id}`">Back to services</router-link>
					</div>
				</div>
			</div>

			<div class="service">
				<div class="service__main">
					<div class="service__empty" v-if="!hasConstructorType">
						<info-msg type="warning">
							<p>Select calculator structure</p>
						</info-msg>
					</div>
				</div>

				<div class="service__side">
					<div class="service__item">
						<structure-index></structure-index>
					</div>

					<div class="service__item">
						<service-namespaced :lang="lang"></service-namespaced>
					</div>

					<div class="service__item">
						<params-index :lang="lang"></params-index>
					</div>

					<div class="service__item">
						<options-index :lang="lang"></options-index>
					</div>

					<div class="service__item">
						<regions-index :lang="lang"></regions-index>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import FormSelect from '@form/FormSelect';
	import FormCheckbox from '@form/FormCheckbox';
	import FormTextEdit from '@form/FormTextEdit';
	import InfoMsg from '@components/InfoMsg';

	import StructureIndex from './structure/StructureIndex';
	import ServiceNamespaced from './ServiceNamespaced';
	import ParamsIndex from './orderParams/ParamsIndex';
	import OptionsIndex from './serviceOptions/OptionsIndex';
	import RegionsIndex from './regions/RegionsIndex';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostService');

	export default {
		name: 'service-index',
		components: {
			FormSelect,
			FormTextEdit,
			FormCheckbox,
			StructureIndex,
			RegionsIndex,
			ServiceNamespaced,
			ParamsIndex,
			OptionsIndex,
			InfoMsg
		},
		props:['id'],
		data(){
			return{
				lang: null,

				hasLoadService: false,
				hasLoadInitData: false
			}
		},

		computed:{
			...mapState([
				'service', 'game'
			]),
			DEFAULT_LANG(){
				return $store.state.DEFAULT_LANG;
			},
			languages(){
				return $store.state.common.languages;
			},

			hasTranslate(){
				return 	this.lang.code !== this.DEFAULT_LANG.code
			},

			hasConstructorType(){
				return this.service.item.layout_key;
			},

			title:{
				get(){
					return this.service.item.title[this.lang.code]
				},
				set(val){
					this.SET_SERVICE_TITLE({
						lang: this.lang.code,
						title: val
					})
				}
			},

			is_active:{
				get(){
					return this.service.item.is_active
				},
				set(val){
					this.SET_SERVICE_ACTIVE(val);
				}
			}
		},

		created(){
			this.lang = this.DEFAULT_LANG;

			this.initCommonData();
			this.getService();
		},

		methods: {
			...mapMutations([
				'SET_SERVICE_TITLE',
				'SET_SERVICE_ACTIVE'
			]),
			...mapActions([
				'GET_SERVICE',
				'GET_GAME'
			]),

			getService(){
				this.GET_SERVICE(this.id).then(() => {
					this.hasLoadService = false
				})
			},

			initCommonData(){
				return Promise.all([
					$store.dispatch('GET_LANGUAGES'),
					this.GET_GAME()

				]).then(() => {
					this.hasInitCommonData = true;
				})
			}
		}
	};
</script>

<style scoped lang=scss>
	.service{
		display: flex;
		&__mainTitle{
			display: flex;
			align-items: center;
		}
		&__item{
			margin-bottom: 50px;
		}
		&__logo{
			margin-right: 20px;
			background: #fff;
			text-align: center;
			padding: 8px 10px 5px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.3);
			display: flex;
			flex-direction: column;
			align-items: center;
			border-radius: 5px;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			img{
				max-width: 70px;
			}
			span{
				font-size: 11px;
				white-space: nowrap;
			}
		}
		&__main{
			width: 70%;
			padding-right: 40px;
		}
		&__side{
			width: 30%;
		}
		&__empty{
			padding-top: 10px;
		}
		&__status{
			padding-top: 15px;
		}
	}

	.has-lang{
		width: 200px;
	}
</style>
