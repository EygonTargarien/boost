<template>
	<div class="checkbox">
		<label class="checkbox__wrap">
			<input type="checkbox"
					class="checkbox__area"
					:name="name"
					:checked="checked"
					@change="$emit('change', $event.target.checked)"
					v-validate="rules || ''">
			<i class="checkbox__icon"></i>
			<span class="checkbox__label">{{label}}</span>
		</label>

		<span v-if="errors.has(name)" class="checkbox__error">{{errorText || errors.first(name) }}</span>
	</div>
</template>

<script>
	export default {
		name: 'form-switcher',
		inject: ['$validator'],
		model: {
			prop: 'checked',
			event: 'change'
		},
		props:{
			checked: {
				required: true
			},
			name: {
				type: String,
				required: true
			},
			type: String,
			label: String,
			rules: String,
			errorText: String
		}
	};
</script>

<style scoped lang=scss>
	@import '~@css_template/checkbox.scss';
</style>
