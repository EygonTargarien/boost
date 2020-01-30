<template>
	<div class="settings__block">
		<div class="settings__head">
			<div class="title">Dark coin course </div>
		</div>

		<div class="form__item">
			<form-input v-model="course"
					name="course"
					@input="hasEdit = true"
					label="Course"></form-input>
		</div>

		<div class="settings__footer">
			<div class="settings__total">
				1$ = <span>{{course}} DC</span>
			</div>

			<button class="btn" @click="onSave" :class="{'has-disabled': !course || !hasEdit}">
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
				course: 225,
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
