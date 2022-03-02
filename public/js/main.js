/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $("#preloder").delay(3000).fadeOut("slow");
    })
    const items = document.querySelectorAll(
        ".container-show,.navbar-container,.sidebar,.left-menu-icon,.toggle"
      );
      const ball = document.querySelector(".toggle-ball");
      var dark = localStorage.getItem("dark")
      if (dark === "1") {
        $('body').toggleClass('dark');
        items.forEach((item) => {
          item.classList.toggle("active");
         
        });
        ball.classList.add("active")
      }
      
      
      
      
      ball.addEventListener("click", () => {
        items.forEach((item) => {
          item.classList.toggle("active");
      
        });
        ball.classList.toggle("active");
        $('body').toggleClass('dark');
        var dark = localStorage.getItem("dark")
        if (dark === "1") {
          localStorage.setItem("dark", "0")
        }
        else {
          localStorage.setItem("dark", "1")
        }
      });
      $(".anime-show-one").hover(function () {
          // over
          $(this).addClass("show");
        }, function () {
          // out
          $(this).removeClass("show");
        }
      );
})(jQuery);