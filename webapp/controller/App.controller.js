sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function(Controller, MessageToast) {
  "use strict";
  return Controller.extend("My_first_Project.controller.App", {
    
    onInit: function() {
      MessageToast.show("App controller initialized");
      
      // Get router and add debugging
      var oRouter = this.getOwnerComponent().getRouter();
      if (oRouter) {
        oRouter.attachRoutePatternMatched(this._onRouteMatched, this);
      }
    },
    
    _onRouteMatched: function(oEvent) {
      var sRouteName = oEvent.getParameter("name");
      var oArguments = oEvent.getParameter("arguments");
      
      MessageToast.show("Route matched: " + sRouteName + " with args: " + JSON.stringify(oArguments));
    },
    
    onAfterRendering: function() {
      MessageToast.show("App view rendered");
    }
    
  });
});