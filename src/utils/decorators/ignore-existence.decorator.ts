import { SetMetadata } from "@nestjs/common";

export const IgnoreExistenceKey = "ignoreExistence";
export const IgnoreExistence = () => SetMetadata(IgnoreExistenceKey, true);
