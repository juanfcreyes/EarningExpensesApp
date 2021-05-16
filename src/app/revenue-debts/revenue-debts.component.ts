import { RevenueDebts } from 'src/app/models/revenue-debts.model';
import { Subscription } from 'rxjs';
import { loadRDs } from './redux/revenue-debts.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RDAppState, selectRDsItems } from './redux/revenue-debts.reducer';
import { selectUser } from '../app.reducer';
import { rawTypes, rdStatus } from '../models/types';

@Component({
    selector: 'app-revenue-debts',
    templateUrl: './revenue-debts.component.html'
})
export class RevenueDebtsComponent implements OnInit, OnDestroy {

    loadSubscription: Subscription = new Subscription();
    userSubscription: Subscription = new Subscription();
    revenues: RevenueDebts[] = [];
    debts: RevenueDebts[] = [];
    rds: RevenueDebts[] = [];

    constructor(private store: Store<RDAppState>) { }


    ngOnInit(): void {
        this.userSubscription = this.store.select(selectUser).subscribe((user) => {
            if (user) {
                this.store.dispatch(loadRDs());
            }
        });

        this.loadSubscription = this.store.select(selectRDsItems).subscribe((rds) => {
            console.log('RevenueDebtsComponent a', rds);
            if (rds.length > 0) {
                this.revenues = rds.filter((rd) => rd.type === rawTypes.revenue).sort(this.sortRds());
                this.debts = rds.filter((rd) => rd.type === rawTypes.debt).sort(this.sortRds());
                this.rds = rds;
            }
        });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
        this.loadSubscription.unsubscribe();
    }

    sortRds() {
        return ((a: RevenueDebts) => a.status === rdStatus.discharged ? 1 : -1);
    }


}
