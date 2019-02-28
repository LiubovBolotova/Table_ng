import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{

  public userForm =  new FormGroup({
          
         "userName": new FormControl('test', Validators.required),
        "userEmail": new FormControl('test@mail.ru', [Validators.required, Validators.email]),
     });




   ngOnInit(){}
  
  public answers: {}[] = [{
    type: 'yes',
    text: 'Да'
  }, {
    type: 'no',
    text: 'Нет'
  }];

  public submitForm() {
    console.log('my form is Submited!', this.userForm.value)    
  }

}
