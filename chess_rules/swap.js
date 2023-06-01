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