<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
                <v-btn :color="value" v-bind="props"> {{ label }} </v-btn>
            </template>

            <v-card min-width="300">
                <v-color-picker v-model="localValue" elevation="0" @update:model-value="updateValue"></v-color-picker>
            </v-card>
        </v-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {}
    },
    props: ['value', 'label'],
    data() {
        return {
            menu: false,
            localValue: null as null | string,
        }
    },
    methods: {
        updateValue() {
            console.log(`ColorPicker: updateValue: ${this.localValue}`);
            this.$emit(`input`, this.localValue);
        },
    },
    mounted() {
        this.localValue = this.value;
    },
})
</script>

<style scoped></style>