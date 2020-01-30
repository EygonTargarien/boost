<template>
	<div class="input input--select" :class="{'has-focus': hasActive, 'has-full': hasFull, 'has-error': errors.has(name)}">
		<multiselect v-model="selectedValues"
				:options="options"
				:multiple="true"
				:closeOnSelect="false"
				:label="option_label"
				tagPlaceholder=""
				selectLabel=""
				deselectLabel=""
				:placeholder="labelText"
				selectedLabel="Selected"
				:track-by="option_id || 'id'"></multiselect>

		<div class="input__clear" v-if="selectedValues" @click="onClear">
			<v-icon name="times"></v-icon>
		</div>

		<label class="input__label" :class="{'has-active': selectedValues}">{{labelText}}</label>

		<span v-if="errors.has(name)" class="input__error">{{errorText || errors.first(name) }}</span>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';
	import VIcon from 'vue-awesome/components/Icon';

	import Multiselect from 'vue-multiselect';

	export default {
		name: 'form-select-tags',
		components: {
			VIcon,
			Multiselect
		},
		inject: ['$validator'],
		props:{
			value: {
				required: true
			},
			options: {
				type: Array,
				required: true
			},
			hasLoadOptions: {
				default: true,
				type: Boolean
			},
			name: {
				type: String,
				required: true
			},
			option_label: String,
			option_id: String,
			type: String,
			label: String,
			rules: String,
			errorText: String
		},
		data(){
			return {
				hasActive: false,
			}
		},

		computed:{
			selectedValues: {
				get(){
					return this.value
				},
				set(val){
					this.$emit('input', val)
				}
			},
			hasFull(){
				return !!this.value;
			},

			labelText(){
				return !this.hasRequired ? this.label : this.label + '*';
			},

			hasRequired(){
				if (this.rules && this.rules.indexOf('required') != -1) return true;
				return false;
			}
		},

		methods:{
			onClear(){
				this.selectedValues = null;
			}
		}
	};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang=scss>
	@import '~@css_template/input.scss';

	.input{
		position: relative;
		&.has-full{
			.multiselect__select{
				&:before{
					display: none;
				}
			}
		}
		&.has-tabs{
			.multiselect{
				min-height: 35px;
			}
			.multiselect__tags{
				padding-top: 10px;
			}
		}
		&--select{
			.input__label{
				z-index: 2;
				display: none;
				&.has-active{
					display: block;
				}
			}
		}
		&__clear {
			width: 40px;
			height: 30px;
			position: absolute;
			z-index: 1;
			right: 0;
			top: 15px;
			background: #fff;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 0;
			&:hover {
				svg {
					fill: $c_alt;
				}
			}
			svg{
				fill: $c_border;
			}

		}

	}


	.multiselect__tags{
		border: none;
		border-bottom: 1px solid $c_border;
		border-radius: 0;
		padding-left: 0;
		background: none;
		padding-top: 4px;
	}
	.multiselect__placeholder{
		padding-left: 0;
		font-size: 14px;
		color: $c_text_light;
		font-weight: normal;
	}
	.multiselect__single{
		margin-bottom: 0;
		line-height: 35px;
		background: none;
	}
	.multiselect__input{
		padding-left: 0;
		margin-bottom: 0;
		line-height: 35px;
		background: none;
	}
	.input__clear{
		background: none;
	}
	.multiselect__content-wrapper{
		&::-webkit-scrollbar {
			width: 12px;
			background-color: #F5F5F5;
		}
		&::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px $c_main_light_3;
			border-radius: 5px;
			background-color: #F5F5F5;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 5px;
			-webkit-box-shadow: inset 0 0 6px $c_main_light_3;
			background-color: #9f9f9f;
		}
	}

	.multiselect__single{
		padding-left: 0;
		font-size: 14px;
		color: $c_text;
		font-weight: normal;
	}
</style>
