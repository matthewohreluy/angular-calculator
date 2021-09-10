import { CalculatorFunctionsService } from './calculator-functions.service';
import { BUTTONS } from './buttons.constants';
import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(public calculatorFunctions: CalculatorFunctionsService) { }
  btns: any[] = BUTTONS;
  
  onDesignChange(){
    this.calculatorFunctions.changeUI();
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
