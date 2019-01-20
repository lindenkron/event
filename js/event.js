var field_data = {
    title: {
        fn: "Title",
        ht: "Discord ID including discriminator",
        al: "title"
    },
    desc: {
        fn: "Description",
        ht: "Event description",
        al: "desc"
    },
    date: {
        fn: "Date",
        ht: "Event date",
        al: "date"
    },
    dura: {
        fn: "Duration",
        ht: "Event duration",
        al: "dura"
    }
};

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
    var desc = $('#desc-field').val();
    var date = $('#date-field').val();
    var dura = $('#dura-field').val();
    var bugtext = '';
    if (title && desc && date && dura) {
        bugtext = '-event "' + title + '" "' + desc + '" "' + date + '" "' + dura + '"';
    }
    $('#syntax').text(bugtext);
    $('#lrg-rep').toggleClass('hidden', bugtext.length < 800);
}

function updateField(event) {
    window.sct = 1;
    $('#add-btn').off('click');
    $('#del-btn').off('click');
    switch(event.target.value) {
        default:
            if (event.target.value in field_data) {
                var field_html = '<label for="' + event.target.value + '-field">' + field_data[event.target.value].fn + '</label><p class="help-text" id="' + event.target.value + '-help">' + field_data[event.target.value].ht + '</p><input type="text" id="' + event.target.value + '-field" aria-describedby="' + event.target.value + '-help" required>';
            }
    }
}

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

function pageLoad(page) {
    window.sct = 1;
    var cb_btn = '';
    var st = '';
    switch (page) {
        case "create":
            $('div#content').on('input', 'input[id*="-field"]', updateSyntax);
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
