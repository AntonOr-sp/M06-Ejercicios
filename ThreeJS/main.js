import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
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
camera.position.set(0.9, 0.5, 0.1);

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

// Set up DRACO loader for compressed models
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
loader.setDRACOLoader(dracoLoader);
let model; // Guardar referencia al модели
let model2; // Guardar referencia ко второму модели
let model3, model4, model5, model6, model7, model8; // Guardar referencia к остальным моделям
const originalMaterials = {}; // Guardar materiales originales

// Объекты для хранения AnimationMixer и AnimationClips для каждой модели
const animationMixers = {}; // Хранит миксеры анимаций
const animationClips = {}; // Хранит названия доступных анимаций для каждой модели

// CARGAR MODELO BASE CONCHA
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

// CARGAR MODELO CEREBRO
loader.load(
  'models/Brain.glb',
  function (gltf) {
    model2 = gltf.scene;
    scene.add(model2);

    model2.userData.name = "BrainModel";

    // Crear AnimationMixer para esta modelo si tiene anимaciones
    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model2);
      animationMixers["BrainModel"] = mixer;
      animationClips["BrainModel"] = gltf.animations; // Guardar todos clips

      console.log('Anимации для BrainModel:', gltf.animations.map(clip => clip.name));
    }

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

// CARGAR MODELO COMODO
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

// CARGAR MODELO CUADRO1
loader.load(
  'models/cuadro1.glb',
  function (gltf) {
    model4 = gltf.scene;
    scene.add(model4);

    model4.userData.name = "Cuadro1Model";

    console.log('model4 loaded:', model4);

    // Crear AnimationMixer para esta модель если есть анимации
    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model4);
      animationMixers["Cuadro1Model"] = mixer;
      animationClips["Cuadro1Model"] = gltf.animations; // Guardar todos clips

      console.log('Anимации для Cuadro1Model:', gltf.animations.map(clip => clip.name));
    }

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

// CARGAR MODELO CUADRO2
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

// CARGAR MODELO CUADRO3
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

// CARGAR MODELO LIBRE
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

// CARGAR MODELO MEGAFONO
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
let hoveredMesh = null; // Mesh actualmente sobre el cursor
let hoveredModelRoot = null; // Modelo raíz del mesh sobre el cursor
const zoomSpeed = 0.05; // Velocidad del zoom

// Фиксированные позиции камеры для каждого объекта при зуме
const modelZoomPositions = {
  "BrainModel": {
    position: new THREE.Vector3(0.0, 0.2, 0.5),
    lookAt: new THREE.Vector3(0, 0, 0)
  },
  "Cuadro1Model": {
    position: new THREE.Vector3(-0.1, 0.0, 0.6),
    lookAt: new THREE.Vector3(0, 0, 0)
  },
  "Cuadro2Model": {
    position: new THREE.Vector3(0.0, 0.0, 0.8),
    lookAt: new THREE.Vector3(0, 0, 0)
  },
  "Cuadro3Model": {
    position: new THREE.Vector3(-0.1, 0.0, 0.4),
    lookAt: new THREE.Vector3(0, 0, 0)
  },
  "ComodoModel": {
    position: new THREE.Vector3(-0.1, 0.3, 0.8),
    lookAt: new THREE.Vector3(0, 0, 0)
  },
  "LibreModel": {
    position: new THREE.Vector3(0.0, 0.3, 0.8),
    lookAt: new THREE.Vector3(0, 0, 0)
  },

  // Добавьте для других моделей, например:
  // "Cuadro2Model": { position: new THREE.Vector3(1, 0.5, 1), lookAt: new THREE.Vector3(0, 0, 0) },
};

// Función para animar la cámara hacia un objeto
function zoomToObject(object) {
  //zoomHaveTarget = false;
  isZoomingTo = true;
  zoomProgress = 0;

  // Рассчитать центр объекта для lookAt
  let boundingBox = new THREE.Box3().setFromObject(object);
  let center = boundingBox.getCenter(new THREE.Vector3());

  console.log('Center of object:', center);

  // Проверить, есть ли фиксированная позиция для этого объекта
  //if (zoomHaveTarget)

  if (modelZoomPositions[object.userData.name]) {
    zoomTarget = {
      position: modelZoomPositions[object.userData.name].position,
      lookAt: center  // Копировать координаты центра объекта
    };
    //zoomHaveTarget = true;
    console.log('Using fixed zoom position for', object.userData.name, zoomTarget.position, 'looking at', center);
  }
}

// Функция для воспроизведения анимации объекта
function playAnimation(object, animationName = null) {
  const modelName = object.userData.name;

  if (!animationMixers[modelName]) {
    console.warn('No animation mixer for', modelName);
    return;
  }

  const mixer = animationMixers[modelName];
  const clips = animationClips[modelName];

  if (!clips || clips.length === 0) {
    console.warn('No animation clips for', modelName);
    return;
  }

  // Если не указано имя анимации, проигрыть первую
  let clipToPlay = clips[0];

  if (animationName) {
    // Найти анимацию по имени
    clipToPlay = clips.find(clip => clip.name === animationName);
    if (!clipToPlay) {
      console.warn('Animation', animationName, 'not found. Available:', clips.map(c => c.name));
      clipToPlay = clips[0];
    }
  }

  // Остановить текущую анимацию и запустить новую
  mixer.stopAllAction();
  const action = mixer.clipAction(clipToPlay);
  action.clampWhenFinished = true; // Оставить позу в конце анимации
  action.play();

  console.log('Playing animation:', clipToPlay.name, 'for', modelName);
}

//EVENTO PARA CLICAR AL CEREBRO

window.addEventListener('click', (event) => {
  // Не выполнять зум, если клик на HTML элемент (кнопки, ссылки и т.д.)
  if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A' || event.target.closest('#saludos')) {
    return;
  }

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Проверить все модели
  const models = [model, model2, model3, model4, model5, model6, model7, model8].filter(m => m);
  const intersects = raycaster.intersectObjects(models, true);

  if (intersects.length > 0) {
    const objectHit = intersects[0].object;
    let targetModel = null;

    // Найти, к какой модели принадлежит объект
    for (let mod of models) {
      if (objectHit === mod || objectHit.parent === mod || mod.children.includes(objectHit) || mod.getObjectById(objectHit.id)) {
        targetModel = mod;
        break;
      }
    }
    //HTML PARA BRAIN
    if (targetModel) {
      if (targetModel === model2) {
        divHola.style.display = 'block';
        divHola.innerHTML = `
          <h2 class='modal-title'>Sobre mí</h2>
          <p class='modal-text'>Soy Anton Orlov, tengo 20 años, soy Artista 3D y Diseñador gráfico. Me gustaría trabajar como Modelador y Animador 3D, por eso tengo conocimientos en optimización de maya y rigging.</p>
          <a href="Media/CV_AntonOrlov.png" class="portfolio-link" target="_blank">Curriculum Vitae</a>
          <h3 class='hard-skills-title'>Hard skills</h3>
          <ul class='ul-skills'>
            <li>Blender</li>
            <li>Pack Adobe (Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Substance Painter)</li>
            <li>Unity C#</li>
            <li>HTML + CSS</li>
          </ul>

          <h3 class='hard-skills-title'>Soft skills</h3>
          <ul class='ul-skills'>
            <li>Creatividad</li>
            <li>Atención a los detalles</li>
            <li>Claridad</li>
            <li>Deseo de aprender nuevo</li>
          </ul>

          <h3 class='contact-title'>Contactos</h3>
          <ul class='contact-list'>
            <li><a href="https://www.linkedin.com/in/anton-orlov-874962281/" class="contact-link" target="_blank">LinkedIn</a></li>
            <li><a href="mailto:orlov200705@gmail.com" class="contact-link" target="_blank">orlov200705@gmail.com</a></li>
            <li><a href="https://www.artstation.com/orlant" class="contact-link" target="_blank">ArtStation</a></li>
          </ul>
          
          <button id="close" class="close-btn">Cerrar</button>
        `;
        zoomToObject(model2);
        playAnimation(model2); // Воспроизвести анимацию, если она есть
        document.getElementById('close').onclick = () => {
          divHola.style.display = 'none';
          // Возврат камеры на исходную позицию
          isZoomingTo = true;
          zoomProgress = 0;
          zoomTarget = {
            position: new THREE.Vector3(1.2, 0.5, 0.1), // исходная позиция камеры
            lookAt: new THREE.Vector3(0, 0, 0)
          };
        };
      } else if (targetModel === model4) { //HTML PARA OBRA CENTRAL
        divHola.style.display = 'block';
        divHola.innerHTML = `
          <h2 class='modal-title'>Plasma Tank</h2>
          <p class='modal-text'>3D model of Plasma tank from strategic videogame Uniwar. A strong tank belonging to the Titans faction, the basis for defending.</p>
          <a href="https://www.artstation.com/artwork/a0q0l0" class="portfolio-link" target="_blank"><img src="Media/plasma_tank.png" alt="Plasma Tank" style="width:100%; height: auto; border-radius: 10px;"></a>
          <button id="close" class="close-btn">Cerrar</button>
        `;
        zoomToObject(model4);
        playAnimation(model4); // Воспроизвести анимацию, если она есть
        document.getElementById('close').onclick = () => {
          divHola.style.display = 'none';
          // Возврат камеры на исходную позицию
          isZoomingTo = true;
          zoomProgress = 0;
          zoomTarget = {
            position: new THREE.Vector3(1.2, 0.5, 0.1), // исходная позиция камеры
            lookAt: new THREE.Vector3(0, 0, 0)
          };
        };
      } else if (targetModel === model3) { //HTML PARA COMODO
        divHola.style.display = 'block';
        divHola.innerHTML = `
          <h2 class='modal-title'>Experiencia laboral</h2>
          <h3 class='modal-subtitle'>Telecom grup [02/2024 - 05/2024]</h3>
          <ul class='modal-list'>
            <li>Diseño de logotipos.</li>
            <li>Muestras de paletas de color para el sitio web de la empresa.</li>
            <li>Creación de anuncios para redes sociales.</li>
          </ul>
          <h3 class='modal-subtitle'>Barcelona Magica [09/2023]</h3>
          <ul class='modal-list'>
            <li>Diseño del sitio web.</li>
            <li>Diseño del logo de la empresa.</li>
            <li>Asesoramiento sobre la selección de fotos en redes sociales.</li>
          </ul>
          <button id="close" class="close-btn">Cerrar</button>
        `;
        zoomToObject(model3);
        document.getElementById('close').onclick = () => {
          divHola.style.display = 'none';
          // Возврат камеры на исходную позицию
          isZoomingTo = true;
          zoomProgress = 0;
          zoomTarget = {
            position: new THREE.Vector3(1.2, 0.5, 0.1), // исходная позиция камеры
            lookAt: new THREE.Vector3(0, 0, 0)
          };
        };
      } else if (targetModel === model5) { //HTML PARA OBRA DERECHA
        divHola.style.display = 'block';
        divHola.innerHTML = `
          <h2 class='modal-title'>Caracol</h2>
          <p class='modal-text'>3D replica of a metal snail figurine.</p>
          <a href="https://www.artstation.com/artwork/zxq8PL" class="portfolio-link" target="_blank"><img src="Media/caracol.png" alt="Caracol" style="width:100%; height: auto; border-radius: 10px;"></a>
          <button id="close" class="close-btn">Cerrar</button>
        `;
        zoomToObject(model5);
        document.getElementById('close').onclick = () => {
          divHola.style.display = 'none';
          // Возврат камеры на исходную позицию
          isZoomingTo = true;
          zoomProgress = 0;
          zoomTarget = {
            position: new THREE.Vector3(1.2, 0.5, 0.1), // исходная позиция камеры
            lookAt: new THREE.Vector3(0, 0, 0)
          };
        };
      } else if (targetModel === model6) { //HTML PARA OBRA IZQUIERDA
        divHola.style.display = 'block';
        divHola.innerHTML = `
          <h2 class='modal-title'>Character Sheet</h2>
          <p class='modal-text'>EA fictional character created for a student project, the work features the character's design, colors, physical characteristics, and emotions. The text is written in Spanish.</p>
          <a href="https://www.artstation.com/artwork/DLwAAG" class="portfolio-link" target="_blank"><img src="Media/character_sheet.png" alt="Character Sheet" style="width:100%; height: auto; border-radius: 10px;"></a>
          <button id="close" class="close-btn">Cerrar</button>
        `;
        zoomToObject(model6);
        document.getElementById('close').onclick = () => {
          divHola.style.display = 'none';
          // Возврат камеры на исходную позицию
          isZoomingTo = true;
          zoomProgress = 0;
          zoomTarget = {
            position: new THREE.Vector3(1.2, 0.5, 0.1), // исходная позиция камеры
            lookAt: new THREE.Vector3(0, 0, 0)
          };
        };
      } else if (targetModel === model7) { //HTML PARA EDUCACION
        divHola.style.display = 'block';
        divHola.innerHTML = `
          <h2 class='modal-title'>Educación</h2>
          <p class='modal-text'>Formación académica y cursos de especialización en diseño, tecnología y artes.</p>
          <h3 class='modal-subtitle'>Cursos de catalán (200 horas)</h3>
          <p class='modal-text'>Conssorci per a la Normalització Lingüística [2023]</p>
          <h3 class='modal-subtitle'>Técnico de Asistencia al Producto Gráfico Interactivo</h3>
          <p class='modal-text'>Escuela de Arte y Diseño Llotja [2022-2024]</p>
          <h3 class='modal-subtitle'>Animación 3D, Juegos i Entornos Interactivos</h3>
          <p class='modal-text'>Institut Tecnológico de Barcelona [2024-Actual]</p>
          <button id="close" class="close-btn">Cerrar</button>
        `;
        zoomToObject(model7);
        document.getElementById('close').onclick = () => {
          divHola.style.display = 'none';
          // Возврат камеры на исходную позицию
          isZoomingTo = true;
          zoomProgress = 0;
          zoomTarget = {
            position: new THREE.Vector3(1.2, 0.5, 0.1), // исходная позиция камеры
            lookAt: new THREE.Vector3(0, 0, 0)
          };
        };
      }

      // Добавить для других моделей если нужно
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

    // Detectar intersecciones con TODOS los modelos
    const models = [model, model2, model3, model4, model5, model6, model7, model8].filter(m => m);
    const intersects = raycaster.intersectObjects(models, true);

    // Restaurar el mesh anterior si hay
    if (intersects.length === 0) {
      if (hoveredMesh && hoveredModelRoot) {
        hoveredMesh.traverse((child) => {
          if (child.isMesh && originalMaterials[child.uuid]) {
            child.material.color.copy(originalMaterials[child.uuid].color);
            child.material.emissive.copy(originalMaterials[child.uuid].emissive);
          }
        });
      }
      hoveredMesh = null;
      hoveredModelRoot = null;
      document.body.style.cursor = 'default';
      isHovering = false;
    } else {
      // Nuevo mesh sobre el cursor
      const objectHit = intersects[0].object;
      let targetModel = null;
      
      // Encontrar el modelo raíz
      for (let mod of models) {
        if (objectHit === mod || objectHit.parent === mod || mod.children.includes(objectHit) || mod.getObjectById(objectHit.id)) {
          targetModel = mod;
          break;
        }
      }

      // Si el modelo es diferente del anterior, restaurar el anterior
      if (hoveredModelRoot !== targetModel && hoveredModelRoot) {
        hoveredModelRoot.traverse((child) => {
          if (child.isMesh && originalMaterials[child.uuid]) {
            child.material.color.copy(originalMaterials[child.uuid].color);
            child.material.emissive.copy(originalMaterials[child.uuid].emissive);
          }
        });
      }

      // Aplicar efecto de hover al nuevo modelo
      if (targetModel) {
        hoveredMesh = targetModel;
        hoveredModelRoot = targetModel;
      }

      // Cambiar cursor solo para modelos con HTML
      if (targetModel === model2 || targetModel === model3 || targetModel === model4 || targetModel === model5 || targetModel === model6 || targetModel === model7) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
      isHovering = true;
    }
  }
});

// --- D. CONTROLES (La navegación) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añade inercia al movimiento (más suave)

// LOOP
const clock = new THREE.Clock(); // Для отслеживания времени между кадрами

function animate() {
  requestAnimationFrame(animate);

  // Обновить все активные анимации
  const deltaTime = clock.getDelta();
  for (const modelName in animationMixers) {
    animationMixers[modelName].update(deltaTime);
  }

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
  if (model2 || model4 || model5 || model6) {
    const models = [model2, model4, model5, model6].filter(m => m);
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