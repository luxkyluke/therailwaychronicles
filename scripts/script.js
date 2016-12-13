


$(document).ready(function(){	
	// chargement de la page index
  setTimeout(function(){
    affArticle('index');
  }, 1000);

  setTimeout(function(){
    if(!indexIsLoad){
        affArticle('index');
        //$(".se-pre-con").fadeOut("slow");
    }
    console.log("fadeout forcé");
  }, 2000);

  setTimeout(function(){
    if(!indexIsLoad){
        affArticle('index');
        //$(".se-pre-con").fadeOut("slow");
    }
    console.log("fadeout forcé");
  }, 4000);

  setTimeout(function(){
    if(!indexIsLoad){
        alert("loading error, please refresh");
        //$(".se-pre-con").fadeOut("slow");
    }
    console.log("fadeout forcé");
  }, 6000);
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
});

$(window).resize(function() {
  if(nav_current == "#nav_sacha"){
    alert("e");
    replaceSachaDots();
  }
});