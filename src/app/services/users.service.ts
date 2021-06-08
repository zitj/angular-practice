import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../User';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users: User[] = [];
  constructor(public fireservices: AngularFirestore) {}

  postUser(arg: User) {
    return this.fireservices.collection('Podaci').add(arg);
  }
  async getUsers() {
    const snapshot = await this.fireservices.collection('Podaci').get();
    return console.log(snapshot);
  }
}
