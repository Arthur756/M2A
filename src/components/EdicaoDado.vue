<template>
	<div>
		<v-form v-if="usuario">
			<v-card class="mb-2">
				<v-card-title>
					Informações do usuário
				</v-card-title>
				<v-card-text class="pa-5">
					<v-row>
						<v-col class="d-flex" cols="12" sm="6">
							<v-select readonly :items="perfis" filled label="Perfil" v-model="perfil"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="6">
							<v-select readonly :items="ufs" filled label="Estado/UF" v-model="uf"/>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="d-flex" cols="12" sm="6">
							<v-text-field readonly filled label="Nome do Usuário" v-model="nome"/>
						</v-col>
						<v-col class="d-flex" cols="12" sm="6">
							<v-text-field readonly filled label="E-mail do Usuário" v-model="email"/>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="d-flex" cols="12" sm="6">
							<v-text-field readonly filled label="Telefone" v-mask="'(##) ####-####'" v-model="telefone"/>
						</v-col>
<!--						<v-col class="d-flex" cols="12" sm="6">-->
<!--							<v-text-field readonly filled label="Celular" v-mask="'(##) #####-####'" v-model="celular"/>-->
<!--						</v-col>-->
					</v-row>
				</v-card-text>

<!--				<div class="d-flex justify-end pa-5">-->
<!--					<v-btn disabled color="primary">-->
<!--						Salvar-->
<!--					</v-btn>-->
<!--				</div>-->

			</v-card>

		</v-form>

		<v-form @submit.prevent="mudarSenha">
			<v-card>
				<v-card-title>
					Senha
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col class="d-flex">
							<v-text-field filled v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
														:type="show1 ? 'text' : 'password'"
														name="input-10-1" label="Senha" hint="No mínimo 6 caracteres." counter
														@click:append="show1 = !show1" :error="!!passwordErrors.password.length"
														:error-messages="passwordErrors.password"></v-text-field>
						</v-col>
						<v-col class="d-flex">
							<v-text-field filled v-model="passwordConfirm"
														:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
														:type="show2 ? 'text' : 'password'" name="input-10-1" label="Confirmação de Senha"
														hint="No mínimo 6 caracteres." counter
														@click:append="show2 = !show2" :error="!!passwordErrors.confirmPassword.length"
														:error-messages="passwordErrors.confirmPassword"></v-text-field>
						</v-col>
					</v-row>

					<div class="pa-5">
						<v-row class="pa-5">
							<v-col cols="12" sm="6" md='3' lg='3'>
								<v-btn type="submit" color="primary">
									Enviar
								</v-btn>
							</v-col>
						</v-row>
					</div>
				</v-card-text>
			</v-card>
		</v-form>

	</div>
</template>

<script>
import Services from '@/services';
import {getFormatted} from '@/utils';

export default {
	name: 'EdicaoDado',
	data() {
		return {
			nome: this.$store.state.user.nome,
			email: this.$store.state.user.user.email,
			telefone: this.$store.state.user.telefone,
			// celular: ['61987654321'],
			perfil: this.$store.state.user.perfil,
			uf: this.$store.state.user.uf,
			situacao: this.$store.state.user.situacao,
			show1: false,
			show2: false,
			password: '',
			passwordConfirm: '',

			rules: {
				required: value => !!value || 'Obrigatório.',
				min: v => v.length >= 6 || 'Mínimo 6 caracteres.'
			},

			ufs: [],
			perfis: [],

			passwordErrors: {
				password: [],
				confirmPassword: [],
			}
		}
	},

	mounted() {
		this.getUsuarioFks();
	},

	computed: {
		usuario() {
			return this.$store.state.user;
		}
	},

	methods: {
		async getUsuarioFks() {
			try {
				const {data} = await Services.getUserFks();
				console.log(data);
				this.ufs = getFormatted(data.ufs, 'sg_uf');
				this.perfis = getFormatted(data.perfis, 'nm_perfil');
				this.situacoes = getFormatted(data.situacoes, 'nome_situacao');
			} catch (e) {
				console.log(e);
			}
		},

		async updateUsuario() {
			try {
				const {data} = await Services.updateUser();
			} catch (e) {
				console.log(e);
			}
		},

		async mudarSenha() {
			try {
				const {data} = await Services.changePassword({
					confirmPassword: this.passwordConfirm,
					password: this.password,
				});
				this.$store.commit('showToast', {type: 'success', text: 'Senha atualizada com sucesso!'});
			} catch (e) {
				console.log(e);
				console.log(e);
				this.$store.commit('showToast', {type: 'error', text: 'Erro ao atualizar senha!'});
			}
		}
	}
};
</script>

<style scoped>
</style>
