var sel_coords
var sel_square
var sel_piece
var sel_note
var turn_count = 1
var notation_div = document.getElementById("notation")


draw_board(false)
var availible_square = []
var availible_moves = []
var turn = "white"

function clicked(square){
    sel_note = square.id[0] + square.id[1]
    sel_coords = [files.indexOf(square.id[0]), ranks.indexOf(square.id[1])]
    sel_square = board[sel_coords[0]][sel_coords[1]]
    if (is_promoting == false) {
        if (sel_square != undefined){
            if (sel_square.side == turn) {
                sel_piece = board[sel_coords[0]][sel_coords[1]]
                show_move(square)
                return
            }
        }
        for (let i = 0; i < availible_moves.length; i++) {
            if (sel_note == availible_moves[i][0]){
                move_piece(availible_moves[i])
                return
            }
        }
        for (let i = 0; i < availible_square.length; i++) {
            availible_square[i].innerHTML = ``
        }
        availible_moves = []
        availible_square = []
    }
    
    return
}

function show_move(square){
    for (let i = 0; i < availible_square.length; i++) {
        availible_square[i].innerHTML = ``
    }
    availible_moves = []
    
    availible_square = []
    
    for (let i = 0; i < sel_piece.availible_moves.length; i++) {
        availible_moves.push(sel_piece.availible_moves[i])
        availible_square.push(document.getElementById("move_slot_" + sel_piece.availible_moves[i][0]))
        if(sel_piece.availible_moves[i][1] == "capture" || sel_piece.availible_moves[i][1] == "en_passant"){
            availible_square[i].innerHTML = `<div class="capture" style="border-color: ${sel_piece.side};"></div>`
        }
        else{
            availible_square[i].innerHTML = `<div class="move" style="background-color: ${sel_piece.side};"></div>`
        }
            
    }
}

function move_piece(move){
    sel_piece.move_piece(move)
    for (let i = 0; i < availible_square.length; i++) {
        availible_square[i].innerHTML = ``
    }
    availible_square = []
    if (is_promoting == false) {
        next_turn(sel_piece.note, move, false)
    }
}

function next_turn(note, move, prom){
    //change turn

    availible_moves = []

    white.get_all_moves()
    black.get_all_moves()

    draw_board(move[0])

    notation(note, move, prom)

    if (turn == "white") {
        turn = "black"
    }
    else{
        turn = "white"
        turn_count += 1
    }

    if (black.king.is_mated == true) {
        notation_div.innerHTML += `<div style="background-color: crimson; margin: 32px; border-radius: 5px; padding-left: 32px;">
            <h1>white wins on checkmate</h1>
        </div>`
    }
    if (white.king.is_mated == true) {
        notation_div.innerHTML += `<div style="background-color: crimson; margin: 32px; border-radius: 5px; padding-left: 32px;">
        <h1>black wins on checkmate</h1>
    </div>`
    }
    if (white.king.is_staled == true || black.king.is_staled == true) {
        notation_div.innerHTML += `<div style="background-color: crimson; margin: 32px; border-radius: 5px; padding-left: 32px;">
        <h1>draws on stalemate</h1>
    </div>`
    }

    console.log(board);
    console.log(black);
    console.log(white)
}


function notation(note, move, prom){
    if (turn == "white") {
        notation_div.innerHTML += `<div id="${turn_count}_note" class="note">
                                        <p width: 100px; style=" width: 200px; min-width: 100px;">${turn_count + "." + gen_notation(note, move, prom)}</p>
                                    </div>`
    }
    else{
        var turn_div = document.getElementById(turn_count + "_note")
        turn_div.innerHTML += `<p width: 100px; style=" width: 200px; min-width: 100px;">${gen_notation(note, move, prom)}</p>`
    }
}

//! kinda broke
function gen_notation(note, move, prom) {
    var take = ""
    var promote = ""
    var last = ""
    // castling
    if (move[1] == "castle") {
        if (move[0][0] == "c") {
            return "O-O-O"
        }
        else{
            return "O-O"
        }
    }
    // taking
    if (move[1] == "capture" || move[1] == "en_passant") {
        take = "x"
    }
    // check
    if (turn == "white") {
        if (black.king.is_checked == true) {
            last = "+"
        }
        if (black.king.is_mated == true) {
            last = "#"
        }
        if (black.king.is_staled == true) {
            last = "½"
        }
    }
    else{
        if (white.king.is_checked == true) {
            last = "+"
        }
        if (white.king.is_mated == true) {
            last = "#"
        }
        if (white.king.is_staled == true) {
            last = "½"
        }
    }
    // mate
    // stale
    // promote
    if (prom == true) {
        promote = "=" + board[files.indexOf(move[0][0])][ranks.indexOf(move[0][1])].note
    }

    return note + take + move[0] + promote + last
}

// todo 50 move rule
// todo insufficient material