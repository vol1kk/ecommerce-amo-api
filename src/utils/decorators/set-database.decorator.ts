import { SetMetadata } from "@nestjs/common";

export const SetDatabaseKey = "databaseName";

export const SetDatabaseName = (name: string) =>
  SetMetadata(SetDatabaseKey, name);
