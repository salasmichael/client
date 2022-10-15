import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'endowments', pathMatch: 'full' },
  { path: 'endowments', component: ListComponent },
  { path: 'endowments/:id', component: DetailsComponent },
  { path: 'add', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }