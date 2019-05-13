import { Component, OnInit, Input } from '@angular/core';
import { COMPONENT_VARIABLE } from '@angular/platform-browser/src/dom/dom_renderer';

@Component({
  selector: 'app-tagged-sentence',
  templateUrl: './tagged-sentence.component.html',
  styleUrls: ['./tagged-sentence.component.css']
})
export class TaggedSentenceComponent  {
 

  @Input() item = [];
  myitem = [];
  constructor() { 
    
  }

  ngOnInit() { 
    console.log(this.item);
    if(typeof this.item !== "string") {
     
      for (let ent of this.item) {
          var x:string = ent; 
          if(x.startsWith('entity')) {
              var s = x.split("^");
              console.log(s[1],s[3]);

              if(s[3] === undefined || s[3] === "undefined"){
                var obj: any = 
                {
                    "type": s[1], "title":"Entity",
                    "popcontent":s[1],
                    "content": s[2],"isentity":true
                }
              }else{
                
                var o:any = JSON.parse(s[3]);
                
                var title = o.comp;
                var content = o.desc.substring(11);
                var morecontent = []; 
                for (var y of o.other){
                    let b = y.indexOf(":");
                    let key = y.substring(0,b);
                    let value = y.substring(b+1);
                    morecontent.push({"key":key,"value":value});   
                } 
              
                var obj: any = 
                {
                    "type":s[1],
                    "title": title, 
                    "content": s[2],
                    "popcontent":content,
                    "morecontent":morecontent,
                    "isentity":true
                }
                
              }
            
              this.myitem.push(obj);

          }else{
            var obj: any = 
            {
              "type":"s[1]","content": x, "isentity":false
            }
            this.myitem.push(obj);
          }  
      }
    }else{
      var obj: any = 
      {
        "type":"s[1]","content": this.item, "isentity":false
      }
      this.myitem.push(obj);
    } 
 }

  getBGColor(myt) {
    var bgcolor = "green";
    if(myt === "DATE") {
      bgcolor = "green";
    } else if(myt === "ORG") {
      bgcolor = "orange";
    }else{
      bgcolor = "lime";
    }
    return bgcolor;
  } 
}

