/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetData) {
    const $tweetHeader = $('<header>', {});
    const $avatar = $('<img />', {
        src: tweetData.user.avatars.regular,
        alt: 'User profile image'
    });
    const $username = $('<span>', { class: 'username' }).append(`<strong>${tweetData.user.name}</strong>`);
    const $handle = $('<span>', { class: 'handle' }).text(tweetData.user.handle);
    $tweetHeader.append($avatar).append($username).append($handle);

    const $tweetBody = $('<p>', { class: 'tweet-body' }).text(tweetData.content.text);

    const $tweetFooter = $('<footer>', {});
    const numDaysAgo = Math.floor((new Date() - new Date(tweetData.created_at)) / 1000 / 60 / 60 / 24);
    const $tweetDate = $('<span>', {}).text(`${numDaysAgo} days ago`);
    const $buttonGroup = $('<span>', { class: 'button-group hidden' }).append('<i class="fas fa-flag fa-lg"></i><i class="fas fa-retweet fa-lg"></i><i class="fas fa-heart fa-lg"></i>');
    $tweetFooter.append($tweetDate).append($buttonGroup);

    const $tweetElement = $('<article>', { class: 'tweet' });
    $tweetElement.append($tweetHeader).append($tweetBody).append($tweetFooter);

    return $tweetElement;
}

$(document).ready(() => {

    function renderTweets(tweets) {
        const $tweetsContainer = $('#tweets-container');
        $tweetsContainer.empty();
        tweets.forEach((tweet) => {
            $tweetsContainer.append(createTweetElement(tweet));
        });
    }

    function loadTweets() {
      $.get('/tweets/', (data) => {
        renderTweets(data.reverse());
      });
    }

    $('section.new-tweet form').submit((event) => {
      event.preventDefault();
      const charsUsed = $('section.new-tweet textarea')[0].textLength;
      if (charsUsed > 140) {
        alert('Tweet content exceeds maximum of 140 characters.');
        return;
      } else if (charsUsed === 0) {
        alert('Tweet content is not present.');
        return;
      }

      $.post('/tweets/', $('section.new-tweet form').serialize(), (err, data) => {
        console.log('tweet sent to server');
        loadTweets();
        $('section.new-tweet textarea')[0].value = '';
        $('section.new-tweet form .counter')[0].innerHTML = 140;
      });
    });

    loadTweets();

});
