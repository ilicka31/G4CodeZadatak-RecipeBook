import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashComponent } from './pages/dash/dash.component';
import { ExpandCookComponent } from './shared/expand-cook/expand-cook.component';
import { ListIngredientComponent } from './shared/list-ingredient/list-ingredient.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: DashComponent,  data: { recipeType: 'all' }},
  { path: 'cooks', component: ExpandCookComponent },
  { path: 'ingredients', component: ListIngredientComponent },
  { path: 'my-recipes', component: DashComponent, data: { recipeType: 'my' } },
  //{ path: 'saved-recipes', component: ListIngredientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
