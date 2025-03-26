<template>
    <div>
        <v-dialog class="dialog-overlay" persistent transition="dialog-bottom-transition" v-model="modelVisible"
            width="uset">
            <v-row no-gutters class="justify-center align-center">
                <v-col cols="6">
                    <v-card class="mx-5 mb-10 align-self-center scrollable-content"
                        style="border-radius: 10px; border: 1px solid #0949a2">
                        <v-card-item class="justify-end">
                            <v-btn class="text-none" variant="plain" icon="$close" size="large" style="text-align: end"
                                @click="closeModal">
                            </v-btn>
                        </v-card-item>
                        <p class="text-center bold-header"> Add New Field </p>
                        <v-form @submit.prevent v-model="isFormValid">
                            <v-row class="justify-center align-center mx-10 mt-5">
                                <v-col cols="12">
                                    <Select :items="dataTypes" density="compact" itemValue="value"
                                        label="Select Data Type" :required="true"
                                        :rules="RuleProvider.setRules('Data Type', true, false, false, false, 0, 0, false)"
                                        itemTitle="type" :value="selectedDataType" @input="selectedDataType = $event">
                                    </Select>
                                </v-col>
                            </v-row>
                            <v-row class="justify-center align-center mx-10">
                                <v-col cols="12">
                                    <InputLabel label="Add Label" :value="labelName" @input="labelName = $event"
                                        :rules="RuleProvider.setRules('Label', true, false, false, false, 0, 0, false)"
                                        :required="true" />
                                </v-col>

                            </v-row>
                            <v-row class="justify-center align-center mx-10 mt-5 "
                                v-if="selectedDataType === 'Autocomplete'
                                    || selectedDataType === 'Select' || selectedDataType === 'Radio' || selectedDataType === 'Checkbox'">
                                <v-col cols="6">
                                    <v-virtual-scroll :items="[1]" :height="setHeight"
                                        style="overflow-x: hidden !important;">
                                        <v-row class="ma-0" style="border: #0949a2 1px solid; border-radius: 25px;">
                                            <div v-if="itemList.length > 0">
                                                <v-col cols="auto" v-for="(item, index) in itemList" :key="index">
                                                    <v-chip :color="appGlobalStore.primaryColor">{{ item }}</v-chip>
                                                </v-col>
                                            </div>
                                            <div v-else>
                                                <v-col cols="auto">
                                                    <v-chip :color="appGlobalStore.primaryColor">Add Items</v-chip>
                                                </v-col>
                                            </div>
                                        </v-row>
                                    </v-virtual-scroll>
                                </v-col>
                                <v-col cols="6">
                                    <v-file-input clearable label="File input" accept="application/JSON"
                                        v-model="selectedFile" @update:model-value="processSelectedFile"></v-file-input>
                                    <!-- <InputLabel label="Add Item" :value="addItem" @input="addItem = $event" :required="false" /> -->
                                </v-col>
                            </v-row>
                            <v-row class="justify-center align-center mx-10 my-5">
                                <v-col cols="6">
                                    <v-btn rounded :color="appGlobalStore.secondaryColor" block
                                        variant="outlined">Cancel</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn rounded :color="appGlobalStore.primaryColor" flat block
                                        :disabled="!isFormValid" @click=createField()>Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppGlobalStore } from '../stores/appGlobalStore'
import InputLabel from './InputLabel.vue'
import { GridMaker } from '@/helpers/GridMaker';
import { RuleProvider } from '@/helpers/RuleProvider';
import Select from './Select.vue';

export default defineComponent({
    name: 'AddField',
    setup() {
        const appGlobalStore = useAppGlobalStore()
        return {
            appGlobalStore
        }
    },
    components: {
        InputLabel,
        Select,
    },
    props: ["modelVisible"],
    emits: ["closeModel", 'createField'],
    data() {
        return {
            isFormValid: false,
            dataTypes: [{ type: "Text", value: "Text" }, { type: "Text Area", value: "TextArea" },
            { type: "Autocomplete List", value: "Autocomplete" }, { type: "Select List", value: "Select" }, { type: "Radio Buttons", value: "Radio" }, { type: "Checkboxs", value: "Checkbox" }],
            selectedDataType: null as null | string,
            labelName: null as null | string,
            required: false,
            itemList: [] as Array<any>,
            selectedFile: null as null | File,
            addItem: null as null | string,
        }
    },
    computed: {
        setHeight() {
            const height = window.innerHeight / 100 * 20
            return height
        },
        RuleProvider() {
            return RuleProvider
        },
    },
    watch: {
        modelVisible() {
            const comp = this
            if (comp.modelVisible) {
                comp.selectedDataType = null
                comp.labelName = null
                comp.required = false
                comp.itemList = []
                comp.selectedFile = null
                comp.addItem = null
            }
        }
    },
    methods: {
        closeModal() {
            const comp = this
            console.log("emit close modal ....")
            comp.$emit('closeModel')
        },
        processSelectedFile() {
            const comp = this
            const fileReader = new FileReader()
            fileReader.readAsText(comp.selectedFile as File)
            fileReader.onload = function () {
                const fileContent = JSON.parse(fileReader.result as string)
                comp.itemList = fileContent
            }
        },
        createField() {
            const comp = this
            const header = new GridMaker()
            header.label = comp.labelName as string
            header.type = comp.selectedDataType as string
            header.required = comp.required
            header.itemList = comp.itemList

            comp.$emit('createField', header)
        },
    },
})
</script>

<style scoped></style>