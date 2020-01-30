<template>
	<div class="section section--md settings">
		<div class="container">
			<div class="section__head">
				<div class="title title--section"><span>Settings</span></div>
			</div>

			<div class="settings__main">
				<div class="grid">
					<div class="grid__coll grid__coll--4">
						<module-cashback></module-cashback>
					</div>

					<div class="grid__coll grid__coll--4">
						<module-coin-course></module-coin-course>
					</div>

					<div class="grid__coll grid__coll--4">

					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import ModuleCashback from './ModuleCashback';
	import ModuleCoinCourse from './ModuleCoinCourse';

	export default {
		name: 'settings-index',
		components:{
			ModuleCashback,
			ModuleCoinCourse
		}
	};
</script>

<style scoped lang=scss>
	@import '~@css/template/settings.scss';
</style>
