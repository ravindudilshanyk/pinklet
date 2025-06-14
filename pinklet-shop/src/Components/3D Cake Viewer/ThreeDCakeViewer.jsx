import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./ThreeDCakeViewer.css";

function ThreeDCakeViewer({
  baseShape,
  baseShapeSize,
  NoLayers,
  layersShape,
  icingType,
  LayerData,
}) {
  const mountRef = useRef(null);
  const [models, setModels] = useState({
    roundBase: null,
    squareBase: null,
    roundCake: null,
    squareCake: null,
  });
  const [currentModels, setCurrentModels] = useState({
    base: null,
    cake: [],
  });

  // Load all models
  useEffect(() => {
    console.log(
      baseShape,
      baseShapeSize,
      NoLayers,
      layersShape,
      icingType,
      LayerData
    );
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    const applyTexture = (scene, texture) => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    };

    // Load texture
    const baseTexture = textureLoader.load("/textures/baseTexture.jpeg");

    // Load base models
    loader.load(
      "/models/roundCakeStand.glb",
      (gltf) => {
        applyTexture(gltf.scene, baseTexture);
        setModels((prev) => ({ ...prev, roundBase: gltf.scene }));
      },
      undefined,
      (error) => console.error("Error loading round base model", error)
    );

    loader.load(
      "/models/squareCakeStand.glb",
      (gltf) => {
        applyTexture(gltf.scene, baseTexture);
        setModels((prev) => ({ ...prev, squareBase: gltf.scene }));
      },
      undefined,
      (error) => console.error("Error loading square base model", error)
    );

    // Load cake modelsz
    loader.load(
      "/models/RoundCake2.glb",
      (gltf) => {
        setModels((prev) => ({ ...prev, roundCake: gltf.scene }));
      },
      undefined,
      (error) => console.error("Error loading round cake model", error)
    );

    loader.load(
      "/models/SquareCake2.glb",
      (gltf) => {
        setModels((prev) => ({ ...prev, squareCake: gltf.scene }));
      },
      undefined,
      (error) => console.error("Error loading square cake model", error)
    );
  }, []);

  // Initialize scene
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f7f7);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Save to ref
    mountRef.current._scene = scene;
    mountRef.current._renderer = renderer;
    mountRef.current._camera = camera;

    // Mount canvas
    mountRef.current.appendChild(renderer.domElement);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  function createGradientTexture(color1, color2) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
  
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
  
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);
  
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }
  // Update models when shape or size changes
  useEffect(() => {
    console.log(
      baseShape,
      baseShapeSize,
      NoLayers,
      layersShape,
      icingType,
      LayerData
    );
    if (!mountRef.current || !mountRef.current._scene) return;
    const scene = mountRef.current._scene;
    console.log("Current models:", currentModels);
    // Remove old models
    if (currentModels.base) {
      console.log("Removing old base model:", currentModels.base);
      scene.remove(currentModels.base);
    }
    if (currentModels.cake) {
      currentModels.cake.forEach((cakeLayer) => {
        scene.remove(cakeLayer);
      });
    }

    // Determine new base model
    let newBase = null;
    switch (baseShape) {
      case "⭕ Round":
        newBase = models.roundBase?.clone();
        break;
      case "🟥 Square":
        console.log("Square base model:", models.squareBase);
        newBase = models.squareBase?.clone();
        break;
      default:
        newBase = null; // default
    }

    // Determine new cake model
    let newCake = null;
    switch (layersShape) {
      case "⭕ Round":
        newCake = models.roundCake?.clone();
        break;
      case "🟥 Square":
        newCake = models.squareCake?.clone();
        break;
      default:
        newCake = null; // default
    }

    if (newBase) {
      const sizeFactor = parseFloat(baseShapeSize || "10") / 10;
      console.log("New base model size:", sizeFactor);
      newBase.scale.set(sizeFactor, sizeFactor, sizeFactor);
      newBase.position.set(0, -1.5, 0);
      scene.add(newBase);
    }

    // if (newCake) {
    //   let cakeSizeFactor = parseFloat(baseShapeSize || "10") / 20;

    //   if (layersShape === "⭕ Round") {
    //     if(baseShapeSize === '6"'){
    //       newCake.position.set(0, -1.36, 0);
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 10;
    //     }else if(baseShapeSize === '8"'){
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 9.5;
    //       newCake.position.set(0, -1.31, 0);
    //     }else if(baseShapeSize === '10"'){
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 9.5;
    //       newCake.position.set(0, -1.26, 0);
    //     }else if(baseShapeSize === '12"'){
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 9.5;
    //       newCake.position.set(0, -1.21, 0);
    //     }else if(baseShapeSize === '14"'){
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 9;
    //       newCake.position.set(0, -1.14, 0);
    //     }
    //   }else if (layersShape === "🟥 Square") {
    //     if(baseShapeSize === '6"'){
    //       newCake.position.set(0, -1.36, 0);
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 18;
    //     }else if(baseShapeSize === '8"'){
    //       newCake.position.set(0, -1.31, 0);
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 18;
    //     }else if(baseShapeSize === '10"'){
    //       newCake.position.set(0, -1.26, 0);
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 17;
    //     }else if(baseShapeSize === '12"'){
    //       newCake.position.set(0, -1.21, 0);
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 17;
    //     }else if(baseShapeSize === '14"'){
    //       newCake.position.set(0, -1.14, 0);
    //       cakeSizeFactor = parseFloat(baseShapeSize || "10") / 17;
    //     }
    //   }
    //    else {
    //     newCake.position.set(0, -1.3, 0);
    //   }
    //   newCake.scale.set(cakeSizeFactor, cakeSizeFactor, cakeSizeFactor);
    //   newCake.traverse((child) => {
    //     if (child.isMesh) {
    //       child.material = new THREE.MeshStandardMaterial({
    //         color: LayerData[0]["solidColor"],
    //       });
    //     }
    //   });
    //   scene.add(newCake);
    // }

    // setCurrentModels({
    //   base: newBase,
    //   cake: newCake,
    // });
    if (newCake) {
      const cakeLayers = [];
      const numLayers = parseInt(NoLayers || 1);
      let cakeSizeFactor = parseFloat(baseShapeSize || "10") / 10;
      let basey = -1.3;
      if (layersShape === "⭕ Round") {
        if (baseShapeSize === '6"') {
          basey = -1.36;
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 10;
        } else if (baseShapeSize === '8"') {
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 9.5;
          basey = -1.31;
        } else if (baseShapeSize === '10"') {
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 9.5;
          basey = -1.26;
        } else if (baseShapeSize === '12"') {
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 9.5;
          basey = -1.21;
        } else if (baseShapeSize === '14"') {
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 9;
          basey = -1.14;
        }
      } else if (layersShape === "🟥 Square") {
        if (baseShapeSize === '6"') {
          basey = -1.36;
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 18;
        } else if (baseShapeSize === '8"') {
          basey = -1.31;
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 18;
        } else if (baseShapeSize === '10"') {
          basey = -1.26;
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 17;
        } else if (baseShapeSize === '12"') {
          basey = -1.21;
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 17;
        } else if (baseShapeSize === '14"') {
          basey = -1.14;
          cakeSizeFactor = parseFloat(baseShapeSize || "10") / 17;
        }
      } else {
        // newCake.position.set(0, -1.3, 0);
      }
      let heightPerLayer = 0.24;
      if (baseShapeSize === '6"') {
        heightPerLayer = 0.24;
      } else if (baseShapeSize === '8"') {
        heightPerLayer = 0.33;
      } else if (baseShapeSize === '10"') {
        heightPerLayer = 0.41;
      } else if (baseShapeSize === '12"') {
        heightPerLayer = 0.50;
      } else if (baseShapeSize === '14"') {
        heightPerLayer = 0.62;
      }

      for (let i = 0; i < numLayers; i++) {
        const layer = newCake.clone();
        const layerY = basey + i * heightPerLayer;

        // Set position
        layer.position.set(0, layerY, 0);

        // Set scale
        layer.scale.set(cakeSizeFactor, cakeSizeFactor, cakeSizeFactor);
 
        if(LayerData?.[i]?.LayerColorizeType === "gradiant"){
          console.log("Applying gradient to layer", i);
          console.log("Gradient colors:", LayerData?.[i]?.LayerGradientColor1, LayerData?.[i]?.LayerGradientColor2);
          const color1 = LayerData?.[i]?.LayerGradientColor1 || "#ffffff";
          const color2 = LayerData?.[i]?.LayerGradientColor2 || "#000000";
          const gradientTexture = createGradientTexture(color1, color2);
          layer.traverse((child) => {
            if (child.isMesh) {
              child.material.map = gradientTexture;
              child.material.needsUpdate = true;
            }
          });
        }else if(LayerData?.[i]?.LayerColorizeType === "solid"){
          const color = LayerData?.[i]?.LayerSoidColor || "#ffffff";
          layer.traverse((child) => {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({ color });
            }
          });
        }

        scene.add(layer);
        cakeLayers.push(layer);
      }
      setCurrentModels((prev) => ({
        ...prev,
        cake: cakeLayers,
        base: newBase,
      }));
    }
    setCurrentModels((prev) => ({
      ...prev,
      base: newBase
    }));
    console.log('New base model:', newBase);
  }, [baseShape, baseShapeSize, layersShape, models, LayerData]);

  return (
    <div className="ThreeDCakeViewerContainer">
      <div className="ThreeDCakeViewer" ref={mountRef}>
        {/* Three.js canvas mounts here */}
      </div>
    </div>
  );
}

export default ThreeDCakeViewer;
