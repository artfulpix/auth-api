import type { InsertUserModel, UserTable } from "../../db/schema/users";
import { DataAccessBase } from "../../lib/data-access";

export class UserDataAccess extends DataAccessBase<
	UserTable,
	InsertUserModel,
	Partial<InsertUserModel>
> {}
