sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/VBox",
    "sap/m/ObjectNumber",
    "sap/m/GenericTile",
    "sap/m/TileContent"
], function(Controller, MessageToast, JSONModel, Filter, FilterOperator, VBox, ObjectNumber, GenericTile, TileContent) {
    "use strict";

    return Controller.extend("My_first_Project.controller.Dashboard", {

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            this.sUserId = oEvent.getParameter("arguments").UserId || "";
            this.getView().byId("welcomeText").setText("Welcome, " + this.sUserId);

            this._loadPlantData(this.sUserId);
        },

        _loadPlantData: function (sUserId) {
            var oFlexBox = this.getView().byId("dashboardCards");
            oFlexBox.removeAllItems();

            var oModel = this.getView().getModel();
            if (!oModel) {
                MessageToast.show("No data model available");
                return;
            }

            oModel.read("/PLANTMAPPINGSet", {
                filters: [new Filter("UserId", FilterOperator.EQ, sUserId)],
                success: function (oData) {
                    if (oData.results.length === 0) {
                        MessageToast.show("No plants assigned to this user");
                        return;
                    }

                    this.getView().byId("plantCountValue").setText("Number of plants assigned: " + oData.results.length);

                    oData.results.forEach(function (oPlant) {
                        var oTile = new GenericTile({
                            header: oPlant.Name1,
                            subheader: "Plant: " + oPlant.Plant,
                            press: function () {
                                this.getOwnerComponent().getRouter().navTo("PlantOverview", {
                                    PlantId: oPlant.Plant,
                                    UserId: this.sUserId
                                });
                            }.bind(this),
                            tileContent: [
                                new TileContent({
                                    footer: "",
                                    content: new ObjectNumber({
                                        number: oPlant.Plant,
                                        state: "Success"
                                    })
                                })
                            ]
                        }).addStyleClass("customCard");

                        var oCardWrapper = new VBox({
                            items: [oTile],
                            width: "240px"
                        }).addStyleClass("sapUiSmallMargin");

                        oFlexBox.addItem(oCardWrapper);
                    }.bind(this));
                }.bind(this),
                error: function () {
                    MessageToast.show("Error fetching plant data");
                }
            });
        }
    });
});