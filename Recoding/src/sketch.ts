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

    Apocalypse : false,
    Seed : 0,
    Enhanced : 4,
    SousEspece : false,
    Nocturne : false,
    Corail : false,

    Margin : 30,
    Stroke_size : 5,
    Download_Image: () => save(),
}

gui.add(params, "Apocalypse")
gui.add(params, "SousEspece")
gui.add(params, "Nocturne")
gui.add(params, "Corail")
gui.add(params, "Enhanced", 3, 10, 1)
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


let LimH = "-1.25*L + height/2 - 40"
let LimB = "-L + height"

/* Pour retrouver les paramètres du second :
let LimH = "115"
let LimB = "195"
*/

function  createGridCenter(N) {

    //Créer une grille de carrés dans la zone centrale

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(width - size - 2*params.Margin) + params.Margin
        let H = random(height - size - 2*params.Margin) + params.Margin


        try{
            eval(`
            if (H < ${LimB} && H > ${LimH}) {
                square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
            }
            else {
                i--
            }
        `)
        }

        catch(e) {

        }
    }
}

function createGridUp(N) {

    //Créer une grille de carrés dans la zone haute et centrale

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(width - size - 2*params.Margin) + params.Margin
        let H = random(height - size - 2*params.Margin) + params.Margin
    
        try {
            eval(`
            if (H < ${LimB}) {
                square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
            }
            else {
                i--
            }
            `)
        }
        catch(e) {

        }
    }
}

function createGridDown(N) {

    //Créer une grille de carrés dans la zone basse

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(width - size - 2*params.Margin) + params.Margin
        let H = random(height - size - 2*params.Margin) + params.Margin
    
        try {
            eval(`
                if (H > ${LimB}) {
                    square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
                }
                else {
                    i--
                }
            `)
        }
        
        catch(e) {

        }
    }
}



function createGridDown_2(N) {

    //Créer une grille de carrés dans la zone basse et un peu dans la zone centrale- Pour l'artwork Original

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

    //Créer une grille de carrés dans la zone centrale - Pour l'artwork Original

    for (let i = 0; i < N ; i++) {
            
        let size = (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2
        let L = random(115, 210)
        let H = random(355, 410)

        square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)
    }
}



function draw() {
    
    background(253, 253, 230)
    
    let b = color(13, 85, 144) 
    let j = color(246, 165, 0)
    let r = color(247, 88, 45) 

    if(params.Nocturne) {
        background(0)
        b = color('#d89216') 
        j = color('#d44000')
        r = color('#e1d89f')
    }
    
    if (params.Corail) {
        background('#e7e7de')
        b = color('#008891') 
        j = color('#0f3057')
        r = color('#c64756')
    }
    
    if (params.Apocalypse) {
        
        // Ce mode est uniquement là dans un but humouristique /!\ Risque épilepsie /!\
        
        params.Seed+=minute()
        const epilepsie = [ color('#d89216'), color('#d44000'), color('#e1d89f'), 
                            color('#008891'), color('#0f3057'), color('#c64756'),
                            color('#e7e7de'), color(13, 85, 144), color(246, 165, 0),
                            color(247, 88, 45) ]
        b = random(epilepsie)
        j = random(epilepsie)
        r = random(epilepsie)
    }
    randomSeed(params.Seed)
    noFill()
    strokeWeight(params.Stroke_size)


    stroke(j)
    createGridUp(params.Grid_1)
    push()
        translate(random(10, 20), random(7, 9))
        createGridDown(params.Grid_4)
    pop()



    stroke(r)
  
    push()
        translate(random(10, 20), 1)
        createGridDown_2(params.Grid_5)
    pop()
    
    if (!params.SousEspece) {
        square(55, 55, (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2, 3) //Création du carré "iconique"   
        push()
            translate(12,12) 
            createImperfection(params.Grid_7)
            translate(43,-19) 
            createImperfection(params.Grid_7)
        pop()
    }
    
    else{
        push()
            translate(random(10, 20), 1)
            createGridDown(params.Grid_5)
        pop()
    }

    createGridCenter(params.Grid_2)
    
    
    
    stroke(b)
    if (!params.SousEspece) {
        square(35, 55, (width-2*params.Margin)/params.Enhanced  + params.Stroke_size/2, 3) // Création du carré "iconique"
    }
    createGridCenter(params.Grid_3)
    createGridDown(params.Grid_6)
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
    // @ts-expect-error
    createInput(LimH ).input(e => LimH = e.target.value /* update value*/)
    // @ts-expect-error
    createInput(LimB ).input(e => LimB = e.target.value /* update value*/)
}

function windowResized() {
    p6_ResizeCanvas()
}