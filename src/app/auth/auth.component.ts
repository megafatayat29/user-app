import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginToken } from './models/login.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  pageTitle: string = 'Login Page';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
    ) { }

  authForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(map((params: any) => params.action))
    .subscribe((action) => {
      if (action === 'logout') {
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
      } else if (sessionStorage.getItem('token') && action === 'login') {
        this.router.navigateByUrl('/');
      }
    });
  }

  onSubmit(): void {
    console.log('Login value: ', this.authForm.value);
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value)
      .subscribe((response: LoginToken) => {
        sessionStorage.setItem('token', response.token);
        this.router.navigateByUrl('/');
      }, console.error)
    }
    this.onReset();
  }

  onReset(): void {
    this.authForm.reset();
  }

  isFieldValid(fieldName: string, parent?: AbstractControl): {[key: string]: boolean} {
    let control: AbstractControl = this.authForm.get(fieldName) as AbstractControl;

    const classes = {
      'is-invalid': false,
      'is-valid': false
    }

    if (parent) {
      control = parent;
    }

    if (control && control.touched && control.invalid) {
      classes['is-invalid'] = true;
    } else if (control && control.valid) {
      classes['is-valid'] = true;
    } 
    
    return classes;
  }

  getControl(name: string): AbstractControl {
    return this.authForm.get(name) as AbstractControl;
  }


}
