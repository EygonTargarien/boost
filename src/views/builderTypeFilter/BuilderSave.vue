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
						<component :is="builder.formComponent"
								:item="item"
								:lang="lang"
								:hasLoading="hasLoading"
								:hasEdit="hasEdit"
								@onSave="onSave"></component>
					</div>



				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/address-card';
	import 'vue-awesome/icons/question-circle';
	import 'vue-awesome/icons/percentage';
	import VIcon from 'vue-awesome/components/Icon';

	import FormContact from './forms/FormContact';
	import FormTranslate from './forms/FormTranslate';
	import FormFaq from './forms/FormFaq';

	export default {
		name: 'builder-save',
		components:{
			FormContact,
			FormTranslate,
			FormFaq,
			VIcon
		},
		props: ['item', 'builder', 'getList', 'lang'],
		data(){
			return {
				hasLoading: false,
				hasInitCommonData: false
			}
		},

		computed: {
			hasEdit(){
				return !!this.item;
			},
		},

		methods:{
			onSave(formData){
				this.$validator.validate().then(result => {
					if (result) {
						this.hasLoading = true;

						$axios.post($API(this.builder.apiKey), formData).then(resp => {
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
