var color = ""

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 18; j++) {
        if ((i + j) % 2 == 0) {
            color = "rgb(36, 36, 36)"
        }
        else{
            color = "black"
        }
        document.write(`<div style="background-color: ${color}; height: 80px; width: 80px;"></div>`)
    }
}