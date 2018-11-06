$(document).ready(() => {

    $('form textarea').on('keyup', function (event) {
        const charactersRemaining = 140 - $(this)[0].textLength;
        const $counter = $(this).parent('form').children('.counter');
        $counter[0].innerHTML = charactersRemaining;
        if (charactersRemaining < 0) {
            $counter.addClass('invalid');
        } else {
            $counter.removeClass('invalid');
        }
    });

});