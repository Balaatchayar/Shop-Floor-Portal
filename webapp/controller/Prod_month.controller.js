sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/routing/History"
], function(Controller, Filter, FilterOperator, DateFormat, History) {
    "use strict";

    return Controller.extend("My_first_Project.controller.Prod_month", {
        
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("ProdMonth").attachPatternMatched(this._onRouteMatched, this);
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
                return; // wait until both are selected
            }

            var aFilters = [
                new Filter("PlantCode", FilterOperator.EQ, this.sPlantCode),
                new Filter("Startyear", FilterOperator.EQ, sYear),
                new Filter("Startmonth", FilterOperator.EQ, sMonth)
            ];

            var oTable = this.getView().byId("prodMonthTable");
            var oBinding = oTable.getBinding("items");
            if (oBinding) {
                oBinding.filter(aFilters);
            }
        },

        formatDate: function(oDate) {
            if (!oDate) return "";
            var oDateObj = new Date(oDate); // OData Edm.DateTime comes as timestamp/ISO
            var oDateFormat = DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });
            return oDateFormat.format(oDateObj);
        },

        onNavBack: function() {
            var oHistory = History.getInstance();
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
