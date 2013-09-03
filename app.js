jQuery(document).ready(function($) {

    var desks = $('.desks').children(),
        numDesks = desks.length,
        nameField = $('#nameInput'),
        usedNums = [];

    function getRandomArbitary (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function getUniqueDesk() {
        if (usedNums.length >= numDesks ) {
            return false;
        }
        var randomNum = getRandomArbitary( 1, numDesks );
        if ( $.inArray( randomNum, usedNums) < 0 ) {
            return randomNum;
        }
        return getUniqueDesk();

    }

    function disableForm() {
        $('button').attr('disabled', 'disabled');
        $('form').off('submit', function(event) {
            event.preventDefault();
        });
    }


    $('form').on('submit', function(event) {
        event.preventDefault();
        var uniqueDesk = getUniqueDesk();
        desks.eq( uniqueDesk-1 ).text( nameField.val() );
        usedNums.push( uniqueDesk );
        if ( usedNums.length >= numDesks ) {
            disableForm();
        }
    });


    window.OUTLAW = {
        "desks" : desks,
        "numDesks" : numDesks,
        "usedNums" : usedNums
    };

});