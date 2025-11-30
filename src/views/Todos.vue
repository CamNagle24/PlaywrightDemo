<template>
  <div class="card">
    <h1 class="title">
      To-Do
      <span v-if="currentCategory" class="badge">
        {{ currentCategory }}
      </span>
    </h1>

    <!-- Not logged in -->
    <p v-if="!user" class="hint">
      Please go back and sign in on the Home page to see your to-dos.
    </p>

    <!-- Logged in -->
    <div v-else>
      <!-- Create new todo -->
      <form class="new-todo" @submit.prevent="addTodo">
        <input
          v-model="newText"
          placeholder="New to-do..."
        />
        <input
          v-model="newTodoCategory"
          placeholder="Category (optional)..."
        />
        <button type="submit">Add</button>
      </form>

      <!-- Category filter -->
      <div class="categories" v-if="allCategoryNames.length">
        <span class="cat-label">Filter:</span>
        <RouterLink
          to="/todos"
          class="chip"
          :class="{ active: !currentCategory }"
        >
          All
        </RouterLink>
        <RouterLink
          v-for="cat in allCategoryNames"
          :key="cat"
          :to="`/todos/${encodeURIComponent(cat)}`"
          class="chip"
          :class="{ active: currentCategory === cat }"
        >
          {{ cat }}
        </RouterLink>
      </div>

      <!-- Category management (create & delete) -->
      <div class="manage">
        <h2 class="manage-title">Categories</h2>
        <form class="cat-form" @submit.prevent="addCategory">
          <input
            v-model="newCategoryName"
            placeholder="New category name..."
          />
          <button type="submit">Add category</button>
        </form>

        <ul class="cat-list">
          <li v-for="cat in categories" :key="cat.id">
            <span>{{ cat.name }}</span>
            <button class="x-btn" @click="deleteCategory(cat)">✕</button>
          </li>
          <li v-if="categories && categories.length === 0" class="empty">
            No categories yet.
          </li>
        </ul>
      </div>

      <!-- Active todo list -->
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id">
          <div class="todo-main">
            <RouterLink
              :to="{ name: 'todo-id', params: { TodoId: todo.id } }"
              class="todo-text"
            >
              {{ todo.text && todo.text.length > 100 ? todo.text.substring(0, 100) + '...' : (todo.text || '(no text)') }}
            </RouterLink>
            <span class="category" v-if="todo.category">
              {{ todo.category }}
            </span>
          </div>
          <button class="small-btn" @click="markDone(todo)">Done</button>
        </li>

        <li v-if="todos && todos.length === 0" class="empty">
          No active to-dos yet.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCurrentUser, useCollection } from 'vuefire'
import {
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase_conf'

const user = useCurrentUser()
const route = useRoute()

const newText = ref('')
const newTodoCategory = ref('')

const newCategoryName = ref('')

// URL for current category
const currentCategory = computed(() => {
  const raw = route.params.category
  if (!raw || typeof raw !== 'string') return ''
  return decodeURIComponent(raw)
})

//todo query 
const todosSource = computed(() => {
  if (!user.value) return null
  return query(
    collection(db, 'users', user.value.uid, 'todos'),
    where('done', '==', false)
  )
})

const allTodos = useCollection(todosSource)

// Filter by category and sort by timestamp in memory
const todos = computed(() => {
  if (!allTodos.value) return []
  
  let filtered = allTodos.value
  if (currentCategory.value) {
    filtered = filtered.filter(todo => todo.category === currentCategory.value)
  }
  
  // Sort by createdAt the newest first
  return [...filtered].sort((a, b) => {
    const aTime = a.createdAt ? a.createdAt.toMillis() : 0
    const bTime = b.createdAt ? b.createdAt.toMillis() : 0
    return bTime - aTime
  })
})

// Categories 
const categoriesSource = computed(() => {
  if (!user.value) return null
  return collection(db, 'users', user.value.uid, 'categories')
})

const categories = useCollection(categoriesSource)

// category names 
const allCategoryNames = computed(() =>
  (categories.value || [])
    .map(c => c.name)
    .filter(Boolean)
)

async function addTodo() {
  if (!user.value) return
  const text = newText.value.trim()
  const cat = newTodoCategory.value.trim()
  if (!text) return

  const categoryToUse = cat || currentCategory.value || null

  if (categoryToUse) {
    const exists = (categories.value || []).some(c => c.name === categoryToUse)
    if (!exists) {
      await addDoc(collection(db, 'users', user.value.uid, 'categories'), {
        name: categoryToUse,
      })
    }
  }

  await addDoc(collection(db, 'users', user.value.uid, 'todos'), {
    text,
    done: false,
    category: categoryToUse,
    createdAt: serverTimestamp(),
  })

  newText.value = ''
  newTodoCategory.value = ''
}

async function markDone(todo) {
  if (!user.value) return
  const todoRef = doc(db, 'users', user.value.uid, 'todos', todo.id)
  await updateDoc(todoRef, { done: true })
}

async function addCategory() {
  if (!user.value) return
  const name = newCategoryName.value.trim()
  if (!name) return

  // avoid duplicates
  const exists = (categories.value || []).some(c => c.name === name)
  if (exists) {
    console.log('Category already exists:', name)
    newCategoryName.value = ''
    return
  }

  try {
    console.log('Adding category:', name)
    await addDoc(collection(db, 'users', user.value.uid, 'categories'), {
      name,
    })
    console.log('Category added successfully!')
  } catch (error) {
    console.error('Error adding category:', error)
  }

  newCategoryName.value = ''
}

async function deleteCategory(categoryDoc) {
  if (!user.value) return
  const ref = doc(db, 'users', user.value.uid, 'categories', categoryDoc.id)
  await deleteDoc(ref)
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
  display: flex;
  align-items: center;
  gap: 8px;
}
.badge {
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4f46e5;
}
.hint {
  color: #4b5563;
}
.new-todo {
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.new-todo input {
  flex: 1;
  min-width: 0;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.new-todo button {
  padding: 6px 14px;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
}
.new-todo button:hover {
  background: #1d4ed8;
}

/* category */
.manage {
  margin-bottom: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.manage-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 0;
}
.cat-form {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.cat-form input {
  flex: 1;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.cat-form button {
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  background: #4b5563;
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
}
.cat-form button:hover {
  background: #374151;
}
.cat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cat-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  font-size: 0.9rem;
}
.x-btn {
  border: none;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.75rem;
  cursor: pointer;
  background: #fee2e2;
  color: #b91c1c;
}
.x-btn:hover {
  background: #fecaca;
}

/* todos list */
.categories {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.cat-label {
  font-size: 0.85rem;
  color: #6b7280;
}
.chip {
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  font-size: 0.8rem;
  text-decoration: none;
  color: #374151;
}
.chip.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
}
.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
  gap: 8px;
}
.todo-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.todo-text {
  text-decoration: none;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-text:hover {
  text-decoration: underline;
}
.category {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 2px;
  word-break: break-word;
}
.small-btn {
  padding: 4px 10px;
  font-size: 0.8rem;
  border-radius: 999px;
  border: none;
  background: #10b981;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}
.small-btn:hover {
  background: #059669;
}
.empty {
  color: #6b7280;
}
.link-under {
  font-size: 0.9rem;
  color: #2563eb;
}
</style>
