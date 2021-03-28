var gui = new dat.GUI();
var params = {
    Grid_1: 1000,
    Grid_2: 460,
    Grid_3: 250,
    Grid_4: 20,
    Grid_5: 23,
    Grid_6: 10,
    Grid_7: 30,
    Seed: 0,
    Enhanced: 4,
    SousEspece: false,
    Nocturne: false,
    Corail: false,
    Margin: 30,
    Stroke_size: 5,
    Download_Image: function () { return save(); },
};
gui.add(params, "Seed", 0, 100, 1);
gui.add(params, "SousEspece");
gui.add(params, "Nocturne");
gui.add(params, "Corail");
gui.add(params, "Enhanced", 3, 10, 1);
gui.add(params, "Grid_1", 0, 2000, 1);
gui.add(params, "Grid_2", 0, 700, 1);
gui.add(params, "Grid_3", 0, 700, 1);
gui.add(params, "Grid_4", 0, 50, 1);
gui.add(params, "Grid_5", 0, 50, 1);
gui.add(params, "Grid_6", 0, 50, 1);
gui.add(params, "Grid_7", 0, 50, 1);
gui.add(params, "Download_Image");
var LimH = "-1.25*L + height/2 - 40";
var LimB = "-L + height";
function createGridCenter(N) {
    for (var i = 0; i < N; i++) {
        var size = (width - 2 * params.Margin) / params.Enhanced + params.Stroke_size / 2;
        var L = random(width - size - 2 * params.Margin) + params.Margin;
        var H = random(height - size - 2 * params.Margin) + params.Margin;
        try {
            eval("\n            if (H < " + LimB + " && H > " + LimH + ") {\n                square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)\n            }\n            else {\n                i--\n            }\n        ");
        }
        catch (e) {
        }
    }
}
function createGridUp(N) {
    for (var i = 0; i < N; i++) {
        var size = (width - 2 * params.Margin) / params.Enhanced + params.Stroke_size / 2;
        var L = random(width - size - 2 * params.Margin) + params.Margin;
        var H = random(height - size - 2 * params.Margin) + params.Margin;
        try {
            eval("\n            if (H < " + LimB + ") {\n                square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)\n            }\n            else {\n                i--\n            }\n            ");
        }
        catch (e) {
        }
    }
}
function createGridDown(N) {
    for (var i = 0; i < N; i++) {
        var size = (width - 2 * params.Margin) / params.Enhanced + params.Stroke_size / 2;
        var L = random(width - size - 2 * params.Margin) + params.Margin;
        var H = random(height - size - 2 * params.Margin) + params.Margin;
        try {
            eval("\n                if (H > " + LimB + ") {\n                    square( L - (L % 20) + 15, H - (H % 20) + 15, size, 3)\n                }\n                else {\n                    i--\n                }\n            ");
        }
        catch (e) {
        }
    }
}
function createGridDown_2(N) {
    for (var i = 0; i < N; i++) {
        var size = (width - 2 * params.Margin) / params.Enhanced + params.Stroke_size / 2;
        var L = random(width - size - 2 * params.Margin) + params.Margin;
        var H = random(height - size - 2 * params.Margin) + params.Margin;
        if (H > -L + 2 * height / 3 && H < -L + 4 * height / 3) {
            square(L - (L % 20) + 15, H - (H % 20) + 15, size, 3);
        }
        else {
            i--;
        }
    }
}
function createImperfection(N) {
    for (var i = 0; i < N; i++) {
        var size = (width - 2 * params.Margin) / params.Enhanced + params.Stroke_size / 2;
        var L = random(115, 210);
        var H = random(355, 410);
        square(L - (L % 20) + 15, H - (H % 20) + 15, size, 3);
    }
}
function draw() {
    background(253, 253, 230);
    var b = color(13, 85, 144);
    var j = color(246, 165, 0);
    var r = color(247, 88, 45);
    if (params.Nocturne) {
        background(0);
        b = color('#d89216');
        j = color('#d44000');
        r = color('#e1d89f');
    }
    if (params.Corail) {
        background('#e7e7de');
        b = color('#008891');
        j = color('#0f3057');
        r = color('#c64756');
    }
    randomSeed(params.Seed);
    noFill();
    strokeWeight(params.Stroke_size);
    stroke(j);
    createGridUp(params.Grid_1);
    push();
    translate(random(10, 20), random(7, 9));
    createGridDown(params.Grid_4);
    pop();
    stroke(r);
    push();
    translate(random(10, 20), 1);
    createGridDown_2(params.Grid_5);
    pop();
    if (!params.SousEspece) {
        square(55, 55, (width - 2 * params.Margin) / params.Enhanced + params.Stroke_size / 2, 3);
        push();
        translate(12, 12);
        createImperfection(params.Grid_7);
        translate(43, -19);
        createImperfection(params.Grid_7);
        pop();
    }
    else {
        push();
        translate(random(10, 20), 1);
        createGridDown(params.Grid_5);
        pop();
    }
    createGridCenter(params.Grid_2);
    stroke(b);
    if (!params.SousEspece) {
        square(35, 55, (width - 2 * params.Margin) / params.Enhanced + params.Stroke_size / 2, 3);
    }
    createGridCenter(params.Grid_3);
    createGridDown(params.Grid_6);
}
function setup() {
    p6_CreateCanvas();
    createInput(LimH).input(function (e) { return LimH = e.target.value; });
    createInput(LimB).input(function (e) { return LimB = e.target.value; });
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map