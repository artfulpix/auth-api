import type {
	MySqlTableWithColumns,
	SelectedFields,
	TableConfig,
} from "drizzle-orm/mysql-core";

// Returns a new object containing only the specified keys from the given table configuration object.
export const omitKeys = <T extends TableConfig, K extends keyof T["columns"]>(
	obj: MySqlTableWithColumns<T>,
	keys: K[] | readonly K[],
) => {
	// biome-ignore lint: <explanation>
	const newObj: any = {}; // Create an empty object

	for (const key in obj) {
		if (!keys.includes(key as K)) {
			newObj[key] = obj[key]; // Add the key-value pair if not in keys
		}
	}

	return newObj as SelectedFields; // Cast to correct type before returning
};
