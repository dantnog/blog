import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  // example {path: '', component: Some, children: [{}], canActivate: [authGuard]},
  {path: '', component: HomeComponent},
  {path: 'new', component: NewComponent},
  {path: 'edit/:id/:slug', component: EditComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
