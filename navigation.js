//set jQuery Mobile defaults
(function(){
	$( "[data-role='header']" ).toolbar({ theme: "b" });
	$( "[data-role='panel']" ).panel({ theme: "b" });
	$.mobile.defaultPageTransition = "slide";
})();

//set google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-55110172-1', 'briceshatzer.com');

function hideVerticalNavigation(){
    $('#verticalNavItems').slideUp(200);
    $('#navigation').attr('data-vertical_menu_open', false);
}
function responsiveAdjustment(){
	var viewPort = $(window).width();
	var verticalMenuOpen = $navigation.attr('data-vertical_menu_open') === "true" ? true : false;
    if( viewPort > 639 && verticalMenuOpen ){
        hideVerticalNavigation();
    }
    if( viewPort > 1440 ){
    	$("#quickInfo").panel('open');
   	}
}
var $navigation = $('#navigation');
var $openArrow = $('div.quickInfo_open-arrow');

//--- Vertical Navigation functionality 
$navigation
	.on('click', 'span.fa-bars', function(){
	    $navigation.attr('data-vertical_menu_open', true);    
	    $('#verticalNavItems').slideDown();
	    if( $('#quickInfo.ui-panel-open').length ){
	        $('#quickInfo').panel('close');
	    }
	})
	.on("click","div.verticalNav_close-arrow", function(){
		hideVerticalNavigation();
	});


$( "body" )
	//--- open/close Quick Panel
	.on("click","div.quickInfo_close-arrow, div.quickInfo_open-arrow", function(){ 
		$("#quickInfo").panel( "toggle" );
	})
	//--- jQuery Mobile events
	.on({
		pagecontainertransition:function(){// set responsive view & fire google analytics on intial page load 
			responsiveAdjustment();
			try {
				if ($.mobile.activePage.attr("data-url")) {
					ga('send', 'pageview', $.mobile.activePage.attr("data-url"));	
				} else {
					ga('send', 'pageview');
				}
			} catch(e) {} 
		},
		pagecontainerbeforechange:function(){// close Vertical Navigation when navigating to a new page
			hideVerticalNavigation();
		},
		panelbeforeopen:function(){ // Quick Info panel open
			$openArrow.addClass('panel-open');
			hideVerticalNavigation(); 
		},
		panelbeforeclose:function(){ // Quick Info panel close
			$openArrow.removeClass('panel-open');
		}
	});

//--- set responsive view on page resize
$( window ).resize(function() {
	responsiveAdjustment();	
});

