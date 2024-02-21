import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

// Agregar tipados a user-info
const initialState = {
    userInfo: {
        name: 'John Doe',
        email: 'john@doe.com',
        age: 30,
        searches: {
            preferences: {
                lastSearch: '',
            }
        }
    },
    addresses: {
        billing: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
        },
        shipping: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
            preferences: {
                leaveAtDoor: true,
                deliveryInstructions: 'Ring the doorbell',
            }
        },
    },
};

const userInfo = create(immer(devtools(persist((set) => ({
    ...initialState,
    updateLastSearch: (searchStr: string) => {
        set((state) => {
            state.userInfo.searches.preferences.lastSearch = searchStr;
        }, false, { type: 'updateLastSearch' });
    },
    updateDeliveryInstructions: (instructions: string) => {
        // Codigo utilizando immer
        set((state) => {
            state.addresses.shipping.preferences.deliveryInstructions = instructions;
        }, false, { type: 'updateDeliveryInstructions' });
        /*
            Codigo sin immer
            
        set((state) => ({
            addresses: {
                ...state.addresses,
                shipping: {
                    ...state.addresses.shipping,
                    preferences: {
                        ...state.addresses.shipping.preferences,
                        deliveryInstructions: instructions,
                    },
                },
            },
        }));*/
    },
}), { name: 'user-preferences', storage: createJSONStorage(() => sessionStorage) }), { name: 'user-info' })));

export default userInfo;