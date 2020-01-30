<template>
	<div class="action">
		<div class="title"><span>Action history</span></div>

		<div class="action__main box" ref="actions">
			<template v-if="hasLoadActions">
				<ul class="action__list" v-if="hasFull">
					<li class="action__item" v-for="action in actions">
						<div class="action__date">{{moment(action.created_at).format('DD-MM-YYYY HH:hh')}}</div>
						<div class="action__cnt">{{action.description}}</div>
					</li>
				</ul>

				<div class="action__empty" v-else>Not action history...</div>
			</template>
		</div>
	</div>

</template>

<script>
	import moment from 'moment';
	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('contact_actions');

	export default {
		name: 'contact-actions',
		props:['id'],
		data(){
			return{
				hasLoadActions: false,

				moment: moment
			}
		},

		watch:{
			id(){
				this.RESET_STATE();
				this.getActions();
			}
		},

		computed:{
			...mapState([
				'actions', 'page', 'pagination'
			]),

			hasFull(){
				return Object.keys(this.actions).length
			}
		},

		created(){
			this.RESET_STATE();
			this.getActions();
		},

		mounted(){
			let $element = this.$refs['actions'];

			$element.addEventListener('scroll', () => {
				let scrollHeight = $element.scrollTop +  $element.clientHeight,
					elementHeight = $element.scrollHeight,
					offset = 50;

				if(scrollHeight >= elementHeight){
					if (this.page >= this.pagination.last_page) return;

					this.SET_PAGE(this.page + 1);
					this.getActions()
				}
			});
		},

		methods:{
			...mapMutations([
				'SET_PAGE',
				'RESET_STATE'
			]),
			...mapActions([
				'GET_ACTIONS'
			]),

			getActions(){
				this.GET_ACTIONS(this.id).then(() => {
					this.hasLoadActions = true;
				})
			}
		}
	};
</script>

<style scoped lang=scss>
	.action{
		&__empty{
			padding: 10px 0;
		}
		&__main{
			height: 322px;
			overflow: auto;
			&::-webkit-scrollbar {
				width: 8px;
				background-color: #F5F5F5;
			}
			&::-webkit-scrollbar-track {
				-webkit-box-shadow: inset 0 0 6px $c_main_light_3;
				border-radius: 5px;
				background-color: #F5F5F5;
			}
			&::-webkit-scrollbar-thumb {
				border-radius: 5px;
				-webkit-box-shadow: inset 0 0 6px $c_main_light_3;
				background-color: #9f9f9f;
			}
		}
		&__item{
			display: flex;
			border-bottom: 1px dotted $c_border;
			padding: 5px 0;
			&:last-child{
				border-bottom: none;
			}
		}
		&__date{
			font-family: $f_alt;
			width: 130px;
			flex-shrink: 0;
			padding-right: 20px;
			font-size: 14px;
			color: $c_text_light;
			white-space: nowrap;
			transform: translateY(1px);
			font-weight: bold;
		}
		&__cnt{
			width: 100%;
			font-size: 14px;
		}
	}
</style>
