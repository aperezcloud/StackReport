export class User {
    user_id: number;
    username: string;
    token: string;
    tier: string;
    constructor(params) {
        //Required Params
        if(!params || params.user_id == null || params.username == null || params.token == null){
           throw "Missing required field"; 
        }
        this.user_id = params.user_id;
        this.username = params.username;
        this.token = params.token;
        this.tier = params.tier;
    }
    getToken(){
    	return this.token;
    }
    getUsername(){
        return this.username;
    }
    getUserId(){
        return this.user_id;
    }
    getTier(){
    	return this.tier;
    }
 };