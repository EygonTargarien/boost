<template>
	<div class="wrap">
		<div class="form__item">
			<form-input v-model="key"
					label="Key"
					@enter="onSave"
					name="key"></form-input>
		</div>

		<div class="form__item">
			<form-select-tags v-model="scope_ids"
					class="has-tabs"
					:options="translate_modules"
					label="Translate modules"
					option_label="key"
					name="scope_ids"></form-select-tags>
		</div>

		<div class="info" :class="{'has-active': hasShowInfo && item.data.text[DEFAULT_LANG.code]}">
			<div class="info__block" v-if="hasShowInfo && item.data.text[DEFAULT_LANG.code]">
				<div class="info__title">Original translate in #{{DEFAULT_LANG.name}}</div>
				<div class="info__orignal">{{item.data.text[DEFAULT_LANG.code]}}</div>
			</div>

			<div class="form__item">
				<form-textarea v-model="text"
						:label="`Text translate to #${lang.name}`"
						@enter="onSave"
						name="text"></form-textarea>
			</div>
		</div>

		<div class="form__footer">
			<button class="btn"
					:class="{'has-loading': hasLoading}"
					@click="onSave"><span>{{hasEdit ? 'Edit' : 'Create'}}</span></button>
		</div>
	</div>
</template>

<script>
	import {map} from 'lodash';

	import FormInput from '@form/FormInput';
	import FormTextarea from '@form/FormTextarea';
	import FormSelectTags from '@form/FormSelectTags';

	export default {
		name: 'form-translate',
		components:{
			FormInput,
			FormTextarea,
			FormSelectTags
		},
		props:['item', 'lang', 'hasLoading', 'hasEdit'],
		data(){
			return {
				key: null,
				scope_ids: null,
				text: null,

				hasInitCommonData: false
			}
		},

		computed: {
			DEFAULT_LANG(){
				return $store.state.DEFAULT_LANG;
			},
			translate_modules(){
				return $store.state.common.translate_modules;
			},

			hasShowInfo(){
				return (this.lang.code !== this.DEFAULT_LANG.code) && this.hasEdit
			}
		},

		created(){
			this.initCommonData();

			if (this.hasEdit) this.setData();
		},

		methods: {
			onSave(){
				this.$emit('onSave',{
					key: this.key,
					text: this.text,
					lang: this.lang.code,
					scope_ids: map(this.scope_ids, scope => {
						return scope.id
					})

				})
			},

			initCommonData(){
				return Promise.all([
					$store.dispatch('GET_TRANSLATE_MODULES'),

				]).then(() => {
					this.hasInitCommonData = true;
				})
			},

			setData(){
				let item = this.item;

				this.key =  item.key;
				this.text =  item.data.text[this.lang.code];
				this.scope_ids = item.data.scopes;
			}
		}
	};
</script>

<style scoped lang=scss>
	.info{
		&.has-active{
			background: $c_bg_light;
			padding: 10px;
			border-radius: 5px;
		}
		&__title{
			font-family: $f_alt;
			font-size: 12px;
			text-transform: uppercase;
		}
		&__orignal{
			font-size: 14px;
			background: #fff;
			padding: 5px 10px;
			border-radius: 5px;
		}
		&__block{
			margin-bottom: 20px;
		}
	}
</style>
