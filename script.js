
const board = document.getElementById('board');
const jigsawBoxLeft = document.getElementById('jigsaw_box_left');
const jigsawBoxRight = document.getElementById('jigsaw_box_right');
const jigsawBoxBottom = document.getElementById('jigsaw_box_bottom');
const boxes = [jigsawBoxLeft,jigsawBoxRight, jigsawBoxBottom];

let dragged = null;
let jigsawsOrder = [];
let allTiles = null;
let allJigsaws = [];


let turns_counter= 0;
 
/*
    3. Bring back turn-counter.
    5. Add a 'finished' effect, once puzzle is complete.
    6. Add a 'picked-up' and a 'hover' effect.
*/


buildBoard();
shuffleJigsaws();
buildJigsawboxes();
makeJigsaws();



function buildBoard() {

    
    for(let i=1; i<=25; i++) {
        let tile = document.createElement('div');
        tile.classList.add('boardTile');
        tile.setAttribute('data-id', i)
        board.appendChild(tile);
        
        tile.addEventListener('dragenter', (ev)=>{ev.preventDefault()})
        tile.addEventListener('dragover', (ev)=>{ev.preventDefault()})
        tile.addEventListener('drop', (ev)=>{ev.preventDefault();
            
            
            let parent = ev.target.parentNode;
            if(parent.classList.contains('occupied')){
                let oldTile = ev.target;
                
                dragged.parentNode.appendChild(oldTile);
                if(dragged.parentNode === boxes[0] || dragged.parentNode === boxes[1] || dragged.parentNode === boxes[2])
                {oldTile.classList.remove('onBoard');}

                parent.appendChild(dragged);
                dragged.classList.add('onBoard');
                return
            }

            if(ev.target.classList.contains('boardTile')){dragged.classList.add('onBoard')}
            ev.target.appendChild(dragged);
            ev.target.classList.add('occupied');
            checkCompletion();
            })
            
    }
    
}

function shuffleJigsaws() {

    let used_numbers = [];
    for(let i=1; i<=25; i++) {
        let order_number = Math.floor((Math.random()*25) + 1);
            
        if(used_numbers.includes(order_number)) {
            i--;
        } else {
            used_numbers.push(order_number);
            jigsawsOrder.push(order_number.toString());
        }
        }
}

function makeJigsaws() {
    for(let i=1; i<=jigsawsOrder.length; i++) {
        let tile = document.createElement('div');
        let jigsaw = document.createElement('img');
        tile.classList.add('jigsawTile');
        jigsaw.classList.add('jigsawImage');
        jigsaw.src = 'Images/Park/jigsaws/' + i + '.png';
        tile.setAttribute('data-id', i);
        tile.appendChild(jigsaw);

        
        tile.setAttribute('draggable', true);
        tile.addEventListener('dragstart', (ev)=>{dragged = ev.target;});
        tile.addEventListener('dragenter', (ev)=>{ev.preventDefault()})
        tile.addEventListener('dragover', (ev)=>{ev.preventDefault()})
        
        tile.addEventListener('drop', (ev)=>{
            if(ev.target.hasChildNodes()){return}
            ev.preventDefault();
            dragged.parentNode.removeChild(dragged);
            ev.target.appendChild(dragged);
            ev.target.classList.add('occupied');
        })

        
        allJigsaws.push(tile);
        
    }

    
    for(i=0; i<allJigsaws.length; i++) {
        if(jigsawBoxLeft.children.length < 6){jigsawBoxLeft.appendChild(allJigsaws[jigsawsOrder[i]-1]);}
        else if(jigsawBoxRight.children.length < 6){jigsawBoxRight.appendChild(allJigsaws[jigsawsOrder[i]-1]);}
        else{jigsawBoxBottom.appendChild(allJigsaws[jigsawsOrder[i]-1]);}
    }
}

function buildJigsawboxes(){

    boxes.forEach(box => {box.addEventListener('dragenter', (ev)=>{ev.preventDefault()});});
    boxes.forEach(box => {box.addEventListener('dragover', (ev)=>{ev.preventDefault()});});
    boxes.forEach(box => {box.addEventListener('drop', (ev)=>{
        ev.preventDefault();
        box.appendChild(dragged);
        dragged.classList.remove('onBoard');
    });});
}

function checkCompletion() {
    
    let correctPlacements = 0;
    allTiles = document.querySelectorAll('.boardTile');
    allTiles.forEach(tile => {
        if(tile.children[0] === undefined){return}
        if(tile.dataset.id === tile.children[0].dataset.id) {correctPlacements++;}
    });
   
    if(correctPlacements === allTiles.length) {console.log('Congratulations!')}
}
      