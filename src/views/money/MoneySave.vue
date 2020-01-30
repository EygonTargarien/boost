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
							<img :src="require('@img/coin.png')" alt="">
						</div>
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} coin package</div>
					</div>

					<div class="grid">
						<div class="grid__coll grid__coll--6">
							<div class="form__item">
								<form-input v-model="cost"
										type="number"
										label="Coins"
										rules="required"
										@enter="onSave"
										name="cost"></form-input>
							</div>
						</div>

						<div class="grid__coll grid__coll--6">
							<div class="form__item">
								<form-input v-model="bonus"
										type="number"
										label="Bonus coins"
										@enter="onSave"
										name="bonus"></form-input>
							</div>
						</div>
					</div>

					<div class="form__item">
						<form-checkbox v-model="hasHot"
								label="Hot package"
								name="hasHot"></form-checkbox>
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
	import FormInput from '@form/FormInput';
	import FormCheckbox from '@form/FormCheckbox';
	import 'vue-awesome/icons/times';
	import VIcon from 'vue-awesome/components/Icon';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('money');

	export default {
		name: 'money-save',
		components:{
			VIcon,
			FormInput,
			FormCheckbox
		},
		props: ['coin'],
		data(){
			return{
				cost: null,
				bonus: null,
				hasHot: null,

				hasLoading: false
			}
		},

		computed:{
			hasEdit(){
				return !!this.coin;
			},
		},

		methods: {
			...mapActions([
				'SAVE_COIN'
			]),

			onSave(){
				this.$validator.validate().then(result => {
					if (result) {
						this.hasLoading = true;

						this.SAVE_COIN({
							id: this.hasEdit ? this.coin.id : null,
							cost: this.cost,
							bonus: this.bonus,
							hasHot: this.hasHot

						}).then(() => {
							this.hasLoading = false;

						}).catch(() => {
							this.hasLoading = false;
							$store.dispatch('COMMON_VALIDATE_ERRORS', {
								err: err,
								validateErrors: this.errors
							});
						})
					}
				});

			}
		}
	};
</script>

<style scoped lang=scss>

</style>
