$(function() {

	$(".track").each(function(index, el) {
		init($(this));
	});

	function init(card) {
		card.children(".cover").append('<button class="play"></button><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"><path id="circle" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z"/></svg>');

		var audio = card.find("audio"),
			play = card.find('.play'),
			circle = card.find('#circle'),
			getCircle = circle.get(0),
			totalLength = getCircle.getTotalLength();

		circle.attr({
				'stroke-dasharray': totalLength,
				'stroke-dashoffset': totalLength
		});

		play.on('click', function() {
			if(audio.attr('FeedType') === 'Single'){
				if (audio[0].paused) {
					$("audio").each(function(index, el) {
						$("audio")[index].pause();
					});
					$(".track").removeClass('playing');
					audio[0].play()
					card.addClass('playing');
				} else {
					audio[0].pause();
					card.removeClass('playing');
				}
			}
			else{
				MultiFunctionAudio()
			}
		});

		audio.on('timeupdate', function() {
			var currentTime = audio[0].currentTime,
				maxduration = audio[0].duration,
				calc = totalLength - ( currentTime / maxduration * totalLength );

			circle.attr('stroke-dashoffset', calc);
		});

		audio.on('ended', function() {
			card.removeClass('playing');
			circle.attr('stroke-dashoffset', totalLength);
		});
		
	}

});