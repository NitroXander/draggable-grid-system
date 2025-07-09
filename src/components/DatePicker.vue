<template>
  <div>
    <div>
      <v-menu v-if="!isRange" ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40"
        transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-text-field :color="appGlobalStore.primaryColor" :rules="rules" multiline rounded density="compact"
            v-model="currentDate" :placeholder="placeholder" readonly variant="outlined" v-bind="props"
            style="width: 100%;">
            <template v-slot:label>
              {{ firstLabel }} <span class="note-color-class">{{ required ? '*' : '' }}</span>
            </template>
            <template v-slot:append-inner>
                <span class="icon is-small is-right">
                  <span>
                    <v-icon :color="appGlobalStore.primaryColor">mdi-calendar</v-icon>
                  </span>
                </span>
              </template>
          </v-text-field>
        </template>
        <v-row no-gutters class="mt-n5">
          <v-col v-if="!disabled">
            <v-date-picker :disabled="disabled" class="mt-n10" :hide-header="true"
              :min="pastDisabled ? new Date().toISOString().substr(0, 10) : minDate" :max="maxDate"
              no-title scrollable v-model="firstdate" @update:model-value="emitSelectedDate">
            </v-date-picker>
            <v-btn class="mt-n2" block flat :color="appGlobalStore.primaryColor" @click="menu = false">OK</v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-n10">
          <v-col>
          </v-col>
        </v-row>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { DateTimeManger } from '../helpers/dateTimeManger';
import { useAppGlobalStore } from '../stores/appGlobalStore';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DatePicker',
  setup() {
    const appGlobalStore = useAppGlobalStore()
    return { appGlobalStore }
  },
  props: [
    "required",
    'minDate',
    "isRange",
    'rules',
    "firstLabel",
    "pastDisabled",
    "futureDisabled",
    "adultsOnly",
    "selectedFirstDate",
    "disabled",
    "placeholder",
  ],

  data() {
    return {
      maxYear: null as any,
      firstdate: null as any,
      endDate: null as any,
      menu: false,
      oldmenu: false,
      maxDate: null as any,
      // calendarImage : new URL('@/assets/images/icons/Calendar.png', import.meta.url).href
    }
  },
  watch: {
    'selectedFirstDate': function () {
      if(this.selectedFirstDate !== null && new Date(this.selectedFirstDate).getTime !== this.firstdate) {
        // let formatFirstDate = DateTimeManger.formatInputDates(new Date(this.selectedFirstDate))
        // if(this.selectedFirstDate  != this.parseDate(formatFirstDate))
        this.firstdate = new Date(this.selectedFirstDate);
        // this.emitSelectedDate()
      }
      if(this.selectedFirstDate === null) {
        this.firstdate = null
      }
    },
    'firstdate': function () {
      if(this.firstdate !== null && new Date(this.selectedFirstDate).getTime() !== this.firstdate.getTime()) {
        console.log("this.firstdate",this.firstdate)
        console.log("DateTimeManger.formatInputDates(new Date(this.firstdate))",DateTimeManger.formatInputDates(new Date(this.firstdate).toString()))
        // this.emitSelectedDate()
      }
    },
  },
  computed: {
    currentDate: {
      get() {
        if(this.firstdate !== null)
        {
          return DateTimeManger.formatInputDates(this.firstdate.toString())
        }
      },

      set(val : any) {
        this.firstdate = new Date(val)
      }
    },
  },
  methods: {
    // formatInputDates(date) {
    //   if (!date) {
    //     return null
    //   }
    //   else {
    //     console.log("Date found : ", date)
    //     let userDate = DateTimeManger.formatInputDates(new Date(this.firstdate))
    //     const [year, month, day] = userDate.split('-')
    //     return `${day}-${month}-${year}`
    //   }
    // },
    parseDate(date :any) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    getFormattedDate(date :any) {
      console.log(DateTimeManger.formatInputDates(date))
    },
    emitSelectedDate() {
      if(this.firstdate !== null) {
        console.log("first date selected ROW Format :",this.firstdate)
        console.log("Formatted and Emmited Date :", DateTimeManger.formatInputDates(new Date(this.firstdate).toString()))
        this.$emit('firstDateEmit', DateTimeManger.formatInputDates(new Date(this.firstdate).toString()));
      }
    },
    setMaxDate() {
      if (this.adultsOnly) {
        const today = new Date();
        console.log("Adults only")
        this.maxDate = new Date(today.setFullYear(today.getFullYear() - 18))
        this.maxYear = new Date(today.setFullYear(today.getFullYear() - 18)).getFullYear();
        console.log(new Date().getFullYear() - 18)
        this.maxYear = new Date().getFullYear() - 18
      }
      if (this.futureDisabled) {
        this.maxDate = new Date().toISOString().substr(0, 10)
      }
    }
  },
  mounted() {
    this.setMaxDate()
    if (this.selectedFirstDate !== null) {
      this.firstdate = new Date(this.selectedFirstDate);
      this.emitSelectedDate()
    }
  }
})
</script>

<style scoped>
.v-date-picker {
  width: auto !important;
}
</style>