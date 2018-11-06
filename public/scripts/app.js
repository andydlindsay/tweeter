/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

function createTweetElement(tweetData) {
    const $tweetHeader = $('<header>', {});
    const $avatar = $('<img />', {
        src: tweetData.user.avatars.regular,
        alt: 'User profile image'
    });
    const $username = $('<span>', { class: 'username'}).append(`<strong>${tweetData.user.name}</strong>`);
    const $handle = $('<span>', { class: 'handle'}).text(tweetData.user.handle);
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
        tweets.forEach((tweet) => {
            $tweetsContainer.append(createTweetElement(tweet));
        });
    }

    renderTweets(data);

});
