<template>
    <div>
        <v-form>
            <v-card class="mb-2">

                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12" sm="6" md='6' lg='6'>
                            <v-text-field v-model="message3" class="mt-2" filled label="Nome do Grupo" clearable></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <div class="d-flex justify-center align-center pa-5">
                <v-row>
                    <v-col cols="12" sm="6" md='4' lg='3'>
                    <div>
                        <v-col cols="12">
                            <v-checkbox v-model="checkbox1" :label="`Empresa 1`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox2" :label="`Empresa 2`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox3" :label="`Empresa 3`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox4" :label="`Empresa 4`">
                            </v-checkbox>
                        </v-col>
                    </div>
                    <div class="p-15">
                        <v-col cols="12">
                            <v-checkbox v-model="checkbox5" :label="`Empresa 5`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox6" :label="`Empresa 6`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox7" :label="`Empresa 7`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox8" :label="`Empresa 8`">
                            </v-checkbox>
                        </v-col>
                    </div>
                    <div class="p-15">
                        <v-col cols="12">
                            <v-checkbox v-model="checkbox9" :label="`Empresa 9`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox10" :label="`Empresa 10`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox11" :label="`Empresa 11`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox12" :label="`Empresa 12`">
                            </v-checkbox>
                        </v-col>
                    </div>
                    <div class="p-15">
                        <v-col cols="12">
                            <v-checkbox v-model="checkbox13" :label="`Empresa 13`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox14" :label="`Empresa 14`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox15" :label="`Empresa 15`">
                            </v-checkbox>
                            <v-checkbox v-model="checkbox16" :label="`Empresa 16`">
                            </v-checkbox>
                        </v-col>
                    </div>
                    </v-col>
                    </v-row>
                </div>
                <div class="pa-5">
                    <v-row class="pa-5">
						<v-col cols="12" sm="6" md='4' lg='3'>
                            <v-btn color="primary" style="width: 100%">
                                Salvar
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md='4' lg='3'>
                            <v-btn color="secondary" style="width: 100%">
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
        data() {
            return {
                checkbox: false,
            }
        },
    }
</script>

<style scoped>
</style>