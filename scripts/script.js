
/*window.onload = function(){
  console.log("VA LA HAUT");
  window.scrollTop=0;
}*/

$(document).ready(function(){	
	// chargement de la page index
    
    console.log("top");
    affArticle('index');
    $(document).scrollTop(0);
});

$(document).scroll(function() {
    var st = $(this).scrollTop();
    $("#headerc").css({
      "top": (-st/4),
      "bottom": (st/4)
    });

    //Scroll menu degradé
    var header_h = $('header').height();
    var top_page = $("#page").offset().top;
    var nav_h = $('#menu').height();  

    if(st<top_page){//(st-header_h+nav_h > 0){
      $('#menu').removeClass('dark');
      $("#footer .parallax").addClass('hidden');
    }
    else{
      $("#footer .parallax").removeClass('hidden');
      $('#menu').addClass('dark');
    }

    /*$(".article_bloc").each(function(){
      if(isInViewport($(this))){
        $(this).addClass("visible");
      }
    })*/
    
});

$(window).resize(function() {
  if(nav_current == "#nav_sacha"){
    replaceSachaDots();
  }
  else if(nav_current == "#nav_article"){
    $(".se-pre-con").fadeIn(0);
    setTimeout(function(){
      makeResponsiveCarousel();
      $(".se-pre-con").fadeOut('slow');
    }, 300);
  }
});

function isInViewport(elem){
    console.log('IS IN VIEWPORT')
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}