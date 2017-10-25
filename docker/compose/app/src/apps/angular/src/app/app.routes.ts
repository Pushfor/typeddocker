import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components";

const routes: Routes = [

  // first page for images/pdf

  {
    component: HomeComponent,
    path: "",
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

export const AppRoutes = RouterModule.forRoot(routes, { enableTracing: true, useHash: true });
