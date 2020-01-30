<template>
	<div class="section">
		<div class="container">
			<div class="section__wrap">
				<div class="section__cnt">
					<div class="section__head section__head--table" :class="{'has-navigation': builder.navigations}">
						<div class="title title--section"><span>{{builder.title}}</span></div>

						<div class="section__options" v-if="hasLoadLanguages">
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
						</div>
					</div>

					<div class="section__main">
						<v-table :headers="builder.headers"
								:items="items"
								:pagination="pagination"
								:hasLoadList="hasLoadList"
								:navigations="builder.navigations"
								routeLink="/contacts"
								@editItem="onSave"
								@deleteItem="onDelete"
								@changeLimit="onChangeLimit"
								@changePage="onChangePage"></v-table>
					</div>
				</div>

				<div class="section__sub">
					<div class="section__info">
						<div class="section__infoWrap">
							<component :is="builder.filterComponent" @getList="getList"></component>
						</div>

						<div class="section__footer">
							<button class="btn" @click="onSave()">Create</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {map} from 'lodash';
	import VTable from '@components/VTable';
	import FormSelect from '@form/FormSelect';
	import BuilderSave from './BuilderSave';
	import FilterContact from './filters/FilterContact';
	import FilterTranslate from './filters/FilterTranslate';
	import FilterFaq from './filters/FilterFaq';
	import FilterPromocode from './filters/FilterPromocode';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('builderTypeFilter');

	export default {
		name: 'builder-index',
		components: {
			VTable,
			FormSelect,
			FilterContact,
			FilterTranslate,
			FilterFaq,
			FilterPromocode
		},
		data(){
			return {
				lang: null,

				hasLoadList: false,
				hasLoadLanguages: false,

				builderList: {
					contacts: {
						title: 'Contacts',
						apiKey: 'contacts',
						routeName: 'contacts',
						icon: 'address-card',
						headers:[
							{key:'id', text: 'ID'},
							{key:'role', text: 'Role'},
							{key:'name', text: 'User name'},
							{key:'email', text: 'Email'},
						],
						navigations:['edit', 'show', 'delete'],
						filterDefault:{
							name: null,
							email: null,
							role: null
						},
						routeLink: '/contacts',
						filterComponent: 'FilterContact',
						formComponent: 'FormContact'
					},

					translates:{
						title: 'Translates',
						apiKey: 'translates',
						routeName: 'translates',
						icon: 'book',
						headers:[
							{key:'key', text: 'Key'},
							{key:'text', text: 'Translate'},
							{key:'scope', text: 'Modules', type: 'tabs'},
						],
						navigations:['edit', 'delete'],
						filterDefault:{
							in_detail: 1,
							scope: null
						},
						hasLanguages: true,
						filterComponent: 'FilterTranslate',
						formComponent: 'FormTranslate'
					},

					faq: {
						title: 'FAQ',
						apiKey: 'faq',
						routeName: 'faq',
						icon: 'question-circle',
						headers:[
							{key:'id', text: 'ID'},
							{key:'question', text: 'Question'},
							{key:'answer', text: 'Answer'},
							{key:'type', text: 'Type', type: 'tabs'},
						],
						navigations:['edit', 'delete'],
						filterDefault:{
							type: null,
							search: null
						},
						hasLanguages: true,
						filterComponent: 'FilterFaq',
						formComponent: 'FormFaq'
					},

					promocodes: {
						title: 'Promo codes control',
						apiKey: 'promocodes',
						routeName: 'promoCodes',
						icon: 'percentage',
						headers:[
							{key:'id', text: 'ID'},
							{key:'code', text: 'Code'},
							{key:'rate', text: 'Rate'},
							{key:'status', text: 'Status'},
						],
						filterDefault:{
							code: null
						},
						filterComponent: 'FilterPromocode',
					}
				}
			}
		},

		computed: {
			...mapState([
				'list', 'pagination'
			]),
			...mapGetters([
				'fullFilter'
			]),
			DEFAULT_LANG(){
				return $store.state.DEFAULT_LANG;
			},
			languages(){
				return $store.state.common.languages;
			},

			builderType () {
				return this.$route.meta.builderType
			},

			builder () {
				return this.builderList[this.builderType]
			},

			items(){
				let items = [];

				switch (this.builderType) {
					case 'translates':
						items = map(this.list, item => {
							return {
								key: item.key,
								text: item.text[this.lang ? this.lang.code : null],
								scope: map(item.scopes, scope => {
									return scope.key
								}),
								data: item
							}
						});

						break;

					case 'faq':
						items = map(this.list, item => {
							return {
								id: item.id,
								question: item.question[this.lang ? this.lang.code : null],
								answer: item.answer[this.lang ? this.lang.code : null],
								type: item.types,
								data: item
							}
						});

						break;

					default :
						items = this.list;
				}

				return items;
			}
		},

		created(){
			this.resetStoreModule();
			this.setFilterDefault();

			this.getFilterDataFromUrl();

			if (this.builder.hasLanguages) this.loadLanguageModule();
			this.getList();
		},

		methods:{
			...mapMutations([
				'MUTATION_RESET_MODULE',
				'MUTATION_FILTER'
			]),
			...mapActions([
				'GET_LIST',
				'DELETE_ITEM'
			]),

			onSave(item){
				this.$modal.show(BuilderSave,{
					item: item,
					builder: this.builder,
					getList: this.getList,
					lang: this.lang
				}, $MODAL_OPTIONS.default);
			},

			onDelete(item){
				if (confirm('Do you want delete?')){
					this.DELETE_ITEM({
						id: item.id,
						apiKey: this.builder.apiKey

					}).then(() => {
						this.getList();
					})
				}
			},

			onChangeLimit(newLimit){
				this.MUTATION_FILTER({
					page: 1,
					limit: newLimit
				});
				this.getList();
			},

			onChangePage(newPage){
				this.MUTATION_FILTER({page: newPage});
				this.getList();
			},

			resetStoreModule(){
				this.MUTATION_RESET_MODULE()
			},

			setFilterDefault(){
				console.log(this.builder);
				this.MUTATION_FILTER(this.builder.filterDefault);
			},

			getFilterDataFromUrl(){
				let query = this.$route.query;
				this.MUTATION_FILTER(query);
			},

			replaceUrlPath(){
				$router.replace({ name: this.builder.routeName, query: this.fullFilter }).catch(() => {});
			},

			getList(){
				return this.GET_LIST({
					lang: this.lang ? this.lang.code : null,
					apiKey: this.builder.apiKey

				}).then(() => {
					this.replaceUrlPath();
					this.hasLoadList = true;
				})
			},

			loadLanguageModule(){
				this.lang = this.DEFAULT_LANG;

				$store.dispatch('GET_LANGUAGES').then(() => {
					this.hasLoadLanguages = true;
				})
			}
		}
	};
</script>

<style scoped lang=scss>
	.has-lang{
		width: 200px;
	}
</style>
