
var mm = {
    dark: {
        d: "Light Mode",
        m: "sun"
    },
    light: {
        d: "Dark Mode",
        m: "moon"
    }
};


function updateSyntax() {
    var title = $('#title-field').val();
    var other = $('#other-field').val();
    var titlefield = '';
    var desc = $('#desc-field').val();
    var time = $('#time-field').val();
    var date = $('#date-field').val();
    var dura = $('#dura-field').val();
    var apptext = '';

    if (title != 'Other') { titlefield = title;} else { titlefield = other; }

    var stringdate = new Date(date);
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    var newdate = stringdate.toLocaleString('en-GB', options);

    if (titlefield && desc && time && (newdate != 'Invalid Date') && dura) {
        apptext = '-event "' + titlefield + '" "' + desc + '" "' + time + '" "' + newdate + '" "' + dura + '"';
    }
    $('#syntax').text(apptext);
    $('#lrg-rep').toggleClass('hidden', apptext.length <= 1000);
}

function pageLoad(page) {
    window.sct = 1;
    var cb_btn = '';
    var st = '';
    switch (page) {
        case "create":
            $('div#content').on('input', 'input[id*="-field"]', updateSyntax);
            $('div#content').on('input', 'select[id*="-field"]',updateSyntax);
            $('div#content').on('input', 'textarea[id*="-field"]',updateSyntax);
            cb_btn = '#copy-btn';
            st = '#syntax';
            break;
    }
    var cb = new ClipboardJS(cb_btn, {
        text: function(trigger) {
            return $(st).text();
        }
    });
    cb.on('success', function(e) {
        $(e.trigger).html('Copied');
        setTimeout(function() {
        $(e.trigger).html('Copy');
        }, 2000);
    });
    $('body').on('click', 'a[id*="switch-"]', switchMode);
    if (loadTheme()) {
        switchMode();
    }
}

// Anything under here don't mess with, it's themes
function loadTheme() {
    var light = false;
    if (typeof(Storage) !== 'undefined') {
        light = (localStorage.getItem('light') == 'true');
    }
    return light;
}

function setTheme() {
    if (typeof(Storage) !== 'undefined') {
        var light = false;
        if ($('body').attr('class') == 'light') {
            light = true;
        }
        localStorage.setItem('light', light.toString());
    }
}

function switchMode() {
    var bc = $('body').toggleClass('light')[0].className;
    if (bc == '') {
        bc = 'dark';
    }
    $('#switch-mobile').html('<i class="far fa-' + mm[bc].m + '"></i>');
    $('#switch-desktop').html('<i class="far fa-' + mm[bc].m + '"></i> ' + mm[bc].d);
    setTheme();
}