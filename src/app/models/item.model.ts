export class Item {
    constructor(public description: string,
        public amount: number,
        public type: string, public date?: Date, public uid?: string) { }
}
