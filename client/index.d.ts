type NuiCallback = (data: any) => void;

type NuiData = {
	action?: string;
	newstate?: boolean;
	[key: string]: any;
};
