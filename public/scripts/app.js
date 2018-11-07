/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createIconElement(iconType) {
  return $('<i>', {
    class: `fas fa-${iconType} fa-lg`
  });
}

function createTweetElement(tweetData) {
  // header elements
  const $tweetHeader = $('<header>');
  const $avatar = $('<img />', {
    src: tweetData.user.avatars.regular,
    alt: 'User profile image'
  });
  const $username = $('<span>', {
    class: 'username'
  }).append(`<strong>${tweetData.user.name}</strong>`);
  const $handle = $('<span>', {
    class: 'handle'
  }).text(tweetData.user.handle);
  // build header element
  $tweetHeader.append($avatar, $username, $handle);

  // body element
  const $tweetBody = $('<p>', {
    class: 'tweet-body'
  }).text(tweetData.content.text);

  // footer elements
  const $tweetFooter = $('<footer>');
  const numDaysAgo = Math.floor((new Date() - tweetData.created_at) / 1000 / 60 / 60 / 24);
  const $tweetDate = $('<span>').text(`${numDaysAgo} days ago`);
  const $buttonGroup = $('<span>', {
    class: 'button-group hidden'
  }).append(
    createIconElement('flag'),
    createIconElement('retweet'),
    createIconElement('heart')
  );
  // build footer element
  $tweetFooter.append($tweetDate, $buttonGroup);

  const $tweetElement = $('<article>', {
    class: 'tweet'
  });
  $tweetElement.append($tweetHeader, $tweetBody, $tweetFooter);

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

  const $newTweetSection = $('section.new-tweet');
  const $newTweetForm = $newTweetSection.find('form');
  const $newTweetFormTextArea = $newTweetForm.find('textarea');
  const $newTweetFormCounter = $newTweetForm.find('.counter');
  const $newTweetFormErrorMessage = $newTweetForm.find('.error-message');
  const $newTweetFormErrorMessageText = $newTweetFormErrorMessage.find('.error-text');

  function showErrorMessage(message) {
    $newTweetFormErrorMessage.slideDown('fast', () => {
      $newTweetFormErrorMessageText.text(message);
    });
  }

  $newTweetForm.submit((event) => {
    event.preventDefault();
    const charsUsed = $newTweetFormTextArea.val().length;
    if (charsUsed > 140) {
      showErrorMessage('Tweet content exceeds maximum of 140 characters.');
      return;
    } else if (charsUsed === 0) {
      showErrorMessage('There\'s nothing to tweet!');
      return;
    }

    $.post('/tweets/', $newTweetForm.serialize(), (err, data) => {
      loadTweets();
      $newTweetFormErrorMessage.slideUp('fast');
      $newTweetFormErrorMessageText.text('');
      $newTweetFormTextArea.val('');
      $newTweetFormCounter.text('140');
    });
  });

  loadTweets();

  $('#nav-bar .button').click((event) => {
    $newTweetSection.slideToggle(420, () => {
      $newTweetFormTextArea.focus();
    });
  });

});
