import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class RevenuesDebtsService {

  constructor(private angularFireDB: AngularFirestore,
    private appService: AppService) { }

  loadRDs(user: User) {
    return this.angularFireDB
      .collection(`${this.appService.getUrlRDByUser(user)}`)
      .snapshotChanges().pipe(this.appService.mapCollection())
  }

  saveRD(user: User, rd: any) {
    return this.angularFireDB
      .doc(this.appService.getUrlByUser(user))
      .collection('rds').add({ ...rd, date: new Date() })
  }

  deleteRD(user: User, uid: string) {
    return this.angularFireDB
      .doc(`${this.appService.getUrlRDByUser(user)}/${uid}`)
      .delete();
  }

}
