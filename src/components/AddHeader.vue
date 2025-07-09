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
                        <p class="text-center bold-header">
                            <span> Add {{ headingType }}Heading </span>
                        </p>
                        <v-row class="justify-center align-center mx-10 mt-5">
                            <v-col cols="10">
                                <InputLabel label="Add Label" :value="labelName" @input="labelName = $event" :required="true"/>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center align-center mx-10 my-5">
                            <v-col cols="5">
                                <v-btn rounded block variant="outlined">Cancel</v-btn>
                            </v-col>
                            <v-col cols="5">
                                <v-btn rounded :color="appGlobalStore.primaryColor" flat
                                    @click="emitHeader()"
                                    block>Save</v-btn>
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

export default defineComponent({
    name : 'AddHeader',
    setup () {
        const appGlobalStore = useAppGlobalStore()
        return {
            appGlobalStore
        }
    },
    components : {
        InputLabel
    },
    props : ["modelVisible", "headingType"],
    data() {
        return {
            labelName : null as null | string,
        }
    },
    methods: {
        closeModal() {
            const comp = this
            console.log("emit close modal ....")
            comp.$emit('closeModel')
        },
        emitHeader(){
            const comp = this;
            const header = {
                type: comp.headingType+"Header",
                label: comp.labelName
            }
            comp.$emit('addHeader', header)
            comp.labelName = null
        }
    },
})
</script>
