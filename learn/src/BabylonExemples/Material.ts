/** @format **/
import {
  Scene,
  Engine,
  MeshBuilder,
  FreeCamera,
  Vector3,
  HemisphericLight,
  StandardMaterial,
  Texture,
  ActionManager,
  ExecuteCodeAction,
} from "@babylonjs/core";

export class Material {
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
    Freecamera.attachControl();
    Freecamera.speed = 0.25;

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

    ball.material = this.CreateBallMaterial();
    ground.material = this.CreateBallMaterial();

    // change position of the ball when click on the ground
    ground.actionManager = new ActionManager(this.scene);
    ground.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnPickTrigger,
        },
        (event) => {
          const pickResult = this.scene.pick(
            this.scene.pointerX,
            this.scene.pointerY
          );
          const pos = pickResult.pickedPoint;
          ball.position.x = pos!.x;
          ball.position.y = 0.5;
          ball.position.z = pos!.z;
        }
      )
    );

    return scene;
  }

  CreateBallMaterial(): StandardMaterial {
    const GroundMat = new StandardMaterial("greyStone", this.scene);
    const uvScale = 4;
    const TextArray: Texture[] = [];

    const diffuseText = new Texture(
      "./textures/gray_stone/grey_stone_path_diff_1k.jpg",
      this.scene
    );
    GroundMat.diffuseTexture = diffuseText;
    TextArray.push(diffuseText);

    const NormalTexture = new Texture(
      "./textures/gray_stone/grey_stone_path_nor_gl_1k.jpg",
      this.scene
    );
    NormalTexture.level = 1;
    GroundMat.bumpTexture = NormalTexture;
    TextArray.push(NormalTexture);

    const AO = new Texture(
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
