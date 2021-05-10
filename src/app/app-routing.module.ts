import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BreedInfoComponent } from './components/breed-info/breed-info.component';
import { IndexComponent } from './components/index/index.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { MyDogsComponent } from './components/my-dogs/my-dogs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'info', component: InfoComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'breed-info', component: BreedInfoComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'my-dogs', component: MyDogsComponent}
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
