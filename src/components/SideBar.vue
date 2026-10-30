<template>
  <!-- Mobile Top Navigation Bar (< 768px) - Automatically hidden when sidebar is open -->
  <header class="mobile-top-bar" :class="{ 'is-hidden': isMobileOpen }">
    <button 
      class="mobile-toggle-btn" 
      @click="toggleMobileSidebar" 
      aria-label="Open Navigation Menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
    <div class="mobile-brand">
      <span class="brand-logo"><!--Logo here--></span>
      <span class="brand-title">VueApp</span>
    </div>
  </header>

  <!-- Mobile Overlay Backdrop -->
  <div 
    class="sidebar-backdrop" 
    :class="{ 'is-active': isMobileOpen }" 
    @click="closeMobileSidebar"
  ></div>

  <!-- Main Sidebar Component -->
  <aside 
    class="sidebar" 
    :class="{ 
      'is-collapsed': isDesktopCollapsed, 
      'is-mobile-open': isMobileOpen 
    }"
  >
    <!-- SECTION 1: HEADER -->
    <div class="sidebar-header">
      <div class="brand-info">
        <div class="brand-icon"><!--Logo here--></div>
        <span class="brand-text">VueApp</span>
      </div>
      
      <!-- Desktop Collapse Toggle Button -->
      <button 
        class="desktop-toggle-btn" 
        @click="toggleDesktopSidebar" 
        :title="isDesktopCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
        aria-label="Toggle Desktop Sidebar"
      >
        <svg class="toggle-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <!-- Mobile Close / Toggle-Out Button -->
      <button 
        class="mobile-close-btn" 
        @click="closeMobileSidebar" 
        aria-label="Close Navigation Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- SECTION 2: CONTENT (Navigation Menu) -->
    <nav class="sidebar-content">
      <ul class="nav-list">
        <li v-for="item in menuItems" :key="item.id" class="nav-item">
          <router-link 
            :to="item.to" 
            class="nav-link"
            active-class="is-active"
            @click="handleMobileClose"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-label">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- SECTION 3: FOOTER -->
    <div class="sidebar-footer">
      <div class="user-profile">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" class="user-avatar" />
        <div class="user-details">
          <span class="user-name">Alex Morgan</span>
          <span class="user-role">Administrator</span>
        </div>
      </div>
      <button class="logout-btn" @click="handleLogout" title="Logout" aria-label="Logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { authService } from '@/services/authService'
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter();
// --- State Management ---
const isDesktopCollapsed = defineModel<boolean>('isDesktopCollapsed', { default: false });
const isMobileOpen = defineModel<boolean>('isMobileOpen', { default: false });

const activeId = ref('dashboard')     

// --- Navigation Items ---
const menuItems = ref([
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    to: '/Dashboard'
  },
  {
    id: 'user',
    label: 'User',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    to: '/user'
  },
])

// --- Methods ---
const toggleDesktopSidebar = () => {
  isDesktopCollapsed.value = !isDesktopCollapsed.value
}

const toggleMobileSidebar = () => {
  isMobileOpen.value = !isMobileOpen.value
}

const closeMobileSidebar = () => {
  isMobileOpen.value = false
}

const handleMobileClose = () => {
  if (window.innerWidth < 768) {
    isMobileOpen.value = false
  }
}

const handleLogout = () => {
  const response = authService.logout()
  toast(response.message, {
    autoClose: 2000
  })
  router.push('/')
}

const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileOpen.value) {
    isMobileOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* ==========================================================================
   Design Tokens & Theme Contrast
   ========================================================================== */
:root {
  --sidebar-width-full: 260px;
  --sidebar-width-collapsed: 74px;
  --mobile-header-height: 60px;
  
  --bg-main: #070b14;          
  --bg-sidebar: #131d31;       
  --bg-header: #101828;        
  --bg-hover: #1e293b;         
  --bg-active: #3b82f6;        
  
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-active: #ffffff;
  
  --border-color: #223049;     
  --transition-speed: 0.3s;
}

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
  overflow: hidden;
  position: relative;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
  
  /* Pushes content right so it doesn't hide under the fixed sidebar */
  margin-left: var(--sidebar-width-full); 
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-layout.is-collapsed .main-content {
  margin-left: var(--sidebar-width-collapsed);
}

/* ==========================================================================
   Mobile Top Bar (< 768px)
   ========================================================================== */
.mobile-top-bar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--mobile-header-height);
  background-color: var(--bg-header);
  border-bottom: 1px solid var(--border-color);
  align-items: center;
  padding: 0 1rem;
  z-index: 40;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Hides the top bar completely when mobile sidebar is toggled open */
.mobile-top-bar.is-hidden {
  display: none !important;
}

.mobile-toggle-btn {
  background: transparent;
  border: none;
  color: var(--text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.mobile-toggle-btn:hover {
  background-color: var(--bg-hover);
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-main);
}

/* ==========================================================================
   Backdrop Overlay
   ========================================================================== */
.sidebar-backdrop {
  display: none;
  inset: 0;
  background-color: rgba(3, 7, 18, 0.75);
  backdrop-filter: blur(4px);
  z-index: 45;
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.sidebar-backdrop.is-active {
  display: block;
  opacity: 1;
}

/* ==========================================================================
   Sidebar Component Shell
   ========================================================================== */
.sidebar {
  height: 100vh;
  height: 100dvh; 
  width: var(--sidebar-width-full);
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  box-shadow: 6px 0 30px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: width var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1),
              transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
}

/* --------------------------------------------------------------------------
   SECTION 1: HEADER
   -------------------------------------------------------------------------- */
.sidebar-header {
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
}

.brand-info {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
}

.brand-icon {
  font-size: 1.4rem;
}

.brand-text {
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--text-main);
  opacity: 1;
  transition: opacity var(--transition-speed);
}

.desktop-toggle-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.desktop-toggle-btn:hover {
  color: var(--text-main);
  background-color: var(--bg-hover);
}

.toggle-icon {
  transition: transform var(--transition-speed);
}

/* Hidden on desktop, shown inside sidebar header on mobile */
.mobile-close-btn {
  display: none;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.mobile-close-btn:hover {
  color: var(--text-main);
  background-color: var(--bg-hover);
}

/* --------------------------------------------------------------------------
   SECTION 2: CONTENT (Navigation Menu)
   -------------------------------------------------------------------------- */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0.75rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 11px 12px;
  color: var(--text-muted);
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: var(--bg-hover);
  color: var(--text-main);
}

.nav-link.is-active {
  background-color: var(--bg-active);
  color: var(--text-active);
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
}

.nav-label {
  margin-left: 12px;
  font-size: 0.95rem;
  opacity: 1;
  transition: opacity var(--transition-speed);
}

.nav-badge {
  margin-left: auto;
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-main);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

/* Tooltip for Half-Toggle mode */
.nav-tooltip {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--bg-sidebar);
  color: var(--text-main);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
  z-index: 100;
  border: 1px solid var(--border-color);
}

/* --------------------------------------------------------------------------
   SECTION 3: FOOTER
   -------------------------------------------------------------------------- */
.sidebar-footer {
  height: 64px;
  min-height: 64px;
  padding: 0 0.75rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.15);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--bg-hover);
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  opacity: 1;
  transition: opacity var(--transition-speed);
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.logout-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background-color 0.2s;
}

.logout-btn:hover {
  color: #ef4444;
  background-color: var(--bg-hover);
}

/* ==========================================================================
   DESKTOP COLLAPSED STATE (Half Toggle Mode)
   ========================================================================== */
@media (min-width: 768px) {
  .sidebar.is-collapsed {
    width: var(--sidebar-width-collapsed);
  }

  .sidebar.is-collapsed .brand-text,
  .sidebar.is-collapsed .nav-label,
  .sidebar.is-collapsed .nav-badge,
  .sidebar.is-collapsed .user-details {
    opacity: 0;
    pointer-events: none;
    display: none;
  }

  .sidebar.is-collapsed .toggle-icon {
    transform: rotate(180deg);
  }

  .sidebar.is-collapsed .nav-item:hover .nav-tooltip {
    opacity: 1;
    visibility: visible;
  }
}

/* ==========================================================================
   MOBILE RESPONSIVE RULES (< 768px)
   ========================================================================== */
@media (max-width: 767.98px) {

  .main-content {
    margin-left: 0 !important;
    width: 100% !important;
    height: calc(100vh - var(--mobile-header-height));
    margin-top: var(--mobile-header-height);
    padding: 1rem;
  }
  
  .mobile-top-bar {
    display: flex;
  }

  .desktop-toggle-btn {
    display: none; 
  }

  .mobile-close-btn {
    display: flex; 
  }

  .sidebar {
    top: 0;
    width: var(--sidebar-width-full) !important;
    transform: translateX(-100%);
  }

  .sidebar.is-mobile-open {
    transform: translateX(0);
  }

  .nav-tooltip {
    display: none !important;
  }
}
</style>