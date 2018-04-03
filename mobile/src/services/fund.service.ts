import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { EndpointService } from './endpoint.service';
import { Fund } from '../models/security';

@Injectable()
export class FundService {
    // url = ApiEndpoint.base + ApiEndpoint.fund;

    url: string;
    
    constructor(private http:Http, public endpointService: EndpointService) { 
        this.url = this.endpointService.base + '/api/f';
    }
    

    listFunds(): Promise<string[]> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.get(this.url, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                var idList: string[] = [];

                for(let i in resJson.data) {
                    idList.push(resJson.data[i]['fund_id']);
                }

                return resolve(idList);
            })
            .catch(this.handleErrorPromise);
        })
    }

    getFund(fund_id:string): Promise<Fund> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.get(this.url + '/' + fund_id, options).toPromise()
            .then(res=>{
                let data = this.extractData(res);
                let fund_to_return = new Fund(data.fund_id, data.fund_name,
                                            data.current_price, data.volume_traded,
                                            data.price_history);
                return resolve(fund_to_return);
            })
            .catch(this.handleErrorPromise);
        })
    } 

    private extractData(res: Response) {
        let body = res.json();
        // alphavantage data parsing
        let fund_id = body.fund_id;
        let fund_name = body.fund_name;
        let current_price = body.price_history[0]["4. close"];
        let volume_traded = body.price_history[0]["5. volume"];
        let price_history = [];
        for(let i in body.price_history) {
            let new_price = {"date": body.price_history[i]["date"],
                             "price": body.price_history[i]["4. close"]};
            price_history.push(new_price);
        }
        let data = {
            "fund_id": fund_id,
            "fund_name": fund_name,
            "current_price": current_price,
            "volume_traded": volume_traded,
            "price_history": price_history
        }
        return data;
    }

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }    
} 