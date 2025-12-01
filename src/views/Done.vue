<template>
  <div class="card">
    <h1 class="title">
      Completed To-dos
      <span v-if="currentCategory" class="badge">
        {{ currentCategory }}
      </span>
    </h1>

    <div>
      <!-- Category filter -->
      <div class="categories" v-if="allCategoryNames.length">
        <span class="cat-label">Filter:</span>
        <RouterLink
          to="/done"
          class="chip"
          :class="{ active: !currentCategory }"
        >
          All
        </RouterLink>
        <RouterLink
          v-for="cat in allCategoryNames"
          :key="cat"
          :to="`/done/${encodeURIComponent(cat)}`"
          class="chip"
          :class="{ active: currentCategory === cat }"
        >
          {{ cat }}
        </RouterLink>
      </div>

      <ul class="todo-list">
        <li v-for="todo in doneTodos" :key="todo.id">
          <span class="todo-text">
            {{ todo.text && todo.text.length > 100 ? todo.text.substring(0, 100) + '...' : (todo.text || '(no text)') }}
          </span>
          <span class="category" v-if="todo.category">
            {{ todo.category }}
          </span>
        </li>

        <li v-if="doneTodos && doneTodos.length === 0" class="empty">
          No completed to-dos yet.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCollection } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase_conf'

const user = ref({ uid: 'default-user' })
const route = useRoute()

const currentCategory = computed(() => {
  const raw = route.params.category
  if (!raw || typeof raw !== 'string') return ''
  return decodeURIComponent(raw)
})

// completed todos query 
const doneSource = computed(() => {
  if (!user.value) return null
  return query(
    collection(db, 'users', user.value.uid, 'todos'),
    where('done', '==', true)
  )
})

const allDoneTodos = useCollection(doneSource)

// Filter by category and sort by timestamp in memory
const doneTodos = computed(() => {
  if (!allDoneTodos.value) return []
  
  let filtered = allDoneTodos.value
  if (currentCategory.value) {
    filtered = filtered.filter(todo => todo.category === currentCategory.value)
  }
  
  // same sorting logic
  return [...filtered].sort((a, b) => {
    const aTime = a.createdAt ? a.createdAt.toMillis() : 0
    const bTime = b.createdAt ? b.createdAt.toMillis() : 0
    return bTime - aTime
  })
})

// categories collection 
const categoriesSource = computed(() => {
  if (!user.value) return null
  return collection(db, 'users', user.value.uid, 'categories')
})

const categories = useCollection(categoriesSource)

const allCategoryNames = computed(() =>
  (categories.value || [])
    .map(c => c.name)
    .filter(Boolean)
)
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

/* categories */
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

/* list */
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
}
.todo-list li {
  padding: 6px 0;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.todo-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.category {
  font-size: 0.8rem;
  flex-shrink: 0;
}
.empty {
  color: #6b7280;
}
.link-under {
  font-size: 0.9rem;
  color: #2563eb;
}
</style>
