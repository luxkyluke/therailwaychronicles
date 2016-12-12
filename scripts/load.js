 const TEMPLATE_PATH = "templates/"
 var articles;
 var nav_current;
 var articles = [
 	"el chepe"

 ];

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
 	var done = 3;
	
 	$("footer").load(TEMPLATE_PATH+'footer.html', function(){
		console.log("load footer "+page+" OK");
		--done;
	});
 	var title = $("header").attr("data-title");
 	if(title != undefined){
		$("header").load(TEMPLATE_PATH+'header.html', function(){
			$(".title_logo").append(title);
			console.log("load header "+page+" OK");
			--done;
		});
	}
	else{--done;}
	

	$("nav").load(TEMPLATE_PATH+'nav.html', function()	{	
		$(".burger-menu").on('click', function(e) {
			e.preventDefault();
		  	$(this).toggleClass("burger-menu--opened");
		  	$(this).toggleClass("burger-menu--closed");	
		  	$("#menu").toggleClass("burger");
		});
		$('#menu a').on('click', function(e) {
			e.preventDefault();
			/*var id = $(this).attr('id');
			var tmp = splite(id, '_');*/

		});
		$('#burger').click(function(e){
			e.preventDefault();
		})
		console.log("load nav "+page+" OK");
		--done;
		if(done == 0){
			_callback();
		}

	});
		
}

 function load_template_page(page, title, _callback, refresh){
	document.title = title;
	var file = TEMPLATE_PATH+page+'.html';
    $('content').load(file, function(){	    	
		basic_load(page, function(){
		    console.log("bacic load "+page+" OK");
		    window.history.pushState({"page":page, "pageTitle":title},"", "");
	    	$(document).scrollTop(0);
	    	loadImgsBackGrounds(page, function(){
	    		_callback();
	    	});
	    	
	    });
	   	if(refresh !== undefined)
	   		return false;
    });
} 


window.onpopstate = function(e){
    if(e.state){
        $('content').load(TEMPLATE_PATH+e.state.page+'.html', function(){
    		affArticle(e.state.page);

    	});
        document.title = e.state.pageTitle;
    }
};

function updateCurrent(){
	if(nav_current != null){
		$(nav_current).addClass('current');
	}
}

function affArticle(name){
	$(".se-pre-con").fadeIn(0);
	switch(name){
		case "sacha":
			load_template_page("sacha", "Le Voyage de Sacha", function(){
				nav_current = '#nav_sacha';
				updateCurrent();
				$(".se-pre-con").fadeOut("slow");
			})
			break;

		case "article":
			load_template_page("article", "Title", function(){
				loadCaroussel();
			});
			break;
		case "El_Chepe":
			load_template_page("El_Chepe", "El Chepe - Mexique", function(){
				loadCaroussel();
			});
			break;
		case "Blue_Train":
			load_template_page("Blue_Train", "Blue Train - South Africa", function(){
				loadCaroussel();
			});
			break;
		case "Hiram_Bingham":
			load_template_page("Hiram_Bingham", "Hiram Bingham - Pérou", function(){
				loadCaroussel();
			});
			break;
		case "Petite_Ceinture":
			load_template_page("Petite_Ceinture", "Petite Ceinture - France", function(){
				loadCaroussel();
			});
			break;
		case "White_Pass":
			load_template_page("White_Pass", "White Pass and Yukon Route - Alaska", function(){
				loadCaroussel();
			});
			break;

		case "index":
			load_template_page("index", "The Railway Chronicales", function(){
				nav_current = '#nav_index';
				updateCurrent();
				$(".se-pre-con").fadeOut("slow");
			});
			break;

		case "experiences":
			load_template_page("experiences", "Experiences", function(){
				experienceAnim();
				clickCatExpAnim($("#cat_decouverte a li").first(), false);				
				nav_current = '#nav_experiences';
				updateCurrent();
				$(".se-pre-con").fadeOut("slow");

			});
			break;

		case "destinations":
			load_template_page("destinations", "Destinations", function(){
				nav_current = '#nav_destinations';
				updateCurrent();
				initMap(function(){
					destinationsLoad(function(){
						$(".se-pre-con").fadeOut("slow");
					});
				});
				
			});
			break;

		case "about":
			if(nav_current === '#nav_index' || nav_current === '#nav_contact'
					|| nav_current === '#ourteam'){
				$('html, body').animate({
					scrollTop: $("#ourteam").offset().top-50
				}, 2000, false);
				$(nav_current).removeClass('current');
				nav_current='#nav_about';
				updateCurrent();
				$(".se-pre-con").fadeOut("slow");
			}
			else{
				load_template_page("index", "The Railway Chronicales", function(){
					nav_current='#nav_about';
					updateCurrent();
					$('html, body').animate({
						scrollTop: $("#ourteam").offset().top-50
					}, 2000, false);
					$(".se-pre-con").fadeOut("slow");
				});
			}
			break;

		case "contact":
			if(nav_current === '#nav_index' || nav_current === '#nav_about'
					|| nav_current === '#nav_contact'){
				$('html, body').animate({
					scrollTop: $("#contactus").offset().top-50
				}, 2000, false);
				$(nav_current).removeClass('current');
				nav_current= '#nav_contact';
				updateCurrent();
				$(".se-pre-con").fadeOut("slow");
			}
			else{
				load_template_page("index", "The Railway Chronicales", function(){
					nav_current= '#nav_contact';
					updateCurrent();
					$('html, body').animate({
						scrollTop: $("#contactus").offset().top-50
					}, 1500);
					$(".se-pre-con").fadeOut("slow");
				}, false);
			}

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
			//document.getElementById("header").style.backgroundImage = "url('img/articles/"+$("#page").data("id")+"/background.jpg')";
			loadBG(_callback);
			break;

		default :
			loadBG(_callback);
			break;
	}
}

function loadBG(_callback){
	var cpt =0, i=0;
	var imgs = new Array();
	//var nbImg = $(".bg").size();
	$(".bg").each(function(){
		imgs[i] = new Image();
		var src = $(this).data('src');
		imgs[i].onload = function(){
			console.log("img loaded");
			cpt++;
			if(cpt == i){
				console.log("img DONE");
				_callback();
			}	
		}
		if (src != undefined){
			if($(this).hasClass('article_header')){
				$('#header').css('background-image', 'url('+src+')');
			}
			else
				$(this).css('background-image', 'url('+src+')');
			imgs[i].src = src;
			i++;
		}
	});
	_callback();
}

function clickCatExpAnim(current, scroll){
	//maj du current
	$("#cat_decouverte a li.current").removeClass('current');
	current.addClass('current');


	//tri des expériences
	var idExp = current.data('exp');
	$("#article_conteneur a").each(function(){
		$(this).css('display', 'none');
	});	


	$(".exp_"+idExp).each(function(){
		$(this).css('display', 'inline-block');
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
	$("#cat_decouverte a li").click(function(){
		clickCatExpAnim($(this), true);
		return false;
	});
}

function scrollToPage(){
	if($(window).width()>1024){
		$('html, body').animate({
	        scrollTop: $("#page").offset().top-50
	    }, 1000);
	}
}

function destinationsLoad(_callback){
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
			$(".article_bloc").css("display", "inline-block");
			$('.inject ul li').addClass('visible');
		}
		else{
			//on efface tous les blocs articles
			$(".article_bloc").css("display", "none");
			
			//on efface tous les pays dans la fenetre de gauche
			$('.inject ul li').removeClass('visible');
			

			$(".continent_"+idContinent).each(function(){
				var idPays = $(this).data('pays');
				$('#pays_'+idPays).addClass('visible');
				//console.log($(' li').find("data-id='"+idPays+"'"));
			
				$(this).css('display', 'inline-block');
			});

		}
		scrollToPage();
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

		$(".article_bloc").css("display", "none");
		if(idPays == 0){
			var idCont = $(this).data('cont');
			if(idCont == 0)
				$(".article_bloc").css("display", "inline-block");
			else
				$(".continent_"+idCont).each(function(){
					$(this).css('display', 'inline-block');
				});
		}
		else{
			//on efface tous les blocs articles
			$(".country_"+idPays).each(function(){
				$(this).css('display', 'inline-block');
			});
		}	
		scrollToPage();
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

function loadCaroussel(){
	var owl = $('#carousel');
	/*if(owl.lenght == undefined){
		console.log("CAROUSEL LOAD ERROR");
		return;
	}*/
	owl.owlCarousel({
		items: 1,
		slideSpeed : 1000,
		singleItem: true,
		loop:true,
		lazyLoad : true,
		autoPlay: 5000
	});
	owl.on('click', function (e) {
        owl.trigger('next.owl');
	    e.preventDefault();
	});
	console.log("CAROUSEL LOAD OK");
	$('.nextArrow').on('click', function (e) {
        owl.trigger('next.owl');
	    e.preventDefault();
	});
	$('.prevArrow').on('click', function (e) {
        owl.trigger('prev.owl');
	    e.preventDefault();
	});
	makeResponsiveCarousel();
}

function makeResponsiveCarousel(){
  var imgH = $(".owl-stage-outer").height();
  if(imgH == undefined)
    return ;
  var delta = imgH - $("#carousel").height();
  if(delta>0)
  	return;
  $("#page").css('top', delta);

  $("#articletitle").css("top", imgH/2);
  $(".se-pre-con").fadeOut("slow");
}

