<template>
    <div>
        <v-form>
            <v-card class="mb-2">

                <v-card-text class="pa-5">
                    <v-row class="mt-1">
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select :items="perfis" filled label="Perfil" />
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select :items="ufs" filled label="Estado/UF" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field filled label="Nome do Usuário" />
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field filled label="E-mail do Usuário" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field filled label="Telefone" v-mask="'(##) ####-####'"/>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field filled label="Celular" type="number" v-mask="'(##) #####-####'"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field filled v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                name="input-10-1" label="Senha" hint="No mínimo 6 caracteres." counter
                                @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field filled v-model="passwordConfirm"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                                :type="show2 ? 'text' : 'password'" name="input-10-1" label="Confirmação de Senha"
                                hint="No mínimo 6 caracteres." counter @click:append="show2 = !show2"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <div class="pa-5">
                    <v-row class="pa-5">
                        <v-col cols="12" sm="6" md='3' lg='3'>
                            <v-btn color="primary" width="100%">
                                Salvar
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md='3' lg='3'>
                            <v-btn color="secondary" width="100%">
                                Voltar
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>

            </v-card>
        </v-form>
    </div>
</template>

<script>
    export default {
        data: () => ({
            perfis: ['Administrador', 'Cliente',
                'Cliente Master', 'Consultor', 'Consultor Master'
            ],
            ufs: [
                "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
                "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
                "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
            ],
            show1: false,
            show2: false,
            password: '',
            rules: {
                required: value => !!value || 'Obrigatório.',
                min: v => v.length >= 6 || 'Mínimo 6 caracteres.'
            },
        }),
    }
</script>

<style scoped>
</style>