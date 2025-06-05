import { StateCreator } from 'zustand';
import { Property, PropertyCreate } from '../type/PropertyType';
import { fetchPropertyAPI, addPropertyAPI, updatePropertyAPI, deletePropertyAPI, getPropertyByIdAPI } from '../services/propertyService'

export interface PropertySlice {
    property: Property[]
    isLoadingProperty: boolean
    errorProperty: string | null 
    isFetchedProperty: boolean
    fetchProperty: () => Promise<void>
    addProperty: (property_create: PropertyCreate) => Promise<{success: boolean, error?: string}>
    updateProperty: (params: {property_id: number, updated_Property: Partial<Property>}) => Promise<void>
}

export const usePropertySlice: StateCreator<PropertySlice> = (set, get) => ({
    property: [],
    isLoadingProperty: false,
    errorProperty: null,
    isFetchedProperty: false,
    fetchProperty: async () => {
        set({ isLoadingProperty: true, errorProperty: null });
        try {
            const response = await fetchPropertyAPI();
            set({
                property: response.data.result,
                isLoadingProperty: false,
                isFetchedProperty: true,
            })
        }
        catch(error: any) {
            set({
                errorProperty: error.message || "Loi khi lay du lieu ",
                isLoadingProperty: false,
                isFetchedProperty: false,
            })
        }
    },

    addProperty: async (property_create: PropertyCreate) => {
        set({ isLoadingProperty: true, errorProperty: null });
        try {
            const response = await addPropertyAPI(property_create);
                set({ 
                    isLoadingProperty: false, 
                    errorProperty: null,
                });
                return {success: true, error: undefined, Response: response};
        } catch(error: any) {
            set({
                isLoadingProperty: false,
                errorProperty: error.message || "Loi khi add Property",
            })
            return { success: false, error: error.message || "Loi khi add Property" };
        }
    },

    updateProperty: async({ property_id, updated_Property }: {property_id: number, updated_Property: Partial<Property>}) => {
        set({ isLoadingProperty: true, errorProperty: null })
        try {
            const response = await updatePropertyAPI(property_id, updated_Property)
            set((state) => ({
                property: state.property.map((item) =>
                    item.property_id === property_id ? {...item, ...updated_Property} : item
                ),
                isLoadingProperty: false, 
                errorProperty: null, 
            }))
        } catch(error: any) {
            set({
                isLoadingProperty: false,
                errorProperty: error.message || "Loi khi cap nhat property"
            })
            throw error
        }
    },

    deleteProperty: async(property_id: number) => {
        set((state) => ({
            property: state.property.filter((item) => item.property_id !== property_id),
            isLoadingProperty: true,
            errorProperty: null
        }))
        try {
            const response = await deletePropertyAPI(property_id)
            set({
                isLoadingProperty: false,
                errorProperty: null
            })
        } catch(error: any) {
            set({
                isLoadingProperty: false,
                errorProperty: error.message || "loi khi xoa Property"
            })
        }
    },
    getPropertyById: async(property_id: number) => {
        set({
            isLoadingProperty: true,
            errorProperty: null
        })
        try{
            const response = await getPropertyByIdAPI(property_id)
            set({
                isLoadingProperty: false,
                errorProperty: null
            })
            return response.data
        } catch(error: any) {
            set({
                isLoadingProperty: false,
                errorProperty: error.message || "loi khi get by property_id"
            })
        }
    }
});

export default usePropertySlice;
