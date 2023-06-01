var chess_board = document.getElementById("black_chess_board")

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
        <div class="board_square" id="${files[7 - j] + ranks[i]}_black" onclick="clicked(this)" style="background-color: ${color};">
            <div class="slot" id="piece_slot_${files[7 - j] + ranks[i]}_black"></div>
            <div class="slot" id="move_slot_${files[7 - j] + ranks[i]}_black"></div>
        </div>
        `
    }
}