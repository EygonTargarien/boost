<template>
	<div class="input" :class="{'has-focus': hasActive, 'has-full': hasFull, 'has-error': errors.has(name)}">
		<select :value="value"
				ref="area"
				class="input__area"
				:data-vv-name="name"
				@focus="hasActive = true"
				@blur="hasActive = false"
				@input="onInput">


			<template v-if="hasLoadOptions">
				<option :value="null" selected disabled hidden></option>
				<option v-for="(option, i) in options" :key="i" :value="option.id">
					{{option[option_label || 'name']}}
				</option>
			</template>
		</select>

		<div class="input__loading" v-if="!hasLoadOptions">
			<icon name="sync-alt" spin></icon>
		</div>

		<label class="input__label">{{label}}<i v-if="hasRequired">*</i></label>

		<span v-if="errors.has(name)" class="input__error">{{errorText || errors.first(name) }}</span>
	</div>
</template>

<script>
	export default {
		name: 'form-select',
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
			hasFull(){
				return !!this.value;
			},

			hasRequired(){
				if (this.rules && this.rules.indexOf('required') != -1) return true;
				return false;
			}
		},

		methods:{
			onInput(event){
				this.$emit('input', event.target.value)
			}
		}
	};
</script>

<style scoped lang=scss>
	@import '~@css_template/input.scss';
</style>
