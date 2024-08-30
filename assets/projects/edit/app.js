let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider

function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})







/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*====MENU SHOW ====*/
/*validate if constant exists*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}


/*====MENU HIDDEN ====*/
/*Validate if constant exist*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)




/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)


/* =======================VIDEO PAUSE ========================*/

document.addEventListener('DOMContentLoaded', () => {
    let players = [];
    let videos;

    // Initialize YouTube IFrame API players
    function onYouTubeIframeAPIReady() {
        const iframePlayers = document.querySelectorAll('iframe');
        iframePlayers.forEach(iframe => {
            const player = new YT.Player(iframe, {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
            players.push(player);
        });
    }

    // Handle player state changes for YouTube
    function onPlayerStateChange(event) {
        const iframe = event.target.getIframe();
        const item = iframe.closest('.item');
        if (event.data == YT.PlayerState.PLAYING) {
            toggleTitleVisibility(item, false); // Hide titles
            pauseAll(iframe);
        } else {
            toggleTitleVisibility(item, true); // Show titles
        }
    }

    // Function to toggle visibility of title elements
    function toggleTitleVisibility(element, isVisible) {
        const content = element.querySelector('.content');
        if (content) {
            content.style.display = isVisible ? 'block' : 'none';
        }
    }

    // Get all video elements
    videos = document.querySelectorAll('video');

    // Add play and pause event listeners to each video
    videos.forEach(video => {
        video.addEventListener('play', () => {
            const item = video.closest('.item');
            toggleTitleVisibility(item, false); // Hide titles
            pauseAll(video);
        });

        video.addEventListener('pause', () => {
            const item = video.closest('.item');
            toggleTitleVisibility(item, true); // Show titles
        });

        // Add click event listener to video
        video.addEventListener('click', () => {
            pauseAll(video);
        });
    });

    // Load the YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Expose the onYouTubeIframeAPIReady function to the global scope
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    // Function to pause all players except the excludeElement
    function pauseAll(excludeElement) {
        // Pause all YouTube players
        players.forEach(player => {
            const iframe = player.getIframe();
            if (iframe !== excludeElement) {
                player.pauseVideo();
            }
        });

        // Pause all HTML video elements
        videos.forEach(video => {
            if (video !== excludeElement) {
                video.pause();
            }
        });
    }
});



