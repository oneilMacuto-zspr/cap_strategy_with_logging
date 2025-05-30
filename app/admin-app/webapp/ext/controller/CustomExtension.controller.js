sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function(Controller) {
    "use strict";
  
    return Controller.extend("adminapp.adminapp.ext.controller.CustomExtension", {
      onInit: function() {
        // Initialization logic
      },
  
      onCustomButtonPress: function() {
        sap.m.MessageToast.show("Custom button pressed!");
      }
    });
  });
  