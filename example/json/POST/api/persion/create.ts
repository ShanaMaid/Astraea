export interface B {
	v?: number;
}

export interface Key1 {
	a?: number;
}

export interface Key2 {
	a?: number;
}

export interface C {
	1?: Key1[];
	2?: Key2[];
}

export interface OldRootObject {
	a?: number;
	b?: B[];
	c?: C;
}
export type RootObject = OldRootObject[];