// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Grid_1 : 1000,
    Grid_2 : 460,
    Grid_3 : 250,
    Grid_4 : 20,
    Grid_5 : 23,
    Grid_6 : 10,
    Grid_7 : 30,
    Seed : 0,
    Enhanced : 4,
    Margin : 30,
    Stroke_size : 5,

    Download_Image: () => save(),
}

gui.add(params, "Seed", 0, 100, 1)
gui.add(params, "Enhanced", 1, 10, 1)
gui.add(params, "Grid_1", 0, 2000, 1)
gui.add(params, "Grid_2", 0, 700, 1)
gui.add(params, "Grid_3", 0, 700, 1)
gui.add(params, "Grid_4", 0, 50, 1)
gui.add(params, "Grid_5", 0, 50, 1)
gui.add(params, "Grid_6", 0, 50, 1)
gui.add(params, "Grid_7", 0, 50, 1)
gui.add(params, "Download_Image")



// -------------------
//       Drawing
// -------------------


function  createGridCenter(N) {

    //Créer une grille de carrés dans la zone centrale

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(width - size - 2*params.Margin) + params.Margin
        let H = random(height - size - 2*params.Margin) + params.Margin


        if (H < -L + height && H > -1.25*L + height/2 - 40) {
            square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
        }
        else {
            i--
        }
    }
}

function createGridUp(N) {

    //Créer une grille de carrés dans la zone haute et centrale

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(width - size - 2*params.Margin) + params.Margin
        let H = random(height - size - 2*params.Margin) + params.Margin
    
        if (H < -L + height) {
            square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
        }
        else {
            i--
        }
    }
}

function createGridDown(N) {

    //Créer une grille de carrés dans la zone basse

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(width - size - 2*params.Margin) + params.Margin
        let H = random(height - size - 2*params.Margin) + params.Margin
    
        if (H > -L + height) {
            square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
        }
        else {
            i--
        }
    }
}


function createGridDown_2(N) {

    //Créer une grille de carrés dans la zone basse

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(width - size - 2*params.Margin) + params.Margin
        let H = random(height - size - 2*params.Margin) + params.Margin
    
        if (H > -L + 2*height/3 && H < -L + 4*height/3) {
            square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
        }
        else {
            i--
        }
    }
}

function  createImperfection(N) {

    //Créer une grille de carrés dans la zone centrale

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(115, 210)
        let H = random(355, 410)

        square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
    }
}

function draw() {
    background(253, 253, 230)
    randomSeed(params.Seed)
    noFill()
    strokeWeight(params.Stroke_size)

    
    let b = color(13, 85, 144) 
    let j = color(246, 165, 0)
    let r = color(247, 88, 45) 
    

    stroke(j)
    createGridUp(params.Grid_1)
    push()
        translate(random(10, 20), random(7, 9))
        createGridDown(params.Grid_4)
    pop()


    stroke(r)
    square(55, 55, (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2, 3) //Création du carré "iconique"
    createGridCenter(params.Grid_2)
    push()
        translate(random(10, 20), 1)
        createGridDown_2(params.Grid_5)
    pop()
    push()
        translate(12,12) 
        createImperfection(params.Grid_7)
        translate(43,-19) 
        createImperfection(params.Grid_7)
    pop()
    
    
    stroke(b)
    square(35, 55, (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2, 3) // Création du carré "iconique"
    createGridCenter(params.Grid_3)
    createGridDown(params.Grid_6)
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}
