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
    Engine,
} from "@babylonjs/core";
import SceneComponent from "./components/SceneComponent";
import "./App.css";
import { Button } from "./components/Button";

var sphereCount = 1;
var spheres = [];
var timecounter = 0;
var speed = 0.0001;

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
    camera.setPosition(new Vector3(0, 0, -30));
    camera.speed = 50;
    scene.clearColor = new Color3(0, 0, 0);

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    var gl = new GlowLayer("glow", scene);
    gl.intensity = 1.5;

    var starMaterial = new StandardMaterial("starMaterial", scene);
    starMaterial.emissiveColor = new Color3(1, 1, 1);

    createSpheres(scene, starMaterial);

    for (let i = 0; i < 1; i++) {
        //rotateSpheres();
    }
};

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
    spheres.push(MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene));
    spheres[index].position.y = 0;
    spheres[index].position.x = 0;
    spheres[index].position.z = 0;
    spheres[index].material = material;
}

/**
 * Rotate spheres around their pivots
 */
function rotateSpheres(scene) {
    for (let i = 0; i < sphereCount; i++) {
        var x = Math.cos(timecounter) * 10;
        var y = Math.sin(timecounter) * 10;
        var z = spheres[i].z;

        spheres[i].position = new Vector3(x, y, z);
        timecounter += scene.getEngine().getDeltaTime() * speed;
        //if (Math.sin(timecounter) === 0) timecounter = 0;
        console.log(x);
        console.log(y);
        console.log(timecounter);
    }
}

/**
 * Provides a shape to generate
 */
function shapeGeneration(osc) {
    //TODO: attach to to handlers for dynamic changes
    var sign = Math.cos(Math.PI / osc) / Math.abs(Math.cos(osc)); //hourglass
    return sign;
}

/**
 * Runs on every frame render.
 */
const onRender = (scene) => {
    rotateSpheres(scene);
};

const onClick = () => {
    timecounter = 0;
};

export default () => (
    <div>
        <SceneComponent
            antialias
            onSceneReady={onSceneReady}
            onRender={onRender}
            id="my-canvas"
        ></SceneComponent>
        <Button onClick={onClick}>Reset</Button>
    </div>
);
