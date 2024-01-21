import { SalesCalculatorService } from "./../../services/SalesCalculatorService";
import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/salesrep")
export class SalesController {
  constructor(private salesCalculatorService: SalesCalculatorService) {}

  @Get("/")
  async get() {
    return await this.salesCalculatorService.calculateSalesRep();
  }
}
