$('document').ready(function(){

	jQuery("time.timeago").timeago();


//Dashboard focus
	$('.tweet-compose').click(function(){
		$(this).css('height', '5em');
		$('#tweet-submit').css('display', 'inline-block');
		$('div #char-count').css('display', 'inline-block');
	});


//Tweet counter
	$('#tweet-content .tweet-compose').keyup(function() {
		var charCountEl = $('#char-count');
		var inputLength = $('.tweet-compose').val().length;
		var charCount = 140 - inputLength;
		var charCountStr = charCount.toString();
		charCountEl.text(charCountStr);
		if (charCount <= 10) {
			charCountEl.css('color', 'red');
		}
		if (inputLength > 140) {
			$('#tweet-submit').prop('disabled', true);
		}
		if (inputLength <= 140) {
			$('#tweet-submit').prop('disabled', false);
		}
	});


//Submit tweet with submit button
	$('#tweet-submit').click(function(){
		var timeStamp = jQuery.timeago(new Date());
		var tweet = $('.tweet-compose').val();
		$('#stream').prepend('<div class="tweet"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">Your Name Here</strong><span class="username">@yournamehere</span><p class="tweet-text">' + tweet + '.</p><div class="tweet-actions"><ul><li class="reply"><span class="icon action-reply"></span> Reply</li><li class="retweet"><span class="icon action-retweet"></span> Retweet</li><li class="favorite"><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="stats"><div class="retweets"><p class="num-retweets">0</p><p>RETWEETS</p></div><div class="favorites"><p class="num-favorites">0</p><p>FAVORITES</p></div><div class="users-interact"><div><img src="img/alagoon.jpg" /><img src="img/vklimenko.jpg" /></div></div><div class="time">' + timeStamp + '</div></div><div class="reply"><img class="avatar" src="img/alagoon.jpg" /><textarea class="tweet-compose" placeholder="Reply to @yournamehere"/></textarea></div></div></div>');
	});

//Show tweet actions on hover

	$('#stream').on('mouseenter', '.tweet', function(){
		$(this).find('.tweet-actions').slideDown();
	});

	$('#stream').on('mouseleave', '.tweet', function(){
		$(this).find('.tweet-actions').slideUp();
	});


//Show stats on click
	$('#stream').on('click', '.tweet-text', function(){
		$(this).closest('.tweet').find('.stats').slideToggle();
	});


//adding/removing favorites
	$('#stream').on('click', '.favorite', function(){
		var $this = $(this);
		var findNumOfFavorites = $this.closest('.tweet').find('.num-favorites');
		var numFavoritesStr = findNumOfFavorites.text();
		var numFavorites    = parseInt(numFavoritesStr);
		if($this.hasClass('favorited')) {
			//remove 'is-favorited' class from this tweet
			$this.closest('.tweet').removeClass('is-favorited');
			//counter--
			numFavorites -= 1;
			findNumOfFavorites.text(numFavorites);
			//remove 'favorited' class from 'action-favorite'
			$this.removeClass('favorited');
		} else {
			//add 'is-favorited' class to this tweet
			$this.closest('.tweet').addClass('is-favorited');
			//counter++
			numFavorites += 1;
			findNumOfFavorites.text(numFavorites);
			//add 'favorited' class to 'action-favorite'
			$this.addClass('favorited');
		}
	});

//Retweeting
	$('#stream').on('click', '.retweet', function(){
		var timeStamp = jQuery.timeago(new Date());
		$this         = $(this);
		var tweetText = $this.closest('.tweet').find('.tweet-text').text();
		$this.removeClass('retweet');
		$('#stream').prepend('<div class="tweet"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">Your Name Here</strong><span class="username">@yournamehere</span><p class="tweet-text">' + tweetText + '.</p><div class="tweet-actions"><ul><li class="reply"><span class="icon action-reply"></span> Reply</li><li class="retweet"><span class="icon action-retweet"></span> Retweet</li><li class="favorite"><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="stats"><div class="retweets"><p class="num-retweets">0</p><p>RETWEETS</p></div><div class="favorites"><p class="num-favorites">0</p><p>FAVORITES</p></div><div class="users-interact"><div><img src="img/alagoon.jpg" /><img src="img/vklimenko.jpg" /></div></div><div class="time">' + timeStamp + '</div></div><div class="reply"><img class="avatar" src="img/alagoon.jpg" /><textarea class="tweet-compose" placeholder="Reply to @yournamehere"/></textarea></div></div></div>');
	});

});