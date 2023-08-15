let selected = undefined; //indexed from 0
let added_tiles = [[[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []]]; // first list for flowers, 3, 3, 3, 3, 2
let suits = ["b", "c", "r"]; //bamboo, character, round(circle)
data = undefined

function init() {
    data = this.$data;
}

//Passes names and tiles to Alpine x-data
function pushAlpine(){
    data.names = [data.name1, data.name2, data.name3, data.name4];
    data.tiles = tiles;
}

//Select player to add tile to, deselect previous selected
function select(player){
    selected = player;
    console.log(selected);
    for(let i = 0; i < 4; i++){
        if(i == selected){
            document.getElementById("ply".concat(i.toString())).classList.add("selected");
        }
        else if(document.getElementById("ply".concat(i.toString())).classList.contains("selected")){
            document.getElementById("ply".concat(i.toString())).classList.remove("selected");
        }
    }
}

//Adds tile with ident to selected player
function addTile(ident){
    console.log(ident);
    if(selected != undefined){
        if(ident.charAt(0) == "f"){
            added_tiles[selected][0].push(ident);
        }
        else{
            for(let i = 1; i < 6; i++){
                if(added_tiles[selected][i].length < 3 && i != 5){
                    added_tiles[selected][i].push(ident);
                    addImgToTable(ident, selected, added_tiles[selected][i].length - 1, i - 1);
                    break;
                }
                else if(added_tiles[selected][i][0] == added_tiles[selected][i][1] && added_tiles[selected][i][0] == added_tiles[selected][i][2] && added_tiles[selected][i][0] == ident && added_tiles[selected][i].length < 4 && i != 5){
                    added_tiles[selected][i].push(ident);
                    addImgToTable(ident, selected, 1, i - 1, true)
                    break;
                }
                else if(added_tiles[selected][i].length < 2 && i == 5){
                    added_tiles[selected][i].push(ident);
                    addImgToTable(ident, selected, added_tiles[selected][i].length - 1, i - 1);
                    break;
                }
            }
        }
    }
}

//Adds the image of the tile to the given x,y cords on the player's table, rot = true if it has to be rotated
function addImgToTable(tile, ply, x, y, rot = false){
    var cords = getTableCords(ply);
    var div = document.getElementById("images");
    var img = document.createElement("img");
    img.src = "assets/images/" + tile + ".png";
    img.id = "tableimg_" + ply + "_" + x + "_" + y;
    img.classList.add("table_tile");
    img.style.left = cords[0] + x * 85 + "px";
    img.style.top = cords[1] + y * 125 + "px";
    img.setAttribute("x-on:click", "removeImg(" + ply + "," + x + "," + y + ")")
    if(rot){
        img.style.transform = "rotate(90deg)";
        img.style.zIndex = "100";
        img.id = "tableimg_" + ply + "_" + 3 + "_" + y;
        img.setAttribute("x-on:click", "removeImg(" + ply + "," + 3 + "," + y + ")")
    }
    div.appendChild(img);
    console.log(tile);
}

//Gets the top and left edges of the table
function getTableCords(id){
    var table = document.getElementById("table" + id);
    var bound = table.getBoundingClientRect();
    return [bound.left, bound.top];
}

//Removes tile from given player at given x,y cords
function removeImg(ply, x, y){
    img = document.getElementById("tableimg_" + ply + "_" + x + "_" + y);
    div = document.getElementById("images");
    div.removeChild(img);
    delete added_tiles[ply][y][x];
    console.log(added_tiles);
}