$(document).ready(() => {

    $('form textarea').on('input', function (event) {
        const characterLimit = 140;
        const charactersRemaining = characterLimit - $(this).val().length;
        const $counter = $(this).parent('form').children('.counter');
        $counter.text(charactersRemaining);
        if (charactersRemaining < 0) {
            $counter.addClass('invalid');
        } else {
            $counter.removeClass('invalid');
        }
    });

});