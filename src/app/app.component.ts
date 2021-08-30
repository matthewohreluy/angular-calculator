import { STATE } from './design.states';
import { BUTTONS } from './buttons.constants';
import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  btns: any[] = BUTTONS;
  state: string[] = STATE;

  option: number = 1;
  firstValue: number = 0;
  operator: string = ''
  secondValue: number;
  allValues: string = '';
  currentOption = this.state[0];


  onDesignChange(){
    this.option++;
    this.option = this.option > 3 ? 1 : this.option;
    this.currentOption = this.state[this.option-1];
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let customKey = event.key;
    switch(event.key){
      case 'Enter':
        customKey = '=';
        break;
      case 'Backspace':
        customKey = 'DEL';
        break;
      case 'Escape':
        customKey = 'RESET';
        break;
      default:
        break;
    }
    this.onPress(customKey);
  }

  onPress(key){
    switch(key){
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.allValues+=key;
        break;
      case '.':
        if(this.allValues.length <= 0){
          this.allValues += '0.'
        }
        if(!this.allValues.includes('.')){
          this.allValues += key;
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        if(!this.operator){
          this.firstValue = +this.allValues;
          this.allValues = '';
          this.operator = key;
        }else{
          if(this.allValues){
            this.firstValue = this.compute();
           this.allValues = '';
          }
          this.operator = key;
        }
        break;
      case '=':
        if(this.firstValue && this.allValues){
          this.allValues = String(this.compute());
          this.operator = '';
          this.firstValue = 0;
        }
        break;
      case 'DEL':
        if(this.allValues){
          this.allValues = this.allValues.slice(0, this.allValues.length - 1);
        }
        break;
      case 'RESET':
        this.allValues = '';
        this.operator = '';
        this.firstValue = 0;
        break;
      default:
          break;
    }
    this.lengthChecker()
  }

  lengthChecker(){
    if(this.allValues.length > 15){
      this.allValues = this.allValues.slice(0,15);
    }
  }

  compute(){
    let ans:number;
    switch(this.operator){
      case '+':
       ans = (this.firstValue + +this.allValues);
        break;
      case '-':
        ans = (this.firstValue - +this.allValues);
        break;
      case 'x':
        ans = (this.firstValue * +this.allValues);
        break;
      case '/':
        ans = (this.firstValue / +this.allValues);
        default:
          break;
    }
    return Math.round(ans * 1000000000000) / 1000000000000;
  }
  
}
