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

//--- Vertical Navigation functionality 
function hideVerticalNavigation(){
    $('#verticalNavItems').slideUp(200);
    $('#navigation').attr('data-vertical_menu_open', false);
}

$('#navigation')
	.on('click', 'span.fa-bars', function(){
	    $('#navigation').attr('data-vertical_menu_open', true);    
	    $('#verticalNavItems').slideDown();
	    if( $('#quickInfo.ui-panel-open').length ){
	        $('#quickInfo').panel('close');
	    }
	})
	.on("click","div.verticalNav_close-arrow", function(){
		hideVerticalNavigation()
	});


//--- Quick Info Panel functionality 
$openArrow = $('div.quickInfo_open-arrow');

$( "body" )
	.on({
		panelbeforeopen:function() { 
			$openArrow.addClass('panel-open');
			hideVerticalNavigation(); 
		},
		panelbeforeclose:function(){ $openArrow.removeClass('panel-open') }
	})
	.on("click","div.quickInfo_close-arrow, div.quickInfo_open-arrow", function(){ 
		$("#quickInfo").panel( "toggle" );
	})

//--- responsive behavior
$( window ).resize(function() {
	var viewPort = $(window).width();
    if( viewPort > 639 && $('#navigation').data('vertical_menu_open') ){
        hideVerticalNavigation()
    }
    if( viewPort > 1280){
    	$("#quickInfo").panel('open');

   	}
});
	


//}());