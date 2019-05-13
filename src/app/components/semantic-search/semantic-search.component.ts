import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-semantic-search',
  templateUrl: './semantic-search.component.html',
  styleUrls: ['./semantic-search.component.css']
})
export class SemanticSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public isCollapsed = true; 
  public isJenaCollapsed = true;
  public isQCollapsed = false;
  public isQCollapsed1 = true;
}
