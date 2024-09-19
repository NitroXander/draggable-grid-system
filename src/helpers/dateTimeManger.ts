interface DateTimeManager {
    formatDate(dateString: string): string;
    formatDateTime(dateString: string): string;
    getTimestampForActivityLog(dateString: string): string;
    formatInputDates(dateString: string): string;
    formatCustomerInputDates(dateString: string): string;
    getVideoCallNotificationDateTime(date: string, time: string): string;
    ddMMyyyyDate(date: Date): string;
}

const DateTimeManger: DateTimeManager = {

    formatDate(dateString: string): string {
        const date = new Date(dateString);

        let month: string | number = date.getMonth() + 1;
        let newDate: string | number = date.getDate();

        newDate = newDate < 10 ? '0' + newDate : newDate;
        month = month < 10 ? '0' + month : month;

        return `${newDate}-${month}-${date.getFullYear()}`;
    },

    formatDateTime(dateString: string): string {
        if (dateString.trim() === "") {
            return "";
        } else {
            const date = new Date(dateString);

            let hours = date.getHours();
            let minutes: string | number = date.getMinutes();
            let seconds: string | number = date.getSeconds();

            let month: string | number = date.getMonth() + 1;
            let newDate: string | number = date.getDate();

            newDate = newDate < 10 ? '0' + newDate : newDate;
            month = month < 10 ? '0' + month : month;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds >= 10 ? seconds : "0" + seconds;

            const strTime = `${hours}:${minutes}:${seconds}\n`;

            return `${newDate}-${month}-${date.getFullYear()}, ${strTime}`;
        }
    },

    getTimestampForActivityLog(dateString: string): string {
        if (dateString.trim() === "") {
            return "";
        } else {
            const date = new Date(dateString);

            let hours: string | number = date.getHours();
            let minutes: string | number = date.getMinutes();
            let seconds: string | number = date.getSeconds();

            let month: string | number = date.getMonth() + 1;
            let newDate: string | number = date.getDate();

            newDate = newDate < 10 ? '0' + newDate : newDate;
            month = month < 10 ? '0' + month : month;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds >= 10 ? seconds : "0" + seconds;

            const strTime = `${hours}:${minutes}:${seconds}\n`;

            return `${newDate}-${month}-${date.getFullYear()} ${strTime}`;
        }
    },

    formatCustomerInputDates(dateString: string): string {
        const date = new Date(dateString);

        let hours: string | number = date.getHours();
        let minutes: string | number = date.getMinutes();
        let seconds: string | number = date.getSeconds();

        let month: string | number = date.getMonth() + 1;
        let newDate: string | number = date.getDate();

        newDate = newDate < 10 ? '0' + newDate : newDate;
        month = month < 10 ? '0' + month : month;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds >= 10 ? seconds : "0" + seconds;

        return `${newDate}/${month}/${date.getFullYear()}`;
    },

    getVideoCallNotificationDateTime(date: string, time: string): string {
        console.log("date : " + date.toString());
        console.log("time : " + time);
        let newDateString;

        let dateObj = new Date(date.toString());
        if (!(dateObj instanceof Date && isNaN(dateObj.getTime()))) {
            dateObj.setUTCDate(dateObj.getUTCDate() + 1);
            newDateString = dateObj.toISOString();
        } else {
            newDateString = date;
        }
        let timeSplit = time.split("to");
        let dateSplit = newDateString.split("T");

        return `${dateSplit[0]} ${timeSplit[0].trim()}`;
    },


    ddMMyyyyDate(date: Date): string {
        let dd: string | number = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let mm: string | number = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let yyyy = date.getFullYear();

        return `${dd}${mm}${yyyy}`;
    },

    
    formatInputDates(dateString: string): string {
        var date = new Date(dateString)
        var month = date.getMonth() + 1;

        return (month) + "/" + date.getDate() + "/" +  date.getFullYear();
    },
};

export { DateTimeManger };


