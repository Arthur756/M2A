<template>
	<div>
		<h2 class="mb-6" >Empresas</h2>

		<v-card class="mb-6">
			<v-tabs centered v-model="tab">
				<v-tab>Lista</v-tab>
				<v-tab>Cadastro</v-tab>
				<v-tab disabled>Edição</v-tab>
			</v-tabs>
		

			<v-tabs-items v-model="tab" class="pa-5 secondary">
				<!--Lista-->
				<v-tab-item>
					<lista-empresa></lista-empresa>
				</v-tab-item>

				<!--Cadastro-->
				<v-tab-item>
					<cadastro-empresa @sucesso-cadastro="sucessoCadastro"></cadastro-empresa>
				</v-tab-item>

				<!--Edição-->
				<v-tab-item>
					Edição
				</v-tab-item>
			</v-tabs-items>
		</v-card>
	</div>
</template>

<script>
import CadastroEmpresa from '@/components/CadastroEmpresa';
import ListaEmpresa from '@/components/ListaEmpresa';
import services from '@/services';

export default {
	name: "Empresas",
	components: {
		ListaEmpresa,
		CadastroEmpresa,
	},
	data() {
		return {
			tab: 0,
		};
	},
	async mounted() {
		await this.getEmpresas();
	},
	methods: {
		async getEmpresas() {
			const { data } = await services.getEmpresas();
			this.$store.commit('setEmpresas', data);
		},
		async sucessoCadastro() {
			this.tab = 0;
			await this.getEmpresas();
		}
	}
};
</script>

<style scoped>

</style>
