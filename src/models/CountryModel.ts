// CountryModel.ts
import { Property } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model({ collection: "countries" })
export class CountryModel {
  @ObjectID("id")
  _id?: ObjectID;

  @Property()
  name: string;

  @Property()
  region: string;
}
