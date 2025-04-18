export class Cost {

  constructor(

      public id:number,
      public cost_name:string,
      public cost_note:string,
      public amount:number,
      public cost_date:Date,
      public invoice:number,
      public dev:number,
      public costrepeat:number,
      public costgroup:number,
      public paid: number,
      public paid_date:Date,
      public create_cost_date:Date,
      public user:number ) {  }

}

