const title = document.getElementById('title');
const board = document.getElementById('board');
const jigsawBoxLeft = document.getElementById('jigsaw_box_left');
const jigsawBoxRight = document.getElementById('jigsaw_box_right');
const jigsawBoxBottom = document.getElementById('jigsaw_box_bottom');
const boxes = [jigsawBoxLeft,jigsawBoxRight, jigsawBoxBottom];

// Modal Options
const modal = document.getElementById('modal');
const childrenOpt = document.getElementById('children');
const grocerOpt = document.getElementById('grocer');
const parkOpt = document.getElementById('park');
const icerinkOpt = document.getElementById('icerink');

const imageOptionPath =['Images/Children/jigsaws/',
                    'Images/GroceryShop/jigsaws/',
                    'Images/Park/jigsaws/',
                    'Images/Icerink/jigsaws/'
                ]

let dragged = null;
let jigsawsOrder = [];
let allTiles = null;
let allJigsaws = [];
let turns_counter= 0;
 
/*
    5. Add a 'finished' effect, once puzzle is complete.
    6. Add a 'picked-up' and a 'hover' effect.
*/


childrenOpt.addEventListener('click', ()=> init(imageOptionPath[0], '.png'));

grocerOpt.addEventListener('click', ()=> init(imageOptionPath[1], '.png'));

parkOpt.addEventListener('click', ()=> init(imageOptionPath[2], '.png'));

icerinkOpt.addEventListener('click', ()=> init(imageOptionPath[3], '.jpg'));


function buildBoard() {

    
    for(let i=1; i<=25; i++) {
        let tile = document.createElement('div');
        tile.classList.add('boardTile');
        tile.setAttribute('data-id', i)
        board.appendChild(tile);
        
        tile.addEventListener('dragenter', (ev)=>{ev.preventDefault()});
        tile.addEventListener('dragover', (ev)=>{ev.preventDefault()
                                            tile.classList.add('dragover')});
        tile.addEventListener('dragleave', (ev)=>{ev.preventDefault();
                                            tile.classList.remove('dragover')});
        tile.addEventListener('drop', (ev)=>{ev.preventDefault();
            
            turns_counter++;
            tile.classList.remove('dragover');
            let parent = ev.target.parentNode;
            if(parent.classList.contains('occupied')){
                let oldTile = ev.target;
                
                dragged.parentNode.appendChild(oldTile);
                if(dragged.parentNode === boxes[0] || dragged.parentNode === boxes[1] || dragged.parentNode === boxes[2])
                {oldTile.classList.remove('onBoard');}

                parent.appendChild(dragged);
                dragged.classList.add('onBoard');
                checkCompletion();
                return
            }

            if(ev.target.classList.contains('boardTile')){dragged.classList.add('onBoard')}
            ev.target.appendChild(dragged);
            ev.target.classList.add('occupied');
            checkCompletion();
            });
            
    }
    
}

function randomizeOrder() {

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

function makeJigsaws(imageOption, format) {
    for(let i=1; i<=jigsawsOrder.length; i++) {
        let tile = document.createElement('div');
        let jigsaw = document.createElement('img');
        tile.classList.add('jigsawTile');
        jigsaw.classList.add('jigsawImage');
        jigsaw.src = imageOption + i + format;
        tile.setAttribute('data-id', i);
        tile.appendChild(jigsaw);

        
        tile.setAttribute('draggable', true);
        tile.addEventListener('dragstart', (ev)=>{dragged = ev.target;});
        tile.addEventListener('dragenter', (ev)=>{ev.preventDefault()})
        tile.addEventListener('dragover', (ev)=>{ev.preventDefault()})
        
        tile.addEventListener('drop', (ev)=>{
            turns_counter++;
            if(ev.target.hasChildNodes()){return}
            ev.preventDefault();
            dragged.parentNode.removeChild(dragged);
            ev.target.appendChild(dragged);
            ev.target.classList.add('occupied');
            checkCompletion();
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
        turns_counter++;
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
   
    if(correctPlacements === allTiles.length) {
        title.innerHTML = `Well done! You've solved the puzzle in ${turns_counter} turns...`
        let allImages = document.querySelectorAll('.jigsawImage');
        board.classList.add('finished');
        allJigsaws.forEach(jig => {jig.classList.add('finished')});
        allTiles.forEach(tile => {tile.classList.add('finished')});
        allImages.forEach(image => {image.classList.add('finished')});
        restartBtn.classList.remove('inactive');
}
}

function init(picture, format){
    modal.classList.add('inactive');
    switch(picture){
        case  imageOptionPath[0]: title.innerHTML = 'A Rainy Date';
        break
        case  imageOptionPath[1]: title.innerHTML = 'The Neighbourhood Grocer';
        break
        case  imageOptionPath[2]: title.innerHTML = 'A Day at the Park';
        break
        case  imageOptionPath[3]: title.innerHTML = 'Young Winter';
        break
        default: console.log('Something went wrong with the init-function\'s switch statement.');
    }

    buildBoard();
    randomizeOrder();
    buildJigsawboxes();
    makeJigsaws(picture, format);
}

const restartBtn = document.getElementById('restart');

restartBtn.addEventListener('click', ()=>newGame())


function newGame(){
    while(board.childElementCount > 0){ board.removeChild(board.lastChild)}
    allJigsaws = [];
    modal.classList.remove('inactive');
    restartBtn.classList.add('inactive');
}