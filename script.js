var g;
var cardx = [170, 310, 100, 240, 380, 170, 310] //120
var cardy = [40, 40, 220, 220, 220, 400, 400] //160
var colorx = [35, 85, 35, 85, 35, 85];
var colory = [30, 30, 80, 80, 130, 130];
var COLORS = [ [255,80,80], [255, 130, 80], [255, 225, 100], [0, 220, 50], [0, 100, 255], [125, 65, 210], [255,255,255] ];
var colors = [ [255,80,80], [255, 130, 80], [255, 225, 100], [0, 220, 50], [0, 100, 255], [125, 65, 210] ];

class Game {
    constructor(){
        this.cardset = cardset(6);
        this.hand = this.cardset.splice(0, 7);
        //console.log(this.hand);
        this.selected = [0,0,0,0,0,0,0];
    }


}

function cardset(num) {
    var cardset = [[]];
    while (cardset[0].length < num) {
        for(i=cardset.length-1; i>=0; i--) {
            cardset.push(cardset[i].concat([1]))
            cardset[i] = cardset[i].concat([0])
        }
    }
    cardset.splice(0, 1)
    cardset = shuffle(cardset)
    console.log(cardset)
    return cardset;
}

function shuffle(cardset) {
    var ret = [];
    cardset = cardset.slice();
    while (cardset.length > 0){
        var index = Math.floor(Math.random() % cardset.length);
        ret.push(cardset.pop[index]);
    }
    return ret;
}


function check(cardsubset) {
    for (i=0; i<6; i++) {
        var sum = 0;
        for (j=0; j<cardsubset.length; j++) {
            sum += cardsubset[j][i]
        }
        if (sum % 2 == 1) {
            return false;
        }
    }
    return true;
}


function setup(){
    createCanvas(600, 600);
    g = new Game();
}

function draw(){
    background(225, 210, 225);
    noStroke();
    fill(255, 255, 255);
    for(i=0; i<7; i++) {
        if (g.selected[i] >= 1) {strokeWeight(2); stroke(150, 150, 150); }
        fill(255, 255, 255);
        if (g.selected[i] < 0) {fill(225, 210, 225);}
        rect(cardx[i], cardy[i], 120, 160, 20);
        for (j=0; j<6; j++) {
            if (g.hand[i][j] == 1 && g.selected[i] >= 0) {
                noStroke(); //
                fill(colors[j][0], colors[j][1], colors[j][2]);
                ellipse(cardx[i] + colorx[j], cardy[i] + colory[j], 30, 30);
            }
        }
    }
    selectset = [];
    for (i=0; i<g.selected.length; i++) {
        if (g.selected[i] == 1) {
            selectset.push(g.hand[i]);
        }
    }
    if (selectset.length > 0) {
        if (check(selectset)) {
            for (i=0; i<g.selected.length; i++) {
                if (g.selected[i] == 1) {
                    // new card
                    if (g.cardset.length > 0) {
                        g.hand[i] = g.cardset.splice(0,1)[0];
                        g.selected[i] = 0;
                        console.log(g.hand)
                    } else {
                        g.selected[i] = -1;
                    }

                }
            }

            
        }
    }





    // rect(110, 110, 120, 160, 20)
    // fill(0, 0, 0)
    // ellipse(150, 150, 25, 25);
    // ellipse(190, 150, 25, 25);
    // ellipse(150, 190, 25, 25);
    // ellipse(150, 230, 25, 25);
}

function mousePressed() {
    //console.log(get(mouseX, mouseY));
    color = get(mouseX, mouseY).splice(0,3);
    for (col=0; col < COLORS.length; col++) {
        if (COLORS[col][0] == color[0] && COLORS[col][1] == color[1] && COLORS[col][2] == color[2]) {
            
            //y: -30, mod 180
            var y = int((mouseY - 30)/180);
            if (y == 1) {
                if ( abs(mouseX - 300) <= 61 && g.selected[3] != -1) {
                    g.selected[3] += 1
                    g.selected[3] %= 2
                } else if (mouseX - 300 > 0 && g.selected[4] != -1) {
                    g.selected[4] += 1
                    g.selected[4] %= 2
                } else if (g.selected[2] != -1) {
                    g.selected[2] += 1
                    g.selected[2] %= 2
                }
            } else {
                if (mouseX - 300 > 0) {
                    if (y == 0 && g.selected[1] != -1) {
                        g.selected[1] += 1
                        g.selected[1] %= 2
                    } else if (g.selected[6] != -1) {
                        g.selected[6] += 1
                        g.selected[6] %= 2
                    }
                } else {
                    if (y == 0 && g.selected[0] != -1) {
                        g.selected[0] += 1
                        g.selected[0] %= 2
                    } else if (g.selected[5] != -1) {
                        g.selected[5] += 1
                        g.selected[5] %= 2
                    }
                }
            }


        }
    }
}