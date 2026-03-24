<template>
  <form class="newsletter-form" @submit.prevent="handleSubmit">
    <div class="form-row">
      <input
        v-model="email"
        type="email"
        placeholder="your@email.com"
        required
        :disabled="submitted"
      />
      <button type="submit" class="btn btn-primary" :disabled="submitted">
        {{ submitted ? "Signed up!" : "Subscribe" }}
      </button>
    </div>
    <p v-if="submitted" class="success-msg">
      Thanks for subscribing! We'll keep you in the loop.
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const submitted = ref(false);

function handleSubmit() {
  // TODO: wire up to newsletter service (Buttondown, Mailchimp, etc.)
  console.log("Newsletter signup:", email.value);
  submitted.value = true;
}
</script>

<style scoped>
.form-row {
  display: flex;
  gap: 0.5rem;
  max-width: 28rem;
}

input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 1rem;
}

.success-msg {
  margin-top: 0.5rem;
  color: green;
  font-size: 0.9rem;
}
</style>
