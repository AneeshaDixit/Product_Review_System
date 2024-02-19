import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { RegisterPageComponent } from './authentication/register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductRegisterPageComponent } from './product/product-register-page/product-register-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBar2Component } from './components/nav-bar2/nav-bar2.component';
import { ProductDetailPageComponent } from './product/product-detail-page/product-detail-page.component';

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "home", component: HomePageComponent },
  { path: "footer", component: FooterComponent },
  { path: "landing", component: LandingPageComponent },
  { path: "register-product", component: ProductRegisterPageComponent },
  { path: "nav", component: NavBarComponent },
  { path: "nav2", component: NavBar2Component },
  {
    path: 'detail/:id',
    component: ProductDetailPageComponent
  },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: LoginPageComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
