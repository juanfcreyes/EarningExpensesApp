import { Pipe, PipeTransform } from "@angular/core";
import { EarningsExpenses } from "../../models/earnings-expenses.model";

@Pipe({
  name: "orderEarningExpense",
})
export class OrderEarningExpensePipe implements PipeTransform {
  transform(items: EarningsExpenses[]): EarningsExpenses[] {
    if (items.length === 0) {
      return [];
    }
    return items.slice().sort((item) => {
      return item.type === "ingreso" ? -1 : 1;
    });
  }
}
