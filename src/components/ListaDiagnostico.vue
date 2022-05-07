<template>
	<div>
		<v-form>
			<v-card class="mb-2">
				<!-- SEARCH -->
				<v-card-text class="pa-5">
					<v-row>
						<v-col class="d-flex" cols="12" sm="6">
							<v-text-field filled label="Nome Fantasia" v-model="filters.fantasia"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="6">
							<v-text-field filled label="CNPJ" :items="cnpjs" v-model="filters.fk_cnpj"
														v-mask="'##.###.###/####-##'"/>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="d-flex" cols="12" sm="4">
							<v-select filled label="Estado/UF" :items="ufs" v-model="filters.fk_uf"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="4">
							<v-text-field filled label="Cidade" :items="citys" v-model="filters.fk_city"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="4">
							<v-text-field filled label="Bairro" :items="bairros" v-model="filters.fk_bairros"/>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="d-flex" cols="12" sm="4">
							<v-text-field filled label="Nome do Projeto" :items="ndp" v-model="filters.fk_ndp"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="4">
							<v-select filled label="Segmento" :items="sgmnt" v-model="filters.fk_sgmnt"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="4">
							<v-select filled label="Arrecadação" :items="rcdc" v-model="filters.fk_rcdc"/>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="d-flex" cols="12" sm="4">
							<v-select filled label="Setor" :items="setores" v-model="filters.fk_setores"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="4">
							<v-select filled label="Situação" :items="situacao" v-model="filters.fk_situacao"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="4">
							<v-select filled label="Tipo de Empresa" :items="tde" v-model="filters.fk_tipo"/>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="d-flex" cols="12" sm="4">
							<v-select filled label="Fase do Projeto" :items="fdp" v-model="filters.fk_fdp"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="4">
							<v-select filled label="Ano do Projeto" :items="adp" v-model="filters.fk_adp"/>
						</v-col>
					</v-row>
				</v-card-text>
				<!-- BUTTONS -->
				<div class="pa-5">
					<v-row class="pa-5">
						<v-col cols="12" sm="6" md='3' lg='3'>
							<v-btn color="primary" @click="getDiagnosticos" :loading="loading" style="width: 100%;">
								Buscar
							</v-btn>
						</v-col>
						<v-col cols="12" sm="6" md='3' lg='3'>
							<v-btn color="secondary" @click="resetFilters" class="mr-10" style="width: 100%;">
								Limpar
							</v-btn>
						</v-col>
					</v-row>
				</div>
			</v-card>
			<v-card class="mb-2">
				<!-- TABLE -->
				<v-data-table :headers="headers" :items="diagnosticos" :loading="loading">
					<template v-slot:item="{ item }">
						<v-btn color="primary" class="mr-3" icon @click="editarDiagnostico(item)">
							<v-icon>
								mdi-pencil
							</v-icon>
						</v-btn>
						<v-btn color="error" icon @click="selecionarDiagnostico(item)">
							<v-icon>
								mdi-delete
							</v-icon>
						</v-btn>
					</template>

					<template v-slot:no-data>
						<div class="d-flex flex-column align-center justify-center pa-10">
							<v-row class="d-flex justify-center pa-5" style="width: 100%;">
								<v-col cols="12" sm="6" md='3' lg='3'>
									<h3 class="mb-3">Nenhum usuário encontrado.</h3>

									<v-btn color="primary" style="width: 100%;">Cadastrar Usuário</v-btn>
								</v-col>
							</v-row>
						</div>
					</template>
				</v-data-table>
				<modal-confirmar-delete v-if="abrirDeletar" :nome="diagnosticoselecionado.name"
																@deletar="deletarDiagnostico" @close="closeDeletar"/>
			</v-card>
		</v-form>
	</div>
</template>

<script>
import ModalConfirmarDelete from '@/components/ModalConfirmarDelete';
import services from '@/services';

export default {
	name: "ListaDiagnostico",
	data() {
		return {
			headers: [
				{
					text: 'Fase',
					value: 'fase',
				},
				{
					text: 'Empresa',
					value: 'empresa.fantasia',
				},
				{
					text: 'Data',
					value: 'data',
				},
			],
			filters: {
				fantasia: '',
				fk_cnpj: '',
				fk_uf: null,
				fk_city: '',
				fk_bairros: '',
				fk_ndp: '',
				fk_gdp: '',
				fk_cnslt: null,
				fk_sgmnt: null,
				fk_master: null,
				fk_rcdc: null,
				fk_setores: null,
				fk_situacao: null,
				fk_sefk_tipotores: null,
				fk_fdp: null,
				fk_adp: null,
			},
			ufs: [],
			cnslt: [],
			sgmnt: [],
			masters: [],
			rcdc: [],
			setores: [],
			situacao: [],
			tde: [],
			fdp: [],
			adp: [],
			pesquisaLoading: false,
		};
	},

	async mounted() {
		await this.getDiagnosticoFKS();
	},

	computed: {
		diagnosticos() {
			return this.$store.state.diagnosticos;
		},
		loading() {
			return this.pesquisaLoading;
		}
	},

	methods: {
		resetFilters() {
			this.filters = {
				fantasia: '',
				fk_cnpj: '',
				fk_uf: null,
				fk_city: '',
				fk_bairros: '',
				fk_ndp: '',
				fk_gdp: '',
				fk_cnslt: null,
				fk_sgmnt: null,
				fk_master: null,
				fk_rcdc: null,
				fk_setores: null,
				fk_situacao: null,
				fk_sefk_tipotores: null,
				fk_fdp: null,
				fk_adp: null,
			};
			this.getDiagnosticos();
		},

		async getDiagnosticos() {
			try {
				this.pesquisaLoading = true;
				const {
					data
				} = await services.getDiagnosticos(this.filters);
				this.$store.commit('setDiagnosticos', data);
				this.pesquisaLoading = false;
			} catch (e) {
				console.log(e);
				this.pesquisaLoading = false;
			}
		},

		async getDiagnosticoFKS() {
			// const {
			//     data
			// } = await services.getDiagnosticoFKS();
			//
			// this.ufs = this.getFormatted(data.ufs, 'sg_uf');
			// this.perfis = this.getFormatted(data.perfis, 'ds_perfil');
			// this.emails = this.getFormatted(data.emails, 'ds_email');
		},

		getFormatted(arr, value) {
			return arr.map(item => ({
				text: item[value],
				value: item.id
			}));
		},
		async deletarDiagnostico(nome) {
			try {
				const id = this.diagnosticos.find(diagnostico => diagnostico.fantasia === nome).id;
				await this.$axios.delete(`/diagnosticos/${id}`);
				this.closeDeletar();
			} catch (e) {
				this.$store.commit('showToast');
				console.log(e);
			}
		},

		editarDiagnostico(diagnostico) {
			this.diagnosticoselecionado = diagnostico;
		},

		closeDeletar() {
			this.diagnosticoselecionado = {};
			this.abrirDeletar = false;
		},

		selecionarDiagnostico(diagnostico) {
			this.diagnosticoselecionado = diagnostico;
			this.abrirDeletar = true;
		}
	}
};
</script>

<style>
</style>
