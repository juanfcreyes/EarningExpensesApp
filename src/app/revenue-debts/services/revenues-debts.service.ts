import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/services/app.service';
import { RevenueDebts } from 'src/app/models/revenue-debts.model';
import { RDMovement } from 'src/app/models/rd-movement.model';

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

    saveRD(user: User, rd: RevenueDebts) {
        return this.angularFireDB
            .doc(this.appService.getUrlByUser(user))
            .collection('rds').add({ ...rd, date: new Date() })
    }

    updateRD(user: User, rd: RevenueDebts) {
        return this.angularFireDB
            .doc(this.appService.getUrlByUser(user))
            .collection('rds').doc(rd.uid)
            .set({ status: rd.status, description: rd.description, amount:  rd.amount , type: rd.type, date: new Date()});
    }

    deleteRD(user: User, uid: string) {
        return this.angularFireDB
            .doc(`${this.appService.getUrlRDByUser(user)}/${uid}`)
            .delete();
    }

    saveRDMovement(user:User,  uid: string, rdMovement: RDMovement) {
        return this.angularFireDB
            .doc(this.appService.getUrlByUser(user))
            .collection('rds').doc(uid).collection('movements')
            .add({...rdMovement , date: new Date()})
    }






}
