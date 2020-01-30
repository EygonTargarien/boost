<template>
	<div class="input" :class="{'has-focus': hasActive, 'has-full': hasFull, 'has-error': errors.has(name)}">
		<textarea ref="area"
				:data-vv-name="name"
				v-validate="rules || ''"
				@focus="hasActive = true"
				@blur="hasActive = false"
				@keyup.enter="$emit('enter')"
				@keyup="$emit('keyup')"
				@input="$emit('input', $event.target.value)"
				class="input__area">{{value}}</textarea>
		<label class="input__label">{{label}}<i v-if="hasRequired">*</i></label>

		<span v-if="errors.has(name)" class="input__error">{{errorText || errors.first(name) }}</span>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/search';
	import VIcon from 'vue-awesome/components/Icon';

	export default {
		name: 'form-text',
		inject: ['$validator'],
		components:{
			VIcon
		},
		props:{
			value: {
				required: true
			},
			name: {
				type: String,
				required: true
			},
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
			hasFull(){
				return !!this.value;
			},

			hasRequired(){
				if (this.rules && this.rules.indexOf('required') != -1) return true;
				return false;
			}
		},

		methods:{
			onClear(){
				if (!this.hasFull) return;
				this.$emit('input', null);
			}
		}

	};
</script>

<style scoped lang=scss>
	@import '~@css_template/input.scss';

	.input{
		&__area{
			padding: 10px 0 0;
			min-height: 80px;
			resize: none;
		}
	}
</style>
