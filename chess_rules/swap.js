var slide_1 = document.getElementById("img_slide_1")
var slide_1_num = 0

var slide_2 = document.getElementById("img_slide_2")
var slide_2_num = 0

var slide_3 = document.getElementById("img_slide_3")
var slide_3_num = 0

var slide_4 = document.getElementById("img_slide_4")
var slide_4_num = 0

var slide_5 = document.getElementById("img_slide_5")
var slide_5_num = 0

var slide_6 = document.getElementById("img_slide_6")
var slide_6_num = 0

var slide_7 = document.getElementById("img_slide_7")
var slide_7_num = 0

var slide_8 = document.getElementById("img_slide_8")
var slide_8_num = 0

var slide_9 = document.getElementById("img_slide_9")
var slide_9_num = 0

var slide_10 = document.getElementById("img_slide_10")
var slide_10_num = 0

var slide_11 = document.getElementById("img_slide_11")
var slide_11_num = 0

var slide_12 = document.getElementById("img_slide_12")
var slide_12_num = 0

function swap_1(delta){
    var slides = [`<img src="img_3.png" alt="pawn move" class="img">`, `<img src="img_4.png" alt="pawn move" class="img">`]
    if (slide_1_num + delta >= 0 && slide_1_num + delta < slides.length) {
        slide_1_num += delta
    }
    slide_1.innerHTML = slides[slide_1_num]
}

function swap_2(delta){
    var slides = [`<img src="img_6.png" alt="pawn move" class="img">`, `<img src="img_7.png" alt="pawn move" class="img">`]
    if (slide_2_num + delta >= 0 && slide_2_num + delta < slides.length) {
        slide_2_num += delta
    }
    slide_2.innerHTML = slides[slide_2_num]
}

function swap_3(delta){
    var slides = [`<img src="img_9.png" alt="pawn move" class="img">`, `<img src="img_10.png" alt="pawn move" class="img">`]
    if (slide_3_num + delta >= 0 && slide_3_num + delta < slides.length) {
        slide_3_num += delta
    }
    slide_3.innerHTML = slides[slide_3_num]
}

function swap_4(delta){
    var slides = [`<img src="img_11.png" alt="pawn move" class="img">`, `<img src="img_12.png" alt="pawn move" class="img">`]
    if (slide_4_num + delta >= 0 && slide_4_num + delta < slides.length) {
        slide_4_num += delta
    }
    slide_4.innerHTML = slides[slide_4_num]
}

function swap_5(delta){
    var slides = [`<img src="img_13.png" alt="pawn move" class="img">`, `<img src="img_14.png" alt="pawn move" class="img">`, `<img src="img_15.png" alt="pawn move" class="img">`]
    if (slide_5_num + delta >= 0 && slide_5_num + delta < slides.length) {
        slide_5_num += delta
    }
    slide_5.innerHTML = slides[slide_5_num]
}

function swap_6(delta){
    var slides = [`<img src="img_16.png" alt="knight move" class="img">`, `<img src="img_17.png" alt="knight move" class="img">`]
    if (slide_6_num + delta >= 0 && slide_6_num + delta < slides.length) {
        slide_6_num += delta
    }
    slide_6.innerHTML = slides[slide_6_num]
}

function swap_7(delta){
    var slides = [`<img src="img_18.png" alt="knight move" class="img">`, `<img src="img_19.png" alt="knight move" class="img">`]
    if (slide_7_num + delta >= 0 && slide_7_num + delta < slides.length) {
        slide_7_num += delta
    }
    slide_7.innerHTML = slides[slide_7_num]
}

function swap_8(delta){
    var slides = [`<img src="img_20.png" alt="knight move" class="img">`, `<img src="img_21.png" alt="knight move" class="img">`]
    if (slide_8_num + delta >= 0 && slide_8_num + delta < slides.length) {
        slide_8_num += delta
    }
    slide_8.innerHTML = slides[slide_8_num]
}

function swap_9(delta){
    var slides = [`<img src="img_22.png" alt="knight move" class="img">`, `<img src="img_23.png" alt="knight move" class="img">`]
    if (slide_9_num + delta >= 0 && slide_9_num + delta < slides.length) {
        slide_9_num += delta
    }
    slide_9.innerHTML = slides[slide_9_num]
}

function swap_10(delta){
    var slides = [`<img src="img_24.png" alt="knight move" class="img">`, `<img src="img_25.png" alt="knight move" class="img">`]
    if (slide_10_num + delta >= 0 && slide_10_num + delta < slides.length) {
        slide_10_num += delta
    }
    slide_10.innerHTML = slides[slide_10_num]
}

function swap_11(delta){
    var slides = [`<img src="img_26.png" alt="knight move" class="img">`, `<img src="img_27.png" alt="knight move" class="img">`]
    if (slide_11_num + delta >= 0 && slide_11_num + delta < slides.length) {
        slide_11_num += delta
    }
    slide_11.innerHTML = slides[slide_11_num]
}

function swap_12(delta){
    var slides = [`<img src="img_28.png" alt="knight move" class="img">`, `<img src="img_29.png" alt="knight move" class="img">`]
    if (slide_12_num + delta >= 0 && slide_12_num + delta < slides.length) {
        slide_12_num += delta
    }
    slide_12.innerHTML = slides[slide_12_num]
}