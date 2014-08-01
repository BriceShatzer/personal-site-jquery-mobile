var tech_json;
var tools_json;

$(function(){

$( "[data-role='header']" ).toolbar({ theme: "b" });
$( "[data-role='panel']" ).panel({ theme: "b" });
$.mobile.defaultPageTransition = "slide";

//$("body").on( "pagecontainerchange", function( event, ui ) { });

var skills;
function navBarIntialization(){

	$('a.current').removeClass('current');
	var $navItems = $('#navigation a');
	$navItems.eq(1).attr('href', '/creative.html');
	$navItems.eq(2).attr('href', '/tools.html');
	if( /tools.html/.test($.mobile.path.getLocation()) ){
		$('a[href="/tools.html"]').removeAttr('href').addClass('current');
	}
	if(/creative.html/.test($.mobile.path.getLocation()) ){
		$('a[href="/creative.html"]').removeAttr('href').addClass('current');	
	} 
}
function generateDisplayValues(object) { object.url = encodeURIComponent(object.name) }
function buildMenuItems(array,topic){
	/* in addition to the array, the "topic" of the nav menu should also be passed into to the function. This will assist in building the links. 		
	*/
	var $panelList = $('<ul data-role="listview"></ul>');

	$.each(array, function() {
		var $menuItem = $('<li></li>');

		if(this.childItems){
			var $listOfChildItems = $('<ul data-role="listview"></ul>');
			$.each(this.childItems, function() {
				var childObject = this;
				generateDisplayValues(childObject);
				$('<li></li>')
	//				.append( '<a href="#">'+childObject.name+'</a>' )
	//-- points to the page and adds a hash to drive that page's functionality
	//				.append( '<a href="/'+topic+'.html#'+encodeURIComponent(childObject.name)+'">'+childObject.name+'</a>' )
					.append( '<a href="/'+topic+'.html?'+encodeURIComponent(childObject.name)+'">'+childObject.name+'</a>' )				
					.appendTo( $listOfChildItems );

				});
			$menuItem.append( 
				$('<div data-role="collapsible" data-inset="false" class="ui-icon-cloud"></div>')
					.append( '<h1 class="ui-icon-cloud">'+this.name+'</h1>' )
					.append( $listOfChildItems )
				)
		} else {
			generateDisplayValues(this);
			$menuItem.append( '<a href="#" data-icon="cloud">'+this.name+'</a>' )
		}
		$panelList.append($menuItem)
	});
		
	$panelList.appendTo( document.getElementById(topic+"_nav") );	
	$( document.getElementById(topic+"_nav") ).enhanceWithin(); 
}

if(!tech_json){
	$.getJSON('/tech.json', function(data) {
		buildMenuItems(data,'development');
		tech_json = data;
		console.log('tech_json loaded via navigation.js' );
	});
}
navBarIntialization();
console.log("function navBarIntialization() has been fired from navigation.js");




/*$.getJSON('/tools.json', function(data) {
	buildMenuItems(data,'tools');
	tools_json = data;
});*/

$( "body" ).on( "pagecontainerchange", function( event, ui ) {
	navBarIntialization();
	console.log("function navBarIntialization() has been fired from navigation.js pagecontainerchange event"); 
});  

//--tools page
/*	if( /tools.html/.test($.mobile.path.getLocation())  && $('#toolList')[0].innerHTML.length === 0 ){
	    console.log('loading tools.json');
	    $.getJSON('/tools.json', function(data) { 
	        tools_json = data; 
	        buildToolContent();
	        $('section,#toolList').enhanceWithin()
	    });
	}
*/
//--development page 
	//if( /development.html/.test($.mobile.path.getLocation())  && $('#toolList')[0].innerHTML.length === 0 ){}


//});


});