import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app.routing'
import { ComponentsModule } from './components/components.module'

import { AppComponent } from './app.component'

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component'

import { WalletComponent } from './financial/wallet/wallet.component'
import { BalanceComponent } from './financial/balance/balance.component'
import { IncomeComponent } from './financial/income/income.component'
import { ExpenditureComponent } from './financial/expenditure/expenditure.component'
import { IeplanComponent } from './plan/ieplan/ieplan.component'
import { FireplanComponent } from './plan/fireplan/fireplan.component'

import { MatDialogModule } from '@angular/material/dialog'
import { RecordComponent } from './financial/income/dialog/record/record.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatButtonModule } from '@angular/material/button'
import { CategoryComponent } from './financial/income/dialog/category/category.component'
import { MatTableModule } from '@angular/material/table'
// import { MatPaginatorModule } from '@angular/material/paginator'
// import { MatSortModule } from '@angular/material/sort'

@NgModule({
  imports: [
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    // }),

    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    RecordComponent,
    CategoryComponent,
  ],
  providers: [
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [
    AppComponent,
    WalletComponent,
    BalanceComponent,
    IncomeComponent,
    ExpenditureComponent,
    IeplanComponent,
    FireplanComponent,
    RecordComponent,
    CategoryComponent,
  ],
})
export class AppModule {}
