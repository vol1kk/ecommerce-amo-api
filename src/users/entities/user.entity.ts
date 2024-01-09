import { Address } from "../../address/entities/address.entity";

export class User {
  id: string;
  name: string;
  email: string;
  surname: string;
  phone: string | null;
  address: Address[];
  password: string | null;
  image: string | null;
}
