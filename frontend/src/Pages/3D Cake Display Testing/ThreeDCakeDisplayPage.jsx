/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./ThreeDCakeDisplayPage.css";
import axios from "axios";
import { apiUrl } from "../../config/runtime";

function ThreeDCakeDisplayPage() {
  const [cakeData, setCakeData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const sceneInitialized = useRef(false);

  // Load cake data and models
  useEffect(() => {
    const fetchCakeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl('/api/CakeModel/1'));
        setCakeData(response.data);
        console.log("Cake Data:", response.data);
        loadModels();
      } catch (err) {
        console.error("Error fetching cake data:", err);
        setError("Failed to load cake data");
      } finally {
        setLoading(false);
      }
    };

    fetchCakeData();
  }, []);

  // Wait for both models and cake data
  useEffect(() => {
    if (
      cakeData &&
      (models.roundBase || models.squareBase) &&
      (models.roundCake || models.squareCake)
    ) {
      if (!sceneInitialized.current) {
        initScene();
        sceneInitialized.current = true;
      }
      loadCakeIntoScene();
    }
  }, [cakeData, models]);

  // Load 3D models
  function loadModels() {
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const baseTexture = textureLoader.load("/textures/baseTexture.jpeg");

    console.log("Loading models...");
    console.log("cakeData2:", cakeData);

    const applyTexture = (scene, texture) => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    };

    loader.load("/models/roundCakeStand.glb", (gltf) => {
      applyTexture(gltf.scene, baseTexture);
      setModels((prev) => ({ ...prev, roundBase: gltf.scene }));
    });

    loader.load("/models/squareCakeStand.glb", (gltf) => {
      applyTexture(gltf.scene, baseTexture);
      setModels((prev) => ({ ...prev, squareBase: gltf.scene }));
    });

    loader.load("/models/RoundCake2.glb", (gltf) => {
      setModels((prev) => ({ ...prev, roundCake: gltf.scene }));
    });

    loader.load("/models/SquareCake2.glb", (gltf) => {
      setModels((prev) => ({ ...prev, squareCake: gltf.scene }));
    });
  }

  // Initialize scene once
  function initScene() {
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

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    mountRef.current._scene = scene;
    mountRef.current._camera = camera;
    mountRef.current._renderer = renderer;

    mountRef.current.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    });
  }

  // Load cake into scene
  function loadCakeIntoScene() {
    const scene = mountRef.current._scene;
    if (!scene || !cakeData) return;

    // Remove existing models
    if (currentModels.base) {
      scene.remove(currentModels.base);
    }
    currentModels.cake.forEach((layer) => {
      scene.remove(layer);
    });

    let baseModel = null;
    console.log("Loading base model for cake:", cakeData.baseShape);
    switch (cakeData.baseShape) {
      case "⭕ Round":
        baseModel = models.roundBase?.clone();
        break;
      case "🟥 Square":
        baseModel = models.squareBase?.clone();
        break;
      default:
        break;
    }

    let cakeModel = null;
    console.log("Loading cake model for layers shape:", cakeData.layerShape);
    switch (cakeData.layerShape) {
      case "⭕ Round":
        cakeModel = models.roundCake?.clone();
        break;
      case "🟥 Square":
        cakeModel = models.squareCake?.clone();
        break;
      default:
        break;
    }

    const cakeLayers = [];
    const numLayers = parseInt(cakeData.noLayers || 1);
    const size = (cakeData.baseShapeSize || "").replace(/"/g, "").trim();
    let cakeSizeFactor = parseFloat(size || "10") / 10;
    let basey = -1.3;
    let heightPerLayer = 0.24;
    console.log("Cake size:", size);
    // Size adjustment logic (you can refine this)
    // switch (size) {
    //   case '6': basey = -1.36; heightPerLayer = 0.24; console.log("GO");break;
    //   case '8': basey = -1.31; heightPerLayer = 0.33; break;
    //   case '10': basey = -1.26; heightPerLayer = 0.41; break;
    //   case '12': basey = -1.21; heightPerLayer = 0.50; break;
    //   case '14': basey = -1.14; heightPerLayer = 0.62; break;
    //   default: break;
    // }
    if (cakeData.layerShape === "⭕ Round") {
      if (cakeData.baseShapeSize === '6"') {
        basey = -1.36;
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 10;
      } else if (cakeData.baseShapeSize === '8"') {
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 9.5;
        basey = -1.31;
      } else if (cakeData.baseShapeSize === '10"') {
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 9.5;
        basey = -1.26;
      } else if (cakeData.baseShapeSize === '12"') {
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 9.5;
        basey = -1.21;
      } else if (cakeData.baseShapeSize === '14"') {
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 9;
        basey = -1.14;
      }
    } else if (cakeData.layerShape === "🟥 Square") {
      if (cakeData.baseShapeSize === '6"') {
        basey = -1.36;
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 18;
      } else if (cakeData.baseShapeSize === '8"') {
        basey = -1.31;
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 18;
      } else if (cakeData.baseShapeSize === '10"') {
        basey = -1.26;
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 17;
      } else if (cakeData.baseShapeSize === '12"') {
        basey = -1.21;
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 17;
      } else if (cakeData.baseShapeSize === '14"') {
        basey = -1.14;
        cakeSizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 17;
      }
    } else {
      // newCake.position.set(0, -1.3, 0);
    }
    if (cakeData.baseShapeSize === '6"') {
      heightPerLayer = 0.24;
    } else if (cakeData.baseShapeSize === '8"') {
      heightPerLayer = 0.33;
    } else if (cakeData.baseShapeSize === '10"') {
      heightPerLayer = 0.41;
    } else if (cakeData.baseShapeSize === '12"') {
      heightPerLayer = 0.5;
    } else if (cakeData.baseShapeSize === '14"') {
      heightPerLayer = 0.62;
    }

    if (baseModel) {
      const sizeFactor = parseFloat(cakeData.baseShapeSize || "10") / 10;
      console.log("New base model size:", sizeFactor);
      baseModel.scale.set(sizeFactor, sizeFactor, sizeFactor);
      baseModel.position.set(0, -1.5, 0);
      scene.add(baseModel);
    }

    if (cakeModel) {
      for (let i = 0; i < numLayers; i++) {
        const layer = cakeModel.clone();
        const layerY = basey + i * heightPerLayer;
        layer.position.set(0, layerY, 0);
        layer.scale.set(cakeSizeFactor, cakeSizeFactor, cakeSizeFactor);

        const layerData = cakeData.cakeLayers?.[i];
        if (layerData?.layerColorizeType === "gradiant") {
          const tex = createGradientTexture(
            layerData.layerGradientColor1,
            layerData.layerGradientColor2
          );
          layer.traverse((child) => {
            if (child.isMesh) {
              child.material.map = tex;
              child.material.needsUpdate = true;
            }
          });
        } else if (layerData?.layerColorizeType === "solid") {
          layer.traverse((child) => {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                color: layerData.layerSoidColor || "#ffffff",
              });
            }
          });
        }

        scene.add(layer);
        cakeLayers.push(layer);
      }
    }

    setCurrentModels({ base: baseModel, cake: cakeLayers });
  }

  function createGradientTexture(color1, color2) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);

    return new THREE.CanvasTexture(canvas);
  }

  if (loading) return <div className="loading">Loading cake data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="ThreeDCakeDisplayPageContainer">
      <h2>Cake ID: {cakeData?.id || ""}</h2>
      <div className="ThreeDCakeViewerDisplay" ref={mountRef}>
        {!models.roundBase && (
          <div className="loading-models">Loading 3D models...</div>
        )}
      </div>
    </div>
  );
}

export default ThreeDCakeDisplayPage;
