export default (db, config) =>{
    // var stripe = require("stripe")(
    //     config.stripe.key
    // );

    function charge(stripe_id){
        return Promise.resolve(true);
    }
    
    return {
        charge: charge
    }
}