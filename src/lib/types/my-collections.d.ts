export interface DirectusCollections {
	Product: Product[];
	cart: Cart[];
}

export interface Product {
	id: string;
	status: 'Published' | 'Draft' | 'Archived';
	Title: string;
	description: string;
	Price: number;
	team_price?: number;
	main_image: string;
	properties?: ProductProperty[];
}

export interface ProductProperty {
	Title: string;
	Type: 'Color' | 'Text' | 'Decimal' | 'Integer';
    Required?: boolean;
	values?: ProductPropertyValue[];
}

export interface ProductPropertyValue {
	Text?: string;
	Color?: string;
	Decimal?: number;
	Integer?: number;
}

export interface Cart {
	id: string;
	line_items: LineItem[];
}

export interface LineItem {
	id: string;
	product: Product;
	properties?: LineItemProperty[];
	quantity: number;
}
export type NewLineItem = {
	quantity: number;
	properties?: LineItemProperty[];
	product: string;
}

export interface LineItemProperty {
	Key: string;
	Value: string;
}