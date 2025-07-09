<template>
  <div>
    <div>
      <h1 class="text-center ">KYC FORM BUILDER</h1>
      <p class="mx-10 mt-10">Select Your Colors</p>
      <v-row class="justify-center mx-10 mt-5">
        <v-col>
          <ColorPicker label="Primary Color" :value="appGlobalStore.primaryColor" @input="appGlobalStore.primaryColor = $event"/>
        </v-col>
        <v-col>
          <ColorPicker label="Secondary Color" :value="appGlobalStore.secondaryColor" @input="appGlobalStore.secondaryColor = $event"/>
        </v-col>
        <v-col>
          <ColorPicker label="Header Color" :value="appGlobalStore.headerColor" @input="appGlobalStore.headerColor = $event"/>
        </v-col>
      </v-row>
      <div style="width:100%;margin-top: 10px;height:100%;">
        <grid-layout :layout="layout" :col-num="12" :row-height="30" :is-draggable="draggable" :auto-size="true"
          :is-resizable="resizable" :is-bounded="bounded" :vertical-compact="false" :use-css-transforms="true">
          <grid-item v-for="(item, index) in returnLayout" :key="index" :static="item.static" :x="item.x" :y="item.y"
            :w="item.w" :h="item.h" :i="item.i">
            <div v-if="item.type == 'Divider'">
              <v-switch class="no-validation static-class mt-n4 mb-5" :true-value="true" color="green"
                :false-value="false" v-model="item.static" label="Static"></v-switch>
              <v-btn class="remove" variant="plain" flat rounded size="x-small" @click="removeItem(item.i)">
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <div class="mt-10"></div>
              <v-divider class="ma-5" :thickness="8"></v-divider>
            </div>
            <div v-if="item.type == 'Text'">
              <v-switch class="no-validation static-class mt-n4 mb-5" :true-value="true" color="green"
                :false-value="false" v-model="item.static" label="Static"></v-switch>
              <v-btn class="remove" variant="plain" flat rounded size="x-small" @click="removeItem(item.i)">
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <InputLabel class="mt-6 px-1" :label="item.label" @input="item.value = $event; changeLogger"
                :value="item.value" :required="item.required" style="width: 100%" />
            </div>
            <div v-if="item.type == 'Sub-Header'">
              <v-switch class="no-validation static-class mt-n4 mb-5" :true-value="true" color="green"
                :false-value="false" v-model="item.static" label="Static"></v-switch>
              <v-btn class="remove" variant="plain" flat rounded size="x-small" @click="removeItem(item.i)">
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <h3 class="mt-5 main-header">{{ item.label }}</h3>

            </div>
            <div v-if="item.type == 'Main-Header'">
              <v-switch class="no-validation static-class mt-n4 mb-5" :true-value="true" color="green"
                :false-value="false" v-model="item.static" label="Static"></v-switch>
              <v-btn class="remove" variant="plain" flat rounded size="x-small" @click="removeItem(item.i)">
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <h1 class="mt-5 main-header" :style="`color :${getHeaderColor}`">{{ item.label }}</h1>
            </div>
            <div v-if="item.type == 'TextArea'">
              <v-switch class="no-validation static-class mt-n4" :true-value="true" color="green" :false-value="false"
                v-model="item.static" label="Static"></v-switch>
              <v-btn class="remove" variant="plain" flat rounded size="x-small" @click="removeItem(item.i)">
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <InputArea class="mt-6 px-1" :label="item.label" :value="item.value"
                @input="item.value = $event; changeLogger" :required="item.required" style="width: 100%" />
            </div>

            <div v-if="item.type == 'Autocomplete'">
              <v-switch class="no-validation static-class mt-n4" :true-value="true" color="green" :false-value="false"
                v-model="item.static" label="Static"></v-switch>
              <v-btn class="remove" variant="plain" flat rounded size="x-small" @click="removeItem(item.i)">
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <Autocomplete :items="item.itemList" class="mt-6 px-1" :label="item.label" :value="item.value"
                @input="item.value = $event; changeLogger" :required="item.required" style="width: 100%" />
            </div>

            <div v-if="item.type == 'Select'">
              <v-switch class="no-validation static-class mt-n4" :true-value="true" color="green" :false-value="false"
                v-model="item.static" label="Static"></v-switch>
              <v-btn class="remove" variant="plain" flat rounded size="x-small" @click="removeItem(item.i)">
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <Select :items="item.itemList" class="mt-6 px-1" :label="item.label" :value="item.value" itemValue="value"
              itemTitle="label" @input="item.value = $event; changeLogger" :required="item.required" style="width: 100%"></Select>
            </div>
          </grid-item>
        </grid-layout>
      </div>
    </div>
    <v-speed-dial location="top center" transition="fade-transition">
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab class="mx-10 mt-10" v-bind="activatorProps" size="large" icon="mdi-plus"></v-fab>
      </template>

      <v-btn key="1" @click="viewAddField = true;" rounded><v-icon>mdi-focus-field</v-icon>Add Field</v-btn>
      <v-btn key="2" rounded @click="addHeaderVisible = true; headingType = 'Main-'">
        <v-icon>mdi-format-header-1</v-icon>Add Heading</v-btn>
      <v-btn key="3" rounded @click="addHeaderVisible = true; headingType = 'Sub-'">
        <v-icon>mdi-format-header-2</v-icon>Add Sub-Heading</v-btn>
      <v-btn key="4" rounded @click="AddPageBreaker">
        <v-icon>mdi-format-page-break</v-icon>Add Break</v-btn>
    </v-speed-dial>
    <AddField :modelVisible="viewAddField" @closeModel="viewAddField = false;" @createField="addItem" />
    <AddHeader :modelVisible="addHeaderVisible" :headingType="headingType" @addHeader="addHeader"
      @closeModel="addHeaderVisible = false;" />
  </div>
  <!-- {{ layout }} -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next';
import AddField from '../components/AddField.vue';
import InputLabel from '../components/InputLabel.vue';
import Select from '@/components/Select.vue';
import Autocomplete from '@/components/Autocomplete.vue';
import InputArea from '@/components/InputArea.vue';
import AddHeader from '@/components/AddHeader.vue';
import ColorPicker from '@/components/ColorPicker.vue';
import { HeaderCreator, GridMaker } from '@/helpers/GridMaker';
import { useAppGlobalStore } from '../stores/appGlobalStore'

export default defineComponent({
  setup() {
    const appGlobalStore = useAppGlobalStore()
    return {
      appGlobalStore
    }
  },
  components: {
    GridLayout,
    GridItem,
    AddField,
    InputLabel,
    InputArea,
    AddHeader,
    Select,
    Autocomplete,
    ColorPicker
  },
  data() {
    return {
      layout: [] as Array<GridMaker>,
      draggable: true,
      resizable: true,
      bounded: false,
      headingType: '',
      viewAddField: false,
      addHeaderVisible: false,
      openColorModal: false,
    }
  },
  computed: {
    returnLayout() {
      return this.layout
    },
    getHeaderColor() {
      return this.appGlobalStore.headerColor
    }
  },
  methods: {

    addItem(value: GridMaker) {
      const comp = this;
      console.log("value : ", value)
      let header = new GridMaker()
      console.log("header", header)
      header = value
      header.i = comp.layout.length.toString()
      if (header.type == 'TextArea') {
        header.h = 4
      }
      else {
        header.h = 2
      }
      header.w = 6
      comp.layout.push(header)
      comp.viewAddField = false
    },
    addHeader(value: HeaderCreator) {
      console.log("value : ", value)
      const comp = this;
      const header = new GridMaker()
      header.type = value.type
      header.label = value.label
      header.w = 12
      header.h = 2
      header.i = comp.layout.length.toString()
      console.log("header", header)
      comp.addHeaderVisible = false
      comp.layout.push(header)
      comp.addHeaderVisible = false
      // restart DOM to render updates
      comp.$forceUpdate()
    },
    AddPageBreaker(value: HeaderCreator) {
      console.log("value : ", value)
      const comp = this;
      const header = new GridMaker()
      header.type = "Divider"
      header.w = 12
      header.h = 2
      header.i = comp.layout.length.toString()
      console.log("header", header)
      comp.addHeaderVisible = false
      comp.layout.push(header)
      // restart DOM to render updates
      comp.$forceUpdate()
    },
    changeLogger(val: any) {
      console.log("loggin changes :", val)
    },
    removeItem: function (val: string) {
      const index = this.layout.map(item => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
    onUpdate() {
      // console.log(this.rows)
    },
    columnCalculator(section: Array<any>) {
      let colSize = 12 / section.length
      console.log(colSize)
      return colSize
    }
  }
})
</script>

<style scoped>
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}

.static-class {
  position: absolute;
  left: 2px;
  top: 0;
  cursor: pointer;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  border: 1px dashed black;
  border-radius: 5px;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.layoutJSON {
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
</style>