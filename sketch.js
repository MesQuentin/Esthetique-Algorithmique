Tot = 22

function setup() {
  p6_CreateCanvas()


  if (Tot == 280) {
    return;
  }

  img.loadPixels()
  const base64Image = img.canvas.toDataURL();
  
  const inputs = {
    "image": base64Image
  };
  
  
  fetch('http://localhost:8000/query', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs)
  })
    
  .then(response => response.json())
  .then(outputs => {
    const { depth_map } = outputs;
  })
  
  out = createImg(depth_map)
  out.hide()
  p5.prototype.downloadFile(image, Date.now().toString(), "png")

  Tot++
  
  loadImage("../imgages/Calque "+Tot+".jpg", out => {
    img = out
    setupLoop()
  })
}


function windowResized() {
    p6_ResizeCanvas()
}
