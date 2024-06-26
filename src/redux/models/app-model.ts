export type ResponseType = {
	type: string;
	payload: any;
};

export type Toggle = {
	isOpen:Boolean
};

export type ProductsModel = {
    data: any;
    total:number,
	fetching: boolean;
	requestComplete: boolean;
	error: string;
};