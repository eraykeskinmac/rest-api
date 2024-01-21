// CountryService.ts

import { Service, Inject } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { CountryModel } from "../models/CountryModel";

@Service()
export class CountryService {
  constructor(
    @Inject(CountryModel) private countryModel: MongooseModel<CountryModel>
  ) {}

  /**
   * Get all countries or countries by a specific region.
   * @param region Optional region to filter countries.
   * @returns Promise<CountryModel[]>
   */
  async getAll(region?: string): Promise<CountryModel[]> {
    try {
      let query = {};

      if (region) {
        query = { region };
      }

      return await this.countryModel
        .aggregate([
          { $match: query },
          {
            $project: {
              _id: false,
            },
          },
        ])
        .exec();
    } catch (error) {
      throw new Error(`Error in CountryService.getAll: ${error.message}`);
    }
  }
}
