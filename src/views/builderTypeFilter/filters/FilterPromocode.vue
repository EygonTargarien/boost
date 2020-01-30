<template>
	<div class="filter">
		<div class="filter__wrap">
			<div class="filter__item">
				<form-input v-model="code"
						name="code"
						label="Promocode key"
						:filterType="true"
						@input="onFilterCode"></form-input>
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
	import FormInput from '@form/FormInput';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('builderTypeFilter');

	export default {
		name: 'filter-promocode',
		components: {
			FormInput
		},
		data(){
			return {
				code: null
			}
		},

		computed: {
			...mapState([
				'filter'
			]),

			hasActiveFilter () {
				return this.code;
			},

			hasOpenMenu () {
				return $store.state.hasOpenMenu;
			},
		},

		methods: {
			...mapMutations([
				'MUTATION_FILTER'
			]),

			onFilterCode(val){
				this.MUTATION_FILTER({
					code: val || null,
				});

				this.$emit('getList');
			},

			onResetFilter(){
				this.code = null;

				this.MUTATION_FILTER({
					code: null,
				});

				this.$emit('getList');
			},

			setFilterData(){
				this.code = this.filter.code;
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
