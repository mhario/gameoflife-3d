// this module will:
//
//  expose the init() function which:
//      creates the board and displays it on the screen
//      
//  export the board state as a variable
//      game logic will be in another file
//      and directly access the board state here.
//      this may or may not be stupid.
//
//  /// /// ///
var scene, camera, renderer, controls;
var geometry, material, mesh;


import { SEED_LIFE_RATIO, MIN_LIVING_NEIGHBORS, MAX_LIVING_NEIGHBORS, LIVING_NEIGHBORS_TO_BIRTH } from '../containers/SidebarContainer.jsx';

import { CUBE_SIZE, BOARD_SIZE } from '../containers/SidebarContainer.jsx';

// this is the (one and only) board state variable
// there is a good chance that this 
//    should be refactored into the react state
export let allCells;

// init will: 
//    create a camera and renderer
//    produce an array of cell objects (randomly alive/dead)
//    add the cell objects to the scene
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

  // build a single 'cell' object
  // this object is the 3js mesh
  // 'params' is an object that will include keys x,y,z, and isAlive
  const createCell = function(params){
    const color = params.isAlive ? 0x00ff00 : 0xff0000;
    material = new THREE.MeshPhongMaterial( { color: color, wireframe: !params.isAlive } );
    mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = params.x;
    mesh.position.y = params.y;
    mesh.position.z = params.z;
    mesh.isAlive = params.isAlive;
    mesh.isAliveNextTurn = null;


    mesh.setStatus = function(){
      if (this.isAlive === null) throw Error ('null alive state');
      if (this.isAlive){
        this.material.wireframe = false;
        this.material.visible = true;
        this.material.color.g = 1;
        this.material.color.r = 0;
      } else {
        this.material.visible = false;
        this.material.color.r = 1;
        this.material.color.g = 1;
      }
    }
    
    return mesh;
  }


  // creates and returns an array of cell objects
  // this array will be accesed like so, in 3d:
  //
  //    cells[x][y][z]
  //
  function buildBoard () {
    let temp = [];
    for(let x = 0; x <= BOARD_SIZE; x++){
      temp[x] = [];
      for(let y = 0; y <= BOARD_SIZE; y++){
        temp[x][y] = [];
        for(let z = 0; z <= BOARD_SIZE; z++){
          let isAlive = (Math.random() < SEED_LIFE_RATIO);
          temp[x][y][z] = createCell({x:x*CUBE_SIZE,y:y*CUBE_SIZE, z:z*CUBE_SIZE, isAlive:isAlive}); 
          scene.add(temp[x][y][z]);
        }
      }
    }

    // creates an array of neighbors on each cell on the board
    // will not contain cells that are out-of-bounds (invalid)
    // this is in hopes of simplifying game logic at the cost of using 
    //    a       very      ugly hexa-for-loop
    for(let x = 0; x <= BOARD_SIZE; x++){
      for(let y = 0; y <= BOARD_SIZE; y++){
        for(let z = 0; z <= BOARD_SIZE; z++){
          temp[x][y][z].neighbors = [];
          for(let a = -1; a <= 1; a++){
            for(let b = -1; b <= 1; b++){
              for(let c = -1; c <= 1; c++){
                // do not count self as a neighbor
                if (a===0 && b===0 && c===0) continue;
                if (a+x < 0 || b+y < 0 || c+z < 0) continue;
                if (a+x > BOARD_SIZE || b+y > BOARD_SIZE || c+z > BOARD_SIZE)continue;
                temp[x][y][z].neighbors.push(temp[a+x][b+y][c+z]);
              }
            }
          }
        }
      }
    }

    return temp;
  }

//  adds the cells to the scene
  allCells = buildBoard();
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
