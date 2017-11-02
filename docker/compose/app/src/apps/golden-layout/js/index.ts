import * as jQuery from "jquery";
/* tslint:disable:no-string-literal */
window["$"] = window["jQuery"] = jQuery;
/* tslint:enable:no-string-literal */
import * as GoldenLayout from "golden-layout";

const config = {
    content: [{

        content: [{
            content: [{
                componentName: "testComponent",
                title: "Component 1",
                type: "component",
            }, {
                componentName: "testComponent",
                title: "Component 2",
                type: "component",
            }],
            type: "stack",
            width: 60,
        }, {
            content: [{

                componentName: "testComponent",
                type: "component",
            }, {
                componentName: "testComponent",
                type: "component",
            }],
            type: "column",
        }],
        type: "row",
    }],
};

const myLayout = new GoldenLayout(config, document.getElementById("layout"));

myLayout.registerComponent("testComponent", (container, componentState) => {
    container.getElement().html("<h2>" + componentState.label + "</h2>");
});

myLayout.init();

const picker = document.getElementById("layout-picker") as HTMLSelectElement;

picker.addEventListener("change", (event) => {
    document.body.className = "golden-layout " + picker.value;
});
