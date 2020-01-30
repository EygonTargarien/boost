<template>
	<div class="input">
		<input type="file"
				@click="onChange"
				class="input__area">
	</div>
</template>

<script>
	export default {
		name: 'form-img',

		methods:{
			onChange(e){
				let file =  e.target.files[0];
				this.$emit('input', file)
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
