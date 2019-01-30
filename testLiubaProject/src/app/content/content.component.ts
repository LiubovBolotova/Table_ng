import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Output() public plusClicked:  EventEmitter<number> = new EventEmitter();

  @Output() public minusClicked:  EventEmitter<number> = new EventEmitter();

  public countDiff = 0;

  constructor() { }

  ngOnInit() {
  }

  public changeCounter(event){

    this.countDiff = Number(event.target.value);

  }

}
