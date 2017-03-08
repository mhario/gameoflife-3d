var scene, camera, renderer, controls;
var geometry, material, mesh;

import { CUBE_SIZE, BOARD_SIZE, SEED_LIFE_RATIO } from '../containers/SidebarContainer.jsx';

// init will:
//    create a camera, lights, and renderer
//    produce and seed the game board
//    add the cell objects to the scene
//    return the cell board to the SidebarContainer
export function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x55aa55 );
  renderer.setSize( window.innerWidth, window.innerHeight );

  var container = document.getElementById( 'game' );
  container.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.x = BOARD_SIZE * CUBE_SIZE / 2;
  camera.position.y = BOARD_SIZE * CUBE_SIZE / 2;
  camera.position.z = BOARD_SIZE * CUBE_SIZE * 2;

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = true;

  let light = new THREE.DirectionalLight( 0xcccccc );
  light.position.set( 1, 1, 1 );
  scene.add( light );
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( -1, -1, 200 );
  scene.add( light );
  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );

  geometry = new THREE.BoxGeometry( CUBE_SIZE, CUBE_SIZE, CUBE_SIZE );
  window.addEventListener( 'resize', onWindowResize, false );

  //  adds the cells to the scene
  let allCells = buildBoard();
  return allCells;
}

// build a single 'cell' object
// this object is the 3js mesh
// 'params' is an object that will include keys x,y,z, and isAlive
export const createCell = function(params){
  const color = 0x00ff00;
  material = new THREE.MeshPhongMaterial( { color: color, wireframe: false } );
  material.visible = params.isAlive;
  mesh = new THREE.Mesh( geometry, material );

  mesh.position.x = params.x;
  mesh.position.y = params.y;
  mesh.position.z = params.z;
  mesh.isAlive = params.isAlive;
  mesh.isAliveNextTurn = null;

  mesh.setStatus = function(){
    if (this.isAlive){
      this.material.visible = true;
    } else {
      this.material.visible = false;
    }
  }

  return mesh;
}

// creates, adds to scene, and returns an array of cell objects
// this array will be accesed like so, in 3d:
//
//    cells[x][y][z]
export function buildBoard () {
  let boardCells = [];
  for(let x = 0; x <= BOARD_SIZE; x++){
    boardCells[x] = [];
    for(let y = 0; y <= BOARD_SIZE; y++){
      boardCells[x][y] = [];
      for(let z = 0; z <= BOARD_SIZE; z++){
        let isAlive = (Math.random() < SEED_LIFE_RATIO);
        boardCells[x][y][z] = createCell({x:x*CUBE_SIZE,y:y*CUBE_SIZE, z:z*CUBE_SIZE, isAlive:isAlive});
        scene.add(boardCells[x][y][z]); // add the cell to the scene
      }
    }
  }

  // creates an array of neighbors on each cell on the board
  // will not contain cells that are out-of-bounds (invalid)
  for(let x = 0; x <= BOARD_SIZE; x++){
    for(let y = 0; y <= BOARD_SIZE; y++){
      for(let z = 0; z <= BOARD_SIZE; z++){
        boardCells[x][y][z].neighbors = [];
        for(let a = -1; a <= 1; a++){
          for(let b = -1; b <= 1; b++){
            for(let c = -1; c <= 1; c++){
              // do not count self as a neighbor
              if (a===0 && b===0 && c===0) continue;
              if (a+x < 0 || b+y < 0 || c+z < 0) continue;
              if (a+x > BOARD_SIZE || b+y > BOARD_SIZE || c+z > BOARD_SIZE)continue;
              boardCells[x][y][z].neighbors.push(boardCells[a+x][b+y][c+z]);
            }
          }
        }
      }
    }
  }
  return boardCells;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//  this is magic
export function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}
