var intervals = new Object();
var appendedMVPs = [];
var timerMap = {};

function clock(deathHour, deathMinute, spawnTimeHour, spawnTimeMinute, div, mvp) {
    var deathMinute1 = deathMinute-2;
    timerMap[mvp] = [deathHour, deathMinute1, spawnTimeHour, spawnTimeMinute, div, mvp];
    localStorage.timerMap = JSON.stringify(timerMap);
    var respawn;
    var musicPlayed;
    var toastGenerated;
    if (deathHour != undefined && deathMinute1 != undefined) {
        respawn = moment().hour(deathHour).minutes(deathMinute1).add(spawnTimeHour, 'h').add(spawnTimeMinute, 'm');
    } else {
        respawn = moment().add(spawnTimeHour, 'h').add(spawnTimeMinute, 'm');
    }
    intervals[mvpInfoMap[mvp][2]] = setInterval(function() {
        let now = moment();
        let distance = respawn.diff(now);
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $(div).html(hours + "h " + minutes + "m " + seconds + "s");
        if (distance <= 0 && distance >= -600000) {
            $(div).html("เกิดแล้ว!");
            /*             if ($(".toast_container").has("#" + mvpInfoMap[mvp][0]).length <= 0) */
            if (!toastGenerated) {
                generateToast(mvpInfoMap[mvp][1], mvpInfoMap[mvp][0]);
                toastGenerated = true;
            }


            if (!musicPlayed) {
                let src = 'https://www.myinstants.com/media/sounds/tuturu_1.mp3';
                let audio = new Audio(src);
                audio.play();
                musicPlayed = true;
            }
        }
        if (distance < -600000) {
            $(div).html("บอสเกิดแล้ว!");
        }
    }, 1000)
}
mvpInfoMap = {
    moc_pryd06: ["Amon Ra", 'amonra', 'moc_pryd06', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#moc_pryd06-time", "moc_pryd06"), false],
    mjolnir_04: ["Mistress", 'abelhaRainha', 'mjolnir_04', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#mjolnir_04-time", "mjolnir_04"), true],
    gld_dun02: ["Mistress", 'abelhaRainha', 'gld_dun02', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun02-time", "gld_dun02"), true],
    moc_prydn2: ["Nightmare Amon Ra", 'amonraPesadelo', 'moc_prydn2', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#moc_prydn2-time", "moc_prydn2"), false],
    ra_fild03: ["Atroce", 'atroce', 'ra_fild03', '3 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '3', '0', "#ra_fild03-time", "ra_fild03"), true],
    ra_fild04: ["Atroce", 'atroce', 'ra_fild04', '5 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '5', '0', "#ra_fild04-time", "ra_fild04"), true],
    ve_fild01: ["Atroce", 'atroce', 've_fild01', '3 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '3', '0', "#ve_fild01-time", "ve_fild01"), true],
    ve_fild02: ["Atroce", 'atroce', 've_fild02', '6 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '6', '0', "#ve_fild02-time", "ve_fild02"), true],
    gld_dun03_2: ["Atroce", 'atroce', 'gld_dun03_2', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun03_2-time", "gld_dun03_2"), true],
    eg_dun01: ["Aprendiz", 'aprendiz', 'eg_dun01', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#eg_dun01-time", "eg_dun01"), false],
    prt_maze03: ["Baphomet", 'bafome', 'prt_maze03', '3 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '3', '0', "#prt_maze03-time", "prt_maze03"), true],
    gld_dun03: ["Baphomet", 'bafome', 'gld_dun03', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun03-time", "gld_dun03"), true],
    gl_cas02_: ["Nightmare Baphomet", 'bafoAmaldicoado', 'gl_cas02_', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#gl_cas02_-time", "gl_cas02_"), false],
    abbey03: ["Belzebub", 'bubu', 'abbey03', '12 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '12', '0', "#abbey03-time", "abbey03"), false],
    prt_sewb4: ["Golden Thief Bug", 'gtb', 'prt_sewb4', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#prt_sewb4-time", "prt_sewb4"), false],
    abbey02: ["Fallen Bishop", 'bispo', 'abbey02', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#abbey02-time", "abbey02"), false],
    bra_dun02: ["Boitata", 'boitata', 'bra_dun02', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#bra_dun02-time", "bra_dun02"), false],
    xmas_dun02: ["Stormy Knight", 'sk', 'xmas_dun02', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#xmas_dun02-time", "xmas_dun02"), false],
    abyss_03: ["Detardeurus", 'detar', 'abyss_03', '3 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '3', '0', "#abyss_03-time", "abyss_03"), false],
    gef_dun02: ["Doppelganger", 'doppel', 'gef_dun02', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#gef_dun02-time", "gef_dun02"), true],
    gld_dun04_doppel: ["Doppelganger", 'doppel', 'gld_dun04_doppel', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun04_doppel-time", "gld_dun04_doppel"), true],
    gef_dun01: ["Dracula", 'dracula', 'gef_dun01', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#gef_dun01-time", "gef_dun01"), false],
    treasure02: ["Drake", 'drake', 'treasure02', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#treasure02-time", "treasure02"), false],
    pay_fild10: ["Eddga", 'eddga', 'pay_fild10', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#pay_fild10-time", "pay_fild10"), true],
    gld_dun01_2: ["Eddga", 'eddga', 'gld_dun01_2', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun01_2-time", "gld_dun01_2"), true],
    gld_dun01_eddga: ["Eddga", 'eddga', 'gld_dun01_2', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun01_eddga-time", "gld_dun01_eddga"), true],
    lhz_dun02: ["Egnigem Cenia", 'cenia', 'lhz_dun02', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#lhz_dun02-time", "lhz_dun02"), false],
    in_sphinx5: ["Pharaoh", 'farao', 'in_sphinx5', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#in_sphinx5-time", "in_sphinx5"), false],
    pay_dun04: ["Moonlight", 'flor', 'pay_dun04', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#pay_dun04-time", "pay_dun04"), true],
    gld_dun01: ["Moonlight", 'flor', 'gld_dun01', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun01-time", "gld_dun01"), true],
    moc_fild17: ["Phreeoni", 'freeoni', 'moc_fild17', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#moc_fild17-time", "moc_fild17"), false],
    gld2_pay: ["General Daehyun", 'daehyun', 'gld2_pay', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld2_pay-time", "gld2_pay"), false],
    tur_dun04: ["Turtle General", 'tartaruga', 'tur_dun04', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#tur_dun04-time", "tur_dun04"), false],
    gld2_ald: ["Gioia", 'gioia', 'gld2_ald', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld2_ald-time", "gld2_ald"), false],
    mosk_dun03: ["Gopinich", 'gory', 'mosk_dun03', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#mosk_dun03-time", "mosk_dun03"), false],
    tชั่วโมงv03: ["Ifrit", 'ifrit', 'tชั่วโมงv03', '11 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '11', '0', "#tชั่วโมงv03-time", "tชั่วโมงv03"), false],
    kh_dun02: ["Kiel-D-01", 'kiel', 'kh_dun02', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#kh_dun02-time", "kh_dun02"), false],
    gld2_gef: ["Kades", "kades", 'gld2_gef', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld2_gef-time", "gld2_gef"), false],
    iz_dun05: ["Kraken", 'kraken', 'iz_dun05', '2 ชั่วโมง  20 นาที', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '20', "#iz_dun05-time", "iz_dun05"), false],
    ice_dun03: ["Ktullanux", 'ktullanux', 'ice_dun03', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#ice_dun03-time", "ice_dun03"), false],
    lou_dun03: ["Lady Branca", 'ladyBranca', 'lou_dun03', '1 ชั่วโมง 56 นาที', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '56', "#lou_dun03-time", "lou_dun03"), false],
    ayo_dun02: ["Lady Tanee", 'ladyTanee', 'ayo_dun02', '7 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '7', '0', "#ayo_dun02-time", "ayo_dun02"), false],
    dew_dun01: ["Leak", 'leak', 'dew_dun01', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#dew_dun01-time", "dew_dun01"), false],
    ethana_boss: ["Memory of Thanatos", 'thanatos', 'ethana_boss', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#ethana_boss-time", "ethana_boss"), false],
    moc_fild22: ["Satan Morroc", 'morroc', 'moc_fild22', '12 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '12', '0', "#moc_fild22-time", "moc_fild22"), false],
    gef_fild03: ["Orc Hero", 'ohero', 'gef_fild03', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#gef_fild03-time", "gef_fild03"), false],
    moc_pryd04: ["Osiris", 'osiris', 'moc_pryd04', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#moc_pryd04-time", "moc_pryd04"), false],
    ra_san05: ["Gloom Under Night", 'pesar', 'ra_san05', '5 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '5', '0', "#ra_san05-time", "ra_san05"), false],
    gld2_prt: ["Angry Student Pyuriel", 'pyuriel', 'gld2_prt', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld2_prt-time", "gld2_prt"), false],
    anthell02: ["Maya", 'maya', 'anthell02', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#anthell02-time", "anthell02"), true],
    gld_dun03_maya: ["Maya", 'maya', 'gld_dun03_maya', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun03_maya-time", "gld_dun03_maya"), true],
    gld_dun02_2: ["Maya", 'maya', 'gld_dun02_2', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun02_2-time", "gld_dun02_2"), true],
    dic_dun02: ["Queen Scaraba", 'scaraba', 'dic_dun02', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#dic_dun02-time", "dic_dun02"), false],
    dic_dun03: ["Gold Queen Scaraba", 'scarabaGold', 'dic_dun03', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#dic_dun03-time", "scarabaGolden"), false],
    ein_dun02: ["RSX-0806", 'RSX', 'ein_dun02', '2 ชั่วโมงs  5 นาที', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '5', "#ein_dun02-time", "RSX"), false],
    ein_dun02: ["RSX-0806", 'rsx', 'ein_dun02', '2 ชั่วโมงs  5 นาที', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '5', "#ein_dun02-time", "RSX"), false],
    dic_dun03: ["Gold Queen Scaraba", 'scarabaGold', 'dic_dun03', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#dic_dun03-time", "dic_dun03"), false],
    ein_dun02: ["RSX-0806", 'RSX', 'ein_dun02', '2 ชั่วโมงs  5 นาที', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '5', "#ein_dun02-time", "ein_dun02"), false],
    ama_dun03: ["Samurai Specter", 'samurai', 'ama_dun03', '1 ชั่วโมง 31 นาที', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '31', "#ama_dun03-time", "ama_dun03"), false],
    rockmi1: ["Spider Chariot", 'spiderchar', 'rockmi1', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '31', "#rockmi1-time", "rockmi1"), false],
    gl_chyard: ["Darklord", 'darkLord', 'gl_chyard', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#gl_chyard-time", "gl_chyard"), true],
    gl_chyard_: ["Darklord", 'darkLord', 'gl_chyard_', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#gl_chyard_-time", "gl_chyard_"), true],
    gld_dun04: ["Darklord", 'darkLord', 'gld_dun04', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun04-time", "gld_dun04"), true],
    gld_dun04_2: ["Darklord", 'darkLord', 'gld_dun04_2', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#gld_dun04_2-time", "gld_dun04_2"), true],
    nifflheim: ["Lord of Death", 'deathLord', 'nifflheim', '2 ชั่วโมง 13 นาที', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '13', "#nifflheim-time", "nifflheim"), false],
    gef_fild10: ["Orc Lord", 'orcLord', 'gef_fild10', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#gef_fild10-time", "gef_fild10"), false],
    gon_dun03: ["Evil Snake Lord", 'snakeLord', 'gon_dun03', '1 ชั่วโมง 34 นาที', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '34', "#gon_dun03-time", "gon_dun03"), false],
    teg_dun02: ["Super-Aprendiz", 'superAprendiz', 'teg_dun02', '3 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '3', '0', "#teg_dun02-time", "teg_dun02"), false],
    beach_dun: ["Tao Gunka", 'taoGunka', 'beach_dun', '5 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '5', '0', "#beach_dun-time", "beach_dun"), false],
    odin_tem03: ["Valkyrie Randgris", 'valk', 'odin_tem03', '8 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '8', '0', "#odin_tem03-time", "odin_tem03"), false],
    jupe_core: ["Vesper", 'vesper', 'jupe_core', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#jupe_core-time", "jupe_core"), false],
    c_tower3_: ["Time Holder", 'timeholder', 'c_tower3_', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#c_tower3_-time", "c_tower3_"), false],
    lasa_dun01: ["Gemaring", 'gemaring', 'lasa_dun01', '1 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '1', '0', "#lasa_dun01-time", "lasa_dun01"), false],
    xmas_fild01: ["Hatii", 'hatii', 'xmas_fild01', '2 ชั่วโมง', (deathHour, deathMinute) => clock(deathHour, deathMinute, '2', '0', "#xmas_fild01-time", "xmas_fild01")]
}

function regenerateTimer(mvp) {
    clearInterval(intervals[mvp]);
    let timeDiv = "#" + mvp + "-time-input";
    let hourMinute = $(timeDiv).val().split(':')
    mvpInfoMap[mvp][4](hourMinute[0], hourMinute[1]);
}

function reRender() {
    clearMain();
    let mvpTimers = Object.keys(mvpInfoMap);
    mvpTimers.forEach((value) => {
        loadCard(value, mvpInfoMap[value][5])
    });
}

function init() {
    reRender();
    if (location.search == "") {
        localStorage.removeItem("timerMap");
    } else {
        loadFromURL();
    }
}

function copyURL() {
    var copyText = document.getElementById("textURL");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");
}

function loadFromURL() {
    let receivedObj = loadTimesFromURL();
    if (receivedObj) {
        let loadedMap = Object.values(receivedObj);
        loadedMap.forEach(value => {
            clock(value[0], value[1], value[2], value[3], value[4], value[5]);
        })
    }
}

function clearMain() {
    $(".main-div").empty();
    appendedMVPs = [];
}

$(window).scroll(function() {
    let pos = $(window).scrollTop() + 5;
    pos = pos + "px";
    $(".toast-full").css({ top: pos });
});

$(".searchBar").on('input', () => {
    clearMain();
    if ($(".searchBar").val() == "") {
        reRender();
        return;
    }
    let mvpValues = Object.entries(mvpInfoMap);
    var regex = new RegExp($(".searchBar").val(), 'i');
    mvpValues.forEach(([key, value]) => {
        if (value.find(word => { if (typeof(word) == "string") { return word.match(regex); } }) != undefined) {
            loadCard(key, mvpInfoMap[key][5])
        }
    });
});

$("#modalGenerateButton").on('click', () => {
    $("#textURL").val(getTimeURL());
});

function showFavorites() {
    let favoritedMVPs = Object.keys(localStorage);
    clearMain();
    favoritedMVPs.forEach((key) => {
        loadCard(key, mvpInfoMap[key][5]);
    })
}

function setFavorite(map, favDiv) {
    let favoritedDiv = $("#" + favDiv);
    if (favoritedDiv.attr('class').includes("far")) {
        localStorage.setItem(map, favDiv);
        favoritedDiv.removeClass("far");
        favoritedDiv.addClass("fas");
    } else {
        favoritedDiv.removeClass("fas");
        favoritedDiv.addClass("far")
        localStorage.removeItem(map);

    }
}



function templateToast(placeholderId, placeholderMVP, mvpImage) {
    return `<div class="toast" id="${placeholderId}"role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
                <div class="toast-header">
                    <img src="./resources/${mvpImage}.gif" class="rounded mr-2" alt="...">
                    <strong class="mr-auto">บอสเกิดแล้วสัส</strong>
                    <button type="button" class="ml-2 mb-1 close close-${placeholderId}" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    ${placeholderMVP}
                </div>
            </div>`
}

function generateTab(mvp) {
    $('.main-div').append(`
    <div class="${mvp}-main">
    <div class="card">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
        </ul>
        <div class="tab-content" id="myTabContent"></div>
    </div>`);
}

function appendMVPinTab(mvp, mvpName, mvpTime, map, first) {
    $(`.${mvp}-main`).find("ul").append(`
            <li class="nav-item">
                    <a class="nav-link ${first? "active":""}" id="${map}-tab" data-toggle="tab" href="#${map}" role="tab" aria-controls="${map}" aria-selected="false">${map}</a>
            </li>`);
    $(`.${mvp}-main`).children('.card').children('.tab-content').append(`
            <div class="tab-pane fade show ${first? "active":""}" id="${map}" role="tabpanel" aria-labelledby="${map}-tab">
                    <h5 class="card-title">${mvpName}</h5>
                    <img class="card-img-top" src="./resources/${mvp}.gif" alt="Card image cap" width="7rem" height="150">
                    <div class="card-body">
                        <p class="card-text" id="${map}-time">จะเกิดในอีก: ${mvpTime}</p>
                        <input class="form-control time-input" type="time" id="${map}-time-input">
                        <div>
                        <button id="${map}-btn" class="btn btn-success" onclick="regenerateTimer('${map}')">ตั้งเวลาตาย</button>
                        <button id="${map}-btn-fav" class="btn btn-success" onclick="setFavorite('${map}', '${map}-fav')">จะเอาตัวนี้ <i id="${map}-fav" class="${localStorage.getItem(map) != undefined ? "fas":"far"} fa-star"></i></button>
                        </div>
                    </div>
                </div>
            </div>`);
}

function loadCard(mapKey, multiple) {
    let mvpInfo = mvpInfoMap[mapKey];
    let mvpName = mvpInfo[0];
    let mvp = mvpInfo[1];
    let map = mvpInfo[2];
    let mvpTime = mvpInfo[3];
    let first = false;

    if (multiple) {
        if (!appendedMVPs.includes(mvp)) {
            appendedMVPs.push(mvp);
            generateTab(mvp);
            first = true;
        }
        appendMVPinTab(mvp, mvpName, mvpTime, map, first);
    } else {
        generateTab(mvp);
        appendMVPinTab(mvp, mvpName, mvpTime, map, true);
    }

}

function generateToast(mvpId, mvpName) {
    if ($(".toast_container").has("#" + mvpId).length <= 0)
        $(".toast_container").append(templateToast(mvpId, mvpName, mvpId));
    $('#' + mvpId).toast('show')
}

function closeToast(divId) {
    $("." + divId).remove();
}

function getTimeURL() {
    return window.location.origin + window.location.pathname + '?timers=' + window.btoa(localStorage.timerMap);
}

function loadTimesFromURL() {
    let timeString = location.search;
    if (timeString == "") return;
    let urlParams = new URLSearchParams(timeString);
    let timers = urlParams.get('timers');
    if (timers) {
        return JSON.parse(window.atob(timers));
    }
    return;
}




$(document).ready(init());