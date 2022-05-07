<template>
	<v-dialog max-width="500" value="true" persistent>
		<v-card>
			<v-card-title>Deseja mesmo deletar "{{ nome }}"</v-card-title>

			<v-card-text>
				<v-text-field v-model="text" @input="textOnChange" placeholder="DELETAR" filled
											hint='Digite "DELETAR" para confirmar.' persistent-hint/>
			</v-card-text>

			<v-card-actions class="justify-end">
				<v-btn text @click="$emit('close')">
					cancelar
				</v-btn>
				<v-btn color="error" @click="$emit('deletar', nome)" :disabled="text.toLowerCase() !== 'deletar'">
					Deletar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['nome'],
	model: {
		prop: 'abrir',
		event: ''
	},
	name: "ModalConfirmarDelete",
	data() {
		return {
			text: '',
		};
	},

	methods: {
		textOnChange(value) {
			this.text = value.toUpperCase();
		}
	}
};
</script>

<style scoped>

</style>
