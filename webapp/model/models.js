sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/odata/v2/ODataModel"
], function(JSONModel, Device, ODataModel) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createODataModel: function() {
			try {
				// Use the service URL from manifest.json dataSources
				var oModel = new ODataModel({
					serviceUrl: "/sap/opu/odata/sap/ZGRH_SF_ODATA_SRV/",
					useBatch: false,
					defaultBindingMode: "TwoWay",
					defaultCountMode: "Inline",
					refreshAfterChange: true
				});
				
				// Add error handling
				oModel.attachRequestFailed(function(oEvent) {
					var oError = oEvent.getParameter("response");
					if (oError && oError.statusCode === 404) {
						// Service not found, try alternative URL
						oModel.setServiceUrl("./sap/opu/odata/sap/ZGRH_SF_ODATA_SRV/");
					}
				});
				
				// Add metadata loaded handler
				oModel.attachMetadataLoaded(function() {
					// Metadata loaded successfully
				});
				
				// Add metadata failed handler
				oModel.attachMetadataFailed(function(oEvent) {
					// Fallback to local service if metadata loading fails
					oModel.setServiceUrl("./localService/metadata.xml");
				});
				
				return oModel;
			} catch (oError) {
				// Fallback to local service if OData model creation fails
				return new ODataModel("./localService/metadata.xml");
			}
		}

	};
});