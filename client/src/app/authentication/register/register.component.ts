import { Component, Input, OnInit, Output,EventEmitter, Self } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister  = new EventEmitter();
  registerForm :FormGroup;
  maxDate:Date;
  validationErrors:string[] = [];

  constructor(private accountService:AccountService,private toastr: ToastrService,
      private fb:FormBuilder,private router: Router) { }

  ngOnInit(): void {
      this.intitializeForm();
      this.maxDate = new Date();
      this.maxDate.setFullYear(this.maxDate.getFullYear() -5);
  }

  intitializeForm(){
    this.registerForm = this.fb.group({
      // gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      // city: ['', Validators.required],
      // country: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, 
        Validators.minLength(4), Validators.maxLength(16)
        ]
      ],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
     // clientURI:['https://localhost:4200/authentication/emailconfirmation']
      clientURI:['https://rainobunew.azurewebsites.net/authentication/emailconfirmation']
   
    })
  }

  matchValues(matchTo:string): ValidatorFn{
    return (control:AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchTo].value ? null:{isMathching:true}
    }
  }

  register(){
    // this.accountService.register(this.registerForm.value).subscribe(response => {
    //   this.router.navigateByUrl('/stories');
    // }, error =>{
    //   this.validationErrors = error;
    // })
    this.accountService.register(this.registerForm.value).subscribe(()=>{
      console.log("here")
      this.router.navigateByUrl('/');
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
