// sap.ui.define([
//     "sap/ui/core/mvc/ControllerExtension",
//     "sap/m/MessageToast"
//   ], function (ControllerExtension, MessageToast) {
//     "use strict";
  
//     return ControllerExtension.extend("adminapp.adminapp.ext.controller.ListReportExt", {
//       override: {
//         newAction: function (aSelectedContexts) {
//           console.log("here")
//           // Your logic here
//           MessageToast.show("Custom action triggered!");
//         }
//       }
//     });
//   });
  

// sap.ui.define([
//     "sap/ui/core/mvc/ControllerExtension",
//     "sap/m/MessageToast"
// ], function (ControllerExtension, MessageToast) {
//     "use strict";

//     return ControllerExtension.extend("adminapp.adminapp.ext.controller.new-action", {
//         override: {
//             /**
//              * Custom action handler
//              */
//             newAction: function (aSelectedContexts) {
//                 MessageToast.show("Called.");
//                 if (!Array.isArray(aSelectedContexts) || aSelectedContexts.length === 0) {
//                     MessageToast.show("No row selected.");
//                     return;
//                 }

//                 const oSelectedData = aSelectedContexts[0].getObject();
//                 const oModel = this.extensionAPI.getModel(); // Now available!

//                 oModel.callFunction("/sendDataToBackend", {
//                     method: "POST",
//                     urlParameters: {
//                         data: oSelectedData.someField
//                     },
//                     success: function (oData) {
//                         MessageToast.show("Backend response: " + oData.value);
//                     },
//                     error: function (oError) {
//                         MessageToast.show("Error calling backend");
//                         console.error(oError);
//                     }
//                 });
//             }
//         }
//     });
// });

sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension",
    "sap/m/MessageToast"
], function (ControllerExtension, MessageToast) {
    "use strict";

    return {
        newAction: function (oExtensionAPI, aSelectedContexts) {
            if (!Array.isArray(aSelectedContexts) || aSelectedContexts.length === 0) {
                MessageToast.show("No row selected.");
                return;
            }

            const aSelectedData = aSelectedContexts.map((r) => {
                const oSelected = r.getObject();
                delete oSelected.Criticality;
                return oSelected;
            })
            console.log("Selected Row Data:", aSelectedData);
            const oActionContext = this.routing.getView().getModel().bindContext("/sendDataForApproval(...)",);
            oActionContext.setParameter("payload", aSelectedData)
    
            // Execute the action
            oActionContext.execute().then(function(oResultContext) {
                var oResult = oResultContext.getObject();
                MessageToast.show("Category added: " + oResult.value);
            }).catch(function(oError) {
                sap.m.MessageBox.error("Failed to add category.");
            });
        }
    }
});
