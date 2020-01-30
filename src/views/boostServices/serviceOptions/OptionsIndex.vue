<template>
	<div class="serv">
		<div class="serv__title serv__title--initial">
			<span>Service options</span>
			<div class="serv__plus" @click="onSave(null)">
				<v-icon name="plus"></v-icon>
			</div>
		</div>

		<div class="serv__main">
			<div class="board" v-for="option in options">
				<div class="board__head">
					<div class="board__coll">
						<b>Title, ({{lang.code}}):</b>
						<span>{{option.title[lang.code] || '-'}}</span>
						<span v-if="hasTranslate" style="padding-left: 3px">
							<info-modal title="Original translate"
									side="right"
									:text="option.title[DEFAULT_LANG.code]"></info-modal>
						</span>
					</div>
					<div class="board__coll">
						<b>Key:</b>
						<span>{{option.key}}</span>
					</div>
					<div class="board__options">
						<div class="board__option" @click="onSave(option)">
							<v-icon name="edit"></v-icon>
						</div>
						<div class="board__option"  @click="onDelete(option)">
							<v-icon name="trash-alt"></v-icon>
						</div>
					</div>
				</div>

				<div class="board__main">
					<div class="serv__table">
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Value</th>
									<th>Rate, +%</th>
								</tr>
							</thead>

							<tbody>
								<tr v-for="item in option.options" :class="{'has-active': item.is_default}">
									<td>
										<div class="serv__infoBlock">
											<span>{{item.title[lang.code] || '-'}}</span>
											<span v-if="hasTranslate">
												<info-modal title="Original translate"
														side="right"
														:text="item.title[DEFAULT_LANG.code]"></info-modal>
											</span>
										</div>
									</td>
									<td>{{item.value}}</td>
									<td><b>{{+item.rate * 100}}</b></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/trash-alt';
	import 'vue-awesome/icons/edit';
	import VIcon from 'vue-awesome/components/Icon';
	import OptionsSave from './OptionsSave';
	import InfoModal from '@components/InfoModal';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('boostService');

	export default {
		name: 'options-index',
		components:{
			VIcon,
			OptionsSave,
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

			options(){
				return this.service.details.params
			}
		},

		methods: {
			...mapMutations([
				'DELETE_SERVICE_OPTION'
			]),

			onSave(option){
				this.$modal.show(OptionsSave, {option: option, lang: this.lang}, $MODAL_OPTIONS.default);
			},

			onDelete(option){
				if (confirm('Do you want delete service option?')){
					this.DELETE_SERVICE_OPTION(option)
				}
			}
		}
	};
</script>

<style scoped lang=scss>
	@import '~@css/template/serv.scss';
	.serv{
		&__title{
			margin-bottom: 10px;
		}
	}
	tr{
		&.has-active{
			td{
				background: $c_alt_light;
			}
		}
	}

	.board{
		font-size: 13px;
		margin-bottom: 20px;
		&:last-child{
			margin-bottom: 0;
		}
		&__head{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&__coll{
			b{
				display: inline-block;
				margin-right: 5px;
			}
		}
		&__options{
			display: flex;
			align-items: center;
		}
		&__option{
			margin-right: 8px;
			cursor: pointer;
			&:hover{
				svg{
					fill: $c_alt;
				}
			}
			&:last-child{
				margin-right: 0;
			}
		}
	}
</style>
