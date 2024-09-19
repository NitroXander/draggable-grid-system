<template>
    <div>
        <v-dialog class="dialog-overlay" persistent transition="dialog-bottom-transition" v-model="modelVisible"
            width="uset">
            <v-row no-gutters class="justify-center align-center">
                <v-col cols="8">
                    <v-card class="mx-5 mb-10 align-self-center scrollable-content"
                        style="border-radius: 10px; border: 1px solid #0949a2">
                        <v-card-item class="justify-end">
                            <v-btn class="text-none" variant="plain" icon="$close" size="large" style="text-align: end"
                                @click="closeModal">
                            </v-btn>
                        </v-card-item>
                        <p class="has-text-centered bold-header">
                            <span> Add New Field </span>
                        </p>
                        <v-row class="justify-center align-center mx-10 mt-5">
                            <v-col cols="12">
                                <v-select :items="dataTypes" label="Select Data Type" rounded density="compact"
                                    :color="appGlobalStore.primaryColor" variant="outlined" v-model="selectedDataType">
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center align-center mx-10 mt-5 " v-if="selectedDataType === 'Autocomplete'
                            || selectedDataType === 'Select' || selectedDataType === 'Radio' || selectedDataType === 'Checkbox'">
                            <v-col cols="6">
                                <v-virtual-scroll :items="[1]" :height="setHeight" style="overflow-x: hidden !important;">
                                    <v-row class="ma-0" style="border: #0949a2 1px solid; border-radius: 25px;"
                                        v-if="itemList.length > 0">
                                        <v-col cols="auto" v-for="(item, index) in itemList" :key="index">
                                            <v-chip :color="appGlobalStore.primaryColor" closable
                                                @click:close="removeItem(index)">{{ item }}</v-chip>
                                        </v-col>
                                    </v-row>
                                </v-virtual-scroll>
                            </v-col>
                            <v-col cols="5">
                                <InputLabel label="Add Item" :value="addItem" @input="addItem = $event" />
                            </v-col>
                            <v-col>
                                <v-btn class="mt-n5" :color="appGlobalStore.primaryColor" size="small" icon="mdi-check"
                                    @click="addItemToList"></v-btn>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center align-center mx-10 mt-n5">
                            <v-col cols="6">
                                <label>Required</label>
                                <v-radio-group v-model="required" inline :color="appGlobalStore.primaryColor">
                                    <v-radio label="Yes" :value="true"></v-radio>
                                    <v-radio label="No" :value="false"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="6">
                                <InputLabel label="Add Label" :value="labelName" @input="labelName = $event"
                                    :required="true" />
                            </v-col>
                        </v-row>
                        <v-row class="justify-center align-center mx-10 my-5">
                            <v-col cols="6">
                                <v-btn rounded block variant="outlined">Cancel</v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn rounded :color="appGlobalStore.primaryColor" flat block @click=createField()>Save</v-btn>
                            </v-col>
                        </v-row>
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

export default defineComponent({
    name: 'AddField',
    setup() {
        const appGlobalStore = useAppGlobalStore()
        return {
            appGlobalStore
        }
    },
    components: {
        InputLabel
    },
    props: ["modelVisible"],
    emits: ["closeModel", 'createField'],
    data() {
        return {
            dataTypes: ["Text", "TextArea", "Autocomplete", "Select", "Radio", "Checkbox"],
            selectedDataType: null as null | string,
            labelName: null as null | string,
            required: false,
            itemList: [] as Array<string>,
            addItem: null as null | string,
        }
    },
    computed: {
        setHeight() {
            const height = window.innerHeight / 100 * 20
            return height
        },
    },
    methods: {
        closeModal() {
            const comp = this
            console.log("emit close modal ....")
            comp.$emit('closeModel')
        },
        addItemToList() {
            const comp = this
            comp.itemList.push(comp.addItem as string)
            comp.addItem = null
        },
        removeItem(index: number) {
            const comp = this
            comp.itemList.splice(index, 1)
        },
        createField(){
            const comp = this
            const header = new GridMaker()
            header.label = comp.labelName as string
            header.type = comp.selectedDataType as string
            header.required = comp.required
            header.itemList = comp.itemList

            comp.$emit('createField', header)
        }
    },
})
</script>

<style scoped></style>