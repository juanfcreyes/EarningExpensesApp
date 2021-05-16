import { Item } from "./item.model";

export class RevenueDebts extends Item {

    constructor(public description: string,
        public amount: number,
        public type: string, public status = 'Pendiente', public date?: Date, public uid?: string) { 
            super(description, amount, type);
        }
}
