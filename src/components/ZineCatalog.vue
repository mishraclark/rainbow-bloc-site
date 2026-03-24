<template>
  <div class="catalog">
    <div class="filters">
      <button
        v-for="cat in allCategories"
        :key="cat"
        class="chip"
        :class="{ active: selectedCategory === cat }"
        @click="selectedCategory = selectedCategory === cat ? '' : cat"
      >
        {{ cat }}
      </button>
    </div>
    <div class="zine-grid">
      <a
        v-for="zine in filtered"
        :key="zine.slug"
        :href="zine.file"
        target="_blank"
        class="zine-card"
      >
        <img v-if="zine.image" :src="zine.image" :alt="zine.name" />
        <div class="zine-info">
          <p class="zine-name">{{ zine.name }}</p>
          <small class="zine-category">{{ zine.category }}</small>
        </div>
      </a>
    </div>
    <p v-if="filtered.length === 0" class="empty">No zines match that filter.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Zine {
  name: string;
  slug: string;
  category: string;
  image?: string;
  file: string;
}

const props = defineProps<{ zines: Zine[] }>();

const selectedCategory = ref("");

const allCategories = computed(() =>
  [...new Set(props.zines.map((z) => z.category))].sort(),
);

const filtered = computed(() => {
  if (!selectedCategory.value) return props.zines;
  return props.zines.filter((z) => z.category === selectedCategory.value);
});
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.chip {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 2rem;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
}

.chip.active {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.zine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
}

.zine-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  color: var(--color-text);
  transition: border-color 0.15s;
}

.zine-card:hover {
  border-color: var(--color-accent);
  text-decoration: none;
}

.zine-card img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.zine-info {
  padding: 0.75rem;
}

.zine-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.zine-category {
  color: var(--color-muted);
}

.empty {
  color: var(--color-muted);
  font-style: italic;
}
</style>
