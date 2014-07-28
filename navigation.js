var tech_json;
var tools_json;

$(function(){

$( "[data-role='header']" ).toolbar({ theme: "b" });
$( "[data-role='panel']" ).panel({ theme: "b" });
$.mobile.defaultPageTransition = "slide";

//$("body").on( "pagecontainerchange", function( event, ui ) { });

var skills;
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
			$('<div data-role="collapsible" data-inset="false"></div>')
				.append( '<h1>'+this.name+'</h1>' )
				.append( $listOfChildItems )
			)
	} else {
		generateDisplayValues(this);
		$menuItem.append( '<a href="#">'+this.name+'</a>' )
	}
	$panelList.append($menuItem)
});
	
$panelList.appendTo( document.getElementById(topic+"_nav") );	
$( document.getElementById(topic+"_nav") ).enhanceWithin(); 
}


$.getJSON('/tech.json', function(data) {
	buildMenuItems(data,'development');
	tech_json = data;
});

$.getJSON('/tools.json', function(data) {
	buildMenuItems(data,'tools');
	tools_json = data;
});

});