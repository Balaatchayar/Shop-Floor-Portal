sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"My_first_Project/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("My_first_Project.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			try {
				// create and set the OData model
				var oODataModel = models.createODataModel();
				this.setModel(oODataModel);
			} catch (oError) {
				// If OData model creation fails, continue without it
				// console.error("Failed to create OData model:", oError);
			}

			// enable routing
			var oRouter = this.getRouter();
			if (oRouter) {
				try {
					oRouter.initialize();
				} catch (oError) {
					// console.error("Failed to initialize router:", oError);
				}
			} else {
				// console.error("Router not available");
			}

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});