import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x090909);

// CÁMARA
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 4);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- B. LUCES  ---
// Luz ambiental (ilumina todo suavemente)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Luz direccional (como el sol)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight); 

// CREAR EL LOADER, objeto que me permite cargar un modelo GLB
const loader = new GLTFLoader();
let model; // Guardar referencia al modelo
let model2; // Guardar referencia al segundo modelo
const originalMaterials = {}; // Guardar materiales originales

// CARGAR MODELO
loader.load(
  'models/Violin.glb',
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
    
    // Guardar los materiales originales
    model.traverse((child) => {
      if (child.isMesh) {
        originalMaterials[child.uuid] = {
          color: child.material.color.clone(),
          emissive: child.material.emissive.clone()
        };
      }
    });
  },
  undefined,
  function (error) {
    console.error('Error cargando GLB:', error);
  }
);

// CARGAR OTRO MODELO
loader.load(
  'models/Arco.glb',
  function (gltf) {
    model2 = gltf.scene;
    scene.add(model2);

    // Guardar los materiales originales
    model2.traverse((child) => {
      if (child.isMesh) {
        originalMaterials[child.uuid] = {
          color: child.material.color.clone(),
          emissive: child.material.emissive.clone()
        };
      }
    });
  },
  undefined,
  function (error) {
    console.error('Error cargando GLB:', error);
  }
);

// --- RAYCASTER PARA HOVER ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isHovering = false;
let hoverProgress = 0; // 0 = sin hover, 1 = hover completo
const hoverSpeed = 0.1; // Velocidad de animación

window.addEventListener('mousemove', (event) => {
  // Convertir posición del mouse a coordenadas normalizadas (-1 a 1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  if (model || model2) {
    // Actualizar el rayo con la posición del mouse
    raycaster.setFromCamera(mouse, camera);

    // Detectar intersecciones con AMBOS modelos
    const models = [model, model2].filter(m => m); // Filtrar solo los modelos que existen
    const intersects = raycaster.intersectObjects(models, true);

    if (intersects.length > 0) {
      // Mouse está sobre el modelo
      document.body.style.cursor = 'pointer';
      isHovering = true;
    } else {
      // Mouse NO está sobre el modelo
      document.body.style.cursor = 'default';
      isHovering = false;
    }
  }
});

// --- D. CONTROLES (La navegación) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añade inercia al movimiento (más suave)

// LOOP
function animate() {
  requestAnimationFrame(animate);

  // Animar el hover gradualmente
  if (isHovering && hoverProgress < 1) {
    hoverProgress = Math.min(hoverProgress + hoverSpeed, 1);
  } else if (!isHovering && hoverProgress > 0) {
    hoverProgress = Math.max(hoverProgress - hoverSpeed, 0);
  }

  // Aplicar el color con interpolación
  if (model || model2) {
    const models = [model, model2].filter(m => m);
    models.forEach((targetModel) => {
      targetModel.traverse((child) => {
        if (child.isMesh && originalMaterials[child.uuid]) {
          const r = Math.floor(0x44 * hoverProgress);
          const g = Math.floor(0x44 * hoverProgress);
          const b = Math.floor(0x44 * hoverProgress);
          const hoverColor = (r << 16) | (g << 8) | b;
          child.material.emissive.setHex(hoverColor);
        }
      });
    });
  }

  //controls.update();
  renderer.render(scene, camera);
}
animate();

// Ajustar si cambian el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});