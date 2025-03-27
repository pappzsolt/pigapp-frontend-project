export class Cost {

  constructor(

      public id:BigInteger,
      public cost_name:string,
      public cost_note:string,
      public amount:BigInteger,
      public cost_date:Date,
      public invoice:BigInteger,
      public dev:BigInteger,
      public costrepeat:BigInteger,
      public costgroup:BigInteger,
      public paid: BigInteger,
      public paid_date:Date,
      public create_cost_date:Date,
      public user:BigInteger ) {  }

}

