export interface B {
	v?: number;
}

export interface OldRootObject {
	a?: number;
	b?: B[];
}
export type RootObject = OldRootObject[];