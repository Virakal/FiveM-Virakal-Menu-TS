// biome-ignore lint/suspicious/noExplicitAny: data can be anything
type NuiCallback = (data: any) => void;

type NuiData = {
	action?: string;
	newstate?: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: we could have anything in here realistically
	[key: string]: any;
};
