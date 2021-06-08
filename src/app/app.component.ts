import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-crud-firebase';
  public podaci: User[];

  constructor(
    private afDb: AngularFireDatabase,
    private formBuilder: FormBuilder,
    public usersService: UsersService
  ) {
    this.podaci = [];

    const itemsRef: AngularFireList<any> = afDb.list('Podaci');
    itemsRef.valueChanges().subscribe((x) => {
      this.podaci = x;
      console.log(this.podaci);
    });
    console.log(afDb);
  }
  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    console.log('gde ste drugari?');
    this.formGroup = this.formBuilder.group({
      ime: ['', [Validators.required]],
      prezime: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    console.log(this.formGroup.value);
    this.usersService.postUser(this.formGroup.value);
    this.usersService.users.push(this.formGroup.value);
    console.log(this.usersService.users);
  }
}
