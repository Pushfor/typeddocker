import { Component, ViewEncapsulation } from "@angular/core";

console.log(require("./app.scss"));

@Component({
    encapsulation: ViewEncapsulation.None, // because IE11 sucks
    selector: "ng-app",
    styles: [require("./app.scss")],
    template: require("./app.html"),
})
export class AppComponent {

}
