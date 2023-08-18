<template>
  <BabylonExemple />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BabylonExemple from "./components/babylonExemple.vue";

export default defineComponent({
  name: "App",
  components: {
    BabylonExemple,
  },
});
</script>

<style>
#app {
  margin: 0%;
  border: 0%;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
