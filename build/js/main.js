"use strict";window.addEventListener("load",function(){document.querySelector(".nojs").classList.remove("nojs");document.body.offsetWidth<=767&&document.querySelector(".nav-main").addEventListener("click",function(e){return e.target.classList.contains("nav-main__head-toggle_open")?(e.preventDefault(),e.currentTarget.classList.remove("nav-main_close"),e.target.classList.remove("nav-main__head-toggle_open"),void e.target.classList.add("nav-main__head-toggle_close")):e.target.classList.contains("nav-main__head-toggle_close")?(e.preventDefault(),e.currentTarget.classList.add("nav-main_close"),e.target.classList.add("nav-main__head-toggle_open"),void e.target.classList.remove("nav-main__head-toggle_close")):void 0})});