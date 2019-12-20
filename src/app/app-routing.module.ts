import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IndividualSummaryComponent } from './individual-summary/individual-summary.component';
import { GroupSummaryComponent } from './group-summary/group-summary.component';
import { AuthGuardService } from './services/auth.guard';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuardService], children: [
            { path: '', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'expenses/:id', component: ExpensesComponent },
            { path: 'individualSummary/:id', component: IndividualSummaryComponent },
            { path: 'groupSummary/:id', component: GroupSummaryComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }