$('#ft').prepend('<button type="button" id="goTop"></button>');

jQuery(function ($) {
	'use strict';

	var $w = $(window),
	$body = $('body'),
	$goTopBtn = $('#goTop');

	// topbtn
	$goTopBtn.on('click',function(){
		$("html, body").stop().animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	// scroll
	$w.scroll(function(){
		var $w = $(this),
			$document = $(document),
			$body = $('body'),
			$wrp = $('#wrap'),
			$ft = $('#ft'),
			$goTopBtn = $('#goTop'),
			sT = $w.scrollTop(),
			m = 112;
		if($w.width()<991){
			m = 0;
		}
		if(sT>0){
			$body.addClass('is-scroll');
			$('.quick-hd').css('background-color','#000')
		} else {
			$body.removeClass('is-scroll');
			$('.quick-hd').css('background-color','transparent')
		}

		if (sT > $w.height() && !$wrp.hasClass('index')){
			$goTopBtn.addClass('show');
        } else {
			$goTopBtn.removeClass('show');
        }
		if (sT > $document.height() - $w.height() - $ft.outerHeight() && $wrp.hasClass('index')) {
            $goTopBtn.addClass('show');
            $goTopBtn.removeClass('fix');
        } else if(sT < $document.height() - $w.height() - $ft.outerHeight()){
            $goTopBtn.addClass('fix');
        } else {
            $goTopBtn.removeClass('fix');
		}
	}).trigger('scroll');

	// mo gnb
	var $mn = $('.gnb'),
		$mnbtn = $mn.find('.btn-depth');

	$mnbtn.next().hide();
	$mnbtn.on('click', function (e) {
		e.preventDefault();
		var $t = $(this),
			$parent = $t.parent(),
			$siblings = $t.parent().siblings(),
			$t_siblings = $t.next();

		if($parent.hasClass('open')){
			$parent.removeClass('open').find('li').removeClass('open').end().find('.depth').stop().slideUp(250)
		} else {
			$parent.addClass('open');
			$siblings.removeClass('open').find('li').removeClass('open').end().find('.depth').stop().slideUp(250);
			$t_siblings.stop().slideDown(250);
		}
		return false;
	});

	$('.gnb-btn').click(function (e) {
		e.preventDefault();
		$body.toggleClass('gnb-open');
		return false;
	});

	// pc gnb
	function siteMapOpen(){
		$('#hd').addClass('map-open');
	}
	function siteMapClose(){
		$('#hd').removeClass('map-open');
		$('.gnb>li').removeClass('on');
	}

	function gnbEffect(){
		if($w.width()>=1720){
			$('.gnb>li').on('mouseover', function () {
				$(this).addClass('on').siblings().removeClass('on')
			}).on('mouseleave', function () {
				$('.gnb>li').removeClass('on')
			})
			$('.sitemap>li').on('mouseover', function () {
				var num = $(this).index();
				$('.gnb>li').eq(num).addClass('on');
			}).on('mouseleave', function () {
				var num = $(this).index();
				$('.gnb>li').eq(num).removeClass('on');
			})
		}
	}
	$('#gnb>li').on('mouseover',siteMapOpen);
	$('#siteMap').on('mouseleave',siteMapClose);
	$('#gnb>li>a').on('focus',siteMapOpen);
	$('#hd>h1>a').on('focus',siteMapClose);
	
	gnbEffect();

	$w.resize(function(){
		gnbEffect();
	})

	// popup
	$('.open-layer').on('click', function (e) {
		e.preventDefault();
		var $href = $(this).attr('href');
		$($href).addClass('open');
		$body.addClass('layer-open');
	});
	
	$('.close-layer').on('click', function () {
		var $tg = $(this).parents('.layer-popup');
		$tg.removeClass('open');
		$body.removeClass('layer-open');
	});

	// faq
	$(document).on('click', '[data-toggle="row"]', function(){
		$(this).parent('.row').toggleClass('open').next('.collapse-row').toggleClass('show');
		if($(this).parent('.row').hasClass('open')){
			$(this).find('.icon-collapse').text('내용닫기');
		} else {
			$(this).find('.icon-collapse').text('내용보기');
		}
		return false;
	});
});

AOS.init();


// 상단 하단 include 처리
(function () {
	function includeHtml() {
		const includeTarget = document.querySelectorAll('.includeJs:not([data-loaded="true"])'); // 이미 로드된 요소 제외
		includeTarget.forEach(function (el) {
			const targetFile = el.dataset.includeFile;
			if (targetFile) {
				let xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState === XMLHttpRequest.DONE) {
						if (this.status === 200) {
							el.innerHTML = this.responseText;
							el.setAttribute('data-loaded', 'true'); // 로드 완료 표시
						} else if (this.status === 404) {
							el.innerHTML = 'Include not found.';
						}
					}
				};
				xhttp.open('GET', targetFile, true);
				xhttp.send();
			}
		});
	}
  
	// 최초 실행
	includeHtml();
  
	// DOM 변경을 감지하여 새로 추가된 includeJs 처리
	const observer = new MutationObserver(function () {
		includeHtml();
	});
  
	// body 요소 감지 시작 (변경 사항 추적)
	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
  })();