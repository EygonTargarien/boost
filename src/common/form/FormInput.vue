<template>
	<div class="input" :class="{'has-focus': hasActive, 'has-full': hasFull, 'has-error': errors.has(name)}">
		<input :value="value"
				ref="area"
				:data-vv-name="name"
				v-validate="rules || ''"
				:type="type || 'text'"
				@focus="hasActive = true"
				@blur="hasActive = false"
				@keyup.enter="$emit('enter')"
				@keyup="$emit('keyup')"
				@input="$emit('input', $event.target.value)"
				class="input__area">

		<label class="input__label" @click="$refs.area.focus()">
			<span class="input__placeholder">{{label}}<i v-if="hasRequired">*</i></span>
			<span class="input__translate" v-if="hasTranslate">
				<info-modal title="Original translate"
						side="right"
						:text="translate"></info-modal>
			</span>
		</label>

		<div class="input__nav" :class="{'has-active' : hasFull}" v-if="filterType" @click="onClear">
			<v-icon class="icon__close" name="times" v-if="hasFull"></v-icon>
			<v-icon name="search" v-else></v-icon>
		</div>

		<span v-if="errors.has(name)" class="input__error">{{errorText || errors.first(name) }}</span>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/search';
	import VIcon from 'vue-awesome/components/Icon';

	import InfoModal from '@components/InfoModal';

	export default {
		name: 'form-text',
		inject: ['$validator'],
		components:{
			VIcon,
			InfoModal
		},
		props:{
			value: {
				required: true
			},
			name: {
				type: String,
				required: true
			},
			type: String,
			label: String,
			translate: String,
			rules: String,
			filterType: Boolean,
			errorText: String,
			hasTranslate: Boolean
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
		&__placeholder{
			cursor: text;
			display: inline-block;
		}
		&__label{
			pointer-events: initial;
		}
	}
</style>
