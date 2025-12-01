<template>
  <div class="card">
    <h1 class="title">Todo Detail</h1>

    <p v-if="!todo" class="hint">Loading...</p>

    <div v-else>
      <label class="field">
        <span>Todo Text:</span>
        <textarea v-model="text"></textarea>
      </label>

      <label class="field">
        <span>Category:</span>
        <input v-model="category" placeholder="Category (optional)..." />
      </label>

      <div class="buttons">
        <button class="primary-btn" @click="save">Save</button>
        <button class="secondary-btn" @click="markDone">Mark as Done</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocument } from 'vuefire'
import { db } from '../firebase_conf'
import { doc, updateDoc } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()
const user = ref({ uid: 'default-user' })

const todoSource = computed(() => {
  if (!user.value) return null
  return doc(db, 'users', user.value.uid, 'todos', route.params.TodoId)
})

const todo = useDocument(todoSource)
const text = ref('')
const category = ref('')

watch(todo, (val) => {
  if (val) {
    text.value = val.text ?? ''
    category.value = val.category ?? ''
  }
})

async function save() {
  if (!user.value) return
  await updateDoc(
    doc(db, 'users', user.value.uid, 'todos', route.params.TodoId),
    {
      text: text.value,
      category: category.value.trim() || null,
    }
  )
  router.push('/todos')
}

async function markDone() {
  if (!user.value) return
  await updateDoc(
    doc(db, 'users', user.value.uid, 'todos', route.params.TodoId),
    { done: true }
  )
  router.push('/done')
}
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
  margin-bottom: 16px;
}
.hint {
  color: #4b5563;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}
.field span {
  font-size: 0.9rem;
  margin-bottom: 4px;
  color: #4b5563;
}
textarea {
  width: 100%;
  min-height: 80px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
input {
  width: 100%;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.buttons {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}
.primary-btn,
.secondary-btn {
  padding: 6px 14px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}
.primary-btn {
  background: #2563eb;
  color: white;
}
.primary-btn:hover {
  background: #1d4ed8;
}
.secondary-btn {
  background: #e5e7eb;
  color: #111827;
}
.secondary-btn:hover {
  background: #d1d5db;
}
</style>
