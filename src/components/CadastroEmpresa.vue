<template>
	<v-form ref="form">
		<v-stepper color="secondary" non-linear v-model="step">

			<!--TABS DE CADASTRO-->
			<v-stepper-header>
				<v-stepper-step :step="1" editable>
					Dados da Empresa
				</v-stepper-step>

				<!-- <v-stepper-step :step="2" editable>
					Informações do Responsável
				</v-stepper-step> -->

				<v-stepper-step :step="2" editable>
					Informações Adicionais
				</v-stepper-step>

				<v-stepper-step :step="3" editable>
					Informações Complementares
				</v-stepper-step>
			</v-stepper-header>

			<!--INPUTS DOS DADOS DA EMPRESA-->
			<v-stepper-content :step="1" class="mt-10">
			<v-col cols="12" xs="10" sm='12' md='4' lg='3'>
						<v-checkbox filled label="É cliente master?" v-model="empresa.bool_master" autocomplete="off"
							:error="errors.bool_master" :error-messages="errors.bool_master"/>
			</v-col>	
				<v-row class="px-4">
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="CNPJ" v-model="empresa.cnpj" v-mask="'##.###.###/####-##'" autocomplete="off"
							:error="errors.cnpj" :error-messages="errors.cnpj"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Razão Social" v-model="empresa.razao_social" autocomplete="off"
							:error="errors.razao_social" :error-messages="errors.razao_social"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-select filled label="Empresa Vinculada" :disabled="empresa.bool_master" v-model="empresa.fk_master"
							autocomplete="off" :error="errors.fk_master" :error-messages="errors.fk_master" :items="empresas_vinculadas"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Telefone" v-model="empresa.telefone" autocomplete="off"
													v-mask="'(##) ####-####'" :error="errors.telefone" :error-messages="errors.telefone"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Logradouro" v-model="empresa.logradouro" autocomplete="off"
													:error="errors.logradouro" :error-messages="errors.logradouro"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Cidade" v-model="empresa.cidade" autocomplete="off" :error="errors.cidade"
													:error-messages="errors.cidade"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="CEP" v-model="empresa.cep" autocomplete="off" v-mask="'#####-###'"
													:error="errors.cep" :error-messages="errors.cep"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Inscrição Estadual" v-model="empresa.inscricao_estadual" autocomplete="off"
													:error="errors.inscricao_estadual" :error-messages="errors.inscricao_estadual"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Nome Fantasia" v-model="empresa.fantasia" autocomplete="off"
													:error="errors.fantasia" :error-messages="errors.fantasia"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Celular" v-model="empresa.celular" autocomplete="off"
													v-mask="'(##) #####-####'" :error="errors.celular" :error-messages="errors.celular"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Fax" v-model="empresa.fax" autocomplete="off" v-mask="'(##) ####-####'"
													:error="errors.fax" :error-messages="errors.fax"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Bairro" v-model="empresa.bairro" autocomplete="off" :error="errors.bairro"
													:error-messages="errors.bairro"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Complemento" v-model="empresa.complemento" autocomplete="off"
													:error="errors.complemento" :error-messages="errors.complemento"/>
					</v-col>	
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-select filled label="Estado/UF" :items="ufs" v-model="empresa.fk_uf" autocomplete="off"
											:error="errors.fk_uf" :error-messages="errors.fk_uf"/>
					</v-col>
				</v-row>
			</v-stepper-content>

			<!-- <v-stepper-content :step="2">
				<v-row class="px-4">

					<v-col cols="12">
						<v-text-field filled label="Nome do responsável" v-model="empresa.nome_responsavel" autocomplete="off"
													:error="errors.nome_responsavel" :error-messages="errors.nome_responsavel"/>
						<v-text-field filled label="E-mail do responsável" v-model="empresa.email_responsavel" autocomplete="off"
													:error="errors.email_responsavel" :error-messages="errors.email_responsavel"/>
						<v-select filled label="Formação acadêmica" v-model="empresa.formacao_responsavel"
											:items="['Analfabeto', 'Primeiro grau', 'Segundo grau', 'Superior', 'Pós-Graduação', 'Mestrado e Doutorado']"
											autocomplete="off" :error="errors.formacao_responsavel"
											:error-messages="errors.formacao_responsavel"/>
						<v-select filled label="Sexo" v-model="empresa.sexo_responsavel" autocomplete="off" :items="[
							{ text: 'Masculino', value: 'M' },
							{ text: 'Feminino', value: 'F' }
						]" :error="errors.sexo_responsavel" :error-messages="errors.sexo_responsavel"/>
						<v-text-field filled label="Data de nascimento" v-model="empresa.dt_nascimento_responsavel"
													autocomplete="off" v-mask="'##/##/####'" :error="errors.dt_nascimento_responsavel"
													:error-messages="errors.dt_nascimento_responsavel"/>
					</v-col>

				</v-row>
			</v-stepper-content> -->

			<v-stepper-content :step="2">
				<v-row class="px-4 mt-10">
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-select filled label="Setor" :items="setores" v-model="empresa.fk_setor" autocomplete="off"
											:error="errors.fk_setor" :error-messages="errors.fk_setor"/>
					</v-col>
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-select filled label="Segmento" :items="segmentos" v-model="empresa.fk_segmento" autocomplete="off"
											:error="errors.fk_segmento" :error-messages="errors.fk_segmento"/>
					</v-col>
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-select filled label="Valor de arrecadação" :items="valores_arrecadacoes"
											v-model="empresa.fk_valor_arrecadacao" autocomplete="off" :error="errors.fk_valor_arrecadacao"
											:error-messages="errors.fk_valor_arrecadacao"/>
					</v-col>
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-select filled label="Tipo de empresa" :items="tipos_industria" v-model="empresa.fk_tipo_industria"
											autocomplete="off" :error="errors.fk_tipo_industria" :error-messages="errors.fk_tipo_industria"/>
					</v-col>
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-select filled label="Projeto" v-model="empresa.projeto" :items="projetos" autocomplete="off"
											:error="errors.projeto" :error-messages="errors.projeto"/>
					</v-col>
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Número de empregados" v-model="empresa.num_empregados" type="number"
													autocomplete="off" :error="errors.num_empregados" :error-messages="errors.num_empregados"/>
					</v-col>
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<!--						<v-text-field filled label="Gestor do projeto" v-model="empresa.nome_gestor" autocomplete="off"-->
						<!--													:error="errors.nome_gestor" :error-messages="errors.nome_gestor"/>-->
						<!--						<v-text-field filled label="E-mail do gestor" v-model="empresa.email" type="email" autocomplete="off"-->
						<!--													:error="errors.email" :error-messages="errors.email"/>-->
						<v-text-field filled label="Telefone" v-model="empresa.telefone_gestor" autocomplete="off"
													v-mask="'(##) ####-####'" :error="errors.telefone_gestor"
													:error-messages="errors.telefone_gestor"/>
					</v-col>
					<v-col cols="12" xs="2" sm='2' md='3' lg='3'>
						<v-text-field filled label="Ano de inicio da atividade" v-model="empresa.dt_ano_inicio" autocomplete="off"
													v-mask="'##/##/####'" :error="errors.dt_ano_inicio" :error-messages="errors.dt_ano_inicio"/>
					</v-col>
				</v-row>
			</v-stepper-content>

			<v-stepper-content :step="3">
				<v-row class="px-4 mt-10">
					<v-col cols="12" sm='6' md='4' lg='3'>
						<v-textarea filled label="Descreva o seu negócio" v-model="empresa.ds_negocio" :error="errors.ds_negocio"
												:error-messages="errors.ds_negocio"/>
					</v-col>
					<v-col cols="12" sm='6' md='4' lg='3'>
						<v-textarea filled label="Missão" v-model="empresa.missao" :error="errors.missao"
												:error-messages="errors.missao"/>
					</v-col>
					<v-col cols="12" sm='6' md='4' lg='3'>
						<v-textarea filled label="Visão" v-model="empresa.visao" :error="errors.visao"
												:error-messages="errors.viisao"/>
					</v-col>
					<v-col cols="12" sm='6' md='4' lg='3'>
						<v-textarea filled label="Valores" v-model="empresa.valores" :error="errors.valores"
												:error-messages="errors.valores"/>
					</v-col>

					
					<v-col cols="12" sm='6' md='4' lg='3'>
						<v-btn color="primary" @click="adicionarFaturamento">
							Adicionar faturamento
							<v-icon left>mdi-add</v-icon>-->
						</v-btn>
						<div v-for="(faturamento) in empresa.faturamentos" :key="faturamento.index">
							<v-row align="start">
								<v-col cols="4">
									<v-text-field filled label="Ano" v-model="faturamento.dt_ano" v-mask="'##/##/####'"
																autocomplete="off"/>
								</v-col>
								<v-col cols="4">
									<v-text-field filled label="Valor" v-model="faturamento.valor" type="number" autocomplete="off"/>
								</v-col>
								<v-col>
									<v-btn icon @click="removerFaturamento(faturamento.index)">
										<v-icon color="error">mdi-close</v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</div>
					</v-col>
				</v-row>
			</v-stepper-content>

			<div class="pa-5">
				<v-row class="pa-5">
					<v-col cols="12" sm="6" md='4' lg='3'>
						<v-btn color="primary" style="width: 100%" @click="step === 3 ? cadastrarEmpresa() : (step = step < 3 ? step + 1 : step)"
									:loading="loading">
							{{ step  ? 'Próximo' : 'Cadastrar' }}
						</v-btn>
					</v-col>
					<v-col cols="12" sm="6" md='4' lg='3'>
						<v-btn color="secondary" style="width: 100%" @click="step = step > 1 ? step - 1 : step">
							Voltar
						</v-btn>
					</v-col>
				</v-row>
			</div>
		</v-stepper>

		<!--		<div class="d-flex justify-center mt-10	">-->
		<!--			<v-btn type="button" color="primary" :loading="cadastroLoading" @click="cadastrarEmpresa">-->
		<!--				Cadastrar-->
		<!--			</v-btn>-->
		<!--		</div>-->
	</v-form>
</template>

<script>
import Services from '@/services';

export default {
	name: "CadastroEmpresa",
	data() {
		return {
			cadastroLoading: false,
			step: 1,
			empresa: {
				bool_master: false,
				faturamentos: [],
				cnpj: '',
				razao_social: '',
				inscricao_estadual: '',
				celular: '',
				telefone: '',
				fax: '',
				fantasia: '',

				email: '',

				fk_master: null,
				fk_setor: null,
				fk_segmento: null,
				fk_uf: null,
				fk_tipo_industria: null,
				fk_valor_arrecadacao: null,
				fk_grupo: null,

				dt_ano_inicio: '',

				num_empregados: '',
				projeto: '',
				nome_gestor: '',
				telefone_gestor: '',

				nome_responsavel: '',
				formacao_responsavel: null,
				sexo_responsavel: null,
				email_responsavel: '',
				dt_nascimento_responsavel: '',

				complemento: '',
				cep: '',
				bairro: '',
				cidade: '',
				logradouro: '',

				ds_negocio: '',
				valores: '',
				missao: '',
				visao: '',
			},
			ufs: [],
			setores: [],
			segmentos: [],
			valores_arrecadacoes: [],
			tipos_industria: [],
			projetos: [],
			empresas_vinculadas: [],
			loading: false,
			errors: {}
		};
	},

	async mounted() {
		const {data} = await Services.getEmpresaFKS();

		this.ufs = this.getFormatted(data.ufs, 'sg_uf');
		this.setores = this.getFormatted(data.setores, 'ds_setor');
		this.segmentos = this.getFormatted(data.segmentos, 'ds_segmento');
		this.valores_arrecadacoes = this.getFormatted(data.valores_arrecadacoes, 'ds_valor_arrecadacao');
		this.tipos_industria = this.getFormatted(data.tipos_industria, 'ds_tipo_industria');
		this.projetos = this.getFormatted(data.projetos, 'nome_projeto');
		this.empresas_vinculadas = this.getFormatted(data.empresas_vinculadas, 'fantasia');
	},

	methods: {
		removerFaturamento(index) {
			this.empresa.faturamentos = this.empresa.faturamentos.filter(faturamento => faturamento.index !== index);
		},

		adicionarFaturamento() {
			this.empresa.faturamentos.push({
				dt_ano: '',
				valor: '',
				index: this.empresa.faturamentos.length,
			});
		},

		async cadastrarEmpresa() {
			this.loading = true;
			try {
				await Services.createEmpresa({
					...this.empresa,
					usuario: this.$store.state.user.user.id,
				});
				this.$emit('sucesso-cadastro');
				this.$refs.form.reset();
				this.$store.commit('showToast', {type: 'success', text: 'Empresa criada com sucesso!'});
			} catch (e) {
				this.errors = e.response.data;
				this.loading = false;
				this.$store.commit('showToast', {type: 'error', text: 'Erro ao criar empresa!'});
			}
			this.loading = false;
		},

		getFormatted(arr, value) {
			return arr.map(item => ({text: item[value], value: item.id}));
		}
	}
};
</script>

<style scoped>

.v-stepper__header {
	justify-content: space-evenly;
}

</style>
