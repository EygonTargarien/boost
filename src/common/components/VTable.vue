<template>
	<div class="table" :class="{'has-nav1': hasNavigations == 1,
								'has-nav2': hasNavigations == 2,
								'has-nav3': hasNavigations == 3}">
		<table>
			<thead>
				<tr>
					<th v-for="head in headers">{{head.text}}</th>
					<th v-if="hasNavigations" class="has-nav"></th>
				</tr>
			</thead>

			<tbody v-if="hasLoadList">
				<tr v-for="item in items">
					<td v-for="td in headers">
						<template v-if="td.type === 'img' && item[td.key]">
							<div class="table__img">
								<img :src="item[td.key].path" alt="">
							</div>
						</template>

						<template v-else-if="td.type === 'list'">
							<span v-for="el in item[td.key]">{{el}}</span>
						</template>

						<template v-else-if="td.type === 'tabs'">
							<span class="table__tab" v-for="el in item[td.key]">{{el}}</span>
						</template>

						<template v-else>
							{{item[td.key] || '-'}}
						</template>
					</td>

					<td v-if="hasNavigations" class="has-nav">
						<div class="table__options">
							<div class="table__option" v-if="hasNavEdit" @click="$emit('editItem', item)">
								<v-icon name="edit"></v-icon>
							</div>

							<router-link :to="`${routeLink}/${item.id}`" class="table__option" v-if="hasNavShow" >
								<v-icon name="eye"></v-icon>
							</router-link>

							<router-link :to="`${routeLink}/${item.id}`" class="table__option" v-if="hasNavEditLink" >
								<v-icon name="edit"></v-icon>
							</router-link>

							<div class="table__option" v-if="hasNavDelete" @click="$emit('deleteItem', item)">
								<v-icon name="trash-alt"></v-icon>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="table__empty" v-if="!items.length && hasLoadList">No data found ...</div>

		<div class="table__footer" v-if="hasLoadList && pagination && hasNotEmptyList">
			<vue-pagination
					:pagination="pagination"
					@changeLimit="$emit('changeLimit', $event)"
					@changePage="$emit('changePage', $event)"></vue-pagination>
		</div>

		<template v-if="!hasLoadList">
			<div class="table__loading">
				<v-icon name="sync-alt" spin></v-icon>
			</div>
		</template>
	</div>
</template>

<script>
	import 'vue-awesome/icons/trash-alt';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/eye';
	import 'vue-awesome/icons/sync-alt';
	import VIcon from 'vue-awesome/components/Icon';

	import VuePagination from '@components/VuePagination';

	export default {
		name: 'v-table',
		components: {
			VIcon,
			VuePagination
		},
		props: {
			headers:{
				type: Array,
				required: true
			},
			items:{
				type: Array,
				required: true
			},
			pagination: Object,
			navigations: Array,
			hasLoadList: Boolean,
			routeLink: String
		},

		computed: {
			hasNotEmptyList(){
				return this.items.length;
			},

			hasNavigations(){
				if (!this.navigations) return 0;
				return this.navigations.length;
			},

			hasNavEdit(){
				return this.navigations.indexOf('edit') !== -1;
			},

			hasNavEditLink(){
				return this.navigations.indexOf('editLink') !== -1;
			},

			hasNavShow(){
				return this.navigations.indexOf('show') !== -1;
			},

			hasNavDelete(){
				return this.navigations.indexOf('delete') !== -1;
			}
		}
	};
</script>

<style scoped lang=scss>
	.table{
		&.has-nav1{
			padding-right: 37px;
		}
		&.has-nav2{
			padding-right: 52px;
		}
		&.has-nav3{
			padding-right: 67px;
		}
		&__img{
			//max-width: 30px;
			width: 30px;
			display: block;
			line-height: 0;
			img{
				//max-height: 25px;
			}
		}
		&__loading{
			padding: 10px;
		}
		&__options{
			position: absolute;
			left: 100%;
			top: 7px;
			height: 100%;
			display: flex;
			line-height: 0;
		}
		&__option{
			padding: 5px;
			cursor: pointer;
			line-height: 0;
			&:hover{
				svg{
					fill: $c_alt;
				}
			}
		}
		&__empty{
			font-family: $f_alt;
			font-size: 18px;
			padding: 20px 0;
		}
		&__tab{
			display: inline-block;
			padding: 3px 8px;
			color: #fff;
			background: $c_alt;
			margin-right: 5px;
			border-radius: 5px;
		}
	}
	table{
		width: 100%;
		border-spacing: unset;
	}
	thead{
		background: $c_main;
		box-shadow: 0 2px 8px rgba(0,0,0,0.3);
	}
	tr{
		display: table-row;
		position: relative;
		vertical-align: top;
		&:last-child{
			td{
				border-bottom: none;
			}
		}
	}
	th{
		display: table-cell;
		padding: 7px 10px;
		color: #fff;
		font-family: $f_alt;
		text-align: left;
		white-space: nowrap;
		min-height: 50px;
		font-size: 14px;
		&.has-nav{
			position: relative;
			padding: 0;
		}
	}
	td{
		display: table-cell;
		padding: 7px 10px;
		border-bottom: 1px solid $c_border;
		font-size: 14px;
		&.has-nav{
			position: relative;
			padding: 0;
		}
		span{
			display: block;
			margin-bottom: 10px;
			line-height: 1.2;
		}
	}
</style>
