


$(document).ready(function(){	
	// chargement de la page index
  setTimeout(function(){
    affArticle('index');
  }, 500);

  setTimeout(function(){
    $(".se-pre-con").fadeOut("slow");
    console.log("fadeout forcé");
  }, 6000);

	// parallax script
	$(document).scroll(function()	{
  		var st = $(this).scrollTop();
  		$("#headerc").css({
    		"top": (-st/4),
    		"bottom": (st/4)
  		});

      /*st = $("#headerc").scrollTop();
      $("#headerc").css({
        "top": (-st/4),
        "bottom": (st/4)
      });*/

      //Scroll menu degradé
      var header_h = $('header').height();
      var top_page = $("#page").offset().top;
      var nav_h = $('#menu').height();  

      if(st<top_page){//(st-header_h+nav_h > 0){
        $('#menu').removeClass('dark');
      }
      else{
        $('#menu').addClass('dark');
      }
	});

    $(document).scroll(function()
    {
        if ($(this).scrollTop() > $(window).height())
        {
            $("#header").css("background-image", "url(img/experiences/background.jpg)");
        }
    })

});

