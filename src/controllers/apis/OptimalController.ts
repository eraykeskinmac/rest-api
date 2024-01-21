// OptimalController.ts
import { Controller, Get } from "@tsed/common";
import { OptimalService } from "../../services/OptimalService";
import { SalesRepDistribution } from "../../models/SalesRepDistribution";

@Controller("/optimal")
export class OptimalController {
  constructor(private optimalService: OptimalService) {}

  @Get("/")
  async getOptimalDistribution(): Promise<SalesRepDistribution[]> {
    try {
      return await this.optimalService.calculateOptimalDistribution();
    } catch (error) {
      console.error("Error in OptimalController:", error);
      throw error;
    }
  }
}
