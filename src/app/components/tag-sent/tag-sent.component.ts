import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { PosServiceService } from '../../services/pos-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tag-sent',
  templateUrl: './tag-sent.component.html',
  styleUrls: ['./tag-sent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TagSentComponent implements OnInit {
  mtext="";
  lang = "";
  sentences = []
  Nouns = []
  NP = []
  tab = -1;
  display = false;
  wdisplay=false;
  topic;
  formattedTag:String = ""; 
  taggedSentence = [];
  sentis = [];
  constructor(private tagger:PosServiceService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  tagMText(){
    console.log(this.mtext);
  }

  formatTags() {
    for(var i in this.sentences) {
      var tag  = this.sentences[i]["tag"]
      
      var NN = [];
      let wordArray = []
      //console.log(tag);
      for (var index in tag) {
          let word:String = tag[index][0]; 
          let pos:String = tag[index][1];
          wordArray.push(word + "/" + pos);
      }
     
      this.formatTags[i] = wordArray.join(" ");
    }
}

  extractNN() {
      for(var i in this.sentences) {
        var tag  = this.sentences[i]["tag"]
        
        var NN = [];
        let wordArray = []
        //console.log(tag);
        for (var index in tag) {
            let j:number =Number(index);
            let word:String = tag[index][0]; 
            let pos:String = tag[index][1];
            let ppos :string;
            let pword:string;
            if(pos.startsWith("NN")){
                wordArray.push(word);
            }else{
              if(wordArray.length >0 ){
                let wtype;
                let x:number = j - wordArray.length-1;
                if(x >-1) {
                  pword = tag[x][0]; 
                  ppos = tag[x][1];  
                  // if(pword.toLowerCase() == "in") {
                  //   wtype = "LOC"; 
                  // }
                }

                if(typeof wtype !== 'undefined') {
                  NN.push(wordArray.join(" ") + ":" + wtype);
                }else{
                  NN.push(wordArray.join(" ") );
                }
                wordArray = [];
              }
            }
        }
       
        this.Nouns[i] = NN;
      }
  }

  xtractNEtag() {
    //for(var i in this.sentences) {
      var tag  = this.sentences[0]["ne"]
      
     console.log("NE",tag);
      
    //}
  }

  xtractNPtag() {
    for(var i in this.sentences) {
      var tag  = this.sentences[i]["ne"]
      
      var NN = [];
      let wordArray = []
      console.log(tag);
      for (var s of tag) {
         NN.push(s);
      }
      this.NP[i] = NN;
    }
  }

  insertStr(pos,str,istr) {
    var output = [str.slice(0, pos), istr, str.slice(pos)].join('');  
    return output;
  }

  annotateSent() {
    for(var i in this.sentences) {
      var sent  = this.sentences[i]["sent"]
      var ners  = this.sentences[i]["ner"]
      
      var newsent = [];
     
      let from:number = 0;
      console.log(ner);
      for(var ner of ners){
         console.log(ner);
         var word = ner[0];
         var type = ner[1];
         var det:string|undefined;
         if(ner.length > 2) {
            det = JSON.stringify(ner[2]);
         } 
         var pos = sent.indexOf(word,from);
         var sstr:String = ""
         if(pos > 0) {
           sstr = sent.slice(from, pos);
           newsent.push(sstr);
         }
         if(ner.length < 3) {
           det = undefined; 
         }
         console.log(det);
         newsent.push('entity^' + type + '^' + word + "^"+det);

         from = pos + word.length+1;
      }
      
      if(newsent.length >0 ) {
         console.log(from,"---",sent.length);
         if(from < sent.length) {
           var word = sent.slice(from); 
           newsent.push(word);
         }
         
         this.taggedSentence.push(newsent);
      }else{
         this.taggedSentence.push(sent);
      }

    }
  }

  tagSentences(){
    this.sentences = [];
    this.Nouns = [];
    this.topic = undefined;
    this.wdisplay = false; 
    this.sentis = [];
    this.NP = [];
    this.taggedSentence = [];
    this.tagger.tagSentences(this.mtext).subscribe(x =>{
      
       console.log(x)
       for (var index in x["tags"]){
           console.log(x["tags"][index]); 
           var d = x["tags"][index];
           var pd = JSON.parse(d);
           this.sentences.push(pd);
           //this.sentences.push(x["tags"][index]);
           console.log(pd.sentis)
           this.sentis.push(pd.sentis)
           this.NP.push(pd.ne)
        }
       this.wdisplay = true; 
       this.topic = x["topic"]

       console.log(x["lang"]);
       this.lang = x["lang"][0];

       //for(var index in x["sentis"]){
      //    console.log( x["sentis"][0]);
          //this.sentis.push(x["sentis"][index]); 
       //}
       this.extractNN(); 
       //this.extractNP(); 
       this.formatTags();
       this.xtractNEtag();
       this.annotateSent();
    }
    )
  }
  showNouns(i) {
    this.display = true;
    this.tab = i; 
  }
}
