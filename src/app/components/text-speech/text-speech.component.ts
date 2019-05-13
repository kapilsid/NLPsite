import { Component, OnInit } from '@angular/core';
import {LambdaService} from '../../services/lambda.service';

@Component({
  selector: 'app-text-speech',
  templateUrl: './text-speech.component.html',
  styleUrls: ['./text-speech.component.css']
})
export class TextSpeechComponent implements OnInit {
  mytext:String;
  loading:boolean;
  loaded:boolean;
  audioPath:string=null;
  snd:HTMLAudioElement;
  voice:string = "Geraint,Gwyneth,Mads,Naja,Hans,Marlene,Nicole,Russell,Amy,Brian,Emma,Raveena,Ivy,Joanna,Joey,Justin,Kendra,Kimberly,Matthew,Salli,Conchita,Enrique,Miguel,Penelope,Chantal,Celine,Lea,Mathieu,Dora,Karl,Carla,Giorgio,Mizuki,Liv,Lotte,Ruben,Ewa,Jacek,Jan,Maja,Ricardo,Vitoria,Cristiano,Ines,Carmen,Maxim,Tatyana,Astrid,Filiz,Vicki,Takumi,Seoyeon,Aditi,Zhiyu";
  voices = this.voice.split(",")
  selVoice="Joanna";
  constructor(private lambdaService:LambdaService) {
  
  }

  ngOnInit() {
  }

  convert(textArea) {
    this.loading = true;
    this.loaded = false;  
    this.lambdaService.getSpeech(this.mytext,this.selVoice).subscribe(x => {
       this.audioPath =  "data:audio/mp3;base64," + x['audio'];
       this.snd = new Audio(this.audioPath);
       this.loading = false;
       this.loaded = true;  
       this.snd.play();

    });

  }

  speek() {
    this.snd.play();
    
  }
  clearFaces(){

  }
}
