sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("My_first_Project.controller.Login", {
        
        onLoginPress: function() {
            var oView = this.getView();
            var sUserId = oView.byId("userId").getValue().trim();
            var sPassword = oView.byId("password").getValue().trim();

            if (!sUserId || !sPassword) {
                MessageBox.warning("Please enter both User ID and Password.");
                return;
            }

            var oModel = this.getOwnerComponent().getModel();
            var sPath = "/LOGINSet(UserId='" + sUserId + "')"; // confirm entitySet name in metadata

            oModel.read(sPath, {
                success: function(oData) {
                    if (oData.Password === sPassword) {   // ✅ FIXED: case sensitive
                        MessageToast.show("Login successful");
                        this.getOwnerComponent().getRouter().navTo("Dashboard", {
                            UserId: sUserId
                        });
                    } else {
                        MessageBox.error("Invalid password. Please try again.");
                    }
                }.bind(this),
                error: function(oError) {
                    MessageBox.error("Login failed. " + this._getErrorMessage(oError));
                }.bind(this)
            });
        },

        _getErrorMessage: function(oError) {
            try {
                var sMsg = JSON.parse(oError.responseText).error.message.value;
                return sMsg;
            } catch (e) {
                return "Unknown error occurred";
            }
        }
    });
});
