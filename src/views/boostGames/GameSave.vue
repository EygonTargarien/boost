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
							<v-icon name="gamepad"></v-icon>
						</div>
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} game for boosting</div>
					</div>

					<div class="form__item">
						<form-input v-model="title"
								label="title"
								rules="required"
								@enter="onSave"
								name="title"></form-input>
					</div>

					<div class="grid">
						<div class="grid__coll grid__coll--6">
							<div class="form__item">
								<form-img v-model="icon"></form-img>
							</div>

						</div>
						<div class="grid__coll grid__coll--6">
							<div class="form__item">
								<form-img v-model="icon"></form-img>
							</div>
						</div>
					</div>

					<div class="form__item">
						<form-checkbox v-model="is_active"
								label="Is active"
								name="is_active"></form-checkbox>
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
	import 'vue-awesome/icons/gamepad';
	import VIcon from 'vue-awesome/components/Icon';

	import FormInput from '@form/FormInput';
	import FormImg from '@form/FormImg';
	import FormCheckbox from '@form/FormCheckbox';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostGames');

	export default {
		name: 'game-save',
		components: {
			VIcon,
			FormInput,
			FormImg,
			FormCheckbox
		},
		props: ['game'],
		data(){
			return {
				title: null,
				icon: null,
				picture: null,
				is_active: null,

				hasLoading: false
			}
		},

		computed:{
			hasEdit(){
				return !!this.game;
			},
		},

		created(){
			if(this.hasEdit) this.buildData();
		},

		methods: {
			...mapActions([
				'SAVE_GAME',
				'GET_GAMES'
			]),

			onSave(){
				this.$validator.validate().then(result => {
					if (result) {
						this.hasLoading = true;

						let formData = new FormData;
						formData.append('title', this.title);
						formData.append('icon', this.icon);
						formData.append('picture', this.picture);
						formData.append('is_active', !!this.is_active);

						this.SAVE_GAME(formData).then(() => {
							this.hasLoading = false;

							this.GET_GAMES().then(() => {
								this.$emit('close');
							});

						}).catch(() => {
							this.hasLoading = false;
							$store.dispatch('COMMON_VALIDATE_ERRORS', {
								err: err,
								validateErrors: this.errors
							});
						})
					}
				});
			},

			buildData(){
				let game = this.game;

				this.title = game.title;
				this.is_active = +game.is_active;
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
