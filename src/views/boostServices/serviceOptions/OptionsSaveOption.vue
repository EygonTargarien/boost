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
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} option</div>
					</div>

					<div class="form__item">
						<form-input v-model="title"
								:label="`Name (${lang.code})`"
								:translate="item ? item.title[this.DEFAULT_LANG.code] : null"
								:hasTranslate="hasTranslate"
								rules="required"
								@enter="onSave"
								name="title"></form-input>
					</div>

					<div class="grid">
						<div class="grid__coll">
							<div class="form__item">
								<form-input v-model="value"
										:class="{'has-disabled':  hasEdit}"
										label="Value"
										rules="required"
										@enter="onSave"
										name="value"></form-input>
							</div>
						</div>

						<div class="grid__coll">
							<div class="form__item">
								<form-input v-model="rate"
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
		name: 'options-save-option',
		components: {
			VIcon,
			FormInput,
			FormCheckbox
		},
		props:['item', 'lang', 'saveOption'],
		data(){
			return {
				title: null,
				value: null,
				rate: null,
				is_default: false,
			}
		},

		computed:{
			hasEdit(){
				return !!this.item;
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
			onSave(){
				this.$validator.validate().then(result => {
					if (result) {
						this.saveOption({
							title: assign(this.item ? this.item.title : {}, {
								[this.lang.code]: this.title
							}),
							value: this.value,
							rate: this.rate / 100,
							is_default: this.is_default
						});

						this.$emit('close');
					}
				});
			},

			buildData(){
				let item = this.item;

				this.title = item.title[this.lang.code];
				this.value = item.value;
				this.rate = item.rate ?  item.rate * 100 : null;
				this.is_default = item.is_default;
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
