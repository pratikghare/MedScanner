export interface SearchMedicine {
    productId: string;
    name: string;
    packSize: string;
    saltName: Array<string>;
    manufacturer: string;
    prescriptionNeeded: boolean;
}

export interface Medicine {
    productId: string;
    categoryId: string;
    name: string;
    price: Number;
    availability: boolean;
    slug: string;
    manufacturer: string;
    images: Array<string>;
}