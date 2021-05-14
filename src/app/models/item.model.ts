export class Item {
  constructor(public description: string,
       public amount: number,
       public type: string,  public uid?: string, public date?: Date ) {}
}
