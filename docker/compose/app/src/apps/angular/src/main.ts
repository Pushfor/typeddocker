import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
// import { hmrModule  } from "@angularclass/hmr"; MAYBE?
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((ngModuleRef: any) => {
      // `module` global ref for webpackhmr
      // Don"t run this in Prod
      // return hmrModule(ngModuleRef, module);
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
  case "loading":
    document.addEventListener("DOMContentLoaded", _domReadyHandler, false);
    break;
  case "interactive":
  case "complete":
  default:
    main();
}

function _domReadyHandler() {
  document.removeEventListener("DOMContentLoaded", _domReadyHandler, false);
  main();
}
