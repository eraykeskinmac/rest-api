import { CountryModel } from "../models/CountryModel";
import { Injectable } from "@tsed/di";

type SalesRepRequirement = {
  region: string;
  minSalesReq: number;
  maxSalesReq: number;
};

@Injectable()
export class SalesCalculatorService {
  async calculateSalesRep(): Promise<SalesRepRequirement[]> {
    try {
      const response = await fetch(
        `http://0.0.0.0:${process.env.PORT}/countries`
      );
      const countries = (await response.json()) as CountryModel[];

      const regionCounts = countries.reduce(
        (acc: Record<string, number>, country: CountryModel) => {
          const { region } = country;
          acc[region] = (acc[region] || 0) + 1;
          return acc;
        },
        {}
      );

      return Object.entries(regionCounts).map(
        ([region, count]): SalesRepRequirement => {
          const minReps = Math.ceil(count / 7);
          const maxReps = Math.ceil(count / 3);
          return { region, minSalesReq: minReps, maxSalesReq: maxReps };
        }
      );
    } catch (error) {
      console.error("Error in SalesCalculatorService:", error);
      throw error;
    }
  }
}
