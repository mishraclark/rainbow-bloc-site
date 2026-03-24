<template>
  <div class="events">
    <div v-for="event in upcoming" :key="event.slug" class="event-card card">
      <div class="event-date">
        <span class="month">{{ formatMonth(event.start) }}</span>
        <span class="day">{{ formatDay(event.start) }}</span>
      </div>
      <div class="event-details">
        <h3>{{ event.name }}</h3>
        <p v-if="event.location" class="event-location">{{ event.location }}</p>
        <p class="event-time">{{ formatTime(event.start) }}<span v-if="event.end"> &ndash; {{ formatTime(event.end) }}</span></p>
        <p v-if="event.description" class="event-desc">{{ event.description }}</p>
        <a v-if="event.link" :href="event.link" target="_blank" class="event-link">More info</a>
      </div>
    </div>
    <p v-if="upcoming.length === 0" class="empty">No upcoming events right now. Check back soon!</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface CalendarEvent {
  name: string;
  slug: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
  link?: string;
}

const props = defineProps<{ events: CalendarEvent[] }>();

const upcoming = computed(() => {
  const now = Date.now();
  return props.events
    .filter((e) => new Date(e.start).getTime() >= now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
});

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short" });
}

function formatDay(iso: string) {
  return new Date(iso).getDate();
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-card {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3.5rem;
  padding: 0.5rem;
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius);
  font-weight: 700;
  line-height: 1.2;
}

.event-date .month {
  font-size: 0.75rem;
  text-transform: uppercase;
}

.event-date .day {
  font-size: 1.5rem;
}

.event-details h3 {
  margin: 0;
}

.event-location {
  color: var(--color-muted);
  font-size: 0.9rem;
}

.event-time {
  font-size: 0.9rem;
}

.event-desc {
  margin-top: 0.5rem;
}

.event-link {
  font-size: 0.9rem;
}

.empty {
  color: var(--color-muted);
  font-style: italic;
}
</style>
