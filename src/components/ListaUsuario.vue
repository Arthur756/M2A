<template>
    <div>
        <v-form>
            <v-card class="mb-2">
                <!-- SEARCH -->
                <v-card-text class="pa-5">
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field filled label="Nome do Usuário" v-model="filters.nome" />
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select filled label="Estado/UF" :items="ufs" v-model="filters.fk_uf" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select filled label="Perfil" :items="perfis" v-model="filters.fk_perfil" />
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field filled label="E-mail do Usuário" :items="emails" v-model="filters.fk_email" />
                        </v-col>
                    </v-row>
                    <!-- BUTTONS ALTERNATIVE
                    <v-row class="pa-5" style="justify-content: space-evenly">
                        <v-btn color="secondary" @click="resetFilters" style="width: 12%;">
                            Limpar
                        </v-btn>
                        <v-btn color="primary" @click="getUsuarios" :loading="loading" style="width: 15%;">
                            Buscar
                        </v-btn>
                        <v-btn color="primary" style="width: 20%;">
                            Cadastrar
                        </v-btn>
                    </v-row> -->
                </v-card-text>
                <!-- BUTTONS -->
                <div class="pa-5">
                    <v-row class="pa-5">
                        <v-col cols="12" sm="6" md='3' lg='3'>
                            <v-btn color="primary" @click="getUsuarios" :loading="loading" style="width: 100%;">
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
                <v-data-table :headers="headers" :items="usuarios" :loading="loading">
                    <template v-slot:item="{ item }">
                        <v-btn color="primary" class="mr-3" icon @click="editarUsuario(item)">
                            <v-icon>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                        <v-btn color="error" icon @click="selecionarUsuario(item)">
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
                <modal-confirmar-delete v-if="abrirDeletar" :nome="usuarioSelecionado.name" @deletar="deletarUsuario"
                    @close="closeDeletar" />
            </v-card>
        </v-form>
    </div>
</template>

<script>
    import ModalConfirmarDelete from '@/components/ModalConfirmarDelete';
    import services from '@/services';
    export default {
        name: "ListaUsuario",
        data() {
            return {
                headers: [{
                        text: 'Nome',
                        value: 'name',
                    },
                    {
                        text: 'Estado/UF',
                        value: 'fk_uf',
                    },
                    {
                        text: 'Email',
                        value: 'fk_email',
                    },
                    {
                        text: 'Perfil',
                        value: 'fk_perfil',
                    },
                    {
                        text: 'Situação',
                        value: 'fk_status',
                    },
                    {
                        text: 'Ações',
                        value: 'actions'
                    }
                ],
                filters: {
                    nome: '',
                    fk_uf: null,
                    fk_email: null,
                    fk_perfil: null,
                },
                ufs: [
                    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
                    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
                    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                ],
                perfis: ['Administrador', 'Cliente',
                    'Cliente Master', 'Consultor', 'Consultor Master'
                ],
                emails: [],
                pesquisaLoading: false,
            };
        },

        async mounted() {
            await this.getUsuarioFKS();
        },

        computed: {
            usuarios() {
                return this.$store.state.usuarios;
            },
            loading() {
                return this.pesquisaLoading;
            }
        },

        methods: {
            resetFilters() {
                this.filters = {
                    nome: '',
                    fk_uf: null,
                    fk_email: null,
                    fk_perfil: null,
                };
                this.getUsuarios();
            },

            async getUsuarios() {
                try {
                    this.pesquisaLoading = true;
                    const {
                        data
                    } = await services.getUsuarios(this.filters);
                    this.$store.commit('setUsuarios', data);
                    this.pesquisaLoading = false;
                } catch (e) {
                    console.log(e);
                    this.pesquisaLoading = false;
                }
            },

            async getUsuarioFKS() {
                const {
                    data
                } = await services.getUsuarioFKS();

                this.ufs = this.getFormatted(data.ufs, 'sg_uf');
                this.perfis = this.getFormatted(data.perfis, 'ds_perfil');
                this.emails = this.getFormatted(data.emails, 'ds_email');
            },

            getFormatted(arr, value) {
                return arr.map(item => ({
                    text: item[value],
                    value: item.id
                }));
            },
            async deletarUsuario(nome) {
                try {
                    const id = this.usuarios.find(usuario => usuario.fantasia === nome).id;
                    await this.$axios.delete(`/usuarios/${id}`);
                    this.closeDeletar();
                } catch (e) {
                    this.$store.commit('showToast');
                    console.log(e);
                }
            },

            editarUsuario(usuario) {
                this.usuarioSelecionado = usuario;
            },

            closeDeletar() {
                this.usuarioSelecionado = {};
                this.abrirDeletar = false;
            },

            selecionarUsuario(usuario) {
                this.usuarioSelecionado = usuario;
                this.abrirDeletar = true;
            }
        }
    }
</script>

<style>
</style>