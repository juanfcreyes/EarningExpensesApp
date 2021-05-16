import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { EarningsExpenses } from "src/app/models/earnings-expenses.model";
import { Subscription } from "rxjs";
import { EarningsExpensesService } from "../../services/earnings-expenses.service";
import swal from "sweetalert2";
import { EarningExpenseAppState, selectDetails } from "../../redux/earning-expenses.reducer";
import * as moment from "moment";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { SearchDetails } from "../../redux/earnings-expenses.actions";
import { selectUser } from "src/app/app.reducer";

@Component({
    selector: "app-detail",
    templateUrl: "./detail.component.html",
    styles: [],
})

export class DetailComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    userSubscription: Subscription = new Subscription();
    items: EarningsExpenses[];
    details: EarningsExpenses[];
    filter: any = {};

    constructor(private store: Store<EarningExpenseAppState>,
        private earningExpenseService: EarningsExpensesService,
        private calendar: NgbCalendar) { }

    ngOnInit() {
        this.setInitialFilter();
        this.subcribeToDetails();
        this.subscribeToUser();
    }

    private subcribeToDetails() {
        this.subscription = this.store
            .select(selectDetails)
            .subscribe((details) => {
                this.details = details;
            });
    }

    private subscribeToUser() {
        this.userSubscription = this.store.select(selectUser).subscribe((user) => {
            if (user) {
                this.filterRecords();
            }
        });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }



    setInitialFilter() {
        const today = new Date();
        const currentMonth = moment(today).format("MM");
        const currentYear = moment(today).format("YYYY");
        const start = new NgbDate(Number(currentYear), Number(currentMonth), 1)
        this.filter = {
            type: "",
            start: start,
            end: this.calendar.getToday(),
        }
    }


    deleteItem(item: EarningsExpenses) {
        this.earningExpenseService.deleteItem(item.uid).then(() => {
            swal.fire("Eliminado", item.description, "success");
        });
    }

    filterRecords() {
        let end = this.formatDate(this.filter.end);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
        this.store.dispatch(new SearchDetails({
            start: this.formatDate(this.filter.start),
            end: end,
            type: this.filter.type
        }));
    }

    formatDate(date: NgbDate) {
        return new Date(`${date.year}/${date.month}/${date.day}`);
    }

}
