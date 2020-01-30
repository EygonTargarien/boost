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
							<v-icon name="cubes"></v-icon>
						</div>
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} order option</div>
					</div>

					<div class="form__item">
						<form-input v-model="title"
								:label="`Title (${lang.code})`"
								:translate="param ? param.title[this.DEFAULT_LANG.code] : null"
								:hasTranslate="hasTranslate"
								rules="required"
								@enter="onSave"
								name="title"></form-input>
					</div>

					<div class="grid">
						<div class="grid__coll">
							<div class="form__item">
								<form-input v-model="key"
										:class="{'has-disabled':  hasEdit}"
										label="Key"
										rules="required"
										@enter="onSave"
										name="key"></form-input>
							</div>
						</div>

						<div class="grid__coll">
							<div class="form__item">
								<form-input v-model="rate"
										type="number"
										label="Rate, %"
										@enter="onSave"
										name="rate"></form-input>
							</div>
						</div>
					</div>

					<div class="form__item">
						<form-checkbox v-model="is_default"
								label="Is default selected"
								name="is_default"></form-checkbox>
					</div>

					<div class="form__footer">
						<button class="btn"
								@click="onSave"><span>{{hasEdit ? 'Edit' : 'Create'}}</span></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {assign} from 'lodash';

	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/cubes';
	import VIcon from 'vue-awesome/components/Icon';

	import FormInput from '@form/FormInput';
	import FormCheckbox from '@form/FormCheckbox';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostService');

	export default {
		name: 'params-save',
		components: {
			VIcon,
			FormInput,
			FormCheckbox
		},
		props:['param', 'lang'],

		data(){
			return {
				title: null,
				key: null,
				rate: null,
				is_default: false
			}
		},

		watch:{
			lang(){
				this.title = param.title[this.lang.code];
			}
		},

		computed:{
			hasEdit(){
				return !!this.param;
			},

			DEFAULT_LANG(){
				return $store.state.DEFAULT_LANG;
			},

			hasTranslate(){
				return 	(this.lang.code !== this.DEFAULT_LANG.code) && this.hasEdit
			},
		},

		created(){
			if(this.hasEdit) this.buildData();
		},

		methods: {
			...mapMutations([
				'SAVE_ORDER_OPTION'
			]),

			onSave(){
				this.$validator.validate().then(result => {
					if (result) {
						this.SAVE_ORDER_OPTION({
							title: assign(this.param ? this.param.title : {}, {
								[this.lang.code]: this.title
							}),
							key: this.key,
							rate: this.rate / 100,
							is_default: this.is_default
						});
						this.$emit('close');
					}
				});

			},

			buildData(){
				let param = this.param;

				this.title = param.title[this.lang.code];
				this.key = param.key;
				this.rate = param.rate ?  param.rate * 100 : null;
				this.is_default = param.is_default;
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
