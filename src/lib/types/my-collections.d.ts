export interface DirectusCollections {
	Product: Product[];
	cart: Cart[];
	order: Order[];
	line_item: LineItem[];
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
	line_items?: LineItem[] | null;
}

export interface LineItem {
	id: string;
	product: Product;
	properties?: LineItemProperty[];
	quantity: number;
	cart_id: Cart;
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

export interface Order {
	name: string;
}