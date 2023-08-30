<!-- @format -->

<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Material } from "@/BabylonExemples/Material";

export default defineComponent({
  name: "babylonExemple",
  mounted() {
    const canvas = document.querySelector("canvas")!;
    new Material(canvas);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
