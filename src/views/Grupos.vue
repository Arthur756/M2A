<template>
    <div>
		<h2 class="mb-6">Grupos</h2>

		<v-card class="mb-6">
			<v-tabs centered v-model="tab">
				<v-tab>Lista</v-tab>
				<v-tab>Cadastro</v-tab>
				<v-tab disabled>Edição</v-tab>
			</v-tabs>
		

			<v-tabs-items v-model="tab" class="pa-5 secondary">
				<!--Lista-->
				<v-tab-item>
					<lista-grupo></lista-grupo>
				</v-tab-item>

				<!--Cadastro-->
				<v-tab-item>
					<cadastro-grupo></cadastro-grupo>
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
import CadastroGrupo from '@/components/CadastroGrupo';
import ListaGrupo from '@/components/ListaGrupo';
import services from '@/services';

export default {
	components: {
		CadastroGrupo,
		ListaGrupo
	},
	data() {
		return {
			tab: 0,
		};
	},

}
</script>

<style>

</style>