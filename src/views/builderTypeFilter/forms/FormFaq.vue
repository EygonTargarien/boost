<template>
	<div class="wrap">
		<div class="form__item">
			<form-select-tags v-model="types"
					class="has-tabs"
					:options="faq_types"
					label="Faq type"
					option_label="name"
					option_id="key"
					name="types"></form-select-tags>
		</div>

		<div class="info" :class="{'has-active': hasShowInfo && item.data.question[DEFAULT_LANG.code]}">
			<div class="info__block" v-if="hasShowInfo && item.data.question[DEFAULT_LANG.code]">
				<div class="info__title">Question, original in #{{DEFAULT_LANG.name}}</div>
				<div class="info__orignal">{{item.data.question[DEFAULT_LANG.code]}}</div>
			</div>

			<div class="form__item">
				<form-textarea v-model="question"
						:label="`Question, #${lang.name}`"
						@enter="onSave"
						name="text"></form-textarea>
			</div>
		</div>

		<div class="info" :class="{'has-active': hasShowInfo && item.data.answer[DEFAULT_LANG.code]}">
			<div class="info__block" v-if="hasShowInfo && item.data.answer[DEFAULT_LANG.code]">
				<div class="info__title">Answer, original in #{{DEFAULT_LANG.name}}</div>
				<div class="info__orignal">{{item.data.answer[DEFAULT_LANG.code]}}</div>
			</div>

			<div class="form__item">
				<form-textarea v-model="answer"
						:label="`Answer, #${lang.name}`"
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
	import {map, find} from 'lodash';

	import FormInput from '@form/FormInput';
	import FormTextarea from '@form/FormTextarea';
	import FormSelectTags from '@form/FormSelectTags';

	export default {
		name: 'form-faq',
		components:{
			FormInput,
			FormTextarea,
			FormSelectTags
		},
		props:['item', 'lang', 'hasLoading', 'hasEdit'],
		data(){
			return {
				types: null,
				question: null,
				answer: null,

				hasInitCommonData: false
			}
		},

		computed: {
			DEFAULT_LANG(){
				return $store.state.DEFAULT_LANG;
			},
			faq_types(){
				return $store.state.common.faq_types;
			},

			hasShowInfo(){
				return (this.lang.code !== this.DEFAULT_LANG.code) && this.hasEdit
			}
		},

		created(){
			this.initCommonData().then(() => {
				if (this.hasEdit) this.setData();
			});


		},

		methods: {
			onSave(){
				this.$emit('onSave',{
					id: this.hasEdit ? this.item.id : null,
					answer:{
						[this.lang.code]: this.answer
					},
					question: {
						[this.lang.code]: this.question
					},
					types: map(this.types, type => {
						return type.key
					})

				})
			},

			initCommonData(){
				return Promise.all([
					$store.dispatch('GET_FAQ_TYPES'),

				]).then(() => {
					this.hasInitCommonData = true;
				})
			},

			setData(){
				let item = this.item;

				this.answer =  item.data.answer[this.lang.code];
				this.question =  item.data.question[this.lang.code];

				this.types = map(item.data.types, type => {
					return find(this.faq_types, ['key', type])
				})
			}
		}
	};
</script>

<style scoped lang=scss>
	.info{
		margin-bottom: 20px;
		&.has-active{
			background: $c_bg_light;
			padding: 10px;
			border-radius: 5px;
			box-shadow: 0 1px 8px rgba(0,0,0,0.2);
		}
		&__title{
			font-family: $f_alt;
			font-size: 12px;
			text-transform: uppercase;
			margin-bottom: 5px;
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
