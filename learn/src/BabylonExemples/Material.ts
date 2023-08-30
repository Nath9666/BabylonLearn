/** @format **/
import * as BABYLON from "@babylonjs/core";

export class Material {
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
      this.engine.resize();
    });
  }

  CreateScene(): BABYLON.Scene {
    const scene = new BABYLON.Scene(this.engine);

    const Freecamera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(1, 1, 1),
      this.scene
    );
    Freecamera.attachControl();
    Freecamera.speed = 0.25;

    Freecamera._position = new BABYLON.Vector3(2, 2, 2);
    Freecamera.target = new BABYLON.Vector3(0.28, 1, 0.5);

    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );

    light.intensity = 0.7;

    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      this.scene
    );

    const ball = BABYLON.MeshBuilder.CreateSphere(
      "shere",
      { diameter: 1, segments: 32 },
      this.scene
    );

    const cube = BABYLON.MeshBuilder.CreateBox(
      "testText",
      { size: 1 },
      this.scene
    );

    // define ball position on axis y by one
    ball.position.y = 1;

    // assign greyStone Material on ball and ground
    ball.material = this.GreyStoneMaterial();
    ground.material = this.GreyStoneMaterial();
    cube.material = this.GreyStoneMaterial();

    // change position of the ball when click on the ground
    ground.actionManager = new BABYLON.ActionManager(this.scene);
    ground.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        {
          trigger: BABYLON.ActionManager.OnPickTrigger,
        },
        (event) => {
          // si la touche shift est appuyé
          if (event.sourceEvent.shiftKey) {
            const pickResult = this.scene.pick(
              this.scene.pointerX,
              this.scene.pointerY
            );
            const pos = pickResult.pickedPoint;
            ball.position = pos!;
            ball.position.y = ball.getBoundingInfo().boundingSphere.radius;
          }
        }
      )
    );

    return scene;
  }

  GreyStoneMaterial(): BABYLON.StandardMaterial {
    const GroundMat = new BABYLON.StandardMaterial("greyStone", this.scene);
    const uvScale = 4;
    const TextArray: BABYLON.Texture[] = [];

    const diffuseText = new BABYLON.Texture(
      "./textures/gray_stone/grey_stone_path_diff_1k.jpg",
      this.scene
    );
    GroundMat.diffuseTexture = diffuseText;
    TextArray.push(diffuseText);

    const NormalTexture = new BABYLON.Texture(
      "./textures/gray_stone/grey_stone_path_nor_gl_1k.jpg",
      this.scene
    );
    NormalTexture.level = 1;
    GroundMat.bumpTexture = NormalTexture;
    TextArray.push(NormalTexture);

    const AO = new BABYLON.Texture(
      "./textures/gray_stone/grey_stone_path_ao_1k.jpg",
      this.scene
    );
    GroundMat.ambientTexture = AO;
    TextArray.push(AO);

    TextArray.forEach((text) => {
      text.uScale = uvScale;
      text.vScale = uvScale;
    });

    return GroundMat;
  }
}
