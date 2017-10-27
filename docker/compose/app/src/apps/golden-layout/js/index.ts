import * as jQuery from "jquery";
window["$"] = window["jQuery"] = jQuery;
import * as GoldenLayout from "golden-layout";

const config = {
    content: [{
        type: "row",
        content: [{
            type: "stack",
            width: 60,
            content: [{
                type: "component",
                componentName: "testComponent",
                title: "Component 1"
            }, {
                type: "component",
                componentName: "testComponent",
                title: "Component 2"
            }]
        }, {
            type: "column",
            content: [{
                type: "component",
                componentName: "testComponent"
            }, {
                type: "component",
                componentName: "testComponent"
            }]
        }]
    }]
};

const myLayout = new GoldenLayout(config);

myLayout.registerComponent("testComponent", (container, componentState) => {
    container.getElement().html("<h2>" + componentState.label + "</h2>");
});

myLayout.init();