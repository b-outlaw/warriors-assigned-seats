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

    function calculating() {
        var randomNum = getRandomArbitary( 1, numDesks );
        desks.eq( randomNum-1 ).css('opacity', '0.25').animate({
            opacity: 1
        }, 'fast');
    }

    function disableForm() {
        $('button').attr('disabled', 'disabled');
        $('form').off('submit', function(event) {
            event.preventDefault();
        });
    }


    $('form').on('submit', function(event) {
        event.preventDefault();

        for (var i = 0; i < numDesks; i++) {
            setTimeout(function() {
                calculating();
            }, 150*i);
        };

        setTimeout(function() {
            var uniqueDesk = getUniqueDesk();
            desks.eq( uniqueDesk-1 ).text( nameField.val() );
            usedNums.push( uniqueDesk );
            if ( usedNums.length >= numDesks ) {
                disableForm();
            }
        }, 150*numDesks);
    });


    window.OUTLAW = {
        "desks" : desks,
        "numDesks" : numDesks,
        "usedNums" : usedNums
    };

});