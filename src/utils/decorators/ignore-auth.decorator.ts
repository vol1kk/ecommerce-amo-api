import { SetMetadata } from "@nestjs/common";

export const IgnoreAuthKey = "ignoreAuth";
export const IgnoreAuth = () => SetMetadata(IgnoreAuthKey, true);
