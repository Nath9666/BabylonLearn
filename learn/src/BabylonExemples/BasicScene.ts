/** @format **/
import {
  Scene,
  Engine,
  MeshBuilder,
  FreeCamera,
  Vector3,
  HemisphericLight,
  UniversalCamera,
  Mesh,
} from "@babylonjs/core";

export class BasicScene {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const Freecamera = new FreeCamera(
      "camera",
      new Vector3(1, 1, 1),
      this.scene
    );
    const UniCam = new UniversalCamera(
      "camera2",
      new Vector3(1, 1, 1),
      this.scene
    );
    UniCam.attachControl(this.canvas, true);

    Freecamera._position = new Vector3(2, 2, 2);
    Freecamera.target = new Vector3(0.28, 1, 0.5);

    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene
    );

    light.intensity = 0.7;

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      this.scene
    );

    const ball = MeshBuilder.CreateSphere(
      "shere",
      { diameter: 1, segments: 32 },
      this.scene
    );

    ball.position.y = 1;

    return scene;
  }
}
