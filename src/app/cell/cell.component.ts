import { Component, Input, OnInit } from '@angular/core';
import { cellModel } from './cellModel';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() public piece: cellModel = cellModel.EMPTY;
  @Input() public row!: number;
  @Input() public col!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
