sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/StandardTile"
], function(Controller, MessageToast, Filter, FilterOperator, StandardTile) {
    "use strict";

    return Controller.extend("My_first_Project.controller.PlantOverview", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("PlantOverview").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            this.sPlantId = oArgs.PlantId;
            this.sUserId = oArgs.UserId;

            if (!this.sPlantId || !this.sUserId) {
                MessageToast.show("Invalid plant or user information");
                return;
            }

            // Load plant details
            this._loadPlantDetails();

            // Load overview tiles
            this._loadOverviewTiles();
        },

        _loadPlantDetails: function () {
            var oView = this.getView();
            var oModel = oView.getModel();

            if (!oModel) {
                MessageToast.show("No data model available");
                return;
            }

            oModel.read("/PLANTMAPPINGSet", {
                filters: [new Filter("UserId", FilterOperator.EQ, this.sUserId)],
                success: function(oData) {
                    if (oData.results && oData.results.length > 0) {
                        var oPlant = oData.results.find(function(p) {
                            return p.Plant === this.sPlantId;
                        }.bind(this));

                        if (oPlant) {
                            oView.byId("plantId").setText(oPlant.Plant || "");
                            oView.byId("plantName").setText(oPlant.Name1 || "");
                            oView.byId("plantStreet").setText(oPlant.Street || "");
                            oView.byId("plantCity").setText(oPlant.City || "");
                            oView.byId("plantCountry").setText(oPlant.Country || "");
                            oView.byId("plantPostal").setText(oPlant.PostalCode || "");
                        } else {
                            MessageToast.show("No plant details found for Plant ID: " + this.sPlantId);
                        }
                    } else {
                        MessageToast.show("No plant details found for this user");
                    }
                }.bind(this),
                error: function() {
                    MessageToast.show("Failed to load plant details");
                }
            });
        },

_loadOverviewTiles: function () {
    var oView = this.getView();
    var oTileContainer = oView.byId("overviewTiles");
    var oRouter = this.getOwnerComponent().getRouter();

    oTileContainer.removeAllTiles(); // Clear existing tiles

    var aTiles = [
        { title: "Production Order Year-wise", route: "ProdYear", info: "View production orders by year", type: "productionTile" },
        { title: "Production Order Month-wise", route: "ProdMonth", info: "View production orders by month", type: "productionTile" },
        { title: "Planned Order Year-wise", route: "PlanYear", info: "View planned orders by year", type: "plannedTile" },
        { title: "Planned Order Month-wise", route: "PlanMonth", info: "View planned orders by month", type: "plannedTile" }
    ];

    aTiles.forEach(function(tile) {
        var oTile = new sap.m.StandardTile({
            title: tile.title,
            info: tile.info,
            press: function() {
                oRouter.navTo(tile.route, {
                    PlantId: this.sPlantId,
                    UserId: this.sUserId
                });
            }.bind(this)
        });
        oTile.addStyleClass(tile.type); // add gradient style class
        oTileContainer.addTile(oTile);
    }.bind(this));
},

        onRefreshTiles: function() {
            this._loadOverviewTiles();
            MessageToast.show("Tiles refreshed");
        },

        onNavBack: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Dashboard", { UserId: this.sUserId }, true);
        }
    });
});
