
const board = document.getElementById('board');
const jigsawBox = document.getElementById('jigsaw_box');

let current_tile;
let other_tile;
let pieces = [];

let used_numbers = [];
let turns_counter= 0;
let events = ['dragstart', 'dragover', 'dragenter', 'dragleave', 'drop', 'dragend'];
const actions = [dragStart, dragOver, dragEnter, dragLeave, dragDrop, dragEnd];
 

buildBoard(5,5);
findJigsaws(pieces);

function buildBoard(rows, columns) {
    let number_of_tiles = rows*columns;

    for(let i=0; i<rows; i++) {
        for(let i=0; i<columns; i++) {
            let tile = document.createElement('img');
            tile.classList.add('image_pieces');

            events.forEach(ev => tile.addEventListener(ev, actions[events.indexOf(ev)]));
            board.append(tile);
        }
    }

    for(let i = 1; i <= number_of_tiles; i++) {
        let order_number = Math.floor((Math.random()*number_of_tiles) + 1);
            
        if(used_numbers.includes(order_number)) {
            i--;
        } else {
            used_numbers.push(order_number);
            pieces.push(order_number.toString());
        }
        }
    
    }

    

function findJigsaws(container) {
    for(let i=0; i<pieces.length; i++) {
        let tile = document.createElement('img');
        tile.classList.add('jigsaw_box_pieces');
        tile.src = 'Images/' + container[i] + '.jpg';

        events.forEach(ev => tile.addEventListener(ev, actions[events.indexOf(ev)]));
        jigsawBox.append(tile);
        }
    }





function dragStart() {
    current_tile = this;
    }

function dragOver(e) {
    e.preventDefault();
    }

function dragEnter(e) {
    e.preventDefault();
    }

function dragLeave() {

    }

function dragDrop(e) {
    e.preventDefault();
    other_tile = this; 
    }

function dragEnd() {
    if (current_tile.src.includes("blank")) {
        return;
    }
    let currImg = current_tile.src;
    let otherImg = other_tile.src;
    current_tile.src = otherImg;
    other_tile.src = currImg;

    turns_counter += 1;
    document.getElementById("turns").innerText = turns_counter;
    }

    
      