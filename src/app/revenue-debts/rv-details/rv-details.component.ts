import { RevenueDebts } from './../../models/revenue-debts.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RDAdvanceComponent } from '../rd-advance/rd-advance.component';
import { Store } from '@ngrx/store';
import { RDAppState } from '../redux/revenue-debts.reducer';
import { setActiveRD } from '../redux/revenue-debts.actions';
import { rdStatus } from 'src/app/models/types';

@Component({
    selector: 'app-rv-details',
    templateUrl: './rv-details.component.html',
})

export class RVDetailsComponent implements OnInit, OnChanges {

    @Input() title: string = '';
    @Input() items: RevenueDebts[] = [];
    total: Number = 0;
    discharged = rdStatus.discharged;

    ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false
    };

    constructor(private modalService: NgbModal, private store: Store<RDAppState>) { }

    ngOnChanges(_: SimpleChanges): void {
        this.total = this.items.reduce((total, item) => total + item.amount, 0);
        console.log('ngOnChanges', _);
    }

    ngOnInit(): void {
        this.total = this.items.reduce((total, item) => total + item.amount, 0);
    }

    deleteItem(item: RevenueDebts) {
        console.log(item);
    }

    makeMovement(item: RevenueDebts) {
        this.store.dispatch(setActiveRD({rd : item}));
        this.modalService.open(RDAdvanceComponent, this.ngbModalOptions);
    }

}
