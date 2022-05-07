<template>
    <div>
        <v-form>
            <v-card class="mb-2">
                <!-- SEARCH -->
                <v-card-text class="pa-5">
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select filled label="Consultor Responsável" :items="cr" />
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select filled label="Empresa" :items="empresa" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select filled label="Fase do Projeto" :items="fp" />
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select filled label="Ano do Projeto" :items="ap" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select filled label="Tipo" :items="tipo" />
                        </v-col>
                    </v-row>
                </v-card-text>
                <!-- BUTTONS -->
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
        data() {
            return {
                cr: [
                    "Santana"
                ],
                empresa: [
                    "3W Consultoria Empresarial", "Açougue do Gilder", "Agilize Brasil", "Aki lanches",
                    "Andréa Alves", "Andrea vaiedades", "Antonia", "Antonio Calixto de Alencar",
                    "AQUI TEM", "asdasd", "Aurilene Passos", "Boa Vista", "BRINCA PARK", "Cães e Cia Pet Shop ",
                    "Caixa Crescer", "Casa Decorações", "CASA KLIM", "Casazul", "Céu e Mar Auto Center",
                    "Chaveiro e Sapataria", "CHIP INFORMÁTICA", "Cíntia Sidinéia Alves dos Santos", "Clarismundo",
                    "Clínica Médica Via Salute", "Clinpés Podologia", "DELICIAS MINEIRAS", "DELMAN MOVEIS",
                    "Distribuidora Teles", "Dulce Patagônia", "Elite Moto Boys", "Escola Carrossel", "ESPAÇO",
                    "Essência moda", "Faceburg", "Flor de Cerrado", "FLORICULTURA ARCO-FLORES",
                    "FLORICULTURA ARCO-FLORES", "Francisca Furtado de Brito", "franco", "G Barbosa",
                    "Galeto na Brasa", "Geovanes Calli", "Glamour", "GNT Informática", "Gracinilda",
                    "Gráfica Artecor", "Integrando Soluções", "Intelvision", "Ivanildes dos Santos",
                    "J C Sonorização", "Laboratório Bioclínico", "Lancheria Massa de Mais",
                    "Lanternagem e pinturas",
                    "Lig celular", "Lucia", "Maria Joaquina", "Marli Gadelha de Oliveira", "Mauricio master",
                    "MERCADINHO PAGUE MENOS", "Mercearia Vitória", "Núcleo da Beleza ", "OBA HORTIFRUTA",
                    "Officina Arq. Design", "Paixão", "Panificadora kenia", "Pedro", "Pedro Guilherme", "PIZZA INN",
                    "Point Goiano", "Ponto Certo Celuar", "Pousada do Bessa", "Raquel Rufino Soares",
                    "Restaurante D. Maria", "Restaurante e pizzaria Asas de Minas", "Ribeiro",
                    "RICARDO BORRACHARIA",
                    "Rosa La rouge", "Sabor Caseiro", "Sabor e Arte", "Salão Emmmanoel", "Sebrae Catalão",
                    "Sebrae-GO",
                    "Sebrae-GO/Valparaíso", "Serralheria", "SERRALHERIA NOVA ALIANÇA", "SG MULTSERVICE",
                    "SINDIATACADISTA",
                    "SMPE-DF", "Sorveteria Caramello", "Stillus", "Stillus Calçados", "SUPERGIRO", "SUPERGOMES",
                    "SUPERMAX",
                    "SUPERMERCADO ALVORADA", "Supermercado Barbosa", "Supermercado das Verduras",
                    "SUPERMERCADO DONA DE CASA",
                    "SUPERMERCADO FRONTAL", "SUPERMERCADO GALEGO", "SUPERMERCADO MARANHÃO",
                    "SUPERMERCADO MARANHÃO 2", "SUPERMERCADO MENESES",
                    "SUPERMERCADO MONTE FUJI", "SUPERMERCADO PASSE BEM", "SUPERMERCADO POTIGUA",
                    "SUPERMERCADO UNIVERSE", "SUPERMERCADOS CANTEIROS",
                    "Tambo de criola", "Teste Sebrae Nacional", "Teste Sebrae Nacional 2", "USEINOX", "Val Latas",
                    "Villa Sushi", "VITÓRIA HAIR"
                ],
                fp: ['T0', 'T1', 'T2', 'T3', 'T4', 'T5'],
                ap: ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011'],
                tipo: ['Simples', 'Completo']
            };
        }
    }
</script>

<style>
</style>