<template>
	<div class="serv">
		<div class="serv__title serv__title--initial">
			<span>Order options</span>
			<div class="serv__plus" @click="onSave(null)">
				<v-icon name="plus"></v-icon>
			</div>
		</div>

		<div class="serv__main">
			<div class="serv__table">
				<table>
					<thead>
					<tr>
						<th>Title ({{lang.code}})</th>
						<th>Key</th>
						<th>Rate, +%</th>
						<th></th>
					</tr>
					</thead>

					<tbody>
						<tr v-for="param in params" :class="{'has-active': param.is_default}">
							<td>
								<div class="serv__infoBlock">
									<span>{{param.title[lang.code] || '-'}}</span>
									<span v-if="hasTranslate">
										<info-modal title="Original translate"
												side="right"
												:text="param.title[DEFAULT_LANG.code]"></info-modal>
									</span>
								</div>
							</td>
							<td>{{param.key}}</td>
							<td><b>{{param.rate * 100}}</b></td>
							<td>
								<div class="serv__tableOptions">
									<div class="serv__tableOption" @click="onSave(param)">
										<v-icon name="edit"></v-icon>
									</div>

									<div class="serv__tableOption" @click="onDelete(param)">
										<v-icon name="trash-alt"></v-icon>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/trash-alt';
	import 'vue-awesome/icons/edit';
	import VIcon from 'vue-awesome/components/Icon';

	import ParamsSave from './ParamsSave';
	import InfoModal from '@components/InfoModal';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostService');

	export default {
		name: 'params-index',
		components: {
			VIcon,
			InfoModal
		},
		props: ['lang'],

		computed: {
			...mapState([
				'service',
			]),
			DEFAULT_LANG(){
				return $store.state.DEFAULT_LANG;
			},

			hasTranslate(){
				return 	this.lang.code !== this.DEFAULT_LANG.code
			},

			params(){
				return this.service.details.order_params
			}
		},

		methods: {
			...mapMutations([
				'DELETE_ORDER_OPTION'
			]),

			onSave(param){
				this.$modal.show(ParamsSave, {param: param, lang:this.lang}, $MODAL_OPTIONS.default);
			},

			onDelete(param){
				if (confirm('Do you want delete order option?')){
					this.DELETE_ORDER_OPTION(param)
				}
			}
		}

	};
</script>

<style scoped lang=scss>
	@import '~@css/template/serv.scss';

	tr{
		&.has-active{
			td{
				background: $c_alt_light;
			}
		}
	}
</style>
