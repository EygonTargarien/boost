<template>
	<div class="settings__block">
		<div class="settings__head">
			<div class="title">Cashback after purchase</div>
		</div>

		<div class="form__item">
			<form-input v-model="rate"
					name="rate"
					@input="hasEdit = true"
					label="Rate"></form-input>
		</div>

		<div class="settings__footer">
			<div class="settings__total">
				Cashback - <span>{{rate}}%</span>
			</div>

			<button class="btn" @click="onSave" :class="{'has-disabled': !rate || !hasEdit}">
				<span>Aplay</span>
			</button>
		</div>
	</div>
</template>

<script>
	import FormInput from '@form/FormInput';

	export default {
		name: 'module-cashback',
		components:{
			FormInput
		},
		data(){
			return{
				rate: 5,
				hasEdit: false
			}
		},

		methods: {
			onSave(){
				this.hasEdit = false;
			}
		}
	};
</script>

<style scoped lang=scss>
	@import '~@css/template/settings.scss';
</style>
