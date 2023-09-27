import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashComponent } from './pages/dash/dash.component';
import { ExpandCookComponent } from './shared/expand-cook/expand-cook.component';
import { ListIngredientComponent } from './shared/list-ingredient/list-ingredient.component';
import { UserGuardService } from './services/guard/user-guard.service';
import { CookGuardService } from './services/guard/cook-guard.service';
import { AdminGuardService } from './services/guard/admin-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: DashComponent,  data: { recipeType: 'all' }},
  { path: 'cooks', component: ExpandCookComponent, canActivate: [AdminGuardService] },
  { path: 'ingredients', component: ListIngredientComponent, canActivate: [AdminGuardService] },
  { path: 'my-recipes', component: DashComponent, data: { recipeType: 'my' }, canActivate: [CookGuardService]},
  { path: 'saved-recipes', component: DashComponent,  data: { recipeType: 'saved' }, canActivate: [UserGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
