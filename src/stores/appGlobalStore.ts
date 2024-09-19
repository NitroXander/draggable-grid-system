import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppGlobalStore = defineStore("appGlobalStore", {
  state: () => ({
    primaryColor : 'blue',
    notification :{
      type: "",
      title:"",
      message:"",
      color :"",
      timeout : -1,
      reRouteuserTo : "",
    },
  }),

  actions : {
    setNotification(message : string, color : string, timeout : number, reRouteuserTo : string   )
    {
      this.notification.type = "snackbar";
      this.notification.message = message;
      this.notification.color = color;
      this.notification.timeout = timeout;
      this.notification.reRouteuserTo = reRouteuserTo;
    },
    clearNotification()
      {
        console.log("clearing notification")
        this.notification.type = "";
        this.notification.title = "";
        this.notification.message = "";
        this.notification.color = "";
        this.notification.timeout = -1;
        this.notification.reRouteuserTo = '';
      },
  }
})