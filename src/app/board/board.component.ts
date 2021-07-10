import { Component, OnInit } from '@angular/core';
import { cellModel } from '../cell/cellModel';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private currentPlayer!: cellModel;
  public board!: cellModel[][];
  private isGameOver!: boolean;
  public statusMessage!: string;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  get gameOver(): boolean {
    return this.isGameOver;
  }

  newGame(){
    this.board = [];
    for(let row=0; row < 3; row++){
      this.board[row] = [];
      for(let col=0; col < 3; col++){
        this.board[row][col] = cellModel.EMPTY;
      }
    }
    this.currentPlayer = cellModel.X;
    this.isGameOver = false;
    this.statusMessage = `Player ${this.currentPlayer}'s turn`
  }

  move(row: number, col: number): void{
    if(!this.isGameOver && this.board[row][col] === cellModel.EMPTY){
      this.board[row][col] = this.currentPlayer;
      if(this.isDraw()){
        this.statusMessage = 'This is a draw';
        this.isGameOver = true;
      }else if(this.isWin()){
        this.statusMessage = `Player ${this.currentPlayer} won!`;
        this.isGameOver = true;
      }else{
        // this.currentPlayer = this.currentPlayer === cellModel.X ? cellModel.O : cellModel.X;
        if(this.currentPlayer === cellModel.X){
          this.currentPlayer = cellModel.O;
          this.statusMessage = `Player ${this.currentPlayer}'s turn`
        }else{
          this.currentPlayer = cellModel.X;
          this.statusMessage = `Player ${this.currentPlayer}'s turn`
        }
      }
    }
  }

  isDraw(): boolean{
    for(const columns of this.board){
      for(const col of columns){
        if(col === cellModel.EMPTY){
          return false;
        }
      }
    }
    return !this.isWin();
  }

  isWin(): boolean{
    //horizontal
    for(const column of this.board){
      if(column[0] === column[1] && column[0] === column[2] && column[0] !== cellModel.EMPTY){
        return true;
      }
    }

    //vertical
    for(let col=0; col < this.board.length; col++){
      if(
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col] &&
        this.board[0][col] !== cellModel.EMPTY
      ){
        return true;
      }
    }

    //diagonals
    if(
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2] &&
      this.board[0][0] !== cellModel.EMPTY
    ){
      return true;
    }
    if(
      this.board[2][0] === this.board[1][1] &&
      this.board[2][0] === this.board[0][2] &&
      this.board[2][0] !== cellModel.EMPTY
    ){
      return true;
    }
    return false;
  }
  
}
