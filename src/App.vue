<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="top-nav">
      <div class="nav-left">
        <h1 class="logo">Harris's – To-do App</h1>
      </div>

      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/todos">Todos</RouterLink>
        <RouterLink to="/done">Done</RouterLink>
      </nav>
    </header>

    <main class="page">
      <div class="page-inner">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background: conic-gradient(from 0deg at 50% 50%, #fef3c7 0deg, #ddd6fe 90deg, #bfdbfe 180deg, #ccfbf1 270deg, #fef3c7 360deg);
  color: #222;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.top-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7b81ee 0%, #4b7ca2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links a {
  margin-left: 20px;
  text-decoration: none;
  color: #4b5563;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  background: #f3f4f6;
  color: #667eea;
}

.nav-links a.router-link-active {
  background: linear-gradient(135deg, #fdc542 0%, #5edcea 100%);
  color: white;
  font-weight: 600;
}

.page {
  padding: 40px 16px;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-inner {
  width: 100%;
  max-width: 720px;
}
</style>
