sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/core/format/DateFormat"],
	function(Controller, Filter, FilterOperator, DateFormat) {
		"use strict";
		return Controller.extend("My_first_Project.controller.Prod_year", {
			onInit: function() {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute("ProdYear").attachPatternMatched(this._onRouteMatched, this);
			},
			_onRouteMatched: function(oEvent) {
				var oArgs = oEvent.getParameter("arguments");
				this.sPlantCode = oArgs.PlantId;
				this.sUserId = oArgs.UserId;
			},
			onFilterChange: function(oEvent) {
				var sYear = this.getView().byId("yearSelect").getSelectedKey();
				if (!sYear) {
					return;
				}
				var aFilters = [new Filter("PlantCode", FilterOperator.EQ, this.sPlantCode), new Filter("Startyear", FilterOperator.EQ, sYear)];
				var oTable = this.getView().byId("prodYearTable");
				oTable.getBinding("items").filter(aFilters);
			},
			formatDate: function(oDate) {
				if (!oDate) return "";
				var oDateFormat = DateFormat.getDateInstance({
					pattern: "dd.MM.yyyy"
				});
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