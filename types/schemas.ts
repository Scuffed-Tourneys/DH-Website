export interface UserSchema {
	username: string;
	signup_date: number;
	user_id: number;
	avatar: string;
	themes: string[];
}

export interface UploadedBy {
	id: number;
	username: string;
}

export interface Image {
	id: number;
	url: string;
	averageRating: number;
	favoritedBy: any[];
	rating?: any;
	favorited: boolean;
}

export interface ThemeSchema {
	id: number;
	uploadedBy: UploadedBy;
	name: string;
	timestamp: number;
	images: Image[];
}

export interface FileSchema {
	theme_id: number;
	css: string;
	background: string;
	cover: string;
}
