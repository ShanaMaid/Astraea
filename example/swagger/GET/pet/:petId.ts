export interface Category {
	id: number;
	name: string;
}

export interface Tag {
	id: number;
	name: string;
}

export interface RootObject {
	id: number;
	category: Category;
	name: string;
	photoUrls: string[];
	tags: Tag[];
	status: string;
}