var scene, camera, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.x = 500;
  camera.position.y = 500;
  camera.position.z = 1500;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  geometry = new THREE.BoxGeometry( 200, 200, 200 );

  //build a single 'cell' object
  //'params' is an object that will include keys x,y,z, and isAlive
  //size and other variables should be factored out somewhere
  const createCell = function(params){
    const color = params.isAlive ? 0x00ff00 : 0xff0000;
    material = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );
    mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = params.x;
    mesh.position.y = params.y;
    
    return mesh;
  }


  const buildBoard = function (){
    let temp = [];
    for(let x = 0; x <= 5; x++){
      for(let y = 0; y <= 5; y++){
        isAlive = (Math.random() > 0.5);
        temp.push(createCell({x:x*cubeSize,y:y*cubeSize, isAlive:isAlive}));
      }
    }
    return temp;
  }

  const cubeSize = 200;
  allCells = buildBoard();
  scene.add(...allCells);
}

function animate() {

  requestAnimationFrame( animate );
  renderer.render( scene, camera );

}

