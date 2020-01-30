<template>
	<div class="vmodal vmodal--ease">
		<button class="vmodal__close" @click="$emit('close')">
			<v-icon name="times"></v-icon>
		</button>

		<div class="vmodal__container">
			<div class="vmodal__main">
				<div class="form">
					<div class="form__head">
						<div class="form__icon">
							<img :src="require('@img/level.png')" alt="">
						</div>
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} level award</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';
	import VIcon from 'vue-awesome/components/Icon';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('level');

	export default {
		name: 'level-save',
		components: {
			VIcon
		}
	};
</script>

<style scoped lang=scss>

</style>
