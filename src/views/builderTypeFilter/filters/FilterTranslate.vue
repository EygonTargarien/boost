<template>
	<div class="filter">
		<div class="filter__wrap">
			<div class="filter__itrm">
				<form-select v-model="scoped"
						:options="translate_modules"
						label="Translate modules"
						option_label="key"
						@input="onFilterScope"
						name="filterScoped"></form-select>
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

	import FormSelect from '@form/FormSelect';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('builderTypeFilter');

	export default {
		name: 'filter-translate',
		components: {
			FormSelect,
			VIcon
		},
		data(){
			return {
				scoped: null
			}
		},

		computed: {
			...mapState([
				'filter'
			]),
			translate_modules(){
				return $store.state.common.translate_modules;
			},

			hasActiveFilter () {
				return this.scoped;
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

			onFilterScope(val){
				this.MUTATION_FILTER({
					scope: val ? val.key : null,
				});

				this.$emit('getList');
			},

			onResetFilter(){
				this.scoped = null;

				this.MUTATION_FILTER({
					scope: null,
				});

				this.$emit('getList');
			},

			initCommonData(){
				return Promise.all([
					$store.dispatch('GET_TRANSLATE_MODULES'),

				]).then(() => {
					this.hasInitCommonData = true;
				})
			},

			setFilterData(){
				let filterScope = this.filter.scope;
				if (!filterScope) return;

				this.scoped = find(this.translate_modules, ['key', filterScope])
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
