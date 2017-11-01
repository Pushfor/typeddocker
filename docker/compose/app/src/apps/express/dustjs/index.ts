import * as adaro from "adaro";
import * as common from "common-dustjs-helpers";
import * as intl from "dust-intl";
import * as namingConvention from "dust-naming-convention-filters";
import { helpers } from "dustjs-helpers";
import { Application } from "express";

export function setupDustJSTemplates(app: Application) {

    const dust = adaro.dust({
        cache: false,
    });

    // adaro doc sucks https://github.com/krakenjs/adaro/issues/103
    dust.dust.helpers = helpers;

    common.exportTo(dust);

    intl.registerWith(dust.dust);
    namingConvention(dust.dust);

    app.engine("dust", dust);

    app.set("view engine", "dust");
    app.disable("view cache");
    app.set("views", __dirname + "/../templates");

    // if we want to do dynamic view resolution we need to check this
    // https://github.com/getlackey/lackey-cms/blob/master/lib/server/init/views.js
}
