import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './helpers/interceptor';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InfoComponent } from './components/info/info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BreedInfoComponent } from './components/breed-info/breed-info.component';
import { ShopComponent } from './components/shop/shop.component';
import { MyDogsComponent } from './components/my-dogs/my-dogs.component';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { ChartsModule } from 'ng2-charts';

const customNotifierOption: NotifierOptions = {
  position:  {horizontal: {position: 'right'}, 
              vertical: {position: 'top'} }
}


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    InfoComponent,
    ProfileComponent,
    BreedInfoComponent,
    ShopComponent,
    MyDogsComponent,
    AdminComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CommonModule,
    ChartsModule,
    NotifierModule.withConfig(customNotifierOption)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
