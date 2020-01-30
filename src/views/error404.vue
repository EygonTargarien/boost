<template>
	<div class="err">
		<div class="err__wrap">
			<div class="err__head">
				<div class="err__404">404</div>
				<div class="err__img">
					<img :src="require('@img/404.webp')" alt="">
				</div>
			</div>
			<div class="err__footer">
				<div class="err__text">Sorry, the requested page is not found.<br>
					<router-link to="/">Go back to dashboard</router-link>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'error-index',
	};
</script>

<style scoped lang=scss>
	.err{
		max-width: 400px;
		width: 100%;
		padding: 100px 0 50px;
		margin: 0 auto;
		&__head{
			border-bottom: 5px solid $c_main;
			margin-bottom: 30px;
			display: flex;
			align-items: flex-end;
			justify-content: center;
		}
		&__404{
			font-weight: bold;
			font-size: 166px;
			line-height: 0.76;
			font-family: $f_alt;
			text-transform: uppercase;
			transform: translateY(6px);
		}
		&__img{
			transform: translateY(10px);
		}
		&__text{
			text-align: center;
			a{
				font-weight: bold;
				font-size: 16px;
				font-family: $f_alt;
				text-transform: uppercase;
				text-decoration: underline;
				&:hover{
					text-decoration: none;
				}
			}
		}
	}
</style>
