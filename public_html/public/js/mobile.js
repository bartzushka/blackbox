var loaded = 0;
var xhr;
var last_href;

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

			$("a").not('.unactive').unbind("click").click(function(e)
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
			//document_ready();

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
		
		resize();
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
			})
			
			
			var menuStatus=0;
	var tagStatus=0;
	var popupStatus=0;
	var headerStatus = 0;

	
	//animation('.items ul li article',50,1);
	$('.active').children('.tag-cloud').show();
	$('.active-tag').parents('.tag-category').addClass('has-tag');





	$('.close').click(function()
		{

			animation('.items ul li article',50,1);
			$('.background').css({'background-color':'transparent'});
			$('body').unbind('touchmove');
		})


	$('.menu-text').click(function()
		{

			$('.background').css({'background-color':'white'});
			$('body').bind('touchmove',function(e){e.preventDefault();});
		})





	$(document).on('touchstart', function (e)
		{
			ts = $(window).scrollTop();
		});


	$(document).on('touchmove', function (e)
		{

			var te = $(window).scrollTop();
			if(te < 100)
			{
				setTimeout(function(){unfixHeader();},300);

				ts = te;
			}
			if (ts > te)
			{

				setTimeout(function(){fixHeader();},300);
				ts = te;

			}
			if (ts < te)
			{
				setTimeout(function(){unfixHeader();},300);
				ts = te;
			}
		});



	$("#menu-text").click(function()
		{

			if(tagStatus == 1)
			{
				closeTags();
				setTimeout(function()
					{
						openMenu();
						menuStatus = 1;
					},600)
			}else
			{
				openMenu();
				menuStatus = 1;
			}



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
				openTags();

				setTimeout(function()
					{
						closeMenu();

						tagStatus = 1;
					},800)
			}
			else
			{
				openTags();

				tagStatus = 1;
			}


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
				console.log('1');
		})
	$('.projects-tag').click(function()
		{
			$('#reset_all').click();
		})
	$('.unactive').click(function()
		{
			$('#reset_all').click();
		
		})
	$('.tag-category h3').click(function(event)
		{
	
			if($(this).parents('.tag-category').hasClass('active')==true)
			{
				
				$(this).parents('.tag-category').removeClass('active');
				$(this).siblings('.tag-cloud').stop().slideUp(300);
			
				console.log('first_time slideUp');
			}
			else if($(this).parents('.tag-category').hasClass('active')==false)
			{
					$('.tag-category').removeClass('active');
			$('.tag-category').children('.tag-cloud').slideUp(300);
				$(this).parents('.tag-category').addClass('active');
				$(this).siblings('.tag-cloud').stop().slideDown(300);

				console.log('second_time slideDown');
			
			}

				
	
		})
	$('#upload').click(function()
		{
			$('#file').click();
			$('.file dfn').html('');
			$('.file span').show();
			$('#popup_content form button ').css({"margin-top":'35px'});

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
						zindex: '-1',


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



	$('#file').change(function()
		{


			var files = $(this)[0].files;


			for (var i = 0; i < files.length; i++)
			{
				console.log(files[i].name+files[i].size/1000000);
				if(files[i].size/1000000 > 2)
				{
					$('.size').css({'color':'red'});
					$('#toPopup').addClass('shake animated');
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

		})








	function openTags()
	{
		$('.tag-items').niceScroll(
			{
				autohidemode:false,
				cursorwidth: "3px",
				cursorcolor: '#cccccc'
			});
		$('.tag-items').bind("scroll",function()
			{

				if($('.tag-items').scrollTop()>20)
				{
					console.log('1');
					$('.tag-items').css(
						{
							'-webkit-box-shadow':'inset 0px 11px 9px -4px rgba(50, 50, 50,  0.05)',
							'-moz-box-shadow':'inset 0px 11px 9px -4px rgba(50, 50, 50,  0.05)',
							'box-shadow':'inset 0px 11px 9px -4px rgba(50, 50, 50,  0.05)'
						})
				}
				else
				{
					console.log('0');
					$('.tag-items').css(
						{
							'-webkit-box-shadow':'none',
							'-moz-box-shadow':'none',
							'box-shadow':'none'
						});

				}
			});


		$('.full-tag').show();
		$('.full-tag').addClass('fadeInDown animated');
		$('.tags').css({'z-index':'10'});
		setTimeout(function()
			{
				$('.background').show();
				$('.full-tag').removeClass('fadeInDown animated');
				$('.manage-tags').fadeIn(200);
				$('#close-tags').fadeIn(300);
				$('.tag-items').fadeIn();
				$('.refresh').fadeIn();

			},800);

	}


	function closeTags()
	{

		$('.background').hide();
		$('.tag-items').hide();
		$('.refresh').hide();
		$('.manage-tags').hide();
		$('#close-tags').stop().hide();
		$('.full-tag').addClass('fadeOutUp animated');
		setTimeout(function()
			{
				$('.full-tag').hide();
				$('.full-tag').removeClass('fadeOutUp animated');

			},800);


	}


	function openMenu()
	{
		$('.full-menu').show();
		$('.tags').css({'z-index':'15'});
		$('.full-menu').addClass('fadeInDown animated');
		setTimeout(function()
			{
				$('.background').show();
				$('.full-menu').removeClass('fadeInDown animated');
				$('.menu-items').fadeIn(800);
				$('#close-menu').show();
			},800)



	}

	function closeMenu()
	{
		$('.menu-items').hide();
		$('#close-menu').hide();

		$('.background').hide();
		$('.full-menu').addClass('fadeOutUp animated');
		setTimeout(function()

			{
				$('.tags').css({'z-index':'10'});
				$('.full-menu').hide();
				$('.full-menu').removeClass('fadeOutUp animated');

			},800)


	}


	function loadPopup()
	{

		$("#toPopup").show();
	}

	function disablePopup()
	{
		$("#toPopup").hide();
	}

	function fixHeader()
	{
		$('header').css({'position':'fixed'});
		if(headerStatus==0)
		{
			$('header').css({'top':'-100px'});


			$('header').stop().animate({'top':'0'},100);
			headerStatus = 1;

			$('header').css(
				{
					'-webkit-box-shadow':' 0px 1px 11px 0px rgba(0, 0, 0, 0.1)',
					'-moz-box-shadow':'0px 1px 11px 0px rgba(0, 0, 0, 0.1)',
					'box-shadow':'0px 1px 11px 0px rgba(0, 0, 0, 0.1)'
				})


		}


	}

	function unfixHeader()
	{

		if(headerStatus==1)
		{
			if($(window).scrollTop()>100)
			{


				$('header').stop().animate({'top':'-100px'},100);


			}
			headerStatus = 0;
		}
		setTimeout(function()
			{

				$('header').css(
					{
						'position':'absolute',
						'top':'0'
					});
				$('header').css(
					{
						'-webkit-box-shadow':'none',
						'-moz-box-shadow':'none',
						'box-shadow':'none'
					})
			},400);

	}








	function sendForm()
	{

		var form = $('#makeOrder');
		var inputs = form.find('input:not(:hidden)').not('#file');
		var file_indexes=[];
		var i = 0;
		var formData = new FormData();


		$('.file dfn').find('a').each(function()
			{

				file_indexes[i]=$(this).attr('alt');
				i++;

			})

		var files = form.find('#file')[0].files;
		var approved_files=[];

		for (var j=0; j<file_indexes.length;j++)
		{
			approved_files[j] = files[file_indexes[j]];
			formData.append('files',approved_files[j]);
			console.log(formData);
		}


		form.submit( function()
			{

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
		})
	});



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


function centerPopup()
{
	var margin = -($('#toPopup').outerHeight()/2);
	$('#toPopup').css({'margin-top': margin});

};
