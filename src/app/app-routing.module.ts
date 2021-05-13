import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BreedInfoComponent } from './components/breed-info/breed-info.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { IndexComponent } from './components/index/index.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { MyDogsComponent } from './components/my-dogs/my-dogs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'info', component: InfoComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'error-page', component: ErrorPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[UserGuard]},
  { path: 'breed-info', component: BreedInfoComponent},
  // { path: 'admin', component: AdminComponent},
  { path: 'admin', component: AdminComponent, canActivate:[AdminGuard]},
  { path: 'shop', component: ShopComponent, canActivate:[UserGuard]},
  { path: 'my-dogs', component: MyDogsComponent, canActivate:[UserGuard]}
  /*,
  { path: 'edit-profile', component: ProfileEditComponent },
  {
    path: 'category',
    children: [
      { path: '', component: CategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'update-category/:id', component: UpdateCategoryComponent },
      { path: 'category-book/:id', component: CategoryBookComponent }
    ]
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
