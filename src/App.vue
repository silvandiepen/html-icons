<script lang="ts">
import { defineComponent, onMounted } from "vue";

import { FooterComponent } from "./components/Footer";
import { HeaderComponent } from "./components/Header";
import { IconOverviewComponent } from "./components/IconOverview";
import { useColorMode } from "./composables/useColorMode";

export default defineComponent({
  components: {
    FooterComponent,
    HeaderComponent,
    IconOverviewComponent,
  },
  setup() {
    const { initColorMode } = useColorMode();
    onMounted(() => {
      initColorMode();
    });
  },
});
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <IconOverviewComponent></IconOverviewComponent>
  <FooterComponent></FooterComponent>
</template>
