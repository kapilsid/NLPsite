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
export class LambdaService {
  constructor(private http:HttpClient) { }

  detectFaces(imgURL) {
    var lambdaURL = "https://3b4e2of3v8.execute-api.us-east-1.amazonaws.com/prod/findfaces";
    return this.http.post(lambdaURL, 
      JSON.stringify({imgurl:imgURL}),
      httpOptions);
  }

  detectObjects(imgURL) {
    var lambdaURL = "https://3b4e2of3v8.execute-api.us-east-1.amazonaws.com/prod/findlabels";
    console.log(JSON.stringify({imgurl:imgURL}));
    return this.http.post(lambdaURL, 
      JSON.stringify({imgurl:imgURL}),
      httpOptions);
  }

  detectYOLO(imgURL) {
    var lambdaURL = "https://8c7e4yko2h.execute-api.us-east-1.amazonaws.com/prod/findobjects";
    console.log(JSON.stringify({imgurl:imgURL}));
    return this.http.post(lambdaURL, 
      JSON.stringify({imgurl:imgURL}),
      httpOptions);
  }

  compareTerms(t1,t2) {
    var tURL = "https://0sy6mfob3h.execute-api.us-east-1.amazonaws.com/prod/reqnlyze";
    return this.http.post(tURL, 
      JSON.stringify({term1:t1,term2:t2}),
      httpOptions);
  }

  getSpeech(text1:String,sel:String) {
    console.log(text1)
    var tURL = "https://294zimncx4.execute-api.us-east-1.amazonaws.com/prod/mytext";
    return this.http.post(tURL, 
      JSON.stringify({mtext:text1.trim(),mvoice:sel.trim()}),
      httpOptions);
    
  }
}
