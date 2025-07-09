<template>
  <div>
    <div :class="styles">
      <v-select v-if="!hide" :items="items" :focused="isAgent" :disabled="disabled" :color="(!isAgent)?globalStore.primaryColor : 'red'" 
        :readonly="(readonly || isAgent)? true : false" :base-color="(isAgent)?'red' : ''" :item-value="itemValue" :item-title="itemTitle"
        :placeholder="placeholder" :rules="validationRules" :maxlenghth=maxLength @input="updateValue "
        v-model="localValue" variant="outlined" rounded density="compact">
        <template v-slot:label>
          <div>
            {{ label }} <span v-if="required" class="has-text-danger">*</span>
          </div>
        </template>
        <template v-slot:append-inner v-if="copyable">
          <span>
            <v-btn :color="(!isAgent)?globalStore.primaryColor : 'red'"  icon="mdi-content-copy" variant="text" @click="copyToClipboard(localValue)"></v-btn>
          </span>
        </template>
      </v-select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useAppGlobalStore } from '@/stores/appGlobalStore';

export default defineComponent({
  name: "Select",
  setup() {
    const globalStore = useAppGlobalStore();
    return { globalStore };
  },
  props: [
    "items",
    "isAgent",
    "label",
    "value",
    "styles",
    "inputFunc",
    "type",
    "maxLength",
    "validationRules",
    "fieldName",
    "disabled",
    "readonly",
    "required",
    "placeholder",
    "copyable",
    "hide",
    "itemValue",
    "itemTitle",
  ],
  emits : ['input', 'getError'],
  components: {},
  data() {
    return {
      isLabelFocus: false,
      errorFromProvider: "",
      localValue: '',
    };
  },
  watch: {
    "value": function () {
      if (this.value == '' || this.value == null) {
        console.log("Value updated : ", this.value)
        this.localValue = '';
      }
      else {
        this.localValue = this.value;
      }
    },
    "localValue": function () {
      console.log("localValue updated : ", this.localValue)
        this.$emit(`input`, this.localValue);
    }
  },
  methods: {
    sendError(error: any) {
      this.$emit(`getError`, error);
    },
    updateValue() {
      console.log("value updated : ", this.localValue)
      this.$emit(`input`, this.localValue);
    },
    copyToClipboard(text : any) {
      console.log("copy to clipboard called");
      const dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);

      this.globalStore.setNotification("Copied to clipboard", "is-success", 5000, "")
    },
  },
  mounted() {
    this.localValue = this.value;
  },
});
</script>
<style>
.agent-class{
  cursor: not-allowed !important;
}

.custom-float-label-initial {
  top: 0.93em !important;
  font-family: "Nunito-SemiBold", sans-serif;
  letter-spacing: 0.4px;
  font-size: 1rem !important;
  transition: ease 0.3s;
  pointer-events: none;
}

.custom-float-label {
  top: 0.22em !important;
  font-family: "Nunito-SemiBold", sans-serif;
  letter-spacing: 0.4px;
  font-size: 0.9rem !important;
  transition: ease 0.3s;
}
</style>