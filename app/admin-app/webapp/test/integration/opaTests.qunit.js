sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'adminapp/adminapp/test/integration/FirstJourney',
		'adminapp/adminapp/test/integration/pages/ProductProjectionList',
		'adminapp/adminapp/test/integration/pages/ProductProjectionObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductProjectionList, ProductProjectionObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('adminapp/adminapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductProjectionList: ProductProjectionList,
					onTheProductProjectionObjectPage: ProductProjectionObjectPage
                }
            },
            opaJourney.run
        );
    }
);