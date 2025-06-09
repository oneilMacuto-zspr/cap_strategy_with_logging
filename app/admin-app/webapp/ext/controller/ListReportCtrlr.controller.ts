import ControllerExtension from 'sap/ui/core/mvc/ControllerExtension';
import ExtensionAPI from 'sap/fe/templates/ListReport/ExtensionAPI';
import JSONModel from 'sap/ui/model/json/JSONModel';

/**
 * @namespace adminapp.adminapp.ext.controller
 * @controller
 */
export default class ListReportCtrlr extends ControllerExtension<ExtensionAPI> {
	static overrides = {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf adminapp.adminapp.ext.controller.ListReportCtrlr
		 */
		onInit(this: any) {
			// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
			// const model = this.base.getExtensionAPI().getModel();
			const dataModel = new JSONModel;
			dataModel.setData({
				"value1": null,
				"value2": null,
				"value3": null,
				"value4": null,
				"value5": null,
				"value6": null,
				"countries": [
					{ "key": "AT", "name": "Austria" },
					{ "key": "BE", "name": "Belgium" },
					{ "key": "BG", "name": "Bulgaria" },
					{ "key": "HR", "name": "Croatia" },
					{ "key": "CY", "name": "Cyprus" },
					{ "key": "CZ", "name": "Czechia" },
					{ "key": "DK", "name": "Denmark" },
					{ "key": "EE", "name": "Estonia" },
					{ "key": "FI", "name": "Finland" },
					{ "key": "FR", "name": "France" },
					{ "key": "DE", "name": "Germany" },
					{ "key": "GR", "name": "Greece" },
					{ "key": "HU", "name": "Hungary" },
					{ "key": "IE", "name": "Ireland" },
					{ "key": "IT", "name": "Italy" },
					{ "key": "LV", "name": "Latvia" },
					{ "key": "LT", "name": "Lithuania" },
					{ "key": "LU", "name": "Luxembourg" },
					{ "key": "MT", "name": "Malta" },
					{ "key": "NL", "name": "Netherlands" },
					{ "key": "PL", "name": "Poland" },
					{ "key": "PT", "name": "Portugal" },
					{ "key": "RO", "name": "Romania" },
					{ "key": "SK", "name": "Slovakia" },
					{ "key": "SI", "name": "Slovenia" },
					{ "key": "ES", "name": "Spain" },
					{ "key": "SE", "name": "Sweden" }
				]
			})
			this.getView().setModel(dataModel, "data")

			const optionData = this.getView().getModel("optionData");
			// if (optionData) {
			// 	optionData.setData({
			// 		options: [
			// 			{ key: "A", text: "Option A" },
			// 			{ key: "B", text: "Option B" },
			// 			{ key: "C", text: "Option C" }
			// 		]
			// 	});
			// }
			// console.log("here")
		},

		onAfterRendering(this: any) {
			console.log("hereafter")
			const oActionContext = this.getView().getModel().bindContext("/getDropDownOptions(...)",);
			oActionContext.setParameter("sampleParamName", "param");
			oActionContext.execute().then(() => {
				const oResult = oActionContext.getBoundContext().getObject();
				console.log("Function result:", oResult);
				const optionData = this.getView().getModel("optionData").getData();
				const newData = optionData.options.concat(oResult.value.options);
				this.getView().getModel("optionData").setData({ options: newData });
			})
		},

		onComboBoxChange(this: any) {
			console.log("onComboBoxChange")
		}
	}
}