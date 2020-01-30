<template>
	<div class="vmodal vmodal--ease">
		<button class="vmodal__close" @click="$emit('close')">
			<v-icon name="times"></v-icon>
		</button>

		<div class="vmodal__container">
			<div class="vmodal__main">
				<div class="form">
					<div class="form__head">
						<div class="form__icon">
							<v-icon :name="builder.icon"></v-icon>
						</div>
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} {{builder.title}}</div>
					</div>

					<div class="form__main">
						<div class="form__item" v-for="form in builder.form">

							<template v-if="form.type === 'textarea'">
								<form-textarea v-model="formData[form.key]"
										:label="form.label"
										:name="form.key"
										@enter="onSave"></form-textarea>
							</template>

							<template v-else>
								<form-input v-model="formData[form.key]"
										:label="form.label"
										:name="form.key"
										@enter="onSave"></form-input>
							</template>

						</div>


					</div>

					<div class="form__footer">
						<button class="btn"
								:class="{'has-loading': hasLoading}"
								@click="onSave"><span>{{hasEdit ? 'Edit' : 'Create'}}</span></button>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/book';
	import VIcon from 'vue-awesome/components/Icon';
	import FormInput from '@form/FormInput';
	import FormTextarea from '@form/FormTextarea';

	export default {
		name: 'builder-save',
		props: ['item', 'builder', 'getList'],
		components:{
			VIcon,
			FormInput,
			FormTextarea
		},
		data(){
			return {
				formData:{
					id: this.item ? this.item.id : null
				},

				hasLoading: false
			}
		},

		computed: {
			hasEdit(){
				if (!this.item) return false;
				return !!Object.keys(this.item).length;
			},
		},

		created(){
			this.builder.form.forEach(form => {
				this.$set(this.formData, form.key, this.hasEdit ? this.item[form.key] : null);
			})
		},

		methods:{
			onSave(){
				this.$validator.validate().then(result => {
					if (result) {
						this.hasLoading = true;

						$axios.post($API(this.builder.apiKey), this.formData).then(resp => {
							this.getList().then(() => {
								this.$emit('close');
								this.hasLoading = false;
							})

						}).catch(err => {
							this.hasLoading = false;

							$store.dispatch('COMMON_VALIDATE_ERRORS', {
								err: err,
								validateErrors: this.errors
							});
						});
					}
				});
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
