import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RDAppState, selectActiveRd } from '../redux/revenue-debts.reducer';
import { RevenueDebts } from 'src/app/models/revenue-debts.model';
import { cleanActiveRD, addRDMovement } from '../redux/revenue-debts.actions';
import { RDMovement } from 'src/app/models/rd-movement.model';
import { ShowLoadingAction } from '../../shared/ui.actions';
import { selectLoading } from '../../app.reducer';

@Component({
    selector: 'app-rv-advance',
    templateUrl: './rd-advance.component.html',
    styleUrls: ['./rd-advance.component.css']
})
export class RDAdvanceComponent implements OnInit, OnDestroy {

    rdSubscription: Subscription = new Subscription();
    loadingSubcription: Subscription = new Subscription();
    item: RevenueDebts;
    advance = {
        amount: 0,
        createMovement: false
    }
    loading = false;

    constructor(public readonly activeModal: NgbActiveModal, private store: Store<RDAppState>) { }

    ngOnInit(): void {
        this.rdSubscription = this.store.select(selectActiveRd).subscribe((active) => {
            this.item = active;
        });
        this.loadingSubcription = this.store.select(selectLoading).subscribe((loading) => {
            this.loading = loading;
        });
    }

    ngOnDestroy(): void {
        this.rdSubscription.unsubscribe();
        this.loadingSubcription.unsubscribe();
    }

    onSubmit(): void {
        this.store.dispatch(new ShowLoadingAction());
        this.store.dispatch(addRDMovement({ movement: this.advance }));
        this.closeModal();
    }

    cancel(): void {
        this.closeModal();
    }

    closeModal() {
        this.activeModal.dismiss('cancelado');
        this.store.dispatch(cleanActiveRD());
    }
}
