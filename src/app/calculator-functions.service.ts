import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorFunctionsService{
  firstValue: number = 0;
  operator: string = ''
  secondValue: number;
  allValues: string = '';

  objectEmitter = {
    firstValueSubject: new Subject<number>(),
    secondValueSubject: new Subject<number>(),
    operatorSubject: new Subject<string>(),
    allValuesSubject: new Subject<string>()
  }
 


  handleKeyboardEvent(key) {
    switch (key) {
      case 'Enter':
        key = '=';
        break;
      case 'Backspace':
        key = 'DEL';
        break;
      case 'Escape':
        key = 'RESET';
        break;
      default:
        break;
    }
    this.analyzeKey(key);
  }

  emit(value){
        this.objectEmitter[value + 'Subject'].next(this[value]);
  }

  analyzeKey(key) {
    switch (key) {
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
        this.allValues += key;
        this.emit('allValues');
        break;
      case '.':
        if (this.allValues.length <= 0) {
          this.allValues += '0.'
          this.emit('allValues');
        }
        if (!this.allValues.includes('.')) {
          this.allValues += key;
          this.emit('allValues');
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        if (!this.operator) {
          this.firstValue = +this.allValues;
          this.emit('firstValue');
          this.allValues = '';
          this.emit('allValues');
          this.operator = key;
          this.emit('operator');
        } else {
          if (this.allValues) {
            this.firstValue = this.compute();
            this.emit('firstValue');
            this.allValues = '';
            this.emit('allValues');
          }
          this.operator = key;
          this.emit('operator');
        }
        break;
      case '=':
        if (this.firstValue && this.allValues) {
          this.allValues = String(this.compute());
          // console.log(this.allValues);
          this.emit('allValues');
          this.operator = '';
          this.emit('operator');
          this.firstValue = 0;
          this.emit('firstValue');
        }
        break;
      case 'DEL':
        if (this.allValues) {
          this.allValues = this.allValues.slice(0, this.allValues.length - 1);
          this.emit('allValues');
        }
        break;
      case 'RESET':
        this.allValues = '';
        this.emit('allValues');
        this.operator = '';
        this.emit('operator');
        this.firstValue = 0;
        this.emit('firstValue');
        break;
      default:
        break;
    }
    this.allValues = this.lengthChecker();
    this.emit('allValues');
  }

  lengthChecker() {
    if (this.allValues.length > 15) {
      return this.allValues.slice(0, 15);
    }
    return this.allValues;
  }

  compute() {
    let ans: number;
    switch (this.operator) {
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