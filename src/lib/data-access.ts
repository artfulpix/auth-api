import { BuildColumns, count, eq, sql } from "drizzle-orm";
import { Db } from "../db/db";
import {
  AnyMySqlInsertConfig,
  MySqlColumnBuilderBase,
  MySqlInsertBase,
  MySqlTable,
  MySqlTableWithColumns,
  SelectedFields,
  TableConfig,
} from "drizzle-orm/mysql-core";
import { safeUserSelect } from "../db/schema/users";
import { ResultSetHeader } from "mysql2";

export class DataAccessBase<
  // TODO: need to be fixed
  Model extends MySqlTableWithColumns<any>,
  CreateSchema,
  UpdateSchema
> {
  constructor(protected db: Db, protected tableName: Model) {}

  async findOne({
    id,
    columns,
  }: {
    id: number;
    columns?: SelectedFields;
  }): Promise<unknown | null> {
    const result = await this.db
      .select({ ...columns })
      .from(this.tableName)
      .where(eq(this.tableName.id, id));

    return result[0] || null;
  }

  async findAll({
    columns,
  }: {
    columns?: SelectedFields;
    skip?: number;
    take?: number;
  }): Promise<{
    data: {
      [x: string]: unknown;
    }[];
    total: number;
  }> {
    const query = this.db
      .select({
        ...columns,
      })
      .from(this.tableName);

    const [{ total }] = await this.db
      .select({ total: count() })
      .from(query.as("query"));

    return {
      data: await query,
      total,
    };
  }

  async create(dto: CreateSchema): Promise<ResultSetHeader> {
    const result = await this.db
      .insert(this.tableName)
      .values(dto as any)
      .execute();

    return result[0]; // Adjust based on your return structure
  }

  async update(
    id: number,
    dto: UpdateSchema,
    columns?: SelectedFields
  ): Promise<unknown | null> {
    await this.db
      .update(this.tableName)
      .set(dto)
      .where(sql`${this.tableName}.id = ${id}`)
      .execute();

    return this.findOne({ id, columns });
  }

  async remove(id: number): Promise<unknown | null> {
    const entity = await this.findOne({ id });
    if (!entity) return null;

    await this.db.delete(this.tableName).where(eq(this.tableName.id, id));

    return entity;
  }
}
