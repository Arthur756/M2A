<template>
    <section>
        <v-card class="mb-2">

            <v-card-text class="pa-5">
                <v-row>
                    <v-col cols="12" sm="8">
                        <v-text-field filled append-icon="mdi-magnify" label="Pergunta" v-model="filters.search" />
                    </v-col>
                    <v-col cols="12" sm="4">
                        <div class="d-flex justify-end pa-5">
                            <v-btn color="primary" style="width: 100%;">
                                Pesquisar
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        
        <v-data-table :headers="headers" :items="respostas" :loading="loading">
            <template v-slot:item="{ item }">
                <v-btn color="primary" class="mr-3" icon @click="editarResposta(item)">
                    <v-icon>
                        mdi-pencil
                    </v-icon>
                </v-btn>
                <v-btn color="error" icon @click="selecionarResposta(item)">
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </template>

            <template v-slot:no-data>
                <div class="d-flex flex-column align-center justify-center pa-10">
                    <v-row class="d-flex justify-center pa-5" style="width: 100%;">
						<v-col cols="12" sm="6" md='4' lg='3'>
                            <h3 class="mb-3">Nenhuma resposta encontrada.</h3>
                            <v-btn color="primary" style="width: 100%;">Cadastrar Resposta</v-btn>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </v-data-table>

        <modal-confirmar-delete v-if="abrirDeletar" :nome="respostaSelecionada.fantasia" @deletar="deletarResposta"
            @close="closeDeletar" />
    </section>
</template>

<script>
    import ModalConfirmarDelete from '@/components/ModalConfirmarDelete';
    import services from '@/services';

    export default {
        name: "ListaResposta",
        components: {
            ModalConfirmarDelete
        },
        data() {
            return {
                respostaSelecionada: {},
                abrirDeletar: false,
                headers: [{
                        text: 'Criterio',
                        value: 'criterio',
                    },
                    {
                        text: 'Resposta',
                        value: 'fk_resposta',
                    },
                    {
                        text: 'Nota',
                        value: 'fk_nota',
                    },
                    {
                        text: 'Ações',
                        value: 'actions'
                    }
                ],
                filters: {
                    search: '',
                },
                criterios: [],
                respostas: [],
                notas: [],
                pesquisaLoading: false,
            };
        },

        computed: {
            respostas() {
                return this.$store.state.respostas;
            },
            loading() {
                return this.pesquisaLoading;
            }
        },

        methods: {
            resetFilters() {
                this.filters = {
                    search: '',
                };
                this.getRespostas();
            },

            async getRespostas() {
                try {
                    this.pesquisaLoading = true;
                    const {
                        data
                    } = await services.getRespostas(this.filters);
                    this.$store.commit('setRespostas', data);
                    this.pesquisaLoading = false;
                } catch (e) {
                    console.log(e);
                    this.pesquisaLoading = false;
                }
            },

            getFormatted(arr, value) {
                return arr.map(item => ({
                    text: item[value],
                    value: item.id
                }));
            },

            async deletarResposta(nome) {
                try {
                    const id = this.respostas.find(resposta => resposta.fantasia === nome).id;
                    await this.$axios.delete(`/respostas/${id}`);
                    this.closeDeletar();
                } catch (e) {
                    this.$store.commit('showToast');
                    console.log(e);
                }
            },

            editarResposta(resposta) {
                this.respostaSelecionada = resposta;
            },

            closeDeletar() {
                this.respostaSelecionada = {};
                this.abrirDeletar = false;
            },

            selecionarResposta(resposta) {
                this.respostaSelecionada = resposta;
                this.abrirDeletar = true;
            }
        }
    };
</script>

<style scoped>

</style>