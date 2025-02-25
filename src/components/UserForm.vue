<template>
  <div class="page-container">
    
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      location="top"
    >
      {{ text }}
    </v-snackbar>
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


      <!-- Buttons on the right -->
    <div class="collapse navbar-collapse" id="navbarNav">
        <div class="ms-auto d-flex">
        <button class="btn btn-primary me-2" @click="goToHome">Home</button>
        <button class="btn btn-success me-2" @click="goToAdmin">Admin</button>
        <button class="btn btn-warning" @click="goToTutor">Tutor</button>
        </div>
    </div>
    </nav>

    <!-- User Login Form -->
    <div class="form-container d-flex justify-content-center align-items-center">
      <div class="form-box">
        <h2 class="text-center mb-4">User Login</h2>
        <form @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
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
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Forgot Password Button -->
          <div class="mb-3 text-end">
            <button type="button" class="btn btn-link" @click="goToForgotPassword">Forgot Password?</button>
          </div>

          <!-- Login Button -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
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
      email: '',
      password: '',
      snackbar: false,
      text: '',
      timeout: 2000,
    };
  },
  methods: {
    // Navigate to Home Page
    goToHome() {
      this.$router.push('/');
    },

    // Navigate to Admin Page
    goToAdmin() {
      this.$router.push('/admin');
    },

    // Navigate to Tutor Page
    goToTutor() {
      this.$router.push('/tutor');
    },

    // Navigate to Forgot Password Page
    goToForgotPassword() {
      this.$router.push('/forgot-password');
    },

    // Handle Login Form Submission
    async handleLogin() {
      // if (this.email && this.password) {
      //   alert(`Logged in as User with email: ${this.email}`);
      // } else {
      //   alert('Please fill in all fields');
      // }
      const payload = {
        "email" :this.email,
        "password": this.password
      }
      try {
        const res = await this.$store.dispatch("login",payload)
        if(res){
          // alert("successfully login");
          // this.text = "successfully login";
          // this.snackbar = true;
          this.$router.push('/home');
        }else {
          console.log('error');
        }
      }catch(error){
        alert("something went wrong");
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles for the User Page */

/* Page container to fill the screen */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
}

/* Navbar styling */
.navbar {
  padding: 1rem 0; /* Add padding to the navbar */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.navbar-brand {
  font-size: 1.5rem; /* Increase font size for the title */
  font-weight: bold; /* Make the title bold */
  color: #2c3e50 !important; /* Change title color */
}

/* Button styling */
.btn {
  font-weight: bold; /* Make buttons bold */
  padding: 0.5rem 1.5rem; /* Add padding to buttons */
  border-radius: 25px; /* Rounded corners for buttons */
}

.btn-primary {
  background-color: #3498db; /* Custom primary button color */
  border: none; /* Remove default border */
}

.btn-success {
  background-color: #2ecc71; /* Custom success button color */
  border: none; /* Remove default border */
}

.btn-warning {
  background-color: #f1c40f; /* Custom warning button color */
  border: none; /* Remove default border */
}

/* Form container styling */
.form-container {
  flex: 1; /* Allow the form to grow and fill the remaining space */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  background-color: #f8f9fa; /* Light background color */
}

.form-box {
  width: 100%;
  max-width: 400px; /* Limit form width */
  padding: 2rem;
  background-color: #fff; /* White background for the form */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.form-box h2 {
  font-size: 2rem; /* Increase font size for the heading */
  font-weight: bold; /* Make the heading bold */
  color: #2c3e50; /* Change heading color */
}

.form-box .form-control {
  border-radius: 25px; /* Rounded corners for input fields */
  padding: 0.75rem 1rem; /* Add padding to input fields */
}

.form-box .btn-link {
  color: #3498db; /* Custom link color */
  text-decoration: none; /* Remove underline */
}

.form-box .btn-link:hover {
  text-decoration: underline; /* Add underline on hover */
}

/* Footer styling */
.footer {
  background-color: #f8f9fa; /* Light background color */
  padding: 1rem 0; /* Add padding to the footer */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow at the top */
}
</style>