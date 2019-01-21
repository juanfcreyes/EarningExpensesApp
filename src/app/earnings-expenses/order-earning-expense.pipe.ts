import { Pipe, PipeTransform } from '@angular/core';
import { EarningsExpenses } from '../models/earnings-expenses.model';

@Pipe({
	name: 'orderEarningExpense'
})
export class OrderEarningExpensePipe implements PipeTransform {

	transform(items: EarningsExpenses[]): EarningsExpenses[] {
		return items.sort((item) => {
			if (item.type === 'ingreso') {
				return -1;
			} else {
				return 1;
			}
		});
	}

}
