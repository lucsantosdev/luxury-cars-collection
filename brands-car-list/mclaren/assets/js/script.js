// toggle menu button
function toggleMenu() {
    const menu = document.querySelector('.menu')
    const nav = document.querySelector('.nav')
    menu.classList.toggle('active')
    nav.classList.toggle('active')
}

// change the bg video when click on the gallery images
function changeVideo(name) {
    const bgVideoList = document.querySelectorAll('.bg-video')
    const trailers = document.querySelectorAll('.trailer')
    const models = document.querySelectorAll('.model')

    // js higher order array function forEach
    // this is easier to do data mapping
    bgVideoList.forEach(video => {
        video.classList.remove('active')
        if (video.classList.contains(name)) {
            video.classList.add('active')
        }
    })

    // mapping model name change
    models.forEach(model => {
        model.classList.remove('active')
        if (model.classList.contains(name)) {
            model.classList.add('active')
        }
    })

    // mapping trailer video change
    trailers.forEach(video => {
        video.classList.remove('active')
        if (video.classList.contains(name)) {
            video.classList.add('active')
        }
    })
}

// change the play/pause button on click event
function togglePlay(){
    const play = document.querySelector('.play')
    const pause = document.querySelector('.pause')
    play.classList.toggle('active')
    pause.classList.toggle('active')
}

// video play and pause
function pauseVideo() {
    const bgVideoList = document.querySelectorAll('.bg-video')
    bgVideoList.forEach(video => {
        video.pause()
    })
    togglePlay()
}
function playVideo() {
    const bgVideoList = document.querySelectorAll('.bg-video')
    bgVideoList.forEach(video => {
        video.play()
    })
    togglePlay()
}
