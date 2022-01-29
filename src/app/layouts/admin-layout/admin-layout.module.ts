import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AdminLayoutRoutes } from './admin-layout.routing'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatRippleModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSelectModule } from '@angular/material/select'

import { DashboardComponent } from 'app/dashboard/dashboard.component'
import { UserProfileComponent } from 'app/demo/user-profile/user-profile.component'
import { TableListComponent } from 'app/demo/table-list/table-list.component'
import { TypographyComponent } from 'app/demo/typography/typography.component'
import { IconsComponent } from 'app/demo/icons/icons.component'
import { MapsComponent } from 'app/demo/maps/maps.component'
import { NotificationsComponent } from 'app/demo/notifications/notifications.component'
import { UpgradeComponent } from 'app/demo/upgrade/upgrade.component'
import { WalletComponent } from 'app/financial/wallet/wallet.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    // UpgradeComponent,
    WalletComponent,
  ],
})
export class AdminLayoutModule {}
