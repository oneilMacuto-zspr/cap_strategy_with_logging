import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import formatter from "../helper/formatter";
import View from "sap/ui/vk/View";

export default class CustomPage extends Controller {
	public static formatter = formatter;

    public onInit(this : any): void | undefined {
        const oCustomModel = new JSONModel;
		oCustomModel.setData({});
		this.getView().setModel(oCustomModel, "customModel");

        // this.getView().setModel(oModel, "customModel");
		// // this.getView().getController().getOwnerComponent().setModel()
        // console.log("here")
		// console.log("View ID:", this.getView().getModel("customModel").getData());
		// console.log("View ID:", this.getView().getId());
    }

	public onAfterRendering(this : any): void | undefined {
		const oModel = this.getOwnerComponent().getModel();
	  
		const oContextBinding = oModel.bindContext("/getPlanCalendarData(...)");
		oContextBinding.setParameter("sampleParamName", "param");
	  
		oContextBinding.execute().then(() => {
		  const oResult = oContextBinding.getBoundContext().getObject();
		  console.log("Function result:", oResult);
		  const oCustomModel = this.getView().getModel("customModel")
		  const formatDates = function(data : any) {
			const newData : any = {};
			newData.startDate = new Date(data.startDate);
			newData.people = data.people.map((r : any) => {
				r.appointments = r.appointments.map((app : any) => {
					app.start = new Date(app.start);
					app.end = new Date(app.end);
					return app;
				})
				r.headers = r.headers.map((hdr : any) => {
					hdr.start = new Date(hdr.start);
					hdr.end = new Date(hdr.end);
					return hdr;
				})
				return r;
			})
			return newData;
		  }
		  const oData = formatDates(oResult.value)
		  
		  oCustomModel.setData(oData);
		  oCustomModel.refresh(true);
		}).catch((oError: any) => {
		  console.error("Function call failed:", oError);
		});
	}
	  
  /**
   * Handles navigation back to the previous page.
   */
  public onNavBack(this : any): void {
    const oHistory = History.getInstance();
    const sPreviousHash = oHistory.getPreviousHash();

    if (sPreviousHash !== undefined) {
      window.history.back();
    } else {
      // Navigate to a default route if no history exists
      const oRouter = this?.getOwnerComponent()?.getRouter();
      oRouter.navTo("ListReport", {}, true); // Replace "ListReport" with your default route name
    }
  }

  /**
   * Handles the press event of the "Do Something" button.
   */
  public async onDoSomething(this : any): Promise<void> {
    MessageToast.show("Button pressed on Custom Page!");
	// MessageBox.confirm("Approve purchase order 12345?");
	if (!this._oDialog) {
		this._oDialog = await this.loadFragment({
			name: "adminapp.adminapp.ext.fragment.Dialog"
		});
	}
	this._oDialog.open();
  }
  public onCloseDialog(this : any): void {
    this._oDialog.close();
  }
}
