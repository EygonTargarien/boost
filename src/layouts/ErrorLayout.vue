<template>
	<div class="wrapper">
		<main class="wrapper__main">
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'error-layout'
	};
</script>

<style scoped>
	.wrapper{
		min-height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
