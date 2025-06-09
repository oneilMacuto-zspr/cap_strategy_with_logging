import BaseComponent from "sap/fe/core/AppComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace adminapp.adminapp
 */
export default class Component extends BaseComponent {

    public static metadata = {
        manifest: "json"
    };

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    public init(): void {
        super.init();

        // ✅ Create and populate the optionData model
        const optionData = new JSONModel({
            options: [
                { key: "A", text: "Option A" },
                { key: "B", text: "Option B" },
                { key: "C", text: "Option C" }
            ]
        });

        // ✅ Set the model globally so it's available in fragments and views
        this.setModel(optionData, "optionData");
    }
}
