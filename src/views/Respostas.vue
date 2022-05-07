<template>
    <div>
		<h2 class="mb-6">Respostas</h2>

		<v-card class="mb-6">
			<v-tabs centered v-model="tab">
				<v-tab>Lista</v-tab>
				<v-tab>Cadastro</v-tab>
				<v-tab disabled>Edição</v-tab>
			</v-tabs>
			

			<v-tabs-items v-model="tab" class="pa-5 secondary">
				<!--Lista-->
				<v-tab-item>
					<lista-resposta></lista-resposta>
				</v-tab-item>

				<!--Cadastro-->
				<v-tab-item>
					<cadastro-resposta></cadastro-resposta>
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
import CadastroResposta from '@/components/CadastroResposta';
import ListaResposta from '@/components/ListaResposta';
import services from '@/services';

export default {
	components: {
		CadastroResposta,
		ListaResposta
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