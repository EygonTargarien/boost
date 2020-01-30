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
							<img :src="require('@img/achivement.png')" alt="">
						</div>
						<div class="form__title">{{hasEdit ? 'Edit' : 'Create'}} coin package</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';
	import VIcon from 'vue-awesome/components/Icon';

	export default {
		name: 'acivement-save',
		props: ['achievement'],
		components:{
			VIcon
		},

		computed:{
			hasEdit(){
				return !!this.coin;
			},
		},
	};
</script>

<style scoped lang=scss>

</style>
