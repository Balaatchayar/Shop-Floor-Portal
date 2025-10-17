sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("My_first_Project.controller.Plan_year", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("PlanYear").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            this.sPlantCode = oArgs.PlantId;   // PlantId comes from route
            this.sUserId = oArgs.UserId;

            MessageToast.show("Plan Year for Plant " + this.sPlantCode + " loaded");
        },

        onFilterChange: function () {
            var sYear = this.getView().byId("yearSelect").getSelectedKey();
            if (!sYear) {
                MessageToast.show("Please select a year");
                return;
            }

            // Apply filters for Plant + Year
            var aFilters = [
                new Filter("PlantCode", FilterOperator.EQ, this.sPlantCode),
                new Filter("StartYear", FilterOperator.EQ, sYear)
            ];

            var oTable = this.getView().byId("planYearTable");
            oTable.bindItems({
                path: "/PLANSet",
                template: oTable.getBindingInfo("items").template.clone(),
                filters: aFilters
            });
        },

        formatDate: function (sValue) {
            if (!sValue) return "";
            var oDate = new Date(sValue);
            return oDate.toLocaleDateString();
        }

    });
});
