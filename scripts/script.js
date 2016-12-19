

$(document).ready(function(){	
	// chargement de la page index
    affLoadingPage();
    affArticle('index');
    $(document).scrollTop(0);
    window.scrollTop=0;
});

$(document).scroll(function() {
    var st = $(this).scrollTop();
    if($(window).width()>1024){
      $("#headerc").css({
        "top": (-st/4),
        "bottom": (st/4)
      });
    }

    if(nav_current == "#nav_article"){
      setTitleVisible();
    }

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
    
});

$(window).resize(function() {
  if(nav_current == "#nav_sacha"){
    replaceSachaDots();
  }
  else if(nav_current == "#nav_article"){
    setTimeout(function(){
      setTitleVisible();
      makeResponsiveCarousel();
    }, 300);
  }
});

/*function isInViewport(elem){
    console.log('IS IN VIEWPORT')
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}*/