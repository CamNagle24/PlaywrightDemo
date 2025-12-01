<template>
  <div class="card">
    <h1 class="title">Personal To-do List</h1>

    <div class="section">
      <p class="subtitle">
        Welcome to your personal to-do list!
      </p>
      <div class="button-group">
        <router-link to="/todos" class="action-btn primary-btn">
          active to-dos
        </router-link>
        <router-link to="/done" class="action-btn secondary-btn">
          completed to-dos
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card {
  background: white;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  text-align: center;
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin-bottom: 24px;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
}

.section {
  margin-top: 12px;
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 24px 0;
  flex-wrap: wrap;
}

.action-btn {
  padding: 12px 32px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.primary-btn {
  background: #6366f1;
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.primary-btn:hover {
  background: radial-gradient(circle at top, #818cf8, #6366f1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.secondary-btn {
  background: #10b981;
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.secondary-btn:hover {
  background: radial-gradient(circle at top, #34d399, #10b981);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.signin-btn {
  padding: 12px 32px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.signin-btn:hover {
  background: radial-gradient(circle at top, #60a5fa, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.logout-btn {
  padding: 10px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  background: #ef4444;
  color: white;
  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
  transition: all 0.3s ease;
  margin-top: 12px;
}

.logout-btn:hover {
  background: radial-gradient(circle at top, #f87171, #ef4444);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}
</style>
