import './index.css';
import App from './scripts/App';

window.app = new App();

/**
** UI Events
*/
    /**
    ** Fade on start
    */
var btn = document.querySelector('.start')

    btn.addEventListener('click', function(){
    TweenLite.to('.container-intro', 0.5,
    {
        opacity: 0,
        ease:Power0.easeNone
    })

    TweenLite.set('.container-intro',
    {
        display: 'none',
        delay: 1
    })

    TweenLite.set('.tools',
    {
        display: 'flex',
    })

    TweenLite.to('.controls', 1,
    {
        opacity: 1,
        ease:Power0.easeNone,
        delay: 0.3
    })

    TweenLite.to('.mask', 1,
    {
        xPercent:202,
        ease:Power2.easeInOut,
        delay: 0.5
    })

    TweenLite.to('.text-content', 1,
    {
        opacity:1,
        ease:Power0.easeNone,
        delay: 0.9
    })

    TweenLite.to('.twitter', 0.5,
    {
        opacity: 1,
        ease:Power0.easeNone,
        delay: 1.5
    })

    TweenLite.to('.twitter', 0.5,
    {
        xPercent: -200,
        ease:Power2.easeInOut,
        delay: 1.5
    })

    TweenLite.to('.sound_on', 0.5,
    {
        xPercent: -220,
        ease:Power2.easeInOut,
        delay: 1.6
    })

    TweenLite.to('#main', 1,
    {
        opacity: 1,
        ease:Power0.easeNone,
        delay: 0.5
    })

    TweenLite.to('.music-credits', 0.7,
    {
        opacity: 1,
        ease:Power0.easeNone,
        delay: 0.5
    })
})
    /**
    ** Toggle fullscreen
    */
var full_screen = document.querySelector('.full_screen');
full_screen.addEventListener('click', function(){
    var canvas = document.querySelector('canvas');
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
    }
})

// console.log("%c Hello, any problems ? Tell me what's wrong on Twitter ",
// "background: #94F2B3; color: #C523B6; font:bold 30px/30px sans-serif;")
