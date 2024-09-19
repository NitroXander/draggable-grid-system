interface PiniaStorage {
    $id: string;
    $reset: () => void;
}

const PiniaStoreHelper = {

    /**
     * =================================================================================================================
     * This function can be used to clear local storage values
     * @param storage pinia storage
     */
    clearLocalStorage(storage: any): void {
        console.log("=======================");
        console.log("Clearing local storage",storage);
        console.log("Storage id to clear : " + storage.$id);

        if (localStorage.getItem(storage.$id)) {
            // Ensure storage is a valid Pinia store
            if ('$reset' in storage && typeof storage.$reset === 'function') {
                storage.$reset();
                localStorage.removeItem(storage.$id);
                console.log("Local storage cleared");
            } else {
                console.error('Invalid storage object:', storage);
            }
        } else {
            console.warn("No storage found for the given storage id");
        }
    },


    /**
     * =================================================================================================================
     * This function can be used to get local store values
     * @param storeID pinia storage id
     * @returns {any} serialized data object
     */
    getDataFromLocalStore(storeID: string): any {
        const fetchedStore = localStorage.getItem(storeID);
        if(fetchedStore !== null)
        { 
            return JSON.parse(fetchedStore); 
        }
    },

    /**
     * =================================================================================================================
     * This function can be used to sync pina storage values to the local storage
     * @param context
     * @param storeID
     */
    syncDataToLocalStore(context: any, storeID: string): void {
        // listen to changes and update local storage
        context.store.$subscribe((mutation: any, state: any) => {
            localStorage.setItem(storeID, JSON.stringify(state));
        });
    }
}

export { PiniaStoreHelper };
