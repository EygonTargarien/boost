<template>
	<div class="pag">
		<div class="pag__wrap">
			<div class="pag__main">
				<b-pagination v-model="currentPage" v-if="hasPagination"
						:total-rows="pagination.total"
						:per-page="this.pagination.limit"
						:limit="7"
						@change="onChangePage"
						first-text="First"
						prev-text="Prev"
						next-text="Next"
						last-text="Last"
				></b-pagination>

			</div>

			<div class="pag__info">Show max
				<form-select-default v-model="limit"
						:options="optionsLimits"
						label_key="name"
						@input="onChangeLimit"
						name="limit"></form-select-default>
				from <span class="pag__total">{{pagination.total}}</span></div>
		</div>
	</div>
</template>

<script>
	import { BPagination } from 'bootstrap-vue';
	import FormSelectDefault from '@form/FormSelectDefault';

	export default {
		name: 'vue-pagination',
		components: {
			BPagination,
			FormSelectDefault
		},
		props:{
			pagination:{
				type: Object,
				required: true
			},
		},
		data(){
			return{
				limit: this.pagination.limit || 15,
				currentPage: this.pagination.page || 1,

				optionsLimits:[
					{
						id: 15,
						name: 15
					},
					{
						id: 30,
						name: 30
					},
					{
						id: 45,
						name: 45
					},
					{
						id: 60,
						name: 60
					},
					{
						id: 75,
						name: 75
					}
				]
			}
		},

		computed:{
			hasPagination(){
				if (!this.pagination) return false;
				return this.pagination.last_page > 1
			}
		},

		methods: {
			onChangePage(newPage){
				this.$emit('changePage', newPage)
			},

			onChangeLimit(newLimit){
				this.$emit('changeLimit', newLimit)
			}
		}
	};
</script>

<style lang=scss>
	.pag{
		padding: 30px 0;
		border-top: 3px solid $c_main;
		&__wrap{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&__info{
			font-size: 14px;
			font-family: $f_alt;
			display: flex;
			align-items: center;
			.input{
				margin: 0 10px;
				padding: 0;
				&__area{
					height: 30px;
				}
			}
		}
		&__total{
			font-weight: bold;
			padding-left: 5px;
			font-size: 16px;
		}
	}
	.pagination {
		display: flex;
		list-style: none;
		box-shadow: 0 2px 8px rgba(0,0,0,0.2);
	}
	.page-item:first-child .page-link {
		margin-left: 0;
		border-top-left-radius: .25rem;
		border-bottom-left-radius: .25rem;
	}
	.page-item.active .page-link {
		z-index: 1;
		color: #fff;
		background-color: $c_main;
		border-color: $c_main;
	}
	.page-item:last-child .page-link {
		border-top-right-radius: .25rem;
		border-bottom-right-radius: .25rem;
	}
	.page-item.disabled .page-link {
		opacity: 0.7;
		pointer-events: none;
		cursor: auto;
		background-color: #fff;
		border-color: #dee2e6;
	}
	.page-link {
		position: relative;
		display: block;
		padding: .5rem .75rem;
		margin-left: -1px;
		line-height: 1.25;
		color: $c_main;
		background-color: #fff;
		border: 1px solid #dee2e6;
		font-size: 14px;
		&:focus{
			outline: none;
		}
	}
</style>
