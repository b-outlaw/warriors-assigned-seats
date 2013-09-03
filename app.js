jQuery(document).ready(function($) {

    var desks = $('.desks').children(),
        numDesks = desks.length,
        nameField = $('#nameInput'),
        usedNums = [],
        v0 = document.getElementsByTagName("video")[0];
        v1 = document.getElementsByTagName("video")[1];

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

    function getRandomHex() {
        return '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
    }

    function calculating() {
        var randomNum = getUniqueDesk();
        desks.eq( randomNum-1 ).text(nameField.val());
        desks.eq( randomNum-1 ).css({'backgroundColor': getRandomHex(), 'color': getRandomHex() }).animate({
            backgroundColor: "#eee",
            color: "#eee"
        }, 'fast', function(){ 
            desks.eq( randomNum-1 ).text('');
        });
    }

    function disableForm() {
        $('button').attr('disabled', 'disabled');
        $('form').off('submit', function(event) {
            event.preventDefault();
        });
    }


    $('form').on('submit', function(event) {

        event.preventDefault();

        var name = nameField.val();

        v0.load();
        v0.play();

        for (var i = 0; i < numDesks*2; i++) {
            setTimeout(function() {
                calculating();
            }, 150*i);
        };

        setTimeout(function() {

            var uniqueDesk = getUniqueDesk();
            console.log(name + ': ' + uniqueDesk);

            desks.eq( uniqueDesk-1 ).css({'backgroundColor': getRandomHex() }).animate({
                backgroundColor: "#eee",
                color: "#000"
            }, 'slow');

            v0.pause();
            v1.load();
            v1.play();

            desks.eq( uniqueDesk-1 ).text( nameField.val() );
            usedNums.push( uniqueDesk );
            if ( usedNums.length >= numDesks ) {
                disableForm();
            }
        }, 150*numDesks*2);
    });


    window.FEIGLAW = {
        "desks" : desks,
        "numDesks" : numDesks,
        "usedNums" : usedNums
    };

});
