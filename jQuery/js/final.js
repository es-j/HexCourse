$(document).ready(function () {
  $(".header > .menu > li >a").click(function (e) {
    e.preventDefault();
    $(this).parent().find("ul").slideToggle();
    $(this).parent().siblings().find("ul").slideUp();
  });
  const swiper = new Swiper(".swiper", {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  $(".fixbtn a").click(function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
});
