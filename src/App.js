import React from "react";
import {
    Vector3,
    MeshBuilder,
    ArcRotateCamera,
    Space,
    TransformNode,
    StandardMaterial,
    Color3,
    GlowLayer,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import "./App.css";

const rand1 = [];
const rand2 = [];
var pivot = [];
var sphereCount = 1000;
var spheres = [];

/**
 * Create elements on the initialized scene
 * @param {*} scene
 */
const onSceneReady = (scene) => {
    if (scene == null) return;
    // Create and position camera
    var camera = new ArcRotateCamera(
        "camera",
        0,
        0,
        0,
        new Vector3(0, 0, 0),
        scene
    );
    camera.setPosition(new Vector3(0, -400, 0));
    camera.speed = 50;
    scene.clearColor = new Color3(0, 0, 0);

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    var gl = new GlowLayer("glow", scene);
    gl.intensity = 1.5;

    var starMaterial = new StandardMaterial("starMaterial", scene);
    starMaterial.emissiveColor = new Color3(1, 1, 1);

    initialize(scene, starMaterial);
    createSpheres(scene, starMaterial);

    for (let i = 0; i < 1; i++) {
        rotateSpheres();
    }
};

/**
 * init variables
 * @param {*} scene
 * @param {*} material
 */
function initialize(scene, material) {
    for (let i = 0; i < sphereCount; i++) {
        rand1[i] = Math.random() * 2;
        rand2[i] = Math.random() / 10;
    }
}

/**
 * Create spheres and their pivots, initiliaze random variables
 */
function createSpheres(scene, material) {
    for (let i = spheres.length; i < sphereCount; i++) {
        createSphere(scene, material, i);
    }
}

/**
 * Create single sphere and its pivot
 * @param {} scene
 * @param {*} material
 * @param {*} index
 */
function createSphere(scene, material, index) {
    pivot.push(new TransformNode("root" + index));
    pivot[index].position = new Vector3(0, 0, 0);
    spheres.push(
        MeshBuilder.CreateSphere(
            "sphere",
            { diameter: rand2[index] * 10 },
            scene
        )
    );
    spheres[index].position.y = rand1[index];
    spheres[index].position.x = rand1[index];
    spheres[index].position.z = rand1[index];
    spheres[index].parent = pivot[index];
    spheres[index].material = material;
}

/**
 * Rotate spheres around their pivots
 */
function rotateSpheres() {
    var osc = 0;
    for (var i = 0; i < sphereCount; i++) {
        osc += i * (1 / (sphereCount * 1000));
        if (spheres[i] !== undefined) {
            var sign = shapeGeneration(osc);
            spheres[i].position.x += sign * Math.random();
            spheres[i].position.y += sign * Math.random();
            spheres[i].position.z += sign * Math.random();
            pivot[i].rotate(new Vector3(0, 0, 1), sign * rand1[i], Space.WORLD);
        }
    }
}

/**
 * Determine a
 */
function shapeGeneration(osc) {
    //TODO: attach to to handlers for dynamic changes
    var sign = Math.cos(Math.PI / osc) / Math.abs(Math.cos(osc)); //hourglass
    return sign;
}

/* TODO: replace with react component
function createButtons(scene, material) {
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "UI",
        true,
        scene
    );

    var panel = new GUI.StackPanel();
    panel.width = "220px";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(panel);

    var button = GUI.Button.CreateSimpleButton("but", "ADD");
    button.width = 0.1;
    button.height = "30px";
    button.color = "white";
    button.background = "gray";
    advancedTexture.addControl(button);
    button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button.onPointerClickObservable.add(handleClick(scene, material));
    advancedTexture.addControl(button);
}

var handleClick = (scene, material) => {
    for (let i = sphereCount - 1; i < 100; i) {
        if (spheres[i] !== null) createSphere(scene, material, i);
    }
    sphereCount += 100;
    console.log("ADDITION +" + spheres.length);
};
*/
/**
 * Runs on every frame render.
 */
const onRender = (scene) => {
    rotateSpheres();
};

export default () => (
    <div>
        <SceneComponent
            antialias
            onSceneReady={onSceneReady}
            onRender={onRender}
            id="my-canvas"
        ></SceneComponent>
    </div>
);
