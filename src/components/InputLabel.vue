<template>
  <div>
    <div :class="styles">
      <v-text-field v-if="!hide" :focused="isAgent" :disabled="disabled" rounded :color="(!isAgent)?appGlobalStore.primaryColor : 'red'" 
        :readonly="(readonly || isAgent)? true : false" :base-color="(isAgent)?'red' : ''" density="compact"
        :placeholder="placeholder" :rules="rules" :maxlenghth=maxLength @input="updateValue "
        v-model="localValue" variant="outlined">
        <template v-slot:label>
          <div>
            {{ label }} <span v-if="required" class="has-text-danger">*</span>
          </div>
        </template>
        <template v-slot:append-inner v-if="copyable">
          <span>
            <v-btn :color="(!isAgent)?appGlobalStore.primaryColor : 'red'"  icon="mdi-content-copy" variant="text" @click="copyToClipboard(localValue)"></v-btn>
          </span>
        </template>
        <template v-slot:prepend-inner v-if="isSearch">
          <v-icon :color="appGlobalStore.primaryColor">mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useAppGlobalStore } from '../stores/appGlobalStore';

export default defineComponent({
  name: "InputLabel",
  setup() {
    const appGlobalStore = useAppGlobalStore();
    return { appGlobalStore };
  },
  props: [
    "isSearch",
    "isAgent",
    "label",
    "value",
    "styles",
    "inputFunc",
    "type",
    "maxLength",
    "rules",
    "fieldName",
    "disabled",
    "readonly",
    "required",
    "rows",
    "cols",
    "placeholder",
    "copyable",
    "hide",
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
  },
  methods: {
    sendError(error: any) {
      this.$emit(`getError`, error);
    },
    updateValue() {
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

      this.appGlobalStore.setNotification("Copied to clipboard", "is-success", 5000, "")
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
  font-family: "Nunito-SemiBold";
  letter-spacing: 0.4px;
  font-size: 1rem !important;
  transition: ease 0.3s;
  pointer-events: none;
}

.custom-float-label {
  top: 0.22em !important;
  font-family: "Nunito-SemiBold";
  letter-spacing: 0.4px;
  font-size: 0.9rem !important;
  transition: ease 0.3s;
}
</style>