 const TEMPLATE_PATH = "templates/"
 var indexIsLoad = false;
 var nav_current;
 var runCarousel = false;

///!\ NE PAS CHANGER DE PLACE LES CONTINENTS EXISTANTS
// 	NE PAS AJOUTER DE NOUVEAU CONTINENT
var continents =[
	"Europe", 	//id 1
	"Asie",		//id 2
	"Oceanie",	//id 3
	"Amérique"	//id 4
];

//ordre important se réferer aux 
//index des pays de l'onglet gauche (id = i+1)
//avec i indice du tableau pays
///!\ NE PAS CHANGER DE PLACE LES PAYS EXISTANT
//AJOUTER LES NOUVEAUX PAYS A LA FIN DU TABLEAU
var pays = [
	"France", 	//id 1
	"Italy",  	//id 2
	"Russie", 	//id 3
	"Australie",//id 4
	"Mexique",	//id 5
	"Afrique du Sud", //id 6
	"Pérou",	//id 7
	"Alaska",	//id 8
	"Japon",	//id 9
	"Inde",		//id 10
	"Portugal",	//id 11
	"Nevada",	// id 12
	"Royaume-Uni", //id 13
	"Californie", //id 14
	"Tunisie",	//id 15
	"Suisse",	//id 16
	"Bolivie"	//id 17
];

 function basic_load(page, _callback){
 	var done = 2;
 	if(!indexIsLoad){
 		done = 3;
		$("nav").load(TEMPLATE_PATH+'nav.html', function()	{	
			$(".burger-menu").on('click', function(e) {
				e.preventDefault();
			  	$(this).toggleClass("burger-menu--opened");
			  	$(this).toggleClass("burger-menu--closed");	
			  	$("#menu").toggleClass("burger");
			});
			$('#menu a').on('click', function(e) {
				e.preventDefault();

				affLoadingPage();

				var id = $(this).attr('id');
				var tmp = id.split('_');
				var page =tmp[1];

				nav_current = "#"+id;
				updateCurrent();

				setTimeout(function(){
					affArticle(page);
					if($('#menu').hasClass('burger'))
						$('.burger-menu').click();

				}, 400);
			});

			$('#burger').click(function(e){
				e.preventDefault();
			})

			nav_current = '#nav_index';
			updateCurrent();

			--done;
			if(done == 0){
				_callback();
			}
		});
	}
	
 	$("footer").load(TEMPLATE_PATH+'footer.html', function(){
		--done;
		if(done == 0){
			_callback();
		}
	});

 	var title = $("header").attr("data-title");
 	if(title != undefined){
		$("header").load(TEMPLATE_PATH+'header.html', function(){
			$(".title_logo").append(title);
			--done;
			if(done == 0){
				_callback();
			}
		});
	}
	else{
		--done;
		if(done == 0){
			_callback();
		}
	}


		
}

 function load_template_page(page, title, _callback, refresh){
	document.title = title;
	var file = TEMPLATE_PATH+page+'.html';
    $('content').load(file, function(){	    	
		basic_load(page, function(){
		    window.history.pushState({"nav_id":"#nav_"+page, "page":page, "pageTitle":title},"", "");
	    	loadImgsBackGrounds(page, function(){
		    	_callback();
		    	$(document).scrollTop(0);
		    });	
	    });
	   	if(refresh !== undefined)
	   		return false;
    });
} 


window.onpopstate = function(e){
    if(e.state){
    	if(!$(e.state.nav_id).length){
    		affArticle(e.state.page);
    	}
    	else{
	    	$(e.state.nav_id).click();
	    }
        document.title = e.state.pageTitle;
    }
};

function updateCurrent(){
	if(nav_current != null){
		$('.current').removeClass('current');
		$(nav_current).addClass('current');
	}
}

function affArticle(name){
	switch(name){
		case "index":
			load_template_page("index", "The Railway Chronicales", function(){
				hideLoadingPage();
				indexIsLoad = true;
				animMouse();
				
			});
			break;

		case "sacha":
			load_template_page("sacha", "Le Voyage de Sacha", function(){	
				setTimeout(function(){
					replaceSachaDots();
				},100);
				hideLoadingPage();
			});
			break;

		case "experiences":
			load_template_page("experiences", "Experiences", function(){
				experienceAnim();
				clickCatExpAnim($("#cat_decouverte a li").first(), false);				
				hideLoadingPage();
			});
			break;

		case "destinations":
			load_template_page("destinations", "Destinations", function(){
				initMap(function(){
					destinationsLoad(function(){
						hideLoadingPage();
					});
				});
				
			});
			break;

		case "about":
			var menuH = $('#menu').height();
			if($('#menu').hasClass('burger')) menuH = 52;
			if(nav_current === '#nav_index' || nav_current === '#nav_contact'){
				$('html, body').animate({
					scrollTop: $("#ourteam").offset().top-menuH
				}, 2000, false);
			}
			else{
				load_template_page("index", "The Railway Chronicales", function(){
					$('html, body').animate({
						scrollTop: $("#ourteam").offset().top-menuH
					}, 2000, false);
				});
			}
			hideLoadingPage();
			break;

		case "contact":
			var menuH = $('#menu').height();
			if($('#menu').hasClass('burger')) menuH = 52;
			if(nav_current === '#nav_index' || nav_current === '#nav_about'){
				$('html, body').animate({
					scrollTop: $("#contactus").offset().top - menuH
				}, 2000, false);
			}
			else{
				load_template_page("index", "The Railway Chronicales", function(){
					$('html, body').animate({
						scrollTop: $("#contactus").offset().top-menuH
					}, 2000, false);
				});
			}
			hideLoadingPage();
			break;

		case "article":
			loadArticle("article", "Blue Train");
			break;
		case "El_Chepe":
			loadArticle("El_Chepe", "El Chepe");
			break;
		case "Blue_Train":
			loadArticle("Blue_Train", "Blue Train");
			break;
		case "Hiram_Bingham":
			loadArticle("Hiram_Bingham", "Hiram Bingham");
			break;
		case "Petite_Ceinture":
			loadArticle("Petite_Ceinture", "Petite Ceinture");
			break;
		case "White_Pass":
			loadArticle("White_Pass", "White Pass");
			break;
		default :
			console.log("ERROR, page non reconnue.");
			break;
	}
	
	//alert(nav_current);
}



function loadImgsBackGrounds(page, _callback){
   	switch(page){
		case "article":
			loadBG(_callback);
			break;

		default :
			loadBG(_callback);
			break;
	}
}

function loadBG(_callback){
	var cpt =0, i=0;
	$(".bg").each(function(){
		var src = $(this).data('src');
		if (src != undefined){
			if($(this).hasClass('article_header') || $(this).attr('id')=="home"){
				$('#header').css('background-image', 'url('+src+')');
				$('#header').imagesLoaded( {background: true}, function() {
					cpt++;
					if(cpt == i){
						_callback();
						return;
					}	
				});	
			}
			else{
				$(this).css('background-image', 'url('+src+')');
				$(this).imagesLoaded( {background: true}, function() {
					cpt++;
					if(cpt == i){
						_callback();
						return;
					}	
				});	
			}
			i++;
		}
		else
			console.log("Error ! Impossible de charger background image ! URL inconnu");
	});
	if(i==0)
		_callback();
}

function clickCatExpAnim(current, scroll){
	//maj du current
	$("#cat_decouverte a li.current").removeClass('current');
	current.addClass('current');


	//tri des expériences
	var idExp = current.data('exp');
	$("#article_conteneur a").each(function(){
		/*$(this).css('display', 'none');*/
		$(this).removeClass('visible')
	});	


	$(".exp_"+idExp).each(function(){
		$(this).addClass('visible');
	});

	var srcLogoBlanc = current.find(".middle").children('img').prop('src');
	var srcLogoNoir = String (srcLogoBlanc.split('_')[0]+".png");

	$('#main_logo_cat').attr('src', srcLogoNoir);

	var titreExp = current.find(".middle").children('h2').text();
	$('#top_title').find('p').html(titreExp);

	if(scroll == false)
		return false;
	$('html, body').animate({
        scrollTop: $("#page").offset().top-50
    }, 1000);

	return false;
}

function experienceAnim(){
	$('.article_bloc').addClass('visible');
	$("#cat_decouverte a li").click(function(){
		clickCatExpAnim($(this), true);
		return false;
	});
}

function scrollToPage(){
	$('html,body').stop(true, false).animate({
        scrollTop: $("#page").offset().top-50
    }, 1000);
}

function scrollToDestTitle(){
	if($(window).width()<850){
		$('html,body').stop(true, false).animate({
	        scrollTop: $("#region_title").offset().top-50
	    }, 1000);
	}
	else{
		scrollToPage();
	}
}

function destinationsLoad(_callback){
	$('.article_bloc').addClass('visible');
	//initialisation des indicateurs de nombre 
	//le nb d'exp par région
	var nbExp = $('.article_bloc').size();
	$('.inject h2 a span').text(nbExp);
	$('#continent_0 span').text(nbExp);

	var exp = " Expérience"
	if(parseInt(nbExp)>1)
		exp +="s";

	$('#region_title').html("Tout "+"<span class='count'>"+ nbExp + exp +"</span>");
	$('.inject h2 a').html("Tout " + "<span class='count'>"+nbExp +"</span>");	

	var nbExpByContinents = [];
	for(var i=0; i < continents.length; i++){
		var nb = $(".continent_"+String(i+1)).size()
		nbExpByContinents[i] = nb;
		$('#continent_'+String(i+1)+' span').text(nb);
	}

	//le nb d'exp par pays
	var nbExpByPays = [];
	for(var i=0; i < pays.length; i++){
		var nb = $(".country_"+String(i+1)).size();
		nbExpByPays[i] = nb;
		$('#pays_'+String(i+1)+' a span').text(nb);
	}
	//on charge les pays correspondant au click sur un continent
	$('.id_continent').click(function(){
		//changement du curseur de selection
		$(".id_continent.selected").removeClass('selected');
		$(this).addClass('selected');
		resetSelectedCountry();

		var idContinent = $(this).data('id');

		//On copie les infos données par l'onglet continent
		var text = 	$(this).text();
		text = text.split(" ");
		var nom = text[0];
		var nb = text[1];

		var exp = " Expérience"
		if(parseInt(nb)>1)
			exp +="s";

		$('#region_title').html(nom + " <span class='count'>"+ nb + exp +"</span>");
		$('.inject h2 a').html(nom + " <span class='count'>"+nb+"</span>");
		$('.inject h2 a').data('cont', idContinent);

		if(idContinent == 0){
			$(".article_bloc").addClass('visible')
			$('.inject ul li').addClass('visible');
		}
		else{
			//on efface tous les blocs articles
			$(".article_bloc").removeClass('visible')
			/*$(".article_bloc").css("display", "none");*/
			
			//on efface tous les pays dans la fenetre de gauche
			$('.inject ul li').removeClass('visible');
			

			$(".continent_"+idContinent).each(function(){
				var idPays = $(this).data('pays');
				$('#pays_'+idPays).addClass('visible');
				$(this).addClass('visible');
				/*$(this).css('display', 'inline-block');*/
			});

		}
		scrollToDestTitle();
		return false;
	});

	//clique sur pays dans l'onglet gauche
	$('.inject a').click(function(){
		var idPays = $(this).data('id');


		//on changer le current curseur
		resetSelectedCountry(this);

		//on change le titre et le nbExp
		var text = 	$(this).text();
		text = text.split(" ");
		var nom = text[0];
		var nb = text[1];

		var exp = " Expérience"
		if(parseInt(nb)>1)
			exp +="s";

		$('#region_title').html(nom + "<span class='count'>"+nb+exp+"</span>");

		/*$(".article_bloc").css("display", "none");*/
		$(".article_bloc").removeClass('visible');
		if(idPays == 0){
			var idCont = $(this).data('cont');
			if(idCont == 0)
				$(".article_bloc").addClass('visible');
				/*$(.article_bloc).css('display', 'inline-block');*/
			else
				$(".continent_"+idCont).each(function(){
				$(this).addClass('visible');
				/*$(this).css('display', 'inline-block');*/				});
		}
		else{
			//on efface tous les blocs articles
			$(".country_"+idPays).each(function(){
				$(this).addClass('visible');
				/*$(this).css('display', 'inline-block');*/			});
		}	
		scrollToDestTitle();
		return false;
	});
	_callback();
}

function resetSelectedCountry(selector){
	$('.inject a.selected').removeClass('selected');
	if(selector != undefined);
		$(selector).addClass('selected');	
	$('.inject .items').first().addClass('selected');
}

function markerClickEvent(id){
	if(id == undefined)
		return false;
	$("#pays_"+id + " a").click();
}

function animCarousel(){
	if(!runCarousel)
		return;
	var owl = $('#carousel');
	setTimeout(function(){
		if(!runCarousel)
			return;
	    owl.trigger('next.owl');
	    animCarousel();
	}, 5500);
}

function loadCaroussel(_callback){
	var owl = $('#carousel');
	owl.owlCarousel({
		items: 1,
		autoPlay: true,
		smartSpeed: 2500,
		slideSpeed : 5000,
		singleItem: true,
		loop:true,
		autoPlaySpeed: 5000,
    	autoPlayTimeout: 5000
	});
	owl.on('click', function (e) {
        owl.trigger('next.owl');
	    e.preventDefault();
	});
	$('.nextArrow').on('click', function (e) {
        owl.trigger('next.owl');
        runCarousel =false;
	    e.preventDefault();
	});

	$('.prevArrow').on('click', function (e) {
        owl.trigger('prev.owl');
        runCarousel =false;
	    e.preventDefault();
	});

	$(document).keyup(function(e){
		if(e.keyCode === 39){
			 $('.nextArrow').click();
			 return;
		}
		if(e.keyCode === 37){
			$('.prevArrow').click();
		}
	})
	loadImgCarousel(_callback);
}

function loadImgCarousel(_callback){
	var cpt =0, i=0;
	$("#carousel .item").each(function(){
		if(i>2){
			i--;
			return;
		}
		$(this).imagesLoaded( function() {
			cpt++;
			if(cpt == i){
				makeResponsiveCarousel();
				_callback();
				runCarousel = true;
				animCarousel();
			}
		});
		i++;
	});
	if(i == 0){
		makeResponsiveCarousel();
		runCarousel = true;
		animCarousel();
		_callback();
	}
}

function makeResponsiveCarousel(){
  var imgH = $(".owl-stage-outer").height();
  var windowH = $(window).height();
  var middle = imgH/2;
  if(windowH<imgH){
  	middle = windowH/2;
  }
  if(imgH == undefined)
    return ;
  $("#articletitle").css("top", middle);
  $(".overlay").css("height", imgH);
}

function replaceSachaDots(){
	$(".chapter").each(function(){
		var id = $(this).data('id');
		var top = $(this).offset().top - $("#page").offset().top;
		$("#dot"+id).css('top', top);
	});
}

function animMouse(){
	$('.mouse').on('click', function(e){
		e.preventDefault();
		scrollToPage();
	});
}


function affLoadingPage(){
	$(".se-pre-con").addClass('visible');
	$('html, body').css({ 'overflow': 'hidden', 'height': '100%' });
	$('#menu').removeClass('dark');
}

function hideLoadingPage(){
	$(".se-pre-con").removeClass('visible');
	$('html, body').removeAttr('style');
}

function setTitleHidden(){
	$("#articletitle .title_logo").fadeOut('slow');
	$("#articletitle p").fadeOut('slow');
	$("#articletitle .mouse").fadeOut('slow');
}

function setTitleVisible(){
	$("#articletitle .title_logo").fadeIn('slow');
	$("#articletitle p").fadeIn('slow');
	$("#articletitle .mouse").fadeIn('slow');
}

function loadArticle(page, title){
	affLoadingPage();
	setTimeout(function(){
		load_template_page(page, title, function(){
			loadCaroussel(function(){
				hideLoadingPage();
				$(".arrow").click(function(){
					setTitleHidden();
				});
				nav_current='#nav_article';
			});	
			animMouse();		
		});
	}, 400);
}