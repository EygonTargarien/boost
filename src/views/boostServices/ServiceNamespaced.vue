<template>
	<div class="serv">
		<div class="serv__title">Text in the calculator</div>

		<div class="serv__main">
			<div class="form__item">
				<form-text-edit	v-model="block_one_title"
						:label="`Current block title (${lang.code})`"
						:translate="service.item.block_one_title[this.DEFAULT_LANG.code]"
						:hasTranslate="hasTranslate"
						name="block_one_title"></form-text-edit>
			</div>

			<div class="form__item">
				<form-text-edit	v-model="block_two_title"
						:label="`Desired block title (${lang.code})`"
						:translate="service.item.block_two_title[this.DEFAULT_LANG.code]"
						:hasTranslate="hasTranslate"
						name="block_two_title"></form-text-edit>
			</div>
		</div>
	</div>
</template>

<script>
	import FormTextEdit from '@form/FormTextEdit';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostService');

	export default {
		name: 'service-namespaced',
		components:{
			FormTextEdit
		},
		props: ['lang'],

		computed: {
			...mapState([
				'service',
			]),
			DEFAULT_LANG(){
				return $store.state.DEFAULT_LANG;
			},

			hasTranslate(){
				return 	this.lang.code !== this.DEFAULT_LANG.code
			},

			block_one_title: {
				get () {
					return this.service.item.block_one_title[this.lang.code]
				},
				set (val) {
					this.SET_SERVICE_BLOCK_ONE_TITLE({
						lang: this.lang.code,
						title: val
					})
				}
			},

			block_two_title: {
				get () {
					return this.service.item.block_two_title[this.lang.code]
				},
				set (val) {
					this.SET_SERVICE_BLOCK_TWO_TITLE({
						lang: this.lang.code,
						title: val
					})
				}
			}
		},

		methods: {
			...mapMutations([
				'SET_SERVICE_BLOCK_ONE_TITLE',
				'SET_SERVICE_BLOCK_TWO_TITLE'
			])
		}
	};
</script>

<style scoped lang=scss>
	@import '~@css/template/serv.scss';
</style>
