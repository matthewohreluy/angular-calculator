import { CalculatorFunctionsService } from './calculator-functions.service';
import { STATE } from './design.states';
import { BUTTONS } from './buttons.constants';
import { Component, HostListener, OnDestroy, OnInit  } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(private calculatorFunctions: CalculatorFunctionsService) { }
  // for subscriptions
  subs = new SubSink();
  // Calculation variables
  firstValue: number = 0;
  operator: string = ''
  secondValue: number;
  allValues: string = '';

  // Design Variables
  btns: any[] = BUTTONS;
  state: string[] = STATE;
  option: number = 1;
  currentOption = this.state[0];
 
  ngOnInit(){
    this.subs.add(this.calculatorFunctions.objectEmitter.firstValueSubject.subscribe((firstValue)=>{
      this.firstValue = firstValue;
    }));
    this.subs.add(this.calculatorFunctions.objectEmitter.secondValueSubject.subscribe((secondValue) => {
      this.secondValue = secondValue;
    }));
    this.subs.add(this.calculatorFunctions.objectEmitter.operatorSubject.subscribe((operator) => {
      this.operator = operator;
    }));
    this.subs.add(this.calculatorFunctions.objectEmitter.allValuesSubject.subscribe((allValues) => {
      this.allValues = allValues;
    }));
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  onDesignChange(){
    this.option++;
    this.option = this.option > 3 ? 1 : this.option;
    this.currentOption = this.state[this.option-1];
  }

  @HostListener('document:keydown', ['$event'])
  onHandleKeyboardEvent(event: KeyboardEvent) {
    let customKey = event.key;
    this.calculatorFunctions.handleKeyboardEvent(customKey);
  }

  onPress(key){
    this.calculatorFunctions.analyzeKey(key);
  }

  
}
