import { Routes } from '@angular/router';

import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { UserProfileComponent } from './../../demo/user-profile/user-profile.component';
import { TableListComponent } from './../../demo/table-list/table-list.component';
import { TypographyComponent } from './../../demo/typography/typography.component';
import { IconsComponent } from './../../demo/icons/icons.component';
import { MapsComponent } from './../../demo/maps/maps.component';
import { NotificationsComponent } from './../../demo/notifications/notifications.component';
import { UpgradeComponent } from './../../demo/upgrade/upgrade.component';
import { WalletComponent } from 'app/financial/wallet/wallet.component';
import { BalanceComponent } from 'app/financial/balance/balance.component';

export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  // demo
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  // end of demo
  
  { path: 'wallet', component: WalletComponent },
  { path: 'balance', component: BalanceComponent },

  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }

  
]