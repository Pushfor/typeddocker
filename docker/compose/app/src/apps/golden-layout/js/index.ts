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

const myLayout = new GoldenLayout(config);

myLayout.registerComponent("testComponent", (container, componentState) => {
    container.getElement().html("<h2>" + componentState.label + "</h2>");
});

myLayout.init();
