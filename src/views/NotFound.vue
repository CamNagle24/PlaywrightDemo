<template>
  <div class="card">
    <h1 class="title">404 – Page not found</h1>
    <p class="hint">The page you requested does not exist.</p>
    <router-link to="/todos" class="link-under">
      Go to your to-dos
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  padding: 24px 20px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}
.title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.hint {
  color: #4b5563;
  margin-bottom: 10px;
}
.link-under {
  color: #2563eb;
}
</style>
