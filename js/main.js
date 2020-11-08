$(document).ready(function() {
	cufon();
	setEqualHeight($('.equal-height'));
	$("a.anchorLink").anchorAnimate();
	checkMenu();
	//scrollspy();
	
	// Cache the Window object
	$window = $(window);
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	
	// For each element that has a data-type attribute
	$('section[data-type="background"]').each(function(){
	
	
		// Store some variables based on where we are
		$(this).data('speed', parseInt($(this).attr('data-speed')));
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...
	    $(window).scroll(function() {
	
			// If this section is in view
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
	
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / $self.data('speed')); 
				
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				// Put together our final background position
				var coords = '50% '+ yPos + 'px';

				// Move the background
				$self.css({ backgroundPosition: coords });
				
				// Check for other sprites in this section	
				$('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					
					$sprite.css({ backgroundPosition: coords });													
					
				}); // sprites
			
				// Check for any Videos that need scrolling
				$('[data-type="video"]', $self).each(function() {
					
					// Cache the video
					var $video = $(this);
					
					// There's some repetition going on here, so 
					// feel free to tidy this section up. 
					var yPos = -($window.scrollTop() / $video.data('speed'));					
					var coords = (yPos + $video.data('offsetY')) + 'px';
	
					$video.css({ top: coords });													
					
				}); // video	
			
			}; // in view
	
		}); // window scroll
			
	});	// each data-type
});

function cufon(){
	Cufon.replace(
		'.mainnav ul li .limenu,.cufon1,.title-black-alt,.title-alt',
		{fontFamily:'interstate',hover:true}
	); 
	Cufon.replace(
		'.cufon2,.title,.title-heading,.title-black,.title-black2,.title-black-big',
		{fontFamily:'interstate-bold',hover:true}
	)
}

function setEqualHeight(columns) {
	var tallestcolumn = 0;
	columns.each(
	function() 
	 {
		  currentHeight = $(this).height();
		  if(currentHeight > tallestcolumn) 
		  {
				tallestcolumn = currentHeight;
		  }
	}
	);
	columns.height(tallestcolumn);
}

function carousel(){
	$('#slides').slides({
		preload: true,
		generateNextPrev: true,
		play: 5000
	});
}

jQuery.fn.anchorAnimate = function(settings) {

 	settings = jQuery.extend({
		speed : 1100
	}, settings);	
	
	return this.each(function(){
		var caller = this
		$(caller).click(function (event) {	
			event.preventDefault()
			var locationHref = window.location.href
			var elementClick = $(caller).attr("href")
			
			var destination = $(elementClick).offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
				window.location.hash = elementClick
			});
		  	return false;
		})
	})
}

function scrollspy(){
	var zones = $('div.parallax');
	var imageOffset = { x: 200, y: 50 };
	var posOffset = { x: 0, y: -150 }
	
	/* scroll spy */
	zones.each(function(zone, i) {
		var pos = zone.getCoordinates();
		
		var spy = new ScrollSpy({
			min: pos.top + posOffset.y,
			max: pos.bottom + posOffset.y,
			onEnter: function(position) {
				//console.log('entering zone ' + i + ' ' + pos.top + ' / ' + pos.bottom);
				console.log(zone + 'in');
			},
			onLeave: function(position) {
				//console.log('leaving zone ' + i + ' ' + pos.top + ' / ' + pos.bottom);
				console.log(zone + 'out');
			}
		});
	});
}


function checkMenu(){

  var panelPos = [];

  $('section.parallax').each(function(index, value){
    panelPos[index] = $(this).offset().top;
  });
  
  var currentScrollPos = $(window).scrollTop();//GG.util.scrollPos();
  
  var checkScrollPosInterval = function(){
    var newScrollPos = $(window).scrollTop();//GG.util.scrollPos();
    if (currentScrollPos != newScrollPos) {
      menuActive(panelPos);
    }
    currentScrollPos = newScrollPos;
  };
  
  var checkScrollPos = setInterval(checkScrollPosInterval, 600);
  menuActive(panelPos);
  
}

var navSectionLink = $('.nav-section li');

menuActive = function(panelPos) {
  var offset = 100,
	panelName = "#";
	navSectionLink.removeClass('active');
	navSectionLink = $('.nav-section li');
	if (panelPos[6] <= ($(window).scrollTop() + offset)) {
		$(navSectionLink[6]).addClass('active');
		panelName = $(navSectionLink[6]).attr('href');
	}
  else if (panelPos[5] <= ($(window).scrollTop() + offset)) {
    $(navSectionLink[5]).addClass('active');
    panelName = $(navSectionLink[5]).attr('href');
  }
  else if (panelPos[4] <= ($(window).scrollTop() + offset)) {
    $(navSectionLink[4]).addClass('active');
    panelName = $(navSectionLink[4]).attr('href');
  } else if (panelPos[3] <= ($(window).scrollTop() + offset)) {
    $(navSectionLink[3]).addClass('active');
    panelName = $(navSectionLink[3]).attr('href');
  } else if (panelPos[2] <= ($(window).scrollTop() + offset)) {
    $(navSectionLink[2]).addClass('active');
    panelName = $(navSectionLink[2]).attr('href');
  } else if (panelPos[1] <= ($(window).scrollTop() + offset)) {
    $(navSectionLink[1]).addClass('active');
    panelName = $(navSectionLink[1]).attr('href');
  } else if (panelPos[0] <= ($(window).scrollTop() + 240)) {
    $(navSectionLink[0]).addClass('active');
    panelName = $(navSectionLink[0]).attr('href');
  }
};


function scrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop;
}