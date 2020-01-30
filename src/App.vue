<template>
	<div id="app">
		<component :is="layout"></component>
	</div>
</template>

<script>
	import DefaultLayout from '@layouts/DefaultLayout';
	import LoginLayout from '@layouts/LoginLayout';
	import ErrorLayout from '@layouts/ErrorLayout';

	export default {
		name: 'app',
		components: {
			DefaultLayout,
			LoginLayout,
			ErrorLayout
		},

		computed:{
			layout(){
				return $store.state.layout;
			},

			hasLogged() {
				return $store.getters.hasLogged;
			}
		},

		watch:{
			$route(to, from){
				this.setLayout(to.meta.layout || 'default-layout');
			}
		},

		created() {
			if (this.hasLogged){
				$axios.defaults.headers.common['Authorization'] = $store.state.auth.token;
			}
		},

		methods:{
			setLayout(newLayout){
				if (this.layout === newLayout) return false;
				$store.commit('SET_LAYOUT', newLayout)
			},
		}
	};
</script>

<style lang="scss">
	@import '~@css/reset.scss';
	@import '~@css/common.scss';

	@import '~@css_template/title.scss';
	@import '~@css_template/btn.scss';
	@import '~@css_template/form.scss';
	@import '~@css_template/section.scss';
	@import '~@css_template/vmodal.scss';

	#app{
		height: 100%;
	}
</style>
