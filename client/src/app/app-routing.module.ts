import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';

const routes: Routes = [
  // example {path: '', component: Some, children: [{}], canActivate: [authGuard]},
  {path: '', component: HomeComponent},
  {path: 'new', component: NewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
