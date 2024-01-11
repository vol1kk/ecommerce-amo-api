import { SetMetadata } from "@nestjs/common";

export const CheckAgainstKey = "checkAgainst";
export const SetCheckAgainstDecorator = (value: string) =>
  SetMetadata(CheckAgainstKey, value);
