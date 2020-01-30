<template>
	<div class="filter">
		<div class="filter__wrap">
			<div class="filter__item">
				<form-input v-model="filter_area"
						name="filter_area"
						label="Login/Email"
						:filterType="true"
						@input="onFilterArea"></form-input>
			</div>

			<div class="filter__item">
				<form-select v-model="role"
						:options="roles"
						label="Role"
						option_label="name"
						@input="onFilterRole"
						name="role"></form-select>
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
	import {map} from 'lodash';
	import 'vue-awesome/icons/times';
	import VIcon from 'vue-awesome/components/Icon';
	import FormInput from '@form/FormInput';
	import FormSelect from '@form/FormSelect';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('builderTypeFilter');

	export default {
		name: 'filter-contact',
		components:{
			VIcon,
			FormInput,
			FormSelect
		},
		data(){
			return {
				role: null,
				filter_area: null,

				hasInitCommonData: false
			}
		},

		computed: {
			...mapState([
				'filter'
			]),

			roles(){
				return map($store.state.common.roles, role => {
					return {
						name: role[0].toUpperCase() + role.substr(1),
						id: role
					}
				})
			},

			hasActiveFilter () {
				return this.filter_area || this.role
			},

			hasOpenMenu () {
				return $store.state.hasOpenMenu;
			},
		},

		created(){
			this.initCommonData();
			this.setFilterData();
		},

		methods:{
			...mapMutations([
				'MUTATION_FILTER'
			]),

			onFilterArea(val){
				if (!val) {
					this.MUTATION_FILTER({
						name: null,
						email: null
					});

				} else {
					let hasMail = val.search(/@/);
					hasMail != -1 ? this.MUTATION_FILTER({
						name: null,
						email: val
					}) : this.MUTATION_FILTER({
						name: val,
						email: null
					});
				}

				this.$emit('getList');
			},

			onFilterRole(){
				this.MUTATION_FILTER({
					role: this.role ? this.role.id : null
				});

				this.$emit('getList');
			},

			onResetFilter(){
				this.filter_area = null;
				this.role = null;

				this.MUTATION_FILTER({
					name: null,
					email: null,
					role: null
				});

				this.$emit('getList');
			},

			initCommonData(){
				return Promise.all([
					$store.dispatch('GET_ROLES'),

				]).then(() => {
					this.hasInitCommonData = true;
				})
			},

			setFilterData(){
				this.filter_area = this.filter.name || this.filter.email || null;

				let role = this.filter.role;
				if (role){
					this.role = {
						name:  role[0].toUpperCase() + role.substr(1),
						id: role
					}
				}

			}
		}
	};
</script>

<style scoped lang=scss>

</style>
