import { Reflector } from "@nestjs/core";
import { ExecutionContext } from "@nestjs/common";

export default function getMetadata<T>(
  key: string,
  reflector: Reflector,
  context: ExecutionContext,
): T {
  const routeMetadata = reflector.get(key, context.getHandler());

  if (routeMetadata) {
    return routeMetadata;
  }

  // Controller Metadata
  return reflector.get(key, context.getClass());
}
