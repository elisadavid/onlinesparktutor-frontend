<template>
  <div class="register-page">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
      <!-- Title on the left -->
      <a class="navbar-brand" href="#">SPARK TUTORIAL</a>

      <!-- Toggler button for mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible menu -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="ms-auto d-flex">
          <button class="btn btn-primary" @click="goToHome">Home</button>
        </div>
      </div>
    </nav>

    <!-- Registration Form -->
    <div class="register-content">
      <h1 class="text-center mb-4">Registration</h1>
      <form @submit.prevent="handleRegister" class="registration-form">
        <!-- Username Input -->
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="form.username"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Email Input -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password Input -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Confirm Password Input -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="Confirm your password"
            required
          />
          <small v-if="!passwordsMatch" class="text-danger">Passwords do not match.</small>
        </div>

        <!-- Register Button -->
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <footer class="footer py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">© 2023 SPARK TUTORIAL</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  computed: {
    // Check if passwords match
    passwordsMatch() {
      return this.form.password === this.form.confirmPassword;
    },
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    handleRegister() {
      if (!this.passwordsMatch) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      // Perform registration logic here (e.g., API call)
      alert(`Registration successful for ${this.form.username}`);
      console.log('Registration Data:', this.form);

      // Reset the form after submission
      this.form = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
  },
};
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem; /* Increase font size for the title */
  font-weight: bold; /* Make the title bold */
  color: #2c3e50 !important; /* Change title color */
}
/* Custom styles for the registration page */
.register-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
  background-color: #f0f8ff; /* Light blue background color */
}

.register-content {
  flex: 1; /* Allow the content to grow and fill the remaining space */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.registration-form {
  width: 100%;
  max-width: 400px; /* Limit form width */
  background-color: #fff; /* White background for the form */
  padding: 2rem;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.register-content h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.register-content p {
  font-size: 1.2rem;
  color: #555;
}

/* Footer styling */
.footer {
  background-color: #f8f9fa; /* Light background color */
  padding: 1rem 0; /* Add padding to the footer */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow at the top */
}
</style>