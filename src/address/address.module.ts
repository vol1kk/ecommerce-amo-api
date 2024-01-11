import { Module } from "@nestjs/common";

import { AddressService } from "@/address/address.service";
import { DatabaseModule } from "@/database/database.module";
import { AddressController } from "@/address/address.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
