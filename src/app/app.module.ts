import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TagSentComponent } from './components/tag-sent/tag-sent.component';
import { SafePipe } from './safe.pipe';
import { TaggedSentenceComponent } from './components/tagged-sentence/tagged-sentence.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SemanticSearchComponent } from './components/semantic-search/semantic-search.component';
import { TextSpeechComponent } from './components/text-speech/text-speech.component';

import { LambdaService } from './services/lambda.service';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    TagSentComponent,
    SafePipe,
    TaggedSentenceComponent,
    NavigationComponent,
    SemanticSearchComponent,
    TextSpeechComponent,
    AboutComponent,
  ],
  imports:[
    CommonModule,
    NgtUniversalModule,
    FormsModule, 
    NgbModule,                             
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:TagSentComponent},
      {path:'nlp',component:TagSentComponent},
      {path:'semantic-search',component:SemanticSearchComponent},
      {path:'text-speech',component:TextSpeechComponent},
      {path:'about',component:AboutComponent},
    ])                       
  ],
  providers: [LambdaService],
})
export class AppModule { }
