import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app.routing'
import { ComponentsModule } from './components/components.module'

import { AppComponent } from './app.component'

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { WalletComponent } from './financial/wallet/wallet.component';
import { BalanceComponent } from './financial/balance/balance.component';
import { IncomeComponent } from './financial/income/income.component';
import { ExpenditureComponent } from './financial/expenditure/expenditure.component';
import { IeplanComponent } from './plan/ieplan/ieplan.component';
import { FireplanComponent } from './plan/fireplan/fireplan.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    // }),
  ],
  declarations: [
    AppComponent, 
    AdminLayoutComponent, 
  ],
  providers: [],
  bootstrap: [
    AppComponent, 
    WalletComponent, 
    BalanceComponent, 
    IncomeComponent, 
    ExpenditureComponent, 
    IeplanComponent, 
    FireplanComponent
  ],
})
export class AppModule {}
