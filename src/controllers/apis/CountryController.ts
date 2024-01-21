// CountryController.ts
import { Controller, Get, QueryParams } from "@tsed/common";
import { CountryService } from "../../services/CountryService";
import { CountryModel } from "../../models/CountryModel";

@Controller("/countries")
export class CountriesController {
  constructor(private countryService: CountryService) {}

  @Get("/")
  async getCountries(
    @QueryParams("region") region?: string
  ): Promise<CountryModel[]> {
    try {
      return await this.countryService.getAll(region);
    } catch (error) {
      throw new Error(
        `Error in CountriesController.getCountries: ${error.message}`
      );
    }
  }
}
