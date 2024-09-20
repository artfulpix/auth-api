import {
  TableConfig,
  MySqlTableWithColumns,
  SelectedFields,
} from "drizzle-orm/mysql-core";

// Returns a new object containing only the specified keys from the given table configuration object.
export const omitKeys = <T extends TableConfig, K extends keyof T["columns"]>(
  obj: MySqlTableWithColumns<T>,
  keys: K[] | readonly K[]
) => {
  const newObj: any = {}; // Create an empty object

  for (const key in obj) {
    if (!keys.includes(key as K)) {
      newObj[key] = obj[key]; // Add the key-value pair if not in keys
    }
  }

  console.log(newObj);

  return newObj as SelectedFields; // Cast to correct type before returning
};
