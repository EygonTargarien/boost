<template>
	<div class="wrap">
		<div class="form__group">
			<div class="grid">
				<div class="grid__coll grid__coll--6">
					<div class="form__item">
						<form-input v-model="name"
								label="Login"
								rules="required"
								@enter="onSave"
								name="name"></form-input>
					</div>
				</div>

				<div class="grid__coll grid__coll--6">
					<div class="form__item" :class="{'has-disabled': !hasInitCommonData}">
						<form-select v-model="role"
								:options="roles"
								label="Role"
								rules="required"
								option_label="name"
								name="role"></form-select>
					</div>
				</div>
			</div>

			<div class="grid" v-if="!hasEdit">
				<div class="grid__coll grid__coll--6">
					<div class="form__item">
						<form-input v-model="password"
								type="password"
								label="Password"
								rules="required"
								@enter="onSave"
								name="password"></form-input>
					</div>
				</div>

				<div class="grid__coll grid__coll--6">
					<div class="form__item">
						<form-input v-model="password_confirmation"
								type="password"
								label="Confirm password"
								rules="required"
								@enter="onSave"
								name="password_confirmation"></form-input>
					</div>
				</div>
			</div>
		</div>

		<div class="form__item" :class="{'has-disabled': !hasInitCommonData}">
			<form-select v-model="country"
					:options="countries"
					label="Country"
					rules="required"
					option_label="title"
					name="country_id"></form-select>
		</div>

		<div class="form__item">
			<form-input v-model="email"
					label="Email"
					@enter="onSave"
					name="email"></form-input>
		</div>

		<div class="form__item">
			<form-input v-model="skype"
					label="Skype (optional)"
					@enter="onSave"
					name="skype"></form-input>
		</div>

		<div class="form__footer">
			<button class="btn"
					:class="{'has-loading': hasLoading}"
					@click="onSave"><span>{{hasEdit ? 'Edit' : 'Create'}}</span></button>
		</div>
	</div>
</template>

<script>
	import {map} from 'lodash';

	import FormInput from '@form/FormInput';
	import FormSelect from '@form/FormSelect';

	export default {
		name: 'form-contact',
		components:{
			FormInput,
			FormSelect
		},
		props:['item', 'hasLoading', 'hasEdit'],
		data(){
			return {
				name: null,
				role: null,
				skype: null,
				country: null,
				email: null,
				password: null,
				password_confirmation: null,

				hasInitCommonData: false
			}
		},

		computed:{
			countries(){
				return $store.state.common.countries;
			},
			roles(){
				return map($store.state.common.roles, role => {
					return {
						name: role[0].toUpperCase() + role.substr(1),
						id: role
					}
				})
			},
		},

		created(){
			this.initCommonData();

			if (this.hasEdit) this.setData();
		},

		methods:{
			onSave(){
				this.$emit('onSave',{
					id: this.hasEdit ? this.item.id : null,
					name: this.name,
					role: this.role ? this.role.id : null,
					skype : this.skype,
					country_id : this.country ? this.country.id : null,
					email : this.email,
					password : this.password,
					password_confirmation : this.password_confirmation,
					is_verified: 1
				})
			},

			initCommonData(){
				return Promise.all([
					$store.dispatch('GET_COUNTRIES'),
					$store.dispatch('GET_ROLES')

				]).then(() => {
					this.hasInitCommonData = true;
				})
			},

			setData(){
				let item = this.item;

				this.name =  item.name;
				this.skype =  item.skype;
				this.email =  item.email;
				this.country =  item.country;

				this.role =  {
					id: item.role,
					name: item.role
				};
			}
		},


	};
</script>

<style scoped lang=scss>

</style>
