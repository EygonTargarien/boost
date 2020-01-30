<template>
	<div class="serv">
	<div class="serv__title">calculator type</div>

	<div class="serv__main" v-if="hasLayout" @click="onSaveConstructorType">
		<div class="serv__card">
			<structure-item :constr="selectedConstructor"></structure-item>
			<div class="serv__selected">
				<img :src="require('@img/selected.png')" alt="">
			</div>
		</div>
	</div>

	<div class="serv__add" v-else @click="onSaveConstructorType">
		<v-icon name="plus"></v-icon>
	</div>
</div>
</template>

<script>
	import 'vue-awesome/icons/plus';
	import VIcon from 'vue-awesome/components/Icon';

	import StructureItem from './StructureItem';
	import StructureSave from './StructureSave';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostService');

	export default {
		name: 'structure-index',
		components: {
			StructureItem,
			StructureSave,
			VIcon
		},

		computed: {
			...mapState([
				'service', 'CONSTRUCTOR_TYPES'
			]),

			selectedConstructor(){
				return this.CONSTRUCTOR_TYPES[this.service.item.layout_key]
			},

			hasLayout(){
				return this.service.item.layout_key;
			}
		},

		methods: {
			onSaveConstructorType(){
				this.$modal.show(StructureSave, {}, $MODAL_OPTIONS.big);
			}
		}
	};
</script>

<style scoped lang=scss>
	@import '~@css/template/serv.scss';

	.serv{
		&__card{
			cursor: pointer;
			transition: all 0.3s;
			&:hover{
				.serv__selected{
					img{
						max-width: 180px;
					}

				}
			}
		}
		&__selected{
			max-width: 100%;
			height: 100%;
			align-items: center;
			justify-content: center;
			display: flex;
			img{
				transition: all 0.3s;
				max-width: 160px;
				position: relative;
				z-index: 1;
			}
			
		}
	}
</style>
