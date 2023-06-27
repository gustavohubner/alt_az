var planetarium
var smoothedOrientation = { alpha: 0, beta: 0 }
var alt, az, alt_s, az_s, radec, alt_elm, az_elm, dec_elm, ra_elm, fov_lbl
var az_off, alt_off, title

// alert("ssss")

alt_elm = document.getElementById('alt')
az_elm = document.getElementById('az')
dec_elm = document.getElementById('dec_elm')
ra_elm = document.getElementById('ra_elm')
fov_lbl = document.getElementById('fovlbl')
title = document.getElementById('title')

const az_check = document.getElementById('az_check')
const eq_check = document.getElementById('eq_check')

az_off = document.getElementById('az_off')
alt_off = document.getElementById('alt_off')

// az_off = document.getElementById('az_off_lbl')
// alt_off = document.getElementById('alt_off_lbl')


const fov_slider = document.getElementById('fov');

function degToRad(degrees) {
    return (degrees % 360) * (Math.PI / 180);
}

S(document).ready(function () {
    planetarium = S.virtualsky({
        'id': 'starmap',
        'projection': 'gnomic',
        'latitude': -31.75,
        'longitude': -52.33,
        'constellations': true,
        // 'constellationlabels': true,
        'gradient': true,
        'showgalaxy': true,
        'showdate': false,
        'showstarlabels': true,
        // 'ground': true,
        'fov': 60,
        'fontsize': '12px',
        'live': true,
        'keyboard': true,
        'mouse': true,
        'magnitude': 10,
        'scalestars': 2,
        // 'showdate': false,
        'showposition': true,
        'gridlines_az': true,
        // 'gridlines_eq': true,
        'gridlineswidth': 2,
        'gridstep': 10,
        'atmos': true,
    });


    const smoothingFactor = 0
    window.addEventListener('deviceorientation', event => {
        const { alpha, beta, _ } = event;
        // smoothedOrientation = {
        //     alpha: (smoothingFactor * smoothedOrientation.alpha) + ((1 - smoothingFactor) * alpha),
        //     beta: (smoothingFactor * smoothedOrientation.beta) + ((1 - smoothingFactor) * beta),
        // };

        // az_s = 360 - ((smoothedOrientation.alpha + erro) % 360) + az_off.valueAsNumber
        // alt_s = (smoothedOrientation.beta + alt_off.valueAsNumber)

        // az = smoothedOrientation.alpha
        // alt = smoothedOrientation.beta

        az = 360 - (alpha + az_off.valueAsNumber)
        alt = (beta + alt_off.valueAsNumber)

        az_elm.innerText = `${az.toFixed(1)}`;
        alt_elm.innerText = `${alt.toFixed(1)}`;

        ra_text = Math.floor(radec['ra'] / 15) + 'H' + (((radec['ra'] / 15) - Math.floor(radec['ra'] / 15)) * 60).toFixed(0) + "M"
        dec_text = Math.floor(radec['dec']) + 'º'+Math.floor((radec['dec']- Math.floor(radec['dec']))*60)+"\'"
        radec = planetarium.azel2radec(degToRad(az), degToRad(alt))
        // ra_elm.innerText = `${(radec['ra']).toFixed(1)}H`
        ra_elm.innerText = ra_text
        dec_elm.innerText = dec_text

        planetarium.panTo(radec['ra'], radec['dec'], 1)
    });

    az_off.value = 0
    alt_off.value = 0
    fov.value = 30
    az_check.checked = true

    az = 323
    alt = 23
    az_elm.innerText = `${az}`;
    alt_elm.innerText = `${alt}`;

    radec = planetarium.azel2radec(degToRad(az), degToRad(alt))
    ra_elm.innerText = `${radec['ra'].toFixed(1)}`
    dec_elm.innerText = `${radec['dec'].toFixed(1)}º`
    planetarium.panTo(radec['ra'], radec['dec'], 500)


    fov_slider.addEventListener('input', () => {
        fov_lbl.innerText = `FOV ${fov_slider.value}º`;
        planetarium.fov = fov_slider.value
    });

    eq_check.addEventListener('input', () => {
        planetarium.grid.eq = $(eq_check).is(":checked")
    })

    az_check.addEventListener('input', () => {
        planetarium.grid.az = $(az_check).is(":checked")
    })

    az_off.addEventListener('input', () => {
        az_off_lbl.innerText = `AZ OFFSET ${az_off.value}º`
    })
    alt_off.addEventListener('input', () => {
        alt_off_lbl.innerText = `ALT OFFSET ${alt_off.value}º`
    })

    title.addEventListener('click', () => {
        document.getElementsByTagName('body')[0].classList.toggle('darkmode');
    })

    document.getElementById('starmap_inner').style.rotate = "180deg"

});