import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BaseRequestOptions, HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { AppComponent, HomeComponent } from "./components";

// App is our top level component

import { AppRoutes } from "./app.routes";

/**
 * `AppModule` is the main entry point into Angular2"s bootstraping process
 */
@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [ // import Angular"s modules
    CommonModule,
    AppRoutes,
    BrowserModule,
    HttpModule,
  ],
  providers: [ // expose our Services and Providers into Angular"s dependency injection
  ],
})
export class AppModule {

  constructor(
  ) {
    // TODO
  }
}
