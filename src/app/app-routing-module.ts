import { FashionWorkspace } from './fashion-workspace';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ServiceProductImageEventDetailComponent } from './service-product-image-event-detail-component/service-product-image-event-detail-component';
import { ServiceProductImageEventComponent } from './service-product-image-event-component/service-product-image-event-component';
import { CatalogComponent } from './catalog-component/catalog-component';
import { CustomerGroupComponent } from './customer-group-component/customer-group-component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { Contact } from './contact/contact';
import { authGuard } from './classes/auth.guard';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component/course-registration-reactive-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { BookNewComponent } from './book-new-component/book-new-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';

const routes: Routes = [
  {path:'admin-fashion/new', component:FashionWorkspace, data:{admin:true,new:true}},
  {path:'admin-fashion/edit/:id', component:FashionWorkspace, data:{admin:true,edit:true}},
  {path:'admin-fashion/view/:id', component:FashionWorkspace, data:{admin:true}},
  {path:'admin-fashion', component:FashionWorkspace, data:{admin:true}},
  {path:'client-fashion/:id', component:FashionWorkspace},
  {path:'client-fashion', component:FashionWorkspace},
  { path: 'binding-style', component: BindingStyleComponent },
  { path: 'product-http-handle-error-service', component: ProductHttpHandleErrorServiceComponent },
  { path: 'binding-property',component:BindingPropertyComponent },
  { path: 'binding-class',component:BindingClassComponent },
  { path: 'binding-event',component:BindingEventComponent },
  { path: 'binding-two-way',component:BindingTwoWayComponent },
  { path: 'product-list',component:ProductListComponent },
  { path: 'product-dropdown-list',component:ProductDropdownListComponent },
  { path: 'product-list-call-service',component:ProductListCallServiceComponent },
  { path: 'product-list-call-http-service',component:ProductListCallHttpServiceComponent },
  { path: 'service-product-image-event', component: ServiceProductImageEventComponent },
  { path: 'service-product-image-event/:id', component: ServiceProductImageEventDetailComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'customer-groups', component: CustomerGroupComponent },
  { path:"products/:id",component:ProductDetailComponent},
  { path:"products",component:ProductListAdvancedComponent},
  { path:"searchproducts",component:ProductListSearchComponent},
  {
    path:"lazyinfor"
    ,loadComponent:()=>
    import('./lazy-component/lazy-component')
      .then((m)=>m.LazyComponent),
      canActivate: [authGuard]
  },
  {path:'contacts',component:Contact},
  {path:"course-register",component:CourseRegistrationComponent},
  {path:"course-reactive-register",component:CourseRegistrationReactiveComponent},
  {path:'',redirectTo: typeof location !== 'undefined' && location.port === '4001' ? 'admin-fashion' : 'client-fashion',pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"fakeproducts",component:FakeProductComponent},
  {path:"book-list",component:BooksComponent},
  {path:"book-detail",component:BookDetailComponent},
  {path:"book-new",component:BookNewComponent},
  {path:"fashion-list",component:FashionComponent},
  {path:"fashion-detail",component:FashionDetailComponent},
  {path:"fashion-detail/:id",component:FashionDetailComponent},

  { path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

