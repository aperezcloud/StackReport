class Security {
    id: string;
    name: string;
    current_price: number;
    price_history: [number];

    constructor(id, name, price_history) {
    	//Required Params
        if(!price_history
        || !name
        || !id
         ){
           throw "Missing required field"; 
        }
        this.id = id;
        this.name = name;
        this.price_history = price_history;
        this.current_price = this.price_history[0]['4. close'];
    }
 } 
 class Fund extends Security{
    holdings: [Security];

    constructor(id, name, price_history) {
        super(id, name, price_history);
        // this.holdings = holdings;
    }

    setHoldings(holdings){
        this.holdings = holdings;
    }
 } 

 class Stock extends Security {
     constructor(id, name, price_history) {
        super(id, name, price_history);
     }
 }

 export {
     Security,
     Fund
 }