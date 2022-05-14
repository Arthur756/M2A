<template>
	<div>
		<div>
			<h2 class="mb-6">Questionário</h2>
		</div>
		<div>
			<v-form @submit.prevent="responderQuestionario">
				<v-card class="mb-12 card-quest">
					<div class="mb-2" v-for="(pergunta, index) in questionario.perguntas" :key="index">
						<v-row align="start" class="row-card mb-2">
							<v-col cols="12">
								<h3>{{ pergunta.texto_pergunta }}</h3>
							</v-col>
							<!--<v-col cols="12">

								<v-radio-group v-model="resposta_questionario[index].resposta" column>
									<v-radio v-for="(resposta, index) in pergunta.respostas" :key="index"
													 :label="resposta.texto_resposta" color="primary" :value="resposta.id">
									</v-radio>
								</v-radio-group>

							</v-col>-->
						</v-row>
					</div>
					<hr>
					<div class="d-flex justify-start pa-5">
							<v-col cols="12" sm="6" md='4' lg='3'>
								<v-btn style="width: 100%" color="primary" type="submit">
									Enviar
								</v-btn>
							</v-col>
					</div>
				</v-card>
			</v-form>
		</div>
	</div>
</template>

<script>
import Services from '@/services';

export default {
	data() {
		return {
			questionario: {
				empresa: 1,
				perguntas: [{
					texto_pergunta: 'Pergunta 1',
					respostas: [{
						texto_resposta: 'a',
						fundamento: 'Fundamento'
					},
						{
							texto_resposta: 'b',
							fundamento: 'Fundamento'
						},
						{
							texto_resposta: 'c',
							fundamento: 'Fundamento'
						},
						{
							texto_resposta: 'd',
							fundamento: 'Fundamento'
						},
					]
				}, {
					texto_pergunta: 'Pergunta 2',
					respostas: [{
						texto_resposta: 'I',
						fundamento: 'Fundamento'
					},
						{
							texto_resposta: 'II',
							fundamento: 'Fundamento'
						},
						{
							texto_resposta: 'III',
							fundamento: 'Fundamento'
						},
						{
							texto_resposta: 'IV',
							fundamento: 'Fundamento'
						},
					]
				}, {
					texto_pergunta: 'Pergunta 3',
					respostas: [{
						texto_resposta: 'A',
						fundamento: 'Fundamento'
					},
						{
							texto_resposta: 'B',
							fundamento: 'Fundamento'
						},
						{
							texto_resposta: 'C',
							fundamento: 'Fundamento'
						},
						{
							texto_resposta: 'D',
							fundamento: 'Fundamento'
						},
					]
				},]
			},

			resposta_questionario: [{
				pergunta: 1,
				resposta: 1,
			}],
		};
	},

	async mounted() {
		await this.getQuestionario();
	},

	methods: {
		async getQuestionario() {
			const {data} = await Services.getQuestionario(1);
			this.resposta_questionario = data.perguntas.map(pergunta => ({pergunta: pergunta.id, resposta: 0}));
			this.questionario = data;
		},

		async responderQuestionario() {
			const data = {
				empresa: 1,
				respostas: this.resposta_questionario,
			};
			try {
				if (this.resposta_questionario.length !== this.questionario.perguntas.length
					|| this.resposta_questionario.some(resposta => resposta.resposta === 0)) {
					this.$store.commit('showToast', {type: 'error', text: 'Responda todas as perguntas!'});
					return;
				}

				await Services.responderQuestionario(this.questionario.id, data);
				this.$store.commit('showToast', {type: 'success', text: 'Questionário respondido com sucesso!'});
				await this.$router.push('/diagnosticos');
			} catch (e) {
				console.log(e);
				this.$store.commit('showToast', {type: 'error', text: 'Erro ao responder questionário!'});
			}
		}
	}
};
</script>

<style>

.card-quest {
	padding: 35px;
}

.row-card {
	display: block;
}

</style>
