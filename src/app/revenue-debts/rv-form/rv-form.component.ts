import { saveRD } from './../redux/revenue-debts.actions';
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RDAppState } from "../redux/revenue-debts.reducer";

@Component({
  selector: "app-rv-form",
  templateUrl: "./rv-form.component.html"
})
export class RvFormComponent implements OnInit {

  initialState = {
	description: "",
	amount: 0,
	type: "haber",
  };

  loading = false;
  invalid = false;
  item: any;

  constructor(private store: Store<RDAppState>) { }


  ngOnInit(): void {
	this.item = { ...this.initialState };
  }

  saveItem() {
	this.store.dispatch(saveRD({ rd: this.item }));
	this.item = { ...this.initialState };
  }
}
