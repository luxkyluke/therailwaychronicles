


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
      var nav_h = $('#menu').height();  

      

      if(st-header_h+nav_h > 0){
        $('#menu').addClass('dark');
      }
      else{
        $('#menu').removeClass('dark');
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

