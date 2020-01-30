<template>
	<div class="login">
		<div class="form">
			<div class="form__head">
				<div class="form__icon">
					<v-icon name="sign-in-alt"></v-icon>
				</div>
				<div class="form__title">CRM BOOSTING</div>
			</div>

			<div class="form__item">
				<form-input v-model="formData.name"
						label="Login"
						rules="required"
						@enter="onLogin"
						name="name"></form-input>
			</div>

			<div class="form__item">
				<form-input v-model="formData.password"
						type="password"
						label="Password"
						rules="required"
						@enter="onLogin"
						name="password"></form-input>
			</div>

			<div class="form__footer">
				<button class="btn"
						:class="{'has-loading': hasLoading}"
						@click="onLogin"><span>Войти</span></button>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/sign-in-alt';
	import VIcon from 'vue-awesome/components/Icon'

	import FormInput from '@common/form/FormInput';

	export default {
		name: 'login-index',
		components: {
			VIcon,
			FormInput
		},
		data () {
			return {
				formData:{
					name: null,
					password: null,
				},

				hasLoading: false
			};
		},

		created () {
			$store.commit('SET_LAYOUT', $store.state.LAYOUT_LOGIN);
		},

		methods: {
			onLogin () {
				this.$validator.validate().then(result => {
					if (result) {
						this.hasLoading = true;

						$store.dispatch('AUTH_LOGIN',this.formData).then(() => {
							this.hasLoading = false;
							this.$router.push({name: 'dashboard'});

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
	.login {
		max-width: 550px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
		&__error {
			height: 30px;
			text-align: center;
		}
	}
</style>
