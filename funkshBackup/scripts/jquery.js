$(document).ready(function() {

	
	//-------------------------Variables-----------------------//
	var gallerySquare = $(".gallerySquare");
	var galleryCircle = $(".galleryCircle");
	
	var galleryZoomed = false;
	var originalBG;
	var sTop;
	var sLeft;

	var isOverTw = false;
	var isOverFb = false;
	var isOverLn = false;
	var pipeExplode = $("#funkshPipeExplode");
	var pipeFront = $("#funkshPipeFront");
	var pipeTop = $("#funkshPipeTop");
	var pipe = $(".funkshPipe");

	var fButtons = $(".fPipeButtons");
	var tButtons = $(".tPipeButtons");
	var eButtons = $(".ePipeButtons");

	var fButtonTexts = $(".fPipeButtonTexts");
	var tButtonTexts = $(".tPipeButtonTexts");
	var eButtonTexts = $(".ePipeButtonTexts");

	var currentView = "side";
	var buttons = $(".buttons");
	var buttonTexts = $(".buttonTexts");
   
   var infoIntro = false;
   var currentInfoPane;
   var introHeight = $('#intro').height();
	var introTop = $('#intro').offset().top;
	var inventorHeight = $('#inventor').height();
	var inventorTop = $('#inventor').offset().top;
	var secondTop = $('#second').offset().top;
	var secondHeight = $('#second').height();
	var fourthHeight = $('#fourth').height();
	var fourthTop = $('#fourth').offset().top;
	var fifthHeight = $('#fifth').height();
	var fifthTop = $('#fifth').offset().top;

	var currentGallery;
	
	var width = $(window).width();
	var height = screen.height;
	console.log("width: "+width);
	console.log("Height: "+height);


	$('#inventor, #second, #fourth').css('height',height);
	$('#inventor, #second, #fourth').css('width',width);
	
	$(window).resize(function(){
		width = $(window).width();
		$('#second').css('width',width);
		$('#inventor, #second, #fourth').css('width',width);
	});
	
   $(window).load(function(){
      pipe.css('visibility','visible');
      pipe.hide();
      $("#inventorDescription").mCustomScrollbar({
		   theme:"light",
		   advanced:{
				updateOnContentResize: true
			}
		});
   });
	$('#logoContainer').rotate3Di(-360, 1000);
	//$('#logoContainer').rotate3Di("unflip", 1000);

	
	//Initial Animation for Logo 	
	//$('#logoContainer').hide();
	//$('#logoContainer').slideDown('slow').delay(2000);
	
	/*$("#logoContainer").flip({
		direction: 'lr',
		speed: 500,
		color: '#94c33b'

	});*/



	//$('#logoContainer').css("background-image", "url(images/smoke.png)");

	//-------------------animate Logo--------------------//
	$('#logoContainer').motio({
		fps: 1.5, //set speed
		frames: 4 //define total amount of frames in image
	});
	$('#logoContainer').motio('play'); //play to the end of the total amount of frame

	//Parallax effect for Divs 
	$('#intro').parallax("50%", 0.1);
	$('#inventor').parallax("50%", 0.1);
	


	//-------------------Animate funksh pipe---------------------//
	$("#fView").click(function() { //on hover         
		if (currentView != "front") {
			buttons.hide("fade", 1000);
			buttonTexts.hide("fold", 500);
			if (currentView != "side") {
				toSideFirst("front");
			} else {
				toView("front");
			}
			currentView = "front";
		}
	});

	$("#sView").click(function() { //on hover
		if (currentView != "side") {
			buttons.hide("fade", 1000);
			buttonTexts.hide("fold", 500);
         if(!infoIntro){
            $('.infoPane:visible').hide("fade",500, function(){
               $("#infoPaneIntro").slideDown(1000);
            });
            infoIntro = true;
         }
			var previousView;

			switch (currentView) {
				case "top": previousView = pipeTop; break;
				case "front": previousView = pipeFront; break;
				case "explode": previousView = pipeExplode; break;
			}

			previousView.motio({
				fps: 30, //set speed
				frames: 40 //define total amount of frames in image
			});
			previousView.motio('toStart'); //play to the end of the total amount of frames

			currentView = "side";
		}
	});

	$("#tView").click(function() { //on hover
		if (currentView != "top") {
			buttons.hide("fade", 500);
			buttonTexts.hide("fold", 500);
			if (currentView != "side") {
				toSideFirst("top");
			} else {
				toView("top");
			}
			currentView = "top";
		}

	});

	$("#eView").click(function() { //on hover         
		if (currentView != "explode") {
			buttons.hide("fade", 1000);
			buttonTexts.hide("fold", 500);
			if (currentView != "side") {
				toSideFirst("explode");
			} else {
				toView("explode");
			}
			currentView = "explode";
		}
	});

	function toSideFirst(view) {
      if(!infoIntro){
         $('.infoPane:visible').hide("fade",500, function(){
            $("#infoPaneIntro").slideDown(1000);
         });
         infoIntro = true;
      }
		var nextView;
		var thisView;
		switch (currentView) {
			case "front": thisView = pipeFront; break;
			case "top": thisView = pipeTop; break;
			case "explode": thisView = pipeExplode; break;
		}
		switch (view) {
			case "front": nextView = pipeFront; nextViewButtons = fButtons; nextViewTexts = fButtonTexts; break;
			case "top": nextView = pipeTop; nextViewButtons = tButtons; nextViewTexts = tButtonTexts; break;
			case "explode": nextView = pipeExplode; nextViewButtons = eButtons; nextViewTexts = eButtonTexts; break;
		}

		thisView.motio({
			fps: 30, //set speed
			frames: 40 //define total amount of frames in image
		});
		thisView.motio('toStart', function() {
			pipe.hide(0, function() {
				nextView.show(0, function() {
					nextView.motio({
						fps: 30, //set speed
						frames: 40 //define total amount of frames in image
					});
					nextView.motio('toEnd', function() {
						nextViewButtons.show("fade", 1000);
						nextViewTexts.show("fold", 1000);
					});
				});
			});
		}); //play to the end of the total amount of frames
	}

	function toView(view) {
      if(!infoIntro){
         $('.infoPane:visible').hide("fade",500, function(){
            $("#infoPaneIntro").slideDown(1000);
         });
         infoIntro = true;
      }
		var nextView;
		switch (view) {
			case "front": nextView = pipeFront; nextViewButtons = fButtons; nextViewTexts = fButtonTexts; break;
			case "top": nextView = pipeTop; nextViewButtons = tButtons; nextViewTexts = tButtonTexts; break;
			case "explode": nextView = pipeExplode; nextViewButtons = eButtons; nextViewTexts = eButtonTexts; break;
		}

		pipe.hide(0, function() {
			nextView.show(0, function() {
				nextView.motio({
					fps: 30, //set speed
					frames: 40 //define total amount of frames in image
				});
				nextView.motio('toEnd', function() {
					nextViewButtons.show("fade", 1000);
					nextViewTexts.show("fold", 1000);
				});
			});
		});
	}

	buttons.click(function() {
		if ($(this).attr('id') != currentInfoPane.attr('id')) {
	      currentInfoPane = $(this);
	      $('.infoPane:visible').hide("fade",500, function() {
	         $("#" + currentInfoPane.attr('id') + "Info").slideDown(1000);
	         infoIntro = false;
	      });
	   }
	});

	$("#pipeLogo").click(function() { //on hover
		
		$("#pipeBackground").animate({
			width: '50%'
		}, 1000, function() {
			$('#pipeViewSelector').show("fade", 1000, function() {
				pipeFront.show("fade", 1000);
			});
		});
		
		$("#pipeLogo h1").hide("fade",1000);
		$("#pipeLogo").animate({
			'margin-left': '65%'
		}, 1000, function() {
			$("#pipeLogo").hide("fade", function(){
            $("#pipeInfoPane").show(function(){
               $("#infoPaneIntro").slideDown(1000);
               infoIntro = true;
               currentInfoPane = $("#infoPaneIntro");
            });
         });
		});
	});

	//Animation for Navigation Tab	
	$('#homeLinkAnchor').hover(function() {
		$(this).css('cursor', 'pointer');
	}, function() {
		$(this).css('cursor', 'arrow');
	});
	$('#advLinkAnchor').hover(function() {
		$(this).css('cursor', 'pointer');
	}, function() {
		$(this).css('cursor', 'arrow');
	});

	$('#inventorLinkAnchor').hover(function() {
		$(this).css('cursor', 'pointer');
	}, function() {
		$(this).css('cursor', 'arrow');
	});
	$('#specsLinkAnchor').hover(function() {
		$(this).css('cursor', 'pointer');
	}, function() {
		$(this).css('cursor', 'arrow');
	});
	$('#orderLinkAnchor').hover(function() {
		$(this).css('cursor', 'pointer');
	}, function() {
		$(this).css('cursor', 'arrow');
	});

	/*$('.navLinks').click(function() {
		$('.navLinks').removeClass('whiteText').addClass('greenText', function() {
			$(this).removeClass('greenText').addClass('whiteText');
		});
		
	});*/

	
	$('#homeLinkAnchor').click(function() {
		$('#homeLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
			$(this).fadeTo('50', 1);
		});
		$('html, body').animate({
			scrollTop: $("#intro").offset().top
		}, 500);
		$('#inventorLink').removeClass('whiteText').addClass('greenText');
		$('#advLink').removeClass('whiteText').addClass('greenText');
		$('#specsLink').removeClass('whiteText').addClass('greenText');
		$('#orderLink').removeClass('whiteText').addClass('greenText');
	});

	$('#inventorLinkAnchor').click(function() {

		$('#homeLink').removeClass('whiteText').addClass('greenText');
		$('#inventorLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
			$(this).fadeTo('50', 1);
		});
		$('html, body').animate({
			scrollTop: $("#inventor").offset().top
		}, 500);
		$('#advLink').removeClass('whiteText').addClass('greenText');
		$('#specsLink').removeClass('whiteText').addClass('greenText');
		$('#orderLink').removeClass('whiteText').addClass('greenText');
	});

	$('#advLinkAnchor').click(function() {

		$('#homeLink').removeClass('whiteText').addClass('greenText');
		$('#inventorLink').removeClass('whiteText').addClass('greenText');
		$('#advLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
			$(this).fadeTo('50', 1);
		});
		$('html, body').animate({
			scrollTop: $("#fourth").offset().top
		}, 500);
		$('#specsLink').removeClass('whiteText').addClass('greenText');
		$('#orderLink').removeClass('whiteText').addClass('greenText');
	});



	$('#specsLinkAnchor').click(function() {
		$('#homeLink').removeClass('whiteText').addClass('greenText');
		$('#inventorLink').removeClass('whiteText').addClass('greenText');
		$('#advLink').removeClass('whiteText').addClass('greenText');
		$('#specsLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
			$(this).fadeTo('50', 1);
		});
		$('html, body').animate({
			scrollTop: $("#fifth").offset().top
		}, 500);
		$('#orderLink').removeClass('whiteText').addClass('greenText');
	});
	$('#orderLinkAnchor').click(function() {
		$('#homeLink').removeClass('whiteText').addClass('greenText');
		$('#inventorLink').removeClass('whiteText').addClass('greenText');
		$('#advLink').removeClass('whiteText').addClass('greenText');
		$('#orderLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
			$(this).fadeTo('50', 1);
		});
		$('html, body').animate({
			scrollTop: $("#second").offset().top
		}, 500);
		$('#specsLink').removeClass('whiteText').addClass('greenText');
	});

	//---------------Handles Scroll between pages with Key Up/Down-----------------//
	var ar=new Array(33,34,35,36,37,38,39,40);

	$(document).keydown(function(e) {
     var key = e.which;
      if($.inArray(key,ar) > -1) {
          e.preventDefault();
          return false;
      }
      return true;
	});
	
	
	$(document.body).keydown(function(event){
		var top = $(document).scrollTop();
		//Handling Scrolling for Intro Page
		if((top >= introTop) && (top <(introTop + introHeight)))
		{
		if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#inventor").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('greenText').addClass('whiteText').fadeTo('25', 0.3, function() {
			$(this).fadeTo('0', 1);
			});
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#specsLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('whiteText').addClass('greenText');
			});
			
		}
		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#intro").offset().top
		}, 500,function(){
				$('#homeLink').removeClass('greenText').addClass('whiteText').fadeTo('fast', 0.3, function() {
				$(this).fadeTo('fast', 1);
				});
				$('#inventorLink').removeClass('whiteText').addClass('greenText');
				$('#advLink').removeClass('whiteText').addClass('greenText');
				$('#specsLink').removeClass('whiteText').addClass('greenText');
				$('#orderLink').removeClass('whiteText').addClass('greenText');
			});			
		}
		}
		if(top == inventorTop){
			if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#fourth").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
			$(this).fadeTo('50', 1);
			});
			$('#specsLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('whiteText').addClass('greenText');
			});
			console.log('Down pressed: '+ top);
			
		}
		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#intro").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('greenText').addClass('whiteText').fadeTo('fast', 0.3, function() {
				$(this).fadeTo('fast', 1);
				});
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#specsLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('whiteText').addClass('greenText');
		});			
		}		
			
		}
		
		if((top > inventorTop) && (top < (inventorTop + inventorHeight)))
		{
		console.log(inventorHeight);
		if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#fourth").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('greenText').addClass('whiteText').fadeTo('fast', 0.3, function() {
				$(this).fadeTo('fast', 1);
			});	
			$('#specsLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('whiteText').addClass('greenText');
			});
			console.log('Down pressed: '+ top);
			
		}
		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#inventor").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('greenText').addClass('whiteText').fadeTo('fast', 0.3, function() {
				$(this).fadeTo('fast', 1);
			});	
			$('#specsLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('whiteText').addClass('greenText');



		});			
			console.log('Up pressed: '+ top);
		}
			
		}
			
		if(top == fourthTop){
			if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#fifth").offset().top
		}, 500,function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#specsLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#orderLink').removeClass('whiteText').addClass('greenText');

		});
			console.log('Down pressed: '+ top);
		}

		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#inventor").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#specsLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('whiteText').addClass('greenText');

		});			
			console.log('Up pressed: '+ top);
		}		
			
		}	
		if((top > fourthTop) && (top < (fourthTop + fourthHeight)))
		{
		
		if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#fifth").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#specsLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#orderLink').removeClass('whiteText').addClass('greenText');
		});
			console.log('Down pressed: '+ top);
			
		}
		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#fourth").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#specsLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#orderLink').removeClass('whiteText').addClass('greenText');
		});			
			console.log('Up pressed: '+ top);
		}
			
		}
		if(top == fifthTop){
			if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#second").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#specsLink').removeClass('whiteText').addClass('greenText');
		});
			console.log('Down pressed: '+ top);
			
		}
		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#fourth").offset().top
		}, 500,function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#specsLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#orderLink').removeClass('whiteText').addClass('greenText');

		});			
			console.log('Up pressed: '+ top);
		}		
			
		}
		if((top > fifthTop) && (top < (fifthTop + fifthHeight)))
		{
		
		if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#second").offset().top
		}, 500,function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#specsLink').removeClass('whiteText').addClass('greenText');

		});
			console.log('Down pressed: '+ top);
			
		}
		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#fifth").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#specsLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#orderLink').removeClass('whiteText').addClass('greenText');



		});			
			console.log('Up pressed: '+ top);
		}
		}
		
		if(top == secondTop){
			if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#second").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#specsLink').removeClass('whiteText').addClass('greenText');
		});
			console.log('Down pressed: '+ top);
			
		}
		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#fifth").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#specsLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#orderLink').removeClass('whiteText').addClass('greenText');
		});			
			console.log('Up pressed: '+ top);
		}		
			
		}
		if((top > secondTop) && (top < (secondTop + secondHeight)))
		{
		console.log("Second Height:"+secondHeight);
		if(event.keyCode == '40'){
			$('html, body').animate({
			scrollTop: $("#second").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#specsLink').removeClass('whiteText').addClass('greenText');


		});
			console.log('Down pressed: '+ top);
			
		}
		else if(event.keyCode == '38'){
			$('html, body').animate({
			scrollTop: $("#second").offset().top
		}, 500, function(){
			$('#homeLink').removeClass('whiteText').addClass('greenText');
			$('#inventorLink').removeClass('whiteText').addClass('greenText');
			$('#advLink').removeClass('whiteText').addClass('greenText');
			$('#orderLink').removeClass('greenText').addClass('whiteText').fadeTo('0', 0.3, function() {
				$(this).fadeTo('50', 1);
			});
			$('#specsLink').removeClass('whiteText').addClass('greenText');

		});			
			console.log('Up pressed: '+ top);
		}
			
		}
			
		});

	// Handling colors for nav on page scroll

		$(window).scroll(function(){
			var top = $(document).scrollTop();
			var introTotalHeight = introTop + introHeight;
			var inventorTotalHeight = inventorTop + inventorHeight;
			var fourthTotalHeight = fourthTop + fourthHeight;
			var fifthTotalHeight = fifthTop + fifthHeight;
			var secondTotalHeight = secondTop + secondHeight;

			if((top >= introTop) && (top < introTotalHeight)){

				$('#homeLink').removeClass('greenText').addClass('whiteText');
				$('#inventorLink').removeClass('whiteText').addClass('greenText');
				$('#advLink').removeClass('whiteText').addClass('greenText');
				$('#specsLink').removeClass('whiteText').addClass('greenText');
				$('#orderLink').removeClass('whiteText').addClass('greenText');
			}
			if((top >= inventorTop) && (top < inventorTotalHeight)){
				$('#homeLink').removeClass('whiteText').addClass('greenText');
				$('#inventorLink').removeClass('greenText').addClass('whiteText');
				$('#advLink').removeClass('whiteText').addClass('greenText');
				$('#specsLink').removeClass('whiteText').addClass('greenText');
				$('#orderLink').removeClass('whiteText').addClass('greenText');
			}
			if((top>= fourthTop) && (top< fourthTotalHeight)){
				$('#homeLink').removeClass('whiteText').addClass('greenText');
				$('#inventorLink').removeClass('whiteText').addClass('greenText');
				$('#advLink').removeClass('greenText').addClass('whiteText');				
				$('#specsLink').removeClass('whiteText').addClass('greenText');
				$('#orderLink').removeClass('whiteText').addClass('greenText');
			}
			if((top>= fifthTop) && (top< fifthTotalHeight)){
				$('#homeLink').removeClass('whiteText').addClass('greenText');
				$('#inventorLink').removeClass('whiteText').addClass('greenText');
				$('#specsLink').removeClass('greenText').addClass('whiteText');				
				$('#advLink').removeClass('whiteText').addClass('greenText');
				$('#orderLink').removeClass('whiteText').addClass('greenText');
			}
			if((top>= secondTop) && (top< secondTotalHeight)){
				$('#homeLink').removeClass('whiteText').addClass('greenText');
				$('#inventorLink').removeClass('whiteText').addClass('greenText');
				$('#orderLink').removeClass('greenText').addClass('whiteText');				
				$('#advLink').removeClass('whiteText').addClass('greenText');
				$('#specsLink').removeClass('whiteText').addClass('greenText');
			}



			




		});
	
	//Animation for Social Icons

	$('#fbLink').hover(function() {
		$('#fbLink').attr('src', 'images/facebook_inverted.png');
	}, function() {
		$('#fbLink').attr('src', 'images/FACEBOOK.png');
	});

	$('#twitterLink').hover(function() {
		$('#twitterLink').attr('src', 'images/twitter_inverted.png');
	}, function() {
		$('#twitterLink').attr('src', 'images/TWITTER.png');
	});

	$('#linkedInLink').hover(function() {
		$('#linkedInLink').attr('src', 'images/linkedin_inverted.png');
	}, function() {
		$('#linkedInLink').attr('src', 'images/LINKEDIN.png');
	});



	//---------------Video Animation----------------------//

	var video = $("#indieVideo");
	var videoPlaying;
	$(video).click(function() {
		if (videoPlaying == true) {
			video.get(0).pause();
			videoPlaying = false;
			video.animate({
				width: '50%'
			}, 1000);
			$("#indiePic").show(1000, function(){
				$("#indiePic").animate({
					width: '50%'
				}, 2000,function(){
					$("#indieCampaign").show(100);	
						
				});	
			});
			$('#nav').show("fold",1000);
			$('#social').show("fold",1000);
			
		
		} 
		else {
			video.get(0).play();
			videoPlaying = true;
			$('#nav').hide("fold",1000);
			$('#social').hide("fold",1000);
			
			video.animate({
				width: '100%'
			}, 1000, function(){
			video.get(0).play();	
				
			});
			$("#indieCampaign").hide("fold",1000);
			$("#indiePic").animate({
				width: '0'
			}, 500);
			//video.get(0).setAttribute("controls","controls");
				
		}
		console.log(videoPlaying);
	})



	//-----------Gallery Animation--------------------------//
	var advDesc = new Array();
		advDesc[0]='<br/><h1>Indestructable</h1> <br /><br />The 360 is made from medical grade stainless steel, so it will never scratch or rust and will last a lifetime.</p></h6>';
		advDesc[1]='<br/><h1>Water Proof</h1> <br /><br /> The 360 was designed for convenience in mind, meaning it can be used anywhere, even when you’re surfing the waves in British Columbia.</p></h6>';
		advDesc[2]='<br/><h1>Stylish</h1> <br /><br />The 360 has elements of class and style. With its professional design, the device leaves a uniquely sophisticated impression.</p></h6>';
		advDesc[3]='<br/><h1>Discreet</h1> <br /><br />Nunc ornare ipsum ac arcu ullamcorper eget fringilla quam porttitor. Phasellus sed velit elit, tempus pretium est. Proin eu dolor eget orci vehicula vehicula ac id nisl. Sed id ligula scelerisque eros laoreet euismod. Donec odio libero, varius in gravida at, sagittis eu eros. Sed velit metus, vestibu</p></h6>';
		advDesc[4]='<br/><h1>Easy to Clean</h1> <br /><br />Nunc ornare ipsum ac arcu ullamcorper eget fringilla quam porttitor. Phasellus sed velit elit, tempus pretium est. Proin eu dolor eget orci vehicula vehicula ac id nisl. Sed id ligula scelerisque eros laoreet euismod. Donec odio libero, varius in gravida at, sagittis eu eros. Sed velit metus, vestibu</p></h6>';
		advDesc[5]='<br/><h1>Storage</h1> <br /><br />Nunc ornare ipsum ac arcu ullamcorper eget fringilla quam porttitor. Phasellus sed velit elit, tempus pretium est. Proin eu dolor eget orci vehicula vehicula ac id nisl. Sed id ligula scelerisque eros laoreet euismod. Donec odio libero, varius in gravida at, sagittis eu eros. Sed velit metus, vestibu</p></h6>';
		advDesc[6]='<br/><h1>Air Flow Control</h1> <br /><br />Nunc ornare ipsum ac arcu ullamcorper eget fringilla quam porttitor. Phasellus sed velit elit, tempus pretium est. Proin eu dolor eget orci vehicula vehicula ac id nisl. Sed id ligula scelerisque eros laoreet euismod. Donec odio libero, varius in gravida at, sagittis eu eros. Sed velit metus, vestibu</p></h6>';
		advDesc[7]='<br/><h1>Economical</h1> <br /><br />Nunc ornare ipsum ac arcu ullamcorper eget fringilla quam porttitor. Phasellus sed velit elit, tempus pretium est. Proin eu dolor eget orci vehicula vehicula ac id nisl. Sed id ligula scelerisque eros laoreet euismod. Donec odio libero, varius in gravida at, sagittis eu eros. Sed velit metus, vestibu</p></h6>';
	
	$('.gallerySquare').hover(function(){
		var circle = $(this).find('.galleryCircle');
		$(this).css('cursor', 'pointer');
		circle.siblings().show("fade",500);
		circle.show();
		circle.stop(false,true).rotate3Di(-360, 500);
		
		//circle.stop(false,true).show("clip",{'direction':'horizontal'},300);
	},function(){
		var circle = $(this).find('.galleryCircle');
		circle.siblings().stop(false,true).hide("fade",100);
		circle.stop(false,true).hide("clip",{'direction':'horizontal'},100);
	});
	
	$('.gallerySquare').click(function(){
		var currentSquareId=$(this).attr('id');
		var currentGalleryNo=currentSquareId.substring(7,8);
		currentGallery = currentGalleryNo;
		$('#gallery').animate({opacity: 0}, 'fast', function() {
			if (currentGalleryNo != 4 && currentGalleryNo != 1){
				$(this)
				.css({'background-image':'url(images/gallery/galleryBackgrounds/gallery'+currentGalleryNo+'.jpg)',
				'background-size':'cover',
				'backgound-repeat':'no-repeat',
				'background-position':'center 0px'})
				.fadeTo(1100,'1');
			}
			else {
				$(this)
				.css({'background-image':'url(images/gallery/galleryBackgrounds/gallery'+currentGalleryNo+'.jpg)',
				'background-size':'cover',
				'backgound-repeat':'no-repeat',
				'background-position':'center 100%'})
				.fadeTo(1100,'1');
			}
		});
		$(this).stop().find('.galleryCircle').hide();
		$(this).stop().siblings().hide("slide",500);
		$(this).stop().hide("slide",500);
		document.getElementById('galleryDetailedDesc').innerHTML = advDesc[currentGalleryNo-1];
		$('#galleryDetailedDesc').show(1100);
		$('#galleryButtonContainer').show(0);
	});
	$('.smallDot').hover(function(){
			var hoveredDotNum = $(this).attr('id').substring(3,4);
			var prevDotNum = hoveredDotNum-1;
			var nextDotNum = ++hoveredDotNum;
			$(this).css('cursor','pointer');
			$('#galleryButtonContainer').stop(true,true).animate({'left':'2%'});
			$(this).stop(true,true).animate({
				'height':'150px',
				'width':'150px',
				'top':'-75px'
			},200);
			$('#dot'+prevDotNum).stop(true,true).animate({
				'height':'80px',
				'width':'80px',
				'top':'-20px'
			},200);
			$('#dot'+nextDotNum).stop(true,true).animate({
				'height':'80px',
				'width':'80px',
				'top':'-20px'
			},200);
			for (var i=0;i<9;i++){
				if (i!=prevDotNum && i!=hoveredDotNum-1 && i!=nextDotNum){
					$('#dot'+i).stop(true,true).animate({
						'height':'40px',
						'width':'40px',
						'top':0
					},200);
				}
			}
		},
		function(){
			var hoveredDotNum = $(this).attr('id').substring(3,4);
			var prevDotNum = hoveredDotNum-1;
			var nextDotNum = ++hoveredDotNum;
			$(this).css('cursor','arrow');
			for (var i=0;i<8;i++){
				if (i!=prevDotNum && i!=hoveredDotNum-1 && i!=nextDotNum){
					$('#dot'+i).stop(true,true).animate({
						'height':'40px',
						'width':'40px',
						'top':0
					},200);
				}
			}
		}
	);
	$('#galleryButtonContainer').hover(function(){},function(){
		$('.smallDot').stop(true,true).animate({
			'height':'40px',
			'width':'40px',
			'top':0
		},200);
		$(this).stop(true,true).animate({'left':'5%'});
	});
	var dotClicked;
	$('.smallDot').click(function(){
		var currentSquareId=$(this).attr('id');
		var currentGalleryNo=currentSquareId.substring(3,4);
		if (currentGalleryNo != currentGallery) {
			currentGallery = currentGalleryNo;
			$('#gallery').stop(true,true).animate({opacity: 0}, 400, function() {
				document.getElementById('galleryDetailedDesc').innerHTML = advDesc[currentGalleryNo-1];
				$('#galleryDetailedDesc').show("explode");
				
				if (currentGalleryNo != 4 && currentGalleryNo != 1){
					$(this)
					.css({'background-image':'url(images/gallery/galleryBackgrounds/gallery'+currentGalleryNo+'.jpg)',
					'background-size':'cover',
					'backgound-repeat':'no-repeat',
					'background-position':'50% 0px'})
					.fadeTo(1100,'1');
				}
				else {
					$(this)
					.css({'background-image':'url(images/gallery/galleryBackgrounds/gallery'+currentGalleryNo+'.jpg)',
					'background-size':'cover',
					'backgound-repeat':'no-repeat',
					'background-position':'50% 100%'})
					.fadeTo(1100,'1');
				}
			});
		}
	});
	
	/*
	$('.smallDot').hover(
    function() {
		console.log('In');
        $(this).stop(true,true).animate({ 'zoom': 4 }, 400);
    },
    function() {
		console.log('Out');
        $(this).stop(true,true).animate({ 'zoom': 1 }, 0);
    });*/
});






