import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

const Pagesroutes: Routes = [
       {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'promesas', component: PromesasComponent },
            { path: 'account-settings', component: AccountSettingsComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
     },
];

export const PAGES_ROUTES = RouterModule.forChild(Pagesroutes);
