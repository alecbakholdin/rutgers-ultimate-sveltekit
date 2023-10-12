export interface DirectusCollections {
	Product: Product[];
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
