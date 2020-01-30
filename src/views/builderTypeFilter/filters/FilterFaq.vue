<template>
	<div class="filter">
		<div class="filter__wrap">
			<div class="filter__item">
				<form-input v-model="search"
						name="search"
						label="Keyword question"
						:filterType="true"
						@input="onFilterQuestion"></form-input>
			</div>

			<div class="filter__item">
				<form-select v-model="type"
						:options="faq_types"
						label="Faq type"
						option_label="name"
						option_id="key"
						@input="onFilterType"
						name="type"></form-select>
			</div>
		</div>

		<div class="section__reset" v-if="hasActiveFilter"
				@click="onResetFilter"
				:class="{'has-openMenu' : hasOpenMenu}">
			<span>Reset all filters</span>
			<v-icon name="times"></v-icon>
		</div>
	</div>
</template>

<script>
	import {find} from 'lodash';
	import 'vue-awesome/icons/times';
	import VIcon from 'vue-awesome/components/Icon';

	import FormInput from '@form/FormInput';
	import FormSelect from '@form/FormSelect';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('builderTypeFilter');

	export default {
		name: 'filter-translate',
		components: {
			FormSelect,
			FormInput,
			VIcon
		},
		data(){
			return {
				search: null,
				type: null
			}
		},

		computed: {
			...mapState([
				'filter'
			]),
			faq_types(){
				return $store.state.common.faq_types;
			},

			hasActiveFilter () {
				return this.type;
			},

			hasOpenMenu () {
				return $store.state.hasOpenMenu;
			},
		},


		created(){
			this.initCommonData().then(() => {
				this.setFilterData();
			});

		},

		methods:{
			...mapMutations([
				'MUTATION_FILTER'
			]),

			onFilterQuestion(val){
				this.MUTATION_FILTER({
					search: val || null,
				});

				this.$emit('getList');
			},

			onFilterType(val){
				this.MUTATION_FILTER({
					type: val ? val.key : null,
				});

				this.$emit('getList');
			},

			onResetFilter(){
				this.type = null;

				this.MUTATION_FILTER({
					type: null,
				});

				this.$emit('getList');
			},

			initCommonData(){
				return Promise.all([
					$store.dispatch('GET_FAQ_TYPES'),

				]).then(() => {
					this.hasInitCommonData = true;
				})
			},

			setFilterData(){
				this.search = this.filter.search;

				let filterType = this.filter.type;
				if (!filterType) return;

				this.type = find(this.faq_types, ['key', filterType])
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
