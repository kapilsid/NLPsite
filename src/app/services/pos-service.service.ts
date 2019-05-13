import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
};


@Injectable({
  providedIn: 'root'
})
  
export class PosServiceService {

  constructor(private http:HttpClient) {

  }
  tagSentences(mtext){
    var lambdaURL = "http://23.20.240.5:5000/tag";
    return this.http.post(lambdaURL, 
      JSON.stringify({mtext:mtext}),
      httpOptions);
    //return this.http.get(lambdaURL,mtext)
  }

}
