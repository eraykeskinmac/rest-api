import { CountryModel } from "../models/CountryModel";
import { Injectable } from "@tsed/di";
import { SalesCalculatorService } from "./SalesCalculatorService";
import { SalesRepDistribution } from "../models/SalesRepDistribution";
import { SalesRepRequirement } from "../models/SalesRepRequirement";

@Injectable()
export class OptimalService {
  constructor(private salesCalculatorService: SalesCalculatorService) {}

  async calculateOptimalDistribution(): Promise<SalesRepDistribution[]> {
    try {
      const salesRepRequirements =
        await this.salesCalculatorService.calculateSalesRep();
      const countriesResponse = await fetch(
        `http://0.0.0.0:${process.env.PORT}/countries`
      );
      const countries: CountryModel[] = await countriesResponse.json();

      return this.distributeCountries(salesRepRequirements, countries);
    } catch (error) {
      console.error("Error in OptimalService:", error);
      throw error;
    }
  }

  private distributeCountries(
    salesRepRequirements: SalesRepRequirement[],
    countries: CountryModel[]
  ): SalesRepDistribution[] {
    const countriesByRegion: Record<string, string[]> = countries.reduce(
      (acc: Record<string, string[]>, country) => {
        if (!acc[country.region]) {
          acc[country.region] = [];
        }
        acc[country.region].push(country.name);
        return acc;
      },
      {} as Record<string, string[]>
    );

    const distribution: SalesRepDistribution[] = [];

    for (const requirement of salesRepRequirements) {
      const { region, minSalesReq } = requirement;
      const countriesInRegion = countriesByRegion[region] || [];
      const numReps = Math.ceil(countriesInRegion.length / minSalesReq);

      for (let i = 0; i < numReps; i++) {
        const assignedCountries = countriesInRegion.splice(0, minSalesReq);
        distribution.push({
          region: region,
          countries: assignedCountries,
          size: assignedCountries.length,
        });
      }
    }

    return distribution;
  }
}
