<template>
  <div>
    <v-form>
      <v-card class="mb-2">

        <v-card-text class="pa-5">
          <v-row>
						<v-col cols="12" sm="6" md='6' lg='6'>
              <v-text-field filled v-model="message3" class="mt-2" regular label="Nome do Grupo" clearable></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <div class="d-grid justify-start pa-5">
          <v-col cols="12" sm="6" md='4' lg='3'>
            <h2>
              Grupo:
            </h2>
          </v-col>
          <v-col cols="12" sm="6" md='4' lg='3'>
            <v-btn class="primary mt-5" style="width: 100%">
              Relatório
            </v-btn>
          </v-col>
        </div>

        <div class="pa-5">
				  <v-row class="pa-5">
            <v-col cols="12" sm="6" md='4' lg='3'>
              <v-btn class="primary" style="width: 100%">
                Buscar
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md='4' lg='3'>
              <v-btn outlined color="primary" style="width: 100%">
                Salvar
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

  }
</script>

<style scoped>

</style>