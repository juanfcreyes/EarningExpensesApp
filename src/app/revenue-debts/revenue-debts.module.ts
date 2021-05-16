import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { RevenueDebtsComponent } from "../revenue-debts/revenue-debts.component";
import { RVDetailsComponent } from "../revenue-debts/rv-details/rv-details.component";
import { RvFormComponent } from "../revenue-debts/rv-form/rv-form.component";
import { EffectsModule } from "@ngrx/effects";
import { rdsReducer } from './redux/revenue-debts.reducer';
import { RevenueDebtsEffects } from './redux/revenue-debts.effects';
import { RDAdvanceComponent } from './rd-advance/rd-advance.component';

@NgModule({
  declarations: [
    RevenueDebtsComponent,
    RVDetailsComponent,
    RvFormComponent,
    RDAdvanceComponent
  ],
  exports: [
    RevenueDebtsComponent,
    RVDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("rds", rdsReducer),
    EffectsModule.forFeature([RevenueDebtsEffects])
  ],
  entryComponents: [
    RDAdvanceComponent
  ],
})
export class RevenueDebtsModule { }
