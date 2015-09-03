var loaded = 0;
var xhr;
var last_href;
var files = [];

String.prototype.decodeHTML = function()
{
	return $("<div>", {html: "" + this}).html();
};

$(function()
	{
		/*	$('.logo svg').click(function()
		{
		loadPage('http://'+window.location.hostname);
		history.pushState({}, '', 'http://'+window.location.hostname);

		})*/

		var $main = $(".wrapper"),
		last_href = window.location.pathname,
		ajinit = function()
		{

			$("a").not('.project_link').unbind("click").click(function(e)
				{
					e.preventDefault();
					var href = $(this).attr("href");

					if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1)
					{
						if (typeof xhr != 'undefined')
						{
							xhr.abort();
						}
						history.pushState({}, '', href);
						loadPage(href);
					}
					return false;
				});
			if (loaded) loaded = 2;
			document_ready();

			$(document).scrollTop(0);


		},

		loadPage = function(href)
		{
			if (last_href != href)
			{
				$('#loader').stop(true).width(0).stop(true);
				$('#loader').show();
				xhr = $.ajax(
					{
						url: href,
						method: 'GET',
						dataType: 'html',
						cache: false,
						async: true,
						success: function(html)
						{
							//var $body = $(html.substr(html.indexOf('<body'), html.indexOf('</body') - html.indexOf('<body')));
							var $body = $(html.substr(html.indexOf('<ins'), html.indexOf('</ins') - html.indexOf('<ins')));
							var $img = $body.find('img'),


							progress = $('#loader'),
							size=$img.size(),
							counter=0;


							$img.load(function(e)
								{
									counter++;
									var percent = Math.floor(counter*50/size) + 50;
									$('#loader').stop().animate({'width':percent+'%'},400);
									if(counter==size )
									{

										$('#loader').fadeOut(400, function()
											{
												$(window).scrollTop(0);
												$('#loader').stop(true).width(0);
												$('.container').replaceWith($body);

												last_href = href;
												$('.background').hide();
												$('.background').css({'background-color':'transparent'});

												ajinit();
											});


									}
								});


						},
						progress: function(e)
						{
							if (e.lengthComputable)
							{
								$('#loader').stop().animate({'width': Math.round((e.loaded / e.total) * 50) + '%'},400);
							}
						}
					});
			}
		};

		ajinit();

		$('.refresh').click(function()
			{
				var active_tags = [];

				var i = 0;
				$('.tag-items').find('.active-tag').each(function()
					{
						//active_tags[i] = $(this).html().split('<')[0].trim();
						active_tags[i] = $(this).attr('rel');
						i++;
					})

				history.pushState({}, '', $(this).data('action') + active_tags.join(','));
				loadPage($(this).data('action') + active_tags.join(','));
			})

		$(window).load(function()
			{

				loadPage('http://'+window.location.hostname + window.location.pathname);
				setTimeout(function()
					{
						$('.menu-text').fadeIn(300);
					},1500);

			})



		$(window).on("popstate", function(e)
			{
				$('#loader').stop(true).width(0).stop(true);
				$('#loader').show();
				loadPage(location.href);
				document_ready();


				/*	if (e.originalEvent.state !== null)
				{
				$('#loader').stop(true).width(0).stop(true);
				$('#loader').show();
				loadPage(location.href);
				if (typeof xhr != 'undefined')
				{
				xhr.abort();
				}

				}*/
			});
	});





$( document ).ready(function()
	{
		document_ready();
		$('.tag-cloud').on('click','span',function(e)
			{


				if ($(this).hasClass('active-tag'))
				{
					$(this).addClass('tag').removeClass('active-tag');

				}else if($(this).hasClass('tag'))
				{
					$(this).addClass('active-tag').removeClass('tag');

				}
				checkTag($(this));
			});

		$('.tag-category h3').click(function()
			{

				if(!$(this).parents('.tag-category').hasClass('active'))
				{
					$('.tag-category').removeClass('active');
					$('.tag-cloud').stop().slideUp(300);
					$(this).parents('.tag-category').addClass('active');
					$(this).parents('.tag-category').children('.tag-cloud').stop().slideDown(300);

				}
				else if($(this).parents('.tag-category').hasClass('active')==true)
				{

					$(this).parents('.tag-category').removeClass('active');
					$(this).parents('.tag-category').children('.tag-cloud').stop().slideUp(300);


				}

			})

	});

function document_ready()
{


	var menuStatus=0;
	var tagStatus=0;
	var popupStatus=0;

	resize();
	animation('.items ul li article',50,1);
	$('.active').children('.tag-cloud').show();
	$('.active-tag').parents('.tag-category').addClass('has-tag');


	$("#menu-text").click(function()
		{
			if(tagStatus == 1)
			{
				closeTags();
			}
			openMenu();

		})
	$('#iwant').click(function()
		{
			loadPopup();
		})


	$("#close-menu").click(function()
		{
			closeMenu();
		})




	$("#tags-text").click(function()
		{
			if(menuStatus == 1)
			{
				closeMenu();
			}
			openTags();

		})

	$(".background").click(function()
		{
			if(menuStatus == 1)
			{
				closeMenu();

			}
			else if(tagStatus == 1)
			{
				closeTags();

			}
			else if(popupStatus==1)
			{
				disablePopup();

			}
		})

	$('#close-tags').click(function()
		{
			closeTags();
		})


	$("#select_all").click(function()
		{
			$('.full-tag .tag').addClass('active-tag');
			$('.full-tag .tag').removeClass('tag');
			$('.tag-category').addClass('has-tag');
		})

	$("#reset_all").click(function()
		{
			$('.active-tag').addClass('tag');
			$('.active-tag').removeClass('active-tag');
			$('.tag-category').removeClass('has-tag');
		})
	$('.projects-tag').click(function()
		{
			$('#reset_all').click();
		})
	$('.unactive').click(function()
		{
			$('#reset_all').click();
		})




	$('#closePopup').click(function()
		{
			disablePopup();
		})

	$('#makeOrder').submit(function(event)
		{
			event.preventDefault();

			validateForm();


		});

	$('.refresh').click(function()
		{
			closeTags();

		})


	$('.logo svg').click(function()
		{
			$("#reset_all").click();
			closeTags();
			closeMenu();
		})



	$('.phone-wrapper').viewportChecker(
		{

			offset: 500,
			callbackFunction: function(elem)
			{
				var block =elem.find('.screen');
				block.niceScroll(
					{
						touchbehavior: true,
						cursorwidth: "0px",
						zindex: '-1'

					});
				var step = block.find('img').height()/9;

				block.getNiceScroll()[0].doScrollTop(step,200);



			}
		});

	$('.img article').addClass('hidden');
	$('.img').viewportChecker(
		{

			offset: 200,
			callbackFunction: function(elem)
			{
				change(elem.find('article'),300);

			}
		});

	
	
	$('#upload').click(function()
		{


			$('.file dfn').html('');
			$('.file span').hide();
			$('#popup_content form button ').css({"margin-top":'0px'});



			$('#file').click();



		})
		var all_files = [];
	$('#file').change(function()
		{
	

		var current_files = $(this)[0].files ;
		for(var i = 0; i<current_files.length; i++){
			all_files.push(current_files[i]);
		}
		
		

		 files = all_files;
		console.log(files);
			for (var i = 0; i < files.length; i++)
			{
			

				if(files[i].size/1000000 > 2)
				{
					$('.size').css({'color':'red'});
					$('#toPopup').addClass('shake animated');
					files.splice(i,1);
					console.log(files);
					setTimeout(function()
						{
							$('#toPopup').removeClass('shake animated');
							centerPopup();
						},500);

				}
				else
				{
					
					$('.file span').hide();
					$('.file dfn').append('<a class="active-tag" alt="'+i+'">'+files[i].name+'<i class="tag-x"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="15mm" height="15mm" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"viewBox="0 0 15 15"><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"/><polygon class="fil0" points="8,0 8,7 15,7 15,8 8,8 8,15 7,15 7,8 0,8 0,7 7,7 7,0 "/></g></svg></i></a>');
					$('#popup_content form button ').css({"margin-top":'-6px'});
				
				}
			}



			centerPopup();


			$('.files .active-tag .tag-x').click(function()
				{
					var ind = $(this).parents('.active-tag').attr('alt');
					files.splice(ind,1);
					console.log(files);
					$(this).parents('.active-tag').remove();
					var i = 0;

					$('.file').find('.active-tag').each(function()
						{
							if($(this).length>0)
							{

								i++;
								centerPopup();
							}
						})
					if(i==0)
					{
						$('.file span').show();
						$('#popup_content form button ').css({"margin-top":'35px'});
						centerPopup();
					}


				})
		}

	)

	function openTags()
	{

		if(tagStatus==1)
		{
			event.preventDefault();
		}
		$('.full-tag').removeClass('slideOutRight animated slideInRight');
		if(tagStatus==0)
		{

			if(popupStatus == 0)
			{
				disablePopup();

			}


			$('.background').show();
			$(".main-container").addClass('grey');
			$('.main').addClass('grey');
			$('.tags .menu-text').stop().hide();
			$('.full-tag').stop().show();
			centerTags();

			$('.full-tag').stop().addClass('slideInRight animated');
			$('.tag-items').fadeIn(800);
			$('.refresh').fadeIn(800);

			setTimeout(function()
				{

					$('.full-tag').removeClass('slideInRight animated');
					$('.manage-tags').fadeIn(200);
					$('#close-tags').fadeIn(300);
					tagStatus = 1;

				},800);


			$('.footer-content').fadeOut() ;



		}
	}

	function closeTags()
	{

		if(tagStatus==1)
		{


			$('.background').hide();
			$('.full-tag').addClass('slideOutRight animated');


			$('.tag-items').hide();
			$('.refresh').hide();
			$('.manage-tags').hide();
			$(".main").removeClass('grey');
			$(".main-container").removeClass('grey');
			setTimeout(function()
				{
					$('.full-tag').hide();
					$('.full-tag').stop().removeClass('slideOutRight animated');
					if(menuStatus == 0)
					{
						$('.footer-content').fadeIn(800);
					}


					$('.tags .menu-text').fadeIn(800);

					tagStatus = 0;
				},800);

			$('#close-tags').stop().hide();


		}

	}

	function openMenu()
	{

		if(menuStatus==0)
		{
			if(popupStatus == 0)
			{
				disablePopup();


			}


			$(".background").show();
			$(".main-container").addClass('grey');
			$('.main').addClass('grey');


			$('.menu .menu-text').hide();
			$('.full-menu').show();
			$('.full-menu').addClass('slideInLeft animated');
			$('.menu-items').fadeIn(800);
			setTimeout(function()
				{

					$('.full-menu').removeClass('slideInLeft');

				},800);


			$('.menu .menu-text').hide();

			$('#close-menu').show();

			$('.footer-content').hide();
			menuStatus = 1;
		}

	}

	function closeMenu()
	{
		if(menuStatus==1)
		{
			$('.full-menu').addClass('slideOutLeft');
			$('.background').hide();
			$('.menu-items').hide();

			$(".main-container").removeClass('grey');
			$(".main").removeClass('grey');
			setTimeout(function()
				{
					$('.full-menu').hide();
					$('.full-menu').removeClass('slideOutLeft animated');

					if(tagStatus == 0)
					{
						$('.footer-content').fadeIn(800);
					}

					$('.menu .menu-text').fadeIn(800);

				},800);


			$('#close-menu').hide();

			menuStatus = 0;


		}
	}

	function loadPopup()
	{
		if(popupStatus == 0)
		{


			if($('#iwant').hasClass('disabled')===true)
			{
				console.log('nice try');

			}
			else if($(this).hasClass('disaled')===false)
			{
				$('.background').show();
				$('#iwant').addClass('disabled');
				$("#toPopup").show();
				$("#toPopup").addClass("bounceInUp animated");
				$(".main-container").addClass('grey');
				centerPopup();

				setTimeout(function()
					{
						popupStatus = 1;
						$("#toPopup").removeClass("bounceInUp animated");


					},600);
			}
		}


	}

	function disablePopup()
	{
		if(popupStatus == 1)
		{

			$('.background').hide();
			$(".main-container").removeClass('grey');

			$("#toPopup").addClass("bounceOutUp animated");

			$('#iwant').removeClass('disabled');
			$('.size').css({'color':'black'});

			$('#makeOrder').find('input:not(:hidden)').not('#file').each(function()
				{

					$(this).removeClass('required');

				})

			setTimeout(function()
				{

					$("#toPopup").removeClass("bounceOutUp animated");

					$("#toPopup").hide();
					popupStatus = 0;

				},600);
		}
	}


}


function animation (el,mnozh,opacity)
{
	$(el).each(function(index)
		{
			$(this).delay(index*mnozh).animate(
				{
					'opacity': opacity,
					'margin-top': '0'
				}, 200);
		})
}
function checkTag(el)
{

	if (el.siblings().hasClass('active-tag')==true || el.hasClass('active-tag'))
	{
		el.parents('.tag-category').addClass('has-tag');
	}
	else
	{
		el.parents('.tag-category').removeClass('has-tag');
	}
}


function change(el,mnozh)
{
	$(el).each(function(index)
		{
			$(this).delay(index*mnozh).animate(
				{
					'opacity': '1',
					'top': '0'
				},'slow');

		})
}


function resize()
{
	centerTags();

	var container_width = $('.items ul').width();
	var default_item_width = 360;

	var items_count =  container_width / default_item_width >>0;

	var percents = 100/items_count;
	var pixels = container_width/items_count;

	$('.items ul li').css({'width':percents+'%','height': Math.floor(pixels/1.5)});

	checkFooter();
}

function checkFooter()
{

	if( $(window).height()> $('.wrapper').height()+35)
	{
		$('.footer').css({'bottom' : '0'});

	}
	else
	{
		$('.footer').css({'bottom' : ''});
	}
}

function drawSwg(height,color,margin_top)
{
	var width = $('.polylines').width();
	var half_width = width/2;
	var full_height = height + half_width/2;
	$('.polylines').append(
		'<svg height="'+full_height+'px" width="'+width+'px" style = "margin-top:'+margin_top+'px"><polyline points="0,0 0,'+height+' '+half_width+','+full_height+' '+width+','+height+' '+width+',0 '+half_width+','+half_width/2+' 0,0" style="fill:'+color+';stroke-width:0" />Sorry, your browser does not support inline SVG.</svg>');
}
function centerTags()
{

	var height = $('.tag-items').height()/2+20;
	$('.tag-items').css("margin-top",-height);
}

function centerPopup()
{
	var margin = -($('#toPopup').outerHeight()/2);
	$('#toPopup').css({'margin-top': margin});

};



function sendForm()
{

	var form = $('#makeOrder');
	var inputs = form.find('input').not('#file');
	var formData = new FormData();

	formData = files;

	$.ajax(
		{
			type: "POST",
			url: form.attr( 'action' ),
			dataType: 'json',
			contentType: false,
			processData: false,
			data:
			{
				inputs: inputs.serialize(),
				attachments: formData
			},
			success: function( response )
			{
				console.log( response);
			}
		});


	$('#toPopup').addClass('flip animated');
	$('#makeOrder').css({'opacity':'0'});

	setTimeout(function()
		{
			$('#status').fadeIn();
			$('#toPopup').removeClass('flip animated');
		},800);

};

function validateForm()
{
	var validate = 0;

	$('#makeOrder').find('input:not(:hidden)').not('#file').each(function()
		{
			if($(this).val().length<=0)
			{
				$('#toPopup').addClass('shake animated');

				$(this).addClass('required');

				setTimeout(function()
					{
						$('#toPopup').removeClass('shake animated');
					},500);

			}
			else if($(this).val().length>0)
			{
				$(this).removeClass('required');
				validate ++;

			}
		})

	if(validate == 3)
	{
		console.log('form is valid');
		sendForm();
	}
}

$( window ).resize(function()
	{

		resize();
	});
