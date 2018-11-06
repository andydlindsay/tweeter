$(document).ready(() => {

    $('form textarea').on('keyup', function (event) {
        console.log(event.currentTarget.textLength);
        console.log(this);
        const charactersRemaining = 140 - $(this)[0].textLength;
        $counter = $(this).parent('form').children('.counter');
        $counter[0].innerHTML = charactersRemaining;
        if (charactersRemaining < 0) {
            $counter.addClass('invalid');
        } else {
            $counter.removeClass('invalid');
        }
    });

});