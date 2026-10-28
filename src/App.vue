<script setup lang="ts">
import { computed, ref } from 'vue';
import SideBar from './components/SideBar.vue';
import { authService } from './services/authService.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
// Shared layout state
const isDesktopCollapsed = ref(false);
const isMobileOpen = ref(false);

const isLogin = ref(authService.isLogin()) ;

router.afterEach(() => {
   isLogin.value = authService.isLogin();
})
</script>

<template>
  <div class="app-layout" :class="{ 'is-collapsed': isDesktopCollapsed }">
    
    <SideBar
      v-if="isLogin" 
      v-model:isDesktopCollapsed="isDesktopCollapsed" 
      v-model:isMobileOpen="isMobileOpen" 
    />

    <!-- Main Content shared frame -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
/* Define design tokens matching your sidebar */
:root {
  --sidebar-width-full: 260px;
  --sidebar-width-collapsed: 74px;
  --mobile-header-height: 60px;
}

/* Reset margin/padding */
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
}

.app-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
}

/* Main Content adjustment for Desktop */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column; 
  box-sizing: border-box;
  transition: all 0.3s ease; 
  margin: 20px;
}

/* Content adjustment for Mobile */
@media (max-width: 767.98px) {
  .app-layout {
    flex-direction: column; 
  }

  .main-content {
    margin-left: 0 !important;
    width: 100% !important;
    height: calc(100vh - var(--mobile-header-height));
    margin-top: var(--mobile-header-height); /* Account for top bar height */
    padding: 1rem;
  }
}
</style>