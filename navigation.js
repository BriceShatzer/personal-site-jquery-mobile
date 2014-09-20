(function(){
	$( "[data-role='header']" ).toolbar({ theme: "b" });
	$( "[data-role='panel']" ).panel({ theme: "b" });
	$.mobile.defaultPageTransition = "slide";
})();
	//var skills;
	/*
	function navBarIntialization(){
		$('a.current').removeClass('current');
		var $navItems = $('#navigation a')
		$.each(['/development.html','/creative.html','/tools.html','#about'], function(i, url) { $navItems.eq(i).attr('href',url) });
		if( /development.html/.test($.mobile.path.getLocation()) ){
			$('a[href="/development.html"]').removeAttr('href').addClass('current');
		}
		if(/creative.html/.test($.mobile.path.getLocation()) ){
			$('a[href="/creative.html"]').removeAttr('href').addClass('current');	
		}
		if(/tools.html/.test($.mobile.path.getLocation()) ){
			$('a[href="/tools.html"]').removeAttr('href').addClass('current');	
		} 
	}
	console.log("function navBarIntialization() has been fired from navigation.js");
	*/


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
    if( viewPort > 1280){
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
		pagecontainertransition:function(){// set responsive view on intial page load 
			responsiveAdjustment();
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
