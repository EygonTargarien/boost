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
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} service options</div>
					</div>

					<div class="grid">
						<div class="grid__coll">
							<div class="form__item">
								<form-input v-model="title"
										:label="`Title (${lang.code})`"
										:translate="option ? option.title[this.DEFAULT_LANG.code] : null"
										:hasTranslate="hasTranslate"
										rules="required"
										@enter="onSave"
										name="title"></form-input>
							</div>
						</div>

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
					</div>

					<div class="serv__title serv__title--initial">
						<span>Options</span>
						<div class="serv__plus" @click="onAddOption(null)">
							<v-icon name="plus"></v-icon>
						</div>
					</div>
					<div class="serv__table">
						<table>
							<thead>
							<tr>
								<th>Name ({{lang.code}})</th>
								<th>Value</th>
								<th>Rate, +%</th>
								<th></th>
							</tr>
							</thead>

							<tbody>
							<tr v-for="item in options" :class="{'has-active': item.is_default}">
								<td>
									<div class="serv__infoBlock">
										<span>{{item.title[lang.code] || '-'}}</span>
										<span v-if="hasTranslate">
												<info-modal title="Original translate"
														side="right"
														:text="item.title[DEFAULT_LANG.code]"></info-modal>
											</span>
									</div>
								</td>
								<td>{{item.value}}</td>
								<td><b>{{+item.rate * 100}}</b></td>
								<td>
									<div class="serv__tableOptions">
										<div class="serv__tableOption" @click="onAddOption(item)">
											<v-icon name="edit"></v-icon>
										</div>

										<div class="serv__tableOption" @click="onDelete(item)">
											<v-icon name="trash-alt"></v-icon>
										</div>
									</div>
								</td>
							</tr>
							</tbody>
						</table>
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
	import {assign, findIndex} from 'lodash';
	import Vue from 'vue';

	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/cubes';
	import VIcon from 'vue-awesome/components/Icon';

	import FormInput from '@form/FormInput';
	import OptionsSaveOption from './OptionsSaveOption';
	import InfoModal from '@components/InfoModal';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostService');

	export default {
		name: 'options-save',
		components: {
			VIcon,
			FormInput,
			InfoModal
		},
		props:['option', 'lang'],
		data(){
			return {
				title: null,
				key: null,
				options: []
			}
		},

		computed:{
			hasEdit(){
				return !!this.option;
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
				'SAVE_SERVICE_OPTION'
			]),

			onSave(){
				this.$validator.validate().then(result => {
					if (result) {
						this.SAVE_SERVICE_OPTION({
							title: assign(this.option ? this.option.title : {}, {
								[this.lang.code]: this.title
							}),
							key: this.key,
							options: this.options
						});
						this.$emit('close');
					}
				});
			},

			onAddOption(item){
				this.$modal.show(OptionsSaveOption, {
					item: item,
					lang: this.lang,
					saveOption: this.saveOption

				}, $MODAL_OPTIONS.default);
			},

			onDelete(item){
				if (confirm('Do you want delete service option?')){
					let index = findIndex(this.option.options, ['value', item.value]);

					Vue.delete(this.options, index);
				}


			},

			resetSelectedAllOptions(){
				this.options.forEach(option => {
					option.is_default = false;
				})
			},

			saveOption(item){
				if (item.is_default){
					this.resetSelectedAllOptions();
				}

				let params = this.option.options,
					index = findIndex(params, ['value', item.value]);

				if (index !== -1){
					Vue.set(params, index, item)
				} else {
					params.push(item);
				}
			},

			buildData(){
				let option = this.option;

				this.title = option.title[this.lang.code];
				this.key = option.key;
				this.options = option.options;
			}
		}
	};
</script>

<style scoped lang=scss>
	@import '~@css/template/serv.scss';

	.serv{
		&__table{
			margin-bottom: 20px;
		}
	}

	tr{
		&.has-active{
			td{
				background: $c_alt_light;
			}
		}
	}
</style>
