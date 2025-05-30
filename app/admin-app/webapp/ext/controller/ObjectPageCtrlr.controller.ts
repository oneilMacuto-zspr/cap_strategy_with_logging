import ControllerExtension from 'sap/ui/core/mvc/ControllerExtension';
import ExtensionAPI from 'sap/fe/templates/ObjectPage/ExtensionAPI';

/**
 * @namespace adminapp.adminapp.ext.controller
 * @controller
 */
export default class ObjectPageCtrlr extends ControllerExtension<ExtensionAPI> {
	static overrides = {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf adminapp.adminapp.ext.controller.ObjectPageCtrlr
		 */
		onInit(this : any) {
			// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
			// const model = this.base.getExtensionAPI().getModel();
			// const oView : any = this.base.getView()
			// oView.attachEventOnce("bindingContextChanged", function () {
			// 	var oContext = oView.getBindingContext();
			// 	if (oContext) {
			// 		var oData = oContext.getObject();
			// 		console.log("Data loaded:", oData);
			// 	}
			// })
			
			// const oExtensionAPI = this.base.getExtensionAPI();
		}
	}
}