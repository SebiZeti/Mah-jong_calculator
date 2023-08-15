let selected = undefined; //indexed from 0 
let suits = ["b", "c", "r"]; //bamboo, character, round(circle)
data = undefined

// 3, 3, 3, 3, 2, last list for flowers
let added_tiles = [...Array(4)].map(_ => [3, 3, 3, 3, 2, 8].map(l => [...Array(l)]));

function init() {
    data = this.$data;
}

function startGame() {
    for (const td of Array.from(document.querySelectorAll("td"))) {
        td.addEventListener("drop", drop);
        td.addEventListener("dragover", (ev) => ev.preventDefault());
        td.addEventListener("dragenter", (ev) => td.classList.add("hovered"));
        td.addEventListener("dragleave", (ev) => td.classList.remove("hovered"));
    }

    for (const img of Array.from(document.querySelectorAll("img"))) {
        img.addEventListener("dragstart", drag);
    }
    console.log("started");
}

//Passes names and tiles to Alpine x-data
function pushAlpine(){
    data.names = [data.name1, data.name2, data.name3, data.name4];
    data.tiles = tiles;
}
  
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.target.classList.remove("hovered");
    var data = ev.dataTransfer.getData("text");
    if (ev.target.parentElement.classList.contains("flowerRow") && data.charAt(0) != "f") {
        return;
    }
    if (!ev.target.parentElement.classList.contains("flowerRow") && data.charAt(0) == "f") {
        return;
    }
    ev.preventDefault();
    var img = document.getElementById(data);
    if (img.getAttribute("x-ignore")) {
        var [ply_idx, row_idx, col_idx] = findTd(img.parentElement);
        added_tiles[ply_idx][row_idx][col_idx] = undefined;
    }    
    else{
        img = img.cloneNode();
        img.addEventListener("dragstart", drag);
        img.addEventListener("click", removeImg);
        img.setAttribute("x-ignore", "true");
    }

    var [ply_idx, row_idx, col_idx] = findTd(ev.target);
    ev.target.appendChild(img);
    img.id = "tableimg_" + ply_idx + "_" + col_idx + "_" + row_idx;

    added_tiles[ply_idx][row_idx][col_idx] = img.getAttribute("data-tile");
    console.log(added_tiles);
}

function findTd(td) {
    var ret = undefined;
    Array.from(document.querySelectorAll(".player")).forEach((ply, ply_idx) => {
        Array.from(ply.querySelector("table").children[0].children).forEach((row, row_idx) => {
            var col_idx = Array.from(row.children).indexOf(td);
            if (col_idx != -1) {
                ret = [ply_idx, row_idx, col_idx];
            }
        })
    })
    if (ret) {
        return ret;
    }
    throw Error("Oh no!");
}

//Removes tile from given player at given x,y cords
function removeImg(ev){
    const img = ev.target;
    const [ply, y, x] = findTd (img.parentElement);
    img.remove();
    added_tiles[ply][y][x] = undefined;
    console.log(added_tiles[ply]);
}