$(document).ready(function()
	{
		var fix = 0;
		var scrollable = 1 ;
		$('.close').click(function()
			{
				$('header').css({'position':'absolute'});
				$('.background').css({'background-color':'transparent'});
				scrollable = 1;
			})

		$('.menu-text').click(function()
			{
				scrollable = 0;
				$(window).scrollTop(0);
						var currentScrollTop = 0;
				$('header').css({'position':'fixed'});

			})
		$('#menu-text').click(function()
			{
				$('.background').css({'background-color':'white'});
			})
		$('#tags-text').click(function()
			{
				$('.background').css({'background-color':'#231f20'});
			})

		var currentScrollTop =$(window).scrollTop();

		$(window).scroll(function()
			{
				if(scrollable = 1)
				{


					var newScrollTop = $(window).scrollTop();
					if(newScrollTop>currentScrollTop)
					{
						
						if (fix == 1)
						{
							unfixHeader();
							fix = 0;
						}
						currentScrollTop = newScrollTop;
					}
					else
					{
						if(fix == 0)
						{
							fixHeader();
							fix = 1;
						}
					}
				}
			})

	})


function fixHeader()
{



	if($('body').scrollTop()>100)
	{

		$('header').css({'position':'fixed'});
	}
	else
	{
		unfixHeader();

	}
}
function unfixHeader()
{

	$('header').css({'position':'absolute'});

}




