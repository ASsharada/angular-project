import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrService } from '../../services/registr.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    userRegForm!:FormGroup;

    constructor(
      private _register:RegistrService
    ){

    }

    ngOnInit():void{

  this.setForm();

    }
    setForm(){
      this.userRegForm = new FormGroup({

        firstName: new FormControl('',[Validators.required]),
        lastName: new FormControl('',[Validators.required]),
        contact: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required,  Validators.minLength(5)]),
        confirmpassword: new FormControl('',[Validators.required,  Validators.minLength(5) ]),
      })

    
    }

    register(){

      
      console.log(this.userRegForm.value)
       
      console.log(this.userRegForm.valid)
    
      if(this.userRegForm.valid){

      console.log(this.userRegForm.value)
      this._register.registerUser(this.userRegForm.value).subscribe((data:any)=>{
        console.log(data)
        this.userRegForm.reset()
         alert(data.msg)
        
      })
       }else{
        alert("Please Fill Valid Details..!")
       }
      }
    }      

  
    

