import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const divHola = document.getElementById('saludos');

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
  'models/baseModel.glb',
  function (gltf) {
    model = gltf.scene;
    scene.add(model);

    model.userData.name = "BaseModel";

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
    console.error('Error cargando baseModel.glb:', error);
  }
);

// CARGAR SEGUNDO MODELO
loader.load(
  'models/Brain.glb',
  function (gltf) {
    model2 = gltf.scene;
    scene.add(model2);

    model2.userData.name = "BrainModel";

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
    console.error('Error cargando Brain.glb:', error);
  }
);

// CARGAR TERCERO MODELO
loader.load(
  'models/comodo.glb',
  function (gltf) {
    model3 = gltf.scene;
    scene.add(model3);

    model3.userData.name = "ComodoModel";

    model3.traverse((child) => {
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
    console.error('Error cargando Comodo.glb:', error);
  }
);

// CARGAR CUARTO MODELO
loader.load(
  'models/cuadro1.glb',
  function (gltf) {
    model4 = gltf.scene;
    scene.add(model4);

    model4.userData.name = "Cuadro1Model";

    model4.traverse((child) => {
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
    console.error('Error cargando Cuadro1.glb:', error);
  }
);

// CARGAR QUINTO MODELO
loader.load(
  'models/cuadro2.glb',
  function (gltf) {
    model5 = gltf.scene;
    scene.add(model5);

    model5.userData.name = "Cuadro2Model";

    model5.traverse((child) => {
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
    console.error('Error cargando Cuadro2.glb:', error);
  }
);

// CARGAR SEXTO MODELO
loader.load(
  'models/cuadro3.glb',
  function (gltf) {
    model6 = gltf.scene;
    scene.add(model6);

    model6.userData.name = "Cuadro3Model";

    model6.traverse((child) => {
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
    console.error('Error cargando Cuadro3.glb:', error);
  }
);

// CARGAR SEPTMO MODELO
loader.load(
  'models/libre.glb',
  function (gltf) {
    model7 = gltf.scene;
    scene.add(model7);

    model7.userData.name = "LibreModel";

    model7.traverse((child) => {
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
    console.error('Error cargando Libre.glb:', error);
  }
);

// CARGAR OCTAVO MODELO
loader.load(
  'models/Megafono.glb',
  function (gltf) {
    model8 = gltf.scene;
    scene.add(model8);

    model8.userData.name = "MegafonoModel";

    model8.traverse((child) => {
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
    console.error('Error cargando Megafono.glb:', error);
  }
);

// --- RAYCASTER PARA HOVER ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isHovering = false;
let hoverProgress = 0; // 0 = sin hover, 1 = hover completo
const hoverSpeed = 0.1; // Velocidad de animación
let isZoomingTo = false; // Para controlar si está en zoom
let zoomProgress = 0; // Progreso del zoom (0-1)
let zoomTarget = null; // Posición objetivo del zoom
const zoomSpeed = 0.05; // Velocidad del zoom

// Función para animar la cámara hacia un objeto
function zoomToObject(object) {
  isZoomingTo = true;
  zoomProgress = 0;
  
  // Calcular la posición del objeto
  const boundingBox = new THREE.Box3().setFromObject(object);
  const center = boundingBox.getCenter(new THREE.Vector3());
  const size = boundingBox.getSize(new THREE.Vector3());
  
  // Calcular distancia para que el objeto se vea completamente
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const distance = maxDim / 2 / Math.tan(fov / 2);
  
  zoomTarget = {
    position: center.clone().add(new THREE.Vector3(distance * 0.7, distance * 0.5, distance)),
    lookAt: center
  };
  
  console.log('Zoom a:', zoomTarget.position);
}

window.addEventListener('click', (event) => {
  if (!model) return; // Asegurarse que el modelo está cargado

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([model], true); // Usar array con modelo
  
  if (intersects.length > 0) {
    const objectHit = intersects[0].object;
    console.log('Clickeaste en:', objectHit.name); // Para debuggear
    
    if (objectHit.parent === model || objectHit === model) { // Verificar si pertenece al violín
      // MOSTRAMOS LA CAPA
      divHola.style.display = 'block';
      divHola.innerHTML += "<p>Me has dado en el violin</p>";
      
      // Zoom a la cámara hacia el objeto
      zoomToObject(model);
      
      // LA OCULTAMOS AUTOMÁTICAMENTE después de 6 segundos
      setTimeout(() => {
        divHola.style.display = 'none';
      }, 10000);
    }
  }
});


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

  // Animar zoom hacia el objeto
  if (isZoomingTo && zoomTarget && zoomProgress < 1) {
    zoomProgress = Math.min(zoomProgress + zoomSpeed, 1);
    
    // Interpolación suave entre posición actual y objetivo
    camera.position.lerp(zoomTarget.position, zoomSpeed);
    
    // Mirar hacia el objeto
    camera.lookAt(zoomTarget.lookAt);
    
    // Cuando termina el zoom
    if (zoomProgress >= 1) {
      isZoomingTo = false;
      controls.target.copy(zoomTarget.lookAt);
    }
  }

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