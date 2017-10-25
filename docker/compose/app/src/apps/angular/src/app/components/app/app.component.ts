import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    encapsulation: ViewEncapsulation.None, // because IE11 sucks
    selector: "ng-app",
    styles: [require("./app.scss")],
    template: require("./app.html"),
})
export class AppComponent {

}
