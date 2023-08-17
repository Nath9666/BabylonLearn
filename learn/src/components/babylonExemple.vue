<!-- @format -->

<template>
  <div>
    <h3>Material Exemple</h3>
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
<style scoped>
canvas {
  width: 80%;
  height: 100%;
}
</style>
