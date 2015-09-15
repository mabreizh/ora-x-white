// JavaScript Document

var desktop = false;
var tablet = false;
var mobile = false;
var test = 0;
var popupClosed = false;
var videoOpen = false;

$(window).ready(function() {

	if ( $('html').hasClass("desktop")) desktop = true;
	if ( $('html').hasClass("tablet")) tablet = true;
	if ( $('html').hasClass("mobile")) mobile = true;

	$('html').scrollTop(0);

	// $('a[href^="#"]').click(function(){
	// 	var the_id = $(this).attr("href");
	// 	$('html, body').animate({ scrollTop:$(the_id).offset().top }, 2000);
	// 	return false;
	// });

	$("#slider.inactive").click(function() { if ( $(window).scrollTop() > 0 ) {$(".backTop").hide(); } } );


	$("#startVideo").click(function(){ openVideo() })
	$("#stopVideo").click(function(){ closeVideo() })
	$("#closePopin").click(function(){ $("#popins").fadeOut(); })


	if ( tablet ) {
		$(".ora-x img").remove();
		$(".ora-x").prepend('<img src="images/m/ora-x_design.png" alt="ora-x" id="img-orax"/>');
	}

	if ( desktop ) {
		$(".ora-x img").remove();
		$(".ora-x").prepend('<img src="images/xl/ora-x_design.png" alt="ora-x" id="img-orax"/>');
	}


	if ( desktop ) { $(window).scroll(function() { scrollAction(); }); }
	if ( tablet || mobile ) { $(window).bind('touchmove',function() { scrollAction(); }); }

	if ( desktop || tablet ) { $("#img-orax").load(function() { initSizes(); }); } else { initSizes(); }


	/*$("#different").bind("mouseenter, mouseover", function(){
		$("#anim_casque")[0].play();
	});

	$("#different").bind("mouseleave", function(){
		$("#anim_casque")[0].pause();

	});*/

	tempo = setInterval(function(){
		clearInterval(tempo);
		$('body').css({cursor:'default'}).animate({opacity:1},1500);
	}, 500);

});


$(window).resize(function() {
	if ( test != $(window).innerWidth() ) {
		test = $(window).innerWidth();
		initSizes();
	}
});


$.fn.scrollBottom = function() { return $(document).height() - this.scrollTop() - this.height(); };

function updateSubscribe(){
    // Hide subscribe popup
	if ( !popupClosed && !videoOpen && $(window).scrollBottom() > 200 && $(window).scrollTop() > 200 && $(window).innerWidth()> 800 ) {
		$(".desktop #flying_subscribe").stop().animate({bottom:0}, 125);
	} else {
		$(".desktop #flying_subscribe").stop().animate({bottom: '-400px'}, 125);
	}
}

function scrollAction(){
	if ( $(window).scrollTop() > 100 ) {
		$(".backTop").fadeIn();
	} else {
		$(".backTop").hide();
	}

	if ( $(window).scrollBottom() > 100 ) {
		$(".share_buttons.onRight").fadeIn();
	} else {
		$(".share_buttons.onRight").fadeOut();
	}

	updateSubscribe()

	initParallax();
}


function initSizes(){

	if ( desktop ) {

		$screenHeight = $(window).innerHeight();

		/* Calage de la hauteur de la page d'accueil */
		if ( $screenHeight > $("#introduction").innerHeight() && $(window).innerWidth()> 800 ) {
			$("#introduction").css({height:$screenHeight+'px'});
			
			$screenHeight2 = $screenHeight - $('#logos').innerHeight();
			$("#introduction .container").css({height:$screenHeight2+'px'});
			
		}

		/* Calage du casque flottant */
		$("#design").css( { height : $screenHeight+'px' } );

        $('#flying_subscribe .close_btn').on('click', function(){
          popupClosed = true;
          updateSubscribe();
        });

		$marginTop = ( $("#design").innerHeight() - $(".ora-x").innerHeight() ) / 3 * 2 ;
		$(".ora-x").css( { marginTop : $marginTop + 'px' } );

	} else {
		$("#design").css( { height : 'inherit' } );
	}


	/* Mise à jour du parallax */
	initParallax();

	/* Remontée automatique de la page */
	$('html, body').animate({ scrollTop:0 }, 125);

	$('.backTop').on('click', function(){
	  $('html, body').animate({ scrollTop:0 }, 500);
      return false;
	})
}

function initParallax(){
	if ( desktop ) {
		$heightScroll1 = $(".heightScroll1").innerHeight();
		$(".ora-x").css( { top:( $(window).scrollTop() - $heightScroll1 ) + 'px' } )
		$rapport = 150 / ( $(window).scrollTop()  ) * $heightScroll1 - 5 ;
		$("#design").css( { backgroundSize : $rapport + '%' } )
	}
}

function openVideo(){
	$("#video").show();
	initSizeVideo();
	$("#myVideo")[0].src='https://www.youtube.com/embed/22GGr6H3dv4?enablejsapi=1&version=3&rel=0&autoplay=1';
	$("#myVideo").fadeIn(125);

	videoOpen = true
	updateSubscribe()
}

function closeVideo(){
	$("#video").fadeOut(125, function(){
		$("#myVideo").hide();
		$("#myVideo")[0].src = '';
	});

	videoOpen = false
	updateSubscribe()
}

function initSizeVideo (){
	$largeur = $("#myVideo").innerWidth();
	$hauteur = 9 / 16 * $largeur;
	$marginX = ( $("#video").innerWidth() - $largeur)/2;
	$marginY = ( $("#video").innerHeight() - $hauteur)/2;
	$("#myVideo").css({height:$hauteur+"px", marginLeft: $marginX+'px', marginTop: $marginY +'px' });
}
