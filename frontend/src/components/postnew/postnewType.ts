export interface PostFormData {
    title: string,
    description: string,
    price: number,
    area: number,
    address: string,
    bedrooms: number,
    bathrooms: number,
    property_type: string,
    category: string,
    images: string[],
}

export const propertyType = [
    { label: "Bán", value: "sale" },
    { label: "Cho thuê", value: "rent" },
]

export const categories = [
    { label: "Nhà ở", value: "house"},
    { label: "Căn hộ", value: "apartment" },
    { label: "Đất nền", value: "land" },
    { label: "Villa", value: "villa" },
]
