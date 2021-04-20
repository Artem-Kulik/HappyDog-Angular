import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddThingsComponent } from './components/add-things/add-things.component';
import { EditThingComponent } from './components/edit-thing/edit-thing.component';
import { LoginComponent } from './components/login/login.component';
import { MyThingsComponent } from './components/my-things/my-things.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/User/index/index.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'my-things', component: MyThingsComponent },
  { path: 'add-thing', component: AddThingsComponent },
  { path: 'edit-thing', component: EditThingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
