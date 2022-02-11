import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../modules/user.module';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  loading: boolean = false;
  pageTitle: string = 'Form User';
  id: string;

  userFormCreate: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    fullName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.maxLength(14)])
  })

  // userFormUpdate: FormGroup = new FormGroup({
  //   id: new FormControl(),
  //   username: new FormControl(null, [Validators.required]),
  //   fullName: new FormControl(null, [Validators.required]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   phone: new FormControl(null, [Validators.required, Validators.maxLength(14)])
  // })

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.pipe(
      map((params: any) => params.id),
      switchMap((id: string) => {
        if(!id) { return EMPTY; }
        else return this.userService.getById(id)
      })
    ).subscribe(
      (user: User) => {
        if (user) {
          this.userFormCreate.get('password')?.clearValidators();
          this.setFormValues(user);
        }
      },
      (error: any) => console.error,
      () => {this.loading = false}
    );
  }

  setFormValues(user: User): User {
    this.userFormCreate.addControl('id', new FormControl()),
    this.userFormCreate.get('id')?.setValue(user.id),
    this.userFormCreate.get('username')?.setValue(user.username);
    this.userFormCreate.get('password')?.setValue(user.password);
    this.userFormCreate.get('fullName')?.setValue(user.fullName);
    this.userFormCreate.get('email')?.setValue(user.email);
    this.userFormCreate.get('phone')?.setValue(user.phone);
    return this.userFormCreate.value;
  }

  onSubmit(): void {
    this.loading=true;
    const user: User = this.userFormCreate.value;

    this.userService.save(user)
      .subscribe(() => {
        this.onReset();
        this.router.navigateByUrl('/user');
      },
      (error: any) => console.error,
      () => this.loading = false
    )
  }

  onReset(): void {
    this.userFormCreate.reset();
  }

  isValid(): boolean {
    return !this.userFormCreate.get('name')?.value;
  }

  isFieldValid(fieldName: string, parent?: AbstractControl): {[key: string]: boolean} {
    let control: AbstractControl = this.userFormCreate.get(fieldName) as AbstractControl;

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
    return this.userFormCreate.get(name) as AbstractControl;
  }

  isHasId(): boolean {
    let ada = false;
    // if (this.user.id) {
    //   ada = true;
    // }
    return ada;
  }


}
