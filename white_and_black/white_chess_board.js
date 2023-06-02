var chess_board = document.getElementById("white_chess_board")

var color = ""

var files = "abcdefgh"
var ranks = "12345678"

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if ((i + j) % 2) {
            color = "brown"
        }
        else{
            color = "wheat"
        }
        chess_board.innerHTML += `
        <div class="board_square" id="${files[j] + ranks[7 - i]}_white" onclick="clicked(this)" style="background-color: ${color};">
            <div class="slot" id="piece_slot_${files[j] + ranks[7 - i]}_white"></div>
            <div class="slot" id="move_slot_${files[j] + ranks[7 - i]}_white"></div>
        </div>
        `
    }
}

for (let i = 0; i < 8; i++) {
    chess_board.innerHTML += `<p class="rank" style="top: ${80 * i}px; color: black;">${8 - i}</p>`
}

for (let i = 0; i < 8; i++) {
    chess_board.innerHTML += `<p class="file" style="left: ${80 * i + 20}px; color: black;">${files[i]}</p>`
}