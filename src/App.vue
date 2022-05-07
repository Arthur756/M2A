<template>
	<v-app>
		<v-main>
			<router-view/>
		</v-main>

		<v-footer dark color="accent1" class="justify-center">
			<span>M2A CONSULTORIA © TODOS OS DIREITOS RESERVADOS.</span>
		</v-footer>

		<v-snackbar class="d-flex justify-center" v-model="$store.state.errorToast.show" color="error" top :timeout="3000">
			<v-icon>mdi-cancel</v-icon>
			{{ $store.state.errorToast.text }}
		</v-snackbar>
		<v-snackbar v-model="$store.state.infoToast.show" color="info" top :timeout="3000">
			<v-icon>mdi-info</v-icon>
			{{ $store.state.infoToast.text }}
		</v-snackbar>
		<v-snackbar v-model="$store.state.successToast.show" color="success" top :timeout="3000">
			<v-icon>mdi-check</v-icon>
			{{ $store.state.successToast.text }}
		</v-snackbar>
	</v-app>
</template>

<script>
import Services from '@/services';

export default {
	name: 'App',

	data: () => ({
		//
	}),

	mounted() {
		this.$store.dispatch('getUser');
	},
};
</script>
