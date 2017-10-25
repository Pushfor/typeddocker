import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    encapsulation: ViewEncapsulation.None, // because IE11 sucks
    selector: "ng2-home",
    styles: [require("./home.scss")],
    template: require("./home.html"),
})
export class HomeComponent {

}
