//rank and file is at chess_board.js

var board = [
    [,,,,,,,,],
    [,,,,,,,,],
    [,,,,,,,,],
    [,,,,,,,,],
    [,,,,,,,,],
    [,,,,,,,,],
    [,,,,,,,,],
    [,,,,,,,,]
]

var promote_div = document.getElementById("promote_div")

var is_promoting = false

var white_value = document.getElementById("white_value")
var black_value = document.getElementById("black_value")

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        board[i][j] = undefined
    }
}

class Piece{
    constructor(notation_square, side){
        this.side = side
        //the notation of the square
        this.notation_square = notation_square
        //the numeral position of the square
        this.square = [files.indexOf(notation_square[0]), ranks.indexOf(notation_square[1])]
            
        board[this.square[0]][this.square[1]] = this
    }

    move_piece(move){
        //clear original square
        board[this.square[0]][this.square[1]] = undefined
        clear_board(this.notation_square)
        //move to new square
        this.notation_square = move[0]
        this.square = [files.indexOf(this.notation_square[0]), ranks.indexOf(this.notation_square[1])]

        if (board[this.square[0]][this.square[1]] != undefined) {
            if (this.side == "white") {
                black.captured(this.notation_square)
            }
            else{
                white.captured(this.notation_square)
            }
        }

        //castlable
        if (this.name == "king" || this.name == "rook") {
            this.castlable = false
        }

        board[this.square[0]][this.square[1]] = this

        //castle
        if (move[1] == "castle") {
            if (move[0][0] == "c") {
                board[0][this.square[1]].move_piece([files[3] + ranks[this.square[1]], "move"])
            }
            if (move[0][0] == "g") {
                board[7][this.square[1]].move_piece([files[5] + ranks[this.square[1]], "move"])
            }
        }

        //en_passant
        if (move[1] == "double_step"){
            this.can_en_passanted = 2
        }
        if (move[1] == "en_passant"){
            if (this.side == "white") {
                black.captured(files[this.square[0]] + ranks[this.square[1] - 1])
                board[this.square[0]][this.square[1] - 1] = undefined
                clear_board(files[this.square[0]] + ranks[this.square[1] - 1])
            }
            else{
                white.captured(files[this.square[0]] + ranks[this.square[1] + 1])
                board[this.square[0]][this.square[1] + 1] = undefined
                clear_board(files[this.square[0]] + ranks[this.square[1] - 1])
            }
        }
        // promotion
        if (this.side == "white") {
            if (this.name == "pawn" && this.square[1] == 7){
                console.log(move);
                this.promote(this.notation_square, move)
            }
        }
        else{
            if (this.name == "pawn" && this.square[1] == 0){
                this.promote(this.notation_square, move)
            }
        }
        draw_board(this.notation_square)
    }

    check_detection(inv_moves){
        var moves = []  

        for (let i = 0; i < inv_moves.length; i++) {
            var img_board = JSON.parse(JSON.stringify(board))
            var new_square = [files.indexOf(inv_moves[i][0][0]), ranks.indexOf(inv_moves[i][0][1])]
            img_board[new_square[0]][new_square[1]] = this
            img_board[this.square[0]].splice([this.square[1]], 1)
            img_board[this.square[0]].splice([this.square[1]], 0, null);

            //google_en_passant
            if (inv_moves[i][1] == "en_passant") {
                if (this.side == "white") {
                    img_board[new_square[0]].splice([new_square[1] - 1], 1)
                    img_board[new_square[0]].splice([new_square[1] - 1], 0, null);
                }
                else{
                    img_board[new_square[0]].splice([new_square[1] + 1], 1)
                    img_board[new_square[0]].splice([new_square[1] + 1], 0, null);
                }
            }

            if(this.side == "white"){
                if (white.king.checked(img_board, white.king.square) == false) {
                    moves.push(inv_moves[i])
                }
            }
            else{
                if (black.king.checked(img_board, black.king.square) == false) {
                    moves.push(inv_moves[i])
                }
            }
        }
        return moves
    }
}


class Pawn extends Piece{
    constructor(notation_square, side){
        //inhertite
        super(notation_square, side)

        this.availible_moves = []

        this.can_en_passanted = 0

        this.note = ""

        this.name = "pawn"

        this.value = 1
    }
    
    get_moves(){
        if (this.can_en_passanted > 0) {
            this.can_en_passanted -= 1
        }

        var moves
        moves = this.check_detection(this.moves_detect())

        this.availible_moves = moves
        return this.availible_moves
    }
    moves_detect(){
        var moves = []
        var move = this.move()
        if (move != undefined){
            moves.push(move)
        }
        var move = this.double_step()
        if (move != undefined){
            moves.push(move)
        }
        var move = this.capture()
        for (let i = 0; i < move.length; i++) {
            moves.push(move[i])
        }
        var move = this.en_passant()
        for (let i = 0; i < move.length; i++) {
            moves.push(move[i])
        }

        return moves
    }

    move(){
        var inv_sqr = []
        if (this.side == "white") {
            var rank_move = 1
        }
        else {
            var rank_move = -1
        }
        inv_sqr = [this.square[0], this.square[1] + rank_move]
        if (board[inv_sqr[0]][inv_sqr[1]] == undefined){
            return [files[inv_sqr[0]] + ranks[inv_sqr[1]], "move"]
        }
    }

    double_step(){
        var inv_sqr = []
        if (this.side == "white") {
            var first_row = 1
            var rank_move = 2
            inv_sqr = [[this.square[0], this.square[1] + 1], [this.square[0], this.square[1] + 2]]
        }
        else {
            var first_row = 6
            var rank_move = -2
            inv_sqr = [[this.square[0], this.square[1] - 1], [this.square[0], this.square[1] - 2]]
        }
        if (this.square[1] == first_row){
            if (board[inv_sqr[0][0]][inv_sqr[0][1]] == undefined && board[inv_sqr[1][0]][inv_sqr[1][1]] == undefined){
                return [files[inv_sqr[1][0]] + ranks[inv_sqr[1][1]], "double_step"]
            }
        }
    }

    capture(){
        var inv_sqr = []
        var moves = []
        if (this.side == "white") {
            var rank_move = 1
        }
        else {
            var rank_move = -1
        }

        for (let i = -1; i < 2; i += 2) {
            inv_sqr = [this.square[0] + i, this.square[1] + rank_move]
            if (inv_sqr[0] >= 0 && inv_sqr[0] < 8){
                if (board[inv_sqr[0]][inv_sqr[1]] != undefined){
                    if (board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                        moves.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "capture"])
                    }
                }
            }
        }
        return moves
    }
    //todo: promote
    promote(square, move){
        is_promoting = true
        if (this.side == "white") {
            promote_div.innerHTML = `<div width: 100px; height: 320px style="border-radius: 10px;position: relative; width: 100px; height: 320px; background-color: rgb(226, 226, 226);">
                                        <img src="white_knight.png" alt="white_knight" onclick="promoting('${square}', '${this.side}', 'knight', '${move[1]}')" height="70px" style="position: relative; left: 20px; top: 10px;">
                                        <img src="white_bishop.png" alt="white_knight" onclick="promoting('${square}', '${this.side}', 'bishop', '${move[1]}')" height="70px" style="position: relative; left: 20px; top: 10px;">
                                        <img src="white_rook.png" alt="white_knight" onclick="promoting('${square}', '${this.side}', 'rook', '${move[1]}')" height="70px" style="position: relative; left: 20px; top: 10px;">
                                        <img src="white_queen.png" alt="white_knight" onclick="promoting('${square}', '${this.side}', 'queen', '${move[1]}')" height="70px" style="position: relative; left: 20px; top: 10px;">
                                    </div>`
        }
        else{
            promote_div.innerHTML = `<div width: 100px; height: 320px style="border-radius: 10px;position: relative; width: 100px; height: 320px; background-color: rgb(49, 49, 49)">
                                        <img src="black_knight.png" alt="white_knight" onclick="promoting('${square}', '${this.side}', 'knight', '${move[1]}')" height="70px" style="position: relative; left: 20px; top: 10px;">
                                        <img src="black_bishop.png" alt="white_knight" onclick="promoting('${square}', '${this.side}', 'bishop', '${move[1]}')" height="70px" style="position: relative; left: 20px; top: 10px;">
                                        <img src="black_rook.png" alt="white_knight" onclick="promoting('${square}', '${this.side}', 'rook', '${move[1]}')" height="70px" style="position: relative; left: 20px; top: 10px;">
                                        <img src="black_queen.png" alt="white_knight" onclick="promoting('${square}', '${this.side}', 'queen', '${move[1]}')" height="70px" style="position: relative; left: 20px; top: 10px;">
                                    </div>`
        }
    }
    
    // en passant
    en_passant(){
        var inv_sqr = []
        var moves = []
        if (this.side == "white") {
            var rank_move = 1
        }
        else {
            var rank_move = -1
        }

        for (let i = -1; i < 2; i += 2) {
            inv_sqr = [this.square[0] + i, this.square[1]]
            if (inv_sqr[0] >= 0 && inv_sqr[0] < 8){
                if (board[inv_sqr[0]][inv_sqr[1]] != undefined){
                    if (board[inv_sqr[0]][inv_sqr[1]].side != this.side && board[inv_sqr[0]][inv_sqr[1]].name == "pawn"){
                        if (board[inv_sqr[0]][inv_sqr[1]].can_en_passanted > 0) {
                            moves.push([files[inv_sqr[0]] + ranks[inv_sqr[1] + rank_move], "en_passant"])
                        }
                    }
                }
            }
        }
        return moves
    }
}

function promoting(square, side, piece, move){
    if (side == "white") {
        if (piece == "knight") {
            white.captured(square)
            white.knights.push(new Knight(square, side))
        }
        if (piece == "bishop") {
            white.captured(square)
            white.bishops.push(new Bishop(square, side))
        }
        if (piece == "rook") {
            white.captured(square)
            white.rooks.push(new Rook(square, side))
        }
        if (piece == "queen") {
            white.captured(square)
            white.queens.push(new Queen(square, side))
        }
    }
    else{
        if (piece == "knight") {
            black.captured(square)
            black.knights.push(new Knight(square, side))
        }
        if (piece == "bishop") {
            black.captured(square)
            black.bishops.push(new Bishop(square, side))
        }
        if (piece == "rook") {
            black.captured(square)
            black.rooks.push(new Rook(square, side))
        }
        if (piece == "queen") {
            black.captured(square)
            black.queens.push(new Queen(square, side))
        }
    }

    is_promoting = false
    next_turn("", [square, move], true)
    promote_div.innerHTML = ``
}

class Knight extends Piece{
    constructor(notation_square, side){
        //inhertite
        super(notation_square, side)
        
        this.availible_moves = []

        this.note = "N"

        this.name = "knight"

        this.value = 3
    }

    get_moves(){
        var moves
        moves = this.check_detection(this.moves_detect())

        this.availible_moves = moves
        return this.availible_moves
    }
    moves_detect(){
        var moves = []
        var file_move = [-2, -1, 1, 2]
        var rank_move = [[1, -1], [2, -2], [2, -2], [1, -1]]

        var inv_sqr = [,,]

        for (let i = 0; i < file_move.length; i++) {
            inv_sqr[0] = this.square[0] + file_move[i]

            if(inv_sqr[0] >= 0 && inv_sqr[0] < 8){
                for (let j = 0; j < 2; j++) {
                    inv_sqr[1] = this.square[1] + rank_move[i][j]

                    if(inv_sqr[1] >= 0 && inv_sqr[1] < 8){
                        if(board[inv_sqr[0]][inv_sqr[1]] == undefined){
                            moves.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "move"])
                        }
                        else if(board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                            moves.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "capture"])
                        }
                    }
                }
            }
        }
        return moves
    }
}

class Bishop extends Piece{
    constructor(notation_square, side){
        //inhertite
        super(notation_square, side)
        
        this.availible_moves = []

        this.note = "B"

        this.name = "bishop"

        this.value = 3
    }

    get_moves(){
        var moves
        moves = this.check_detection(this.moves_detect())

        this.availible_moves = moves
        return this.availible_moves
    }
    moves_detect(){
        var move = []
        var inv_sqr = [,,]

        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                inv_sqr = [this.square[0], this.square[1]]
                inv_sqr = [inv_sqr[0] + i, inv_sqr[1] + j]

                while (inv_sqr[0] >= 0 && inv_sqr[0] < 8 && inv_sqr[1] >= 0 && inv_sqr[1] < 8) {
                    if (board[inv_sqr[0]][inv_sqr[1]] == undefined) {
                        move.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "move"])
                    }
                    else if (board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                        move.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "capture"])
                        break
                    }
                    else{
                        break
                    }
                    inv_sqr = [inv_sqr[0] + i, inv_sqr[1] + j]
                }
            }
        }
        return move
    }
}

// THE ROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOK
class Rook extends Piece{
    constructor(notation_square, side){
        //inhertite
        super(notation_square, side)
        
        this.availible_moves = []

        this.castlable = true

        this.note = "R"

        this.name = "rook"

        this.value = 5
    }

    get_moves(){
        var moves
        moves = this.check_detection(this.moves_detect())

        this.availible_moves = moves
        return this.availible_moves
    }
    moves_detect(){
        var move = []
        var inv_sqr = [,,]

        for (let i = 0; i < 2; i++) {
            for (let j = -1; j < 2; j += 2)/*-1 and 1*/ {
                inv_sqr = [this.square[0], this.square[1]]
                inv_sqr[i] += j
                while (inv_sqr[i] >= 0 && inv_sqr[i] < 8) {
                    if (board[inv_sqr[0]][inv_sqr[1]] == undefined) {
                        move.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "move"])
                    }
                    else if (board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                        move.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "capture"])
                        break
                    }
                    else{
                        break
                    }
                    inv_sqr[i] += j
                }
            }
        }
        return move
    }
}

class Queen extends Piece{
    constructor(notation_square, side){
        //inhertite
        super(notation_square, side)
        
        this.availible_moves = []

        this.note = "Q"

        this.name = "queen"

        this.value = 9
    }

    get_moves(){
        var moves
        moves = this.check_detection(this.moves_detect())

        this.availible_moves = moves
        return this.availible_moves
    }
    moves_detect(){
        // combine rook with bishop
        var move = []
        var inv_sqr = [,,]

        // bishop move
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                inv_sqr = [this.square[0], this.square[1]]
                inv_sqr = [inv_sqr[0] + i, inv_sqr[1] + j]

                while (inv_sqr[0] >= 0 && inv_sqr[0] < 8 && inv_sqr[1] >= 0 && inv_sqr[1] < 8) {
                    if (board[inv_sqr[0]][inv_sqr[1]] == undefined) {
                        move.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "move"])
                    }
                    else if (board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                        move.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "capture"])
                        break
                    }
                    else{
                        break
                    }
                    inv_sqr = [inv_sqr[0] + i, inv_sqr[1] + j]
                }
            }
        }

        // rook move
        for (let i = 0; i < 2; i++) {
            for (let j = -1; j < 2; j += 2)/*-1 and 1*/ {
                inv_sqr = [this.square[0], this.square[1]]
                inv_sqr[i] += j
                while (inv_sqr[i] >= 0 && inv_sqr[i] < 8) {
                    if (board[inv_sqr[0]][inv_sqr[1]] == undefined) {
                        move.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "move"])
                    }
                    else if (board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                        move.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "capture"])
                        break
                    }
                    else{
                        break
                    }
                    inv_sqr[i] += j
                }
            }
        }

        return move

    }
}

class King extends Piece{
    constructor(notation_square, side){
        //inhertite
        super(notation_square, side)
        
        this.availible_moves = []

        this.castlable = true

        this.is_checked = false

        this.is_mated = false

        this.is_staled = false

        this.note = "K"

        this.name = "king"
    }

    get_moves(){
        var moves
        this.is_checked = false
        moves = this.king_check_detection(this.moves_detect())
        var castle = this.castle()
        for (let i = 0; i < castle.length; i++) {
            moves.push(castle[i])
        }

        if(this.checked(board, this.square) == true){
            this.is_checked = true
        }

        this.availible_moves = moves
        return this.availible_moves
    }
    // move
    moves_detect(){
        var moves = []
        var inv_sqr = [,,]
        
        for (let i = -1; i < 2; i++) {
            inv_sqr[0] = this.square[0] + i
            if (inv_sqr[0] >= 0 && inv_sqr[0] < 8){
                for (let j = -1; j < 2; j++) {
                    inv_sqr[1] = this.square[1] + j
                    if (inv_sqr[1] >= 0 && inv_sqr[1] < 8){
                        if (i != 0 || j != 0){
                            if (board[inv_sqr[0]][inv_sqr[1]] == undefined){
                                moves.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "move"])
                            }
                            else if (board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                                moves.push([files[inv_sqr[0]] + ranks[inv_sqr[1]], "capture"])
                            }
                        }
                    }
                }
            }
        }
        return moves
    }
    //todo: castle
    castle(){
        var moves = []
        if(this.castlable == true){
            var can_castle = true
            //queen side
            if (board[0][this.square[1]] != undefined) {
                if (board[0][this.square[1]].name == "rook") {
                    if (board[0][this.square[1]].castlable == true) {
                        var inv_sqr = []
                        for (let i = 1; i < 4; i++) {
                            inv_sqr = [i, this.square[1]]
                            if (board[inv_sqr[0]][inv_sqr[1]] != undefined) {
                                can_castle = false
                                break
                            }
                        }
                        for (let i = 2; i < 5; i++) {
                            inv_sqr = [i, this.square[1]]
                            if (this.checked(board, inv_sqr) == true) {
                                can_castle = false
                            }
                        }
                        if (can_castle == true) {
                            moves.push(["c" + ranks[this.square[1]], "castle"])
                        }
                    }
                }
            }
            
            //king side
            can_castle = true

            if (board[7][this.square[1]] != undefined) {
                if (board[7][this.square[1]].name == "rook") {
                    if (board[7][this.square[1]].castlable == true) {
                        var inv_sqr = []
                        for (let i = 5; i < 7; i++) {
                            inv_sqr = [i, this.square[1]]
                            if (board[inv_sqr[0]][inv_sqr[1]] != undefined) {
                                can_castle = false
                                break
                            }
                        }
                        for (let i = 4; i < 7; i++) {
                            inv_sqr = [i, this.square[1]]
                            if (this.checked(board, inv_sqr) == true) {
                                can_castle = false
                            }
                        }
                        if (can_castle == true) {
                            moves.push(["g" + ranks[this.square[1]], "castle"])
                        }
                    }
                }
            }
        }
        return moves
    }
    //checked
    checked(new_board, king_square){
        var inv_sqr = [,,]
        // pawn move
        var inv_sqr = []
        if (this.side == "white") {
            var rank_move = 1
        }
        else {
            var rank_move = -1
        }

        for (let i = -1; i < 2; i += 2) {
            inv_sqr = [king_square[0] + i, king_square[1] + rank_move]
            if (inv_sqr[0] >= 0 && inv_sqr[0] < 8){
                if (new_board[inv_sqr[0]][inv_sqr[1]] != undefined){
                    if (new_board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                        if (new_board[inv_sqr[0]][inv_sqr[1]].name == "pawn") {
                            return true
                        }
                    }
                }
            }
        }
        // knight move
        var file_move = [-2, -1, 1, 2]
        var rank_move = [[1, -1], [2, -2], [2, -2], [1, -1]]

        for (let i = 0; i < file_move.length; i++) {
            inv_sqr[0] = king_square[0] + file_move[i]

            if(inv_sqr[0] >= 0 && inv_sqr[0] < 8){
                for (let j = 0; j < 2; j++) {
                    inv_sqr[1] = king_square[1] + rank_move[i][j]

                    if(inv_sqr[1] >= 0 && inv_sqr[1] < 8){
                        if(new_board[inv_sqr[0]][inv_sqr[1]] != undefined){
                            if(new_board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                                if(new_board[inv_sqr[0]][inv_sqr[1]].name == "knight"){
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }

        // bishop move
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                inv_sqr = [king_square[0], king_square[1]]
                inv_sqr = [inv_sqr[0] + i, inv_sqr[1] + j]
                while (inv_sqr[0] >= 0 && inv_sqr[0] < 8 && inv_sqr[1] >= 0 && inv_sqr[1] < 8) {
                    if (new_board[inv_sqr[0]][inv_sqr[1]] != undefined) {
                        if (new_board[inv_sqr[0]][inv_sqr[1]].side != this.side) {
                            if (new_board[inv_sqr[0]][inv_sqr[1]].name == "bishop") {
                                return true
                            }
                            else if (new_board[inv_sqr[0]][inv_sqr[1]].name == "queen") {
                                return true
                            }
                            else{
                                break
                            }
                        }
                        else{
                            break
                        }
                    }
                    inv_sqr = [inv_sqr[0] + i, inv_sqr[1] + j]
                }
            }
        }
        
        // rook move
        for (let i = 0; i < 2; i++) {
            for (let j = -1; j < 2; j += 2)/*-1 and 1*/ {
                inv_sqr = [king_square[0], king_square[1]]
                inv_sqr[i] += j
                while (inv_sqr[i] >= 0 && inv_sqr[i] < 8) {
                    if (new_board[inv_sqr[0]][inv_sqr[1]] != undefined) {
                        if (new_board[inv_sqr[0]][inv_sqr[1]].side != this.side) {
                            if (new_board[inv_sqr[0]][inv_sqr[1]].name == "rook") {
                                return true
                            }
                            else if (new_board[inv_sqr[0]][inv_sqr[1]].name == "queen") {
                                return true
                            }
                            else{
                                break
                            }
                        }
                        else{
                            break
                        }
                    }
                    inv_sqr[i] += j
                }
            }
        }
        // queen move(contained in B&R moves)
        // king move
        for (let i = -1; i < 2; i++) {
            inv_sqr[0] = king_square[0] + i
            if (inv_sqr[0] >= 0 && inv_sqr[0] < 8){
                for (let j = -1; j < 2; j++) {
                    inv_sqr[1] = king_square[1] + j
                    if (inv_sqr[1] >= 0 && inv_sqr[1] < 8){
                        if (i != 0 || j != 0){
                            if (new_board[inv_sqr[0]][inv_sqr[1]] != undefined){
                                if (new_board[inv_sqr[0]][inv_sqr[1]].side != this.side){
                                    if (new_board[inv_sqr[0]][inv_sqr[1]].name == "king") {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false
    }
    // checkmated
    // stalemated
    //made in player

    king_check_detection(inv_moves){
        var moves = []  
        
        for (let i = 0; i < inv_moves.length; i++) {
            var img_board = JSON.parse(JSON.stringify(board))
            img_board[files.indexOf(inv_moves[i][0][0])][ranks.indexOf(inv_moves[i][0][1])] = this
            img_board[this.square[0]].splice([this.square[1]], 1)
            img_board[this.square[0]].splice([this.square[1]], 0, null);

            if(this.side == "white"){
                if (white.king.checked(img_board, [files.indexOf(inv_moves[i][0][0]), ranks.indexOf(inv_moves[i][0][1])]) == false) {
                    moves.push(inv_moves[i])
                }
            }
            else{
                if (black.king.checked(img_board, [files.indexOf(inv_moves[i][0][0]), ranks.indexOf(inv_moves[i][0][1])]) == false) {
                    moves.push(inv_moves[i])
                }
            }
        }
        return moves
    }
}


class Player{
    constructor(side){
        this.side = side
        this.pawns = []
        this.knights = []
        this.bishops = []
        this.rooks = []
        this.queens = []
        this.move_counts = 0
        if (this.side == "white") {
            var side_rank = ["1", "2"]
        }
        else if(this.side == "black"){
            var side_rank = ["8", "7"]
        }

        for (let i = 0; i < 8; i++) {
            this.pawns.push(new Pawn(files[i] + side_rank[1], this.side))
        }
        for (let i = -1; i < 2; i += 2) {
            this.knights.push(new Knight(files[3.5 + i * 2.5] + side_rank[0], this.side))
            this.bishops.push(new Bishop(files[3.5 + i * 1.5] + side_rank[0], this.side))
            this.rooks.push(new Rook(files[3.5 + i * 3.5] + side_rank[0], this.side))
        }
        this.queens.push(new Queen("d" +  side_rank[0], this.side))

        this.king = new King("e" +  side_rank[0], this.side)

        this.pieces = this.get_pieces()
    }

    get_pieces(){
        return [this.pawns, this.knights, this.bishops, this.rooks, this.queens, this.king]
    }

    get_all_moves(){
        var move_counts = 0
        for (let i = 0; i < this.pawns.length; i++) {
            move_counts += this.pawns[i].get_moves().length
        }
        for (let i = 0; i < this.knights.length; i++) {
            move_counts += this.knights[i].get_moves().length
        }
        for (let i = 0; i < this.bishops.length; i++) {
            move_counts += this.bishops[i].get_moves().length
        }
        for (let i = 0; i < this.rooks.length; i++) {
            move_counts += this.rooks[i].get_moves().length
        }
        for (let i = 0; i < this.queens.length; i++) {
            move_counts += this.queens[i].get_moves().length
        }
        move_counts += this.king.get_moves().length
        this.move_counts = move_counts
        if (this.move_counts == 0){
            if(this.king.is_checked == true) {
                this.king.is_mated = true
            }
            else{
                this.king.is_staled = true
            }
        }
    }

    captured(note){
        for (let i = 0; i < this.pieces.length; i++) {
            for (let j = 0; j < this.pieces[i].length; j++) {
                if (this.pieces[i][j].notation_square == note) {
                    this.pieces[i].splice(j, 1)
                    return
                }
            }
        }
    }
}

// player
white = new Player("white")

black = new Player("black")



function draw_board(moved_square) {
    var value = [0, 0]
    sides = [white, black]
    for (let h = 0; h < 2; h++) {
        const player = sides[h];

        for (let i = 0; i < 5; i++) {
            var piece = player.pieces[i]

            for (let j = 0; j < piece.length; j++) {

                var piece_img = player.side + "_" + piece[j].name

                if (i == 0){
                    var square = document.getElementById("piece_slot_" + piece[j].notation_square + "_white")
                    square.innerHTML = `<img src="${piece_img}.png" alt="piece" height="50px">`
                    var square = document.getElementById("piece_slot_" + piece[j].notation_square + "_black")
                    square.innerHTML = `<img src="${piece_img}.png" alt="piece" height="50px">`
                }
                else{
                    var square = document.getElementById("piece_slot_" + piece[j].notation_square + "_white")
                    square.innerHTML = `<img src="${piece_img}.png" alt="piece" height="70px">`
                    var square = document.getElementById("piece_slot_" + piece[j].notation_square + "_black")
                    square.innerHTML = `<img src="${piece_img}.png" alt="piece" height="70px">`
                } 

                value[h] += piece[j].value
            }
        }
        var piece_img = player.side + "_king"

        var square = document.getElementById("piece_slot_" + player.king.notation_square + "_white")
        square.innerHTML = `<img src="${piece_img}.png" alt="piece" height="70px">`
        var square = document.getElementById("piece_slot_" + player.king.notation_square + "_black")
        square.innerHTML = `<img src="${piece_img}.png" alt="piece" height="70px">`
    }

    var color
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2) {
                color = "brown"
            }
            else{
                color = "wheat"
            }
            var square = document.getElementById(files[j] + ranks[7 - i] + "_white")
            square.style = `background-color: ${color};`
            var square = document.getElementById(files[j] + ranks[7 - i] + "_black")
            square.style = `background-color: ${color};`
        }
    }

    if (white.king.is_checked == true) {
        var square = document.getElementById(white.king.notation_square + "_white")
        square.style = `background-color: rgb(253, 52, 52);`
    }
    if (black.king.is_checked == true) {
        var square = document.getElementById(black.king.notation_square + "_black")
        square.style = `background-color: rgb(253, 52, 52);`
    }

    if (moved_square) {
        var square = document.getElementById(moved_square + "_white")
        square.style = `background-color: rgb(241, 241, 101);`
        var square = document.getElementById(moved_square + "_black")
        square.style = `background-color: rgb(241, 241, 101);`
    }

    white_value.innerHTML = ``
    black_value.innerHTML = ``
    if (value[0] - value[1] > 0) {
        white_value.innerHTML = `<p>+${value[0] - value[1]}</p>`
    }
    if (value[0] - value[1] < 0){
        black_value.innerHTML = `<p>+${value[1] - value[0]}</p>`
    }
}

function clear_board(notation_square) {
    var square = document.getElementById("piece_slot_" + notation_square + "_white")
    square.innerHTML = ``
    var square = document.getElementById("piece_slot_" + notation_square + "_black")
    square.innerHTML = ``
}

white.get_all_moves()
black.get_all_moves()

console.log(white);
console.log(black);
console.log(board)