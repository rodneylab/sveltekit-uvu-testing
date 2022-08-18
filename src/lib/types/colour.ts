export type ColourSystem = 'hex' | 'hsl' | 'rgb';

export interface RGBColour {
	red: number;
	green: number;
	blue: number;
}

export interface StoreColour {
	name: string;
	hex: string;
}
