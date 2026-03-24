<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div class="field">
      <label for="contact-name">Name</label>
      <input id="contact-name" v-model="form.name" type="text" required />
    </div>
    <div class="field">
      <label for="contact-email">Email</label>
      <input id="contact-email" v-model="form.email" type="email" required />
    </div>
    <div class="field">
      <label for="contact-interest">I'm interested in</label>
      <select id="contact-interest" v-model="form.interest">
        <option value="">Select...</option>
        <option value="volunteer">Volunteering</option>
        <option value="events">Helping with events</option>
        <option value="outreach">Outreach & distribution</option>
        <option value="skills">Contributing skills (design, dev, etc.)</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="field">
      <label for="contact-message">Message</label>
      <textarea id="contact-message" v-model="form.message" rows="5"></textarea>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="submitted">
      {{ submitted ? "Sent!" : "Send Message" }}
    </button>
    <p v-if="submitted" class="success-msg">Thanks! We'll get back to you soon.</p>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  email: "",
  interest: "",
  message: "",
});

const submitted = ref(false);

function handleSubmit() {
  // TODO: wire up to form backend (Formspree, Netlify Forms, etc.)
  console.log("Contact form:", { ...form });
  submitted.value = true;
}
</script>

<style scoped>
.contact-form {
  max-width: 32rem;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 1rem;
  font-family: inherit;
}

.success-msg {
  margin-top: 0.75rem;
  color: green;
}
</style>
