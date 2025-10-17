sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageToast"
], function(Controller, Filter, FilterOperator, DateFormat, MessageToast) {
    "use strict";

    return Controller.extend("My_first_Project.controller.Plan_month", {

        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("PlanMonth").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            this.sPlantCode = oArgs.PlantId;
            this.sUserId = oArgs.UserId;
        },

        onFilterChange: function() {
            var sYear = this.getView().byId("yearSelect").getSelectedKey();
            var sMonth = this.getView().byId("monthSelect").getSelectedKey();

            if (!sYear || !sMonth) {
                return;
            }

            var aFilters = [
                new Filter("PlantCode", FilterOperator.EQ, this.sPlantCode),
                new Filter("StartYear", FilterOperator.EQ, sYear),
                new Filter("StartMonth", FilterOperator.EQ, sMonth)
            ];

            var oTable = this.getView().byId("planMonthTable");
            var oModel = this.getView().getModel();

            oModel.read("/PLANSet", {
                filters: aFilters,
                success: function(oData) {
                    // Create JSON model with results
                    var oJSON = new sap.ui.model.json.JSONModel();
                    oJSON.setData({results: oData.results});
                    oTable.setModel(oJSON);

                    // Bind items using XML template
                    var oBindingInfo = oTable.getBindingInfo("items");
                    if (oBindingInfo && oBindingInfo.template) {
                        oTable.bindItems({
                            path: "/results",
                            template: oBindingInfo.template.clone()
                        });
                    }
                },
                error: function(oError) {
                    // MessageToast.show("Failed to load planned orders");
                }
            });
        },

        formatDate: function(oDate) {
            if (!oDate) return "";
            var oDateFormat = DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });
            return oDateFormat.format(oDate);
        },

        onNavBack: function() {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("PlantOverview", {
                    PlantId: encodeURIComponent(this.sPlantCode),
                    UserId: encodeURIComponent(this.sUserId)
                }, true);
            }
        }
    });
});
// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator",
//     "sap/ui/core/format/DateFormat",
//     "sap/m/MessageToast"
// ], function(Controller, Filter, FilterOperator, DateFormat, MessageToast) {
//     "use strict";

//     return Controller.extend("Shopfloor.controller.Plan_month", {

//         onInit: function() {
//             var oRouter = this.getOwnerComponent().getRouter();
//             oRouter.getRoute("PlanMonth").attachPatternMatched(this._onRouteMatched, this);
//         },

//         _onRouteMatched: function(oEvent) {
//             var oArgs = oEvent.getParameter("arguments");
//             this.sPlantCode = oArgs.PlantId;
//             this.sUserId = oArgs.UserId;
//         },

//         onFilterChange: function() {
//             var sYear = this.getView().byId("yearSelect").getSelectedKey();
//             var sMonth = this.getView().byId("monthSelect").getSelectedKey();

//             if (!sYear || !sMonth) {
//                 return; // wait until both are selected
//             }

//             var aFilters = [
//                 new Filter("PlantCode", FilterOperator.EQ, this.sPlantCode),
//                 new Filter("StartYear", FilterOperator.EQ, sYear),
//                 new Filter("StartMonth", FilterOperator.EQ, sMonth)
//             ];

//             var oTable = this.getView().byId("planMonthTable");
//             var oModel = this.getView().getModel();

//             // Read filtered data from OData service
//             oModel.read("/planorderSet", {
//                 filters: aFilters,
//                 success: function(oData) {
//                     // Create JSON model with results
//                     var oJSON = new sap.ui.model.json.JSONModel(oData.results);
//                     oTable.setModel(oJSON);

//                   // Bind items using template from XML
// var oBindingInfo = oTable.getBindingInfo("items");
// if (oBindingInfo && oBindingInfo.template) {
//     oTable.bindItems({
//         path: "/",
//         template: oBindingInfo.template.clone()
//     });
// }

//                 },
//                 error: function(oError) {
//                     MessageToast.show("Failed to load planned orders");
//                 }
//             });
//         },

//         formatDate: function(oDate) {
//             if (!oDate) return "";
//             var oDateFormat = DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });
//             return oDateFormat.format(oDate);
//         },

//         onNavBack: function() {
//             var oHistory = sap.ui.core.routing.History.getInstance();
//             var sPreviousHash = oHistory.getPreviousHash();

//             if (sPreviousHash !== undefined) {
//                 window.history.go(-1);
//             } else {
//                 var oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo("PlantOverview", {
//                     PlantId: encodeURIComponent(this.sPlantCode),
//                     UserId: encodeURIComponent(this.sUserId)
//                 }, true);
//             }
//         }
//     });
// });

// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator",
//     "sap/ui/core/format/DateFormat"
// ], function(Controller, Filter, FilterOperator, DateFormat) {
//     "use strict";

//     return Controller.extend("Shopfloor.controller.Plan_month", {

//         onInit: function() {
//             var oRouter = this.getOwnerComponent().getRouter();
//             oRouter.getRoute("PlanMonth").attachPatternMatched(this._onRouteMatched, this);
//         },

//         _onRouteMatched: function(oEvent) {
//             var oArgs = oEvent.getParameter("arguments");
//             this.sPlantCode = oArgs.PlantId;
//             this.sUserId = oArgs.UserId;
//         },

// onFilterChange: function() {
//     var sYear = this.getView().byId("yearSelect").getSelectedKey();
//     var sMonth = this.getView().byId("monthSelect").getSelectedKey();

//     if (!sYear || !sMonth) {
//         return; // Only trigger when both are selected
//     }

//     var aFilters = [
//         new Filter("PlantCode", FilterOperator.EQ, this.sPlantCode),
//         new Filter("StartYear", FilterOperator.EQ, sYear),
//         new Filter("StartMonth", FilterOperator.EQ, sMonth)
//     ];

//     var oTable = this.getView().byId("planMonthTable");
//     var oModel = this.getView().getModel();

//     oModel.read("/planorderSet", {
//         filters: aFilters,
//         success: function(oData) {
//             // Put results into a temporary JSON model
//             var oJSON = new sap.ui.model.json.JSONModel(oData.results);
//             oTable.setModel(oJSON);

//             // Rebind items to JSON model root
//             oTable.bindItems({
//                 path: "/",
//                 template: oTable.getBindingInfo("items").template.clone()
//             });
//         },
//         error: function(oError) {
//             sap.m.MessageToast.show("Failed to load planned orders");
//         }
//     });
// }
// ,

//         formatDate: function(oDate) {
//             if (!oDate) return "";
//             var oDateFormat = DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });
//             return oDateFormat.format(oDate);
//         },

//         onNavBack: function() {
//             var oHistory = sap.ui.core.routing.History.getInstance();
//             var sPreviousHash = oHistory.getPreviousHash();

//             if (sPreviousHash !== undefined) {
//                 window.history.go(-1);
//             } else {
//                 var oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo("PlantOverview", {
//                     PlantId: encodeURIComponent(this.sPlantCode),
//                     UserId: encodeURIComponent(this.sUserId)
//                 }, true);
//             }
//         }
//     });
// });