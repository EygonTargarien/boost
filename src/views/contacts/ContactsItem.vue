<template>
	<div class="contact">
		<div class="container">
			<div class="contact__wrap">
				<div class="contact__user">
					<div class="contact__head">
						<div class="contact__ava">
							<span class="contact__border to-left">
								<img :src="require('@img/ava_border_left.png')" alt="">
							</span>
							<img :src="require('@img/user_superadmin.png')" alt="">

							<span class="contact__border to-right">
								<img :src="require('@img/ava_border_right.png')" alt="">
							</span>
						</div>
					</div>


					<div class="info box">
						<ul class="info__list">
							<li class="info__item">
								<div class="info__name">Role</div>
								<div class="info__value"><b>{{contact.role}}</b></div>
							</li>
							<li class="info__item">
								<div class="info__name">Login</div>
								<div class="info__value">{{contact.name || '-'}}</div>
							</li>
							<li class="info__item">
								<div class="info__name">Email</div>
								<div class="info__value">{{contact.email || '-'}}</div>
							</li>
							<li class="info__item">
								<div class="info__name">Country</div>
								<div class="info__value">{{contact.country ? contact.country.title : '-'}}</div>
							</li>
							<li class="info__item">
								<div class="info__name">Skype</div>
								<div class="info__value">
									<a v-if="contact.skype" :href="`skype:${contact.skype}`" class="social__item" target="_blank">{{contact.skype}}</a>
									<span v-else>-</span>
								</div>
							</li>
						</ul>
					</div>

					<div class="section__footer">
						<div class="section__options">
							<div class="section__option">
								<router-link to="/contacts" class="btn btn--sm btn--secong" @click="onSave(null)">Contacts list</router-link>
							</div>
							<div class="section__option" :class="{'has-disabled': !hasLoadContact}">
								<button class="btn btn--sm" @click="onSave()">Edit</button>
							</div>

						</div>
					</div>
				</div>

				<div class="contact__action">
					<contact-actions :id="id"></contact-actions>
				</div>
			</div>

			<div class="contact__orders">
				<div class="title"><span>Order history</span></div>
				<div class="section__main">
					<v-table :headers="headers"
							:items="items"
							:hasLoadList="hasLoadOrders"></v-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ContactActions from './ContactActions'
	import VTable from '@components/VTable';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('contact');

	export default {
		name: 'contact-item',
		components:{
			VTable,
			ContactActions
		},
		props: ['id'],
		data(){
			return {
				hasLoadContact: false,
				hasLoadOrders: false,

				headers:[
					{key:'id', text: 'Order id'},
				],
				items: []
			}
		},

		watch:{
			id(){
				this.getContact();
			}
		},

		computed:{
			...mapState([
				'contact'
			])
		},

		created(){
			this.getContact();
		},

		methods: {
			...mapActions([
				'GET_CONTACT'
			]),

			onSave(){
				this.$modal.show(ContactsSave,{contact: this.contact}, $MODAL_OPTIONS.default);
			},

			getContact(){
				this.GET_CONTACT(this.id).then(() => {
					this.hasLoadContact = true;

					//TODO change after check orders
					this.hasLoadOrders = true;
				})
			}
		}
	};
</script>

<style scoped lang=scss>
	.contact{
		padding-top: 30px;
		&__main{
			margin-bottom: 50px;
		}
		&__wrap{
			margin-bottom: 50px;
			display: flex;
		}
		&__user{
			width: 50%;
			padding-right: 40px;
		}
		&__action{
			width: 50%;
		}
		&__head{
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			justify-content: center;
		}
		&__role{
			padding-left: 30px;
			font-weight: bold;
			font-size: 22px;
			text-transform: uppercase;
		}
		&__ava{
			background: $c_main;
			width: 150px;
			height: 150px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			padding: 5px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.3);
			position: relative;
		}
		&__border{
			position: absolute;
			top: 50%;
			display: block;
			line-height: 0;
			width: 110px;
			transform: translateY(-50%);
			&.to-left{
				right: 120%;
			}
			&.to-right{
				left: 120%;
			}
		}
	}

	.info{
		font-size: 14px;
		margin-bottom: 20px;
		&__item{
			display: flex;
			justify-content: space-between;
			border-bottom: 1px dotted $c_border;
			padding: 5px 0;
			min-height: 35px;
			&:last-child{
				border-bottom: none;
			}
		}
		&__name{
			font-weight: bold;
		}
		&__value{}
	}


</style>
