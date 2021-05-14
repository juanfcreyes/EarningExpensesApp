import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getUrlByUser(user: User) {
    return `${user.uid}/earning-expenses`
  }

  getUrlItemByUser(user: User) {
    return `${user.uid}/earning-expenses/items`;
  }

  getUrlRDByUser(user: User) {
    return `${user.uid}/earning-expenses/rds`;
  }

  mapCollection() {
    return map((data: any[]) => {
      return data.map(doc => {
        return {
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    })
  }


}
