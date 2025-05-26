const overlay = document.querySelector('.overlay');
const navItems = document.querySelectorAll('.navhover');

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    overlay.style.display = 'block';
  });
  item.addEventListener('mouseleave', () => {
    overlay.style.display = 'none';
  });
});
  // Main and thumbnail sliders (synced)
  // const main = new Splide('#main-slider', {
  //   type: 'fade',
  //   pagination: false,
  //   arrows: false,
  //   cover: true,
  // });

  // const thumbnails = new Splide('#thumbnail-slider', {
  //   rewind: true,
  //   fixedWidth: 104,
  //   fixedHeight: 58,
  //   gap: 10,
  //   focus: 'center',
  //   pagination: false,
  //   cover: true,
  //   dragMinThreshold: {
  //     mouse: 4,
  //     touch: 10,
  //   },
  //   breakpoints: {
  //     640: {
  //       fixedWidth: 66,
  //       fixedHeight: 38,
  //     },
  //   },
  // });

  // main.sync(thumbnails);
  // main.mount();
  // thumbnails.mount();

  // Mini Slider
  function maxiSlider(id){
    new Splide(id, {
        perPage: 7,
        gap: '2rem',
        presentation:false,
        breakpoints: {
          640: {
            perPage: 2,
            gap: '.7rem',
            height: '6rem',
          },
          480: {
            perPage: 1,
            gap: '.7rem',
            height: '6rem',
          },
        },
      }).mount();
  }
  // Max Slider (fixed)
  function miniSlider(id){
    new Splide(id, {
        perPage:5,
        gap: '2rem',
        breakpoints: {
          640: {
            perPage: 2,
            gap: '.7rem',
            height: '6rem',
          },
          480: {
            perPage: 1,
            gap: '.7rem',
            height: '6rem',
          },
        },
      }).mount();
  }
  miniSlider('#max-slider');
  maxiSlider('#Episode');
  maxiSlider('#Movies');
  maxiSlider('#Tranding');
  maxiSlider('#Romantic');
