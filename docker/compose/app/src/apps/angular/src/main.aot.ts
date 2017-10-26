import { enableProdMode } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";
import { AppModuleNgFactory } from "./app/app.module.ngfactory";

import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

export function main(): Promise<any> {
    return platformBrowser()
        .bootstrapModuleFactory(AppModuleNgFactory)
        .catch((err) => {
            throw err;
        });
}

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
