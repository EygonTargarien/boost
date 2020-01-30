<template>
	<div class="section section--sm">
			<div class="container">
				<div class="section__head section__head--table" :class="{'has-navigation': builder.navigations}">
					<div class="title title--section"><span>{{builder.title}}</span></div>

					<div class="section__options" v-if="hasSaveMode">
						<div class="section__option">
							<button class="btn btn--sm" @click="onSave()">Create</button>
						</div>
					</div>
				</div>

			<div class="section__main">
				<v-table :headers="builder.headers"
						:items="items"
						:navigations="builder.navigations || null"
						:hasLoadList="hasLoadList"
						@editItem="onSave"
						@deleteItem="onDelete"></v-table>
			</div>
		</div>
	</div>
</template>

<script>
	import {map} from 'lodash';
	import VTable from '@components/VTable';
	import BuilderSave from './BuilderSave'

	export default {
		name: 'buildrer-index',
		components: {
			VTable
		},
		data(){
			return {
				list: [],

				hasLoadList: false,

				builderList: {
					roles: {
						title: 'Roles list',
						apiKey: 'user.roles',
						headers:[
							{key:'role', text: 'Role'},
						]
					},

					languages: {
						title: 'Languages',
						apiKey: 'languages',
						headers:[
							{key:'code', text: 'Code'},
							{key:'name', text: 'Language'},
						]
					},

					translateModules: {
						title: 'Translate modules',
						apiKey: 'translates.modules',
						icon: 'book',
						headers:[
							{key:'id', text: 'ID'},
							{key:'key', text: 'Key'},
							{key:'description', text: 'Description'},
						],
						navigations:['edit', 'delete'],
						form: [
							{
								key: 'key',
								label: 'Key'
							},
							{
								key: 'description',
								label: 'Description',
								type: 'textarea'
							}

						]
					}
				}
			}
		},

		computed:{
			builderType(){
				return this.$route.meta.builderType
			},

			builder(){
				return this.builderList[this.builderType]
			},

			hasSaveMode() {
				if (!this.builder.navigations) return false;
				return this.builder.navigations.indexOf('edit') !== -1
			},

			items(){
				let items = [];

				switch (this.builderType) {
					case 'roles':
						items = map(this.list, item => {
							return {
								role: item
							}
						});

						break;
					default :
						items = this.list;
				}

				return items;
			}
		},

		created(){
			this.getList();
		},

		methods:{
			onSave(item){
				this.$modal.show(BuilderSave,{
					item: item,
					builder: this.builder,
					getList: this.getList
				}, $MODAL_OPTIONS.default);
			},

			onDelete(item){
				if (confirm('Do you want delete?')){
					$axios.delete($API(this.builder.apiKey, item.id)).then(resp => {
						this.getList();
					});
				}
			},

			getList(){
				return $axios.get($API(this.builder.apiKey)).then(resp => {
					//TODO change to only resp.list
					this.list = resp.list || resp.scopes;

					this.hasLoadList = true;
				});
			}
		}
	};
</script>

<style scoped lang=scss>

</style>
