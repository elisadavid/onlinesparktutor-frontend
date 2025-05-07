<template>
  <div class="page-container">
    <!-- Snackbar for Notifications -->
    <v-snackbar v-model="snackbar" :timeout="timeout" location="top">
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
        <!-- Login Form -->
        <div v-if="!showForgotPassword && !showResetPassword">
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

            <!-- Password Input with Eye Icon Toggle -->
            <div class="mb-3 position-relative">
              <label for="password" class="form-label">Password</label>
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="password"
                v-model="password"
                placeholder="Enter your password"
                required
              />
              <span
                class="password-toggle"
                @click="showPassword = !showPassword"
                style="position: absolute; right: 10px; top: 35px; cursor: pointer;"
              >
                <i :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
              </span>
            </div>

            <!-- Forgot Password Button -->
            <div class="mb-3 text-end">
              <button type="button" class="btn btn-link" @click="showForgotPassword = true">Forgot Password?</button>
            </div>

            <!-- Login Button -->
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>

            <!-- Sign up link and Google login -->
            <div class="mt-3 text-center">
              <p>
                Don't have an account? <a href="/usersignup" @click="goToSignUp">Sign Up</a>
              </p>
              <button class="btn btn-blue mt-2" @click="handleGoogleLogin">
                Sign in with Google
              </button>
            </div>
          </form>
        </div>

        <!-- Forgot Password Form (Step 1: Enter Email, New Password, Confirm Password) -->
        <div v-if="showForgotPassword && !showResetPassword">
          <h2 class="text-center mb-4">Forgot Password</h2>
          <form @submit.prevent="handleForgotPasswordRequest">
            <!-- Email Input -->
            <div class="mb-3">
              <label for="forgotEmail" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="forgotEmail"
                v-model="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <!-- New Password Input with Eye Icon Toggle -->
            <div class="mb-3 position-relative">
              <label for="newPassword" class="form-label">New Password</label>
              <input
                :type="showNewPassword ? 'text' : 'password'"
                class="form-control"
                id="newPassword"
                v-model="newPassword"
                placeholder="Enter new password"
                required
              />
              <span
                class="password-toggle"
                @click="showNewPassword = !showNewPassword"
                style="position: absolute; right: 10px; top: 35px; cursor: pointer;"
              >
                <i :class="showNewPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
              </span>
            </div>

            <!-- Confirm Password Input with Eye Icon Toggle -->
            <div class="mb-3 position-relative">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-control"
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Confirm new password"
                required
              />
              <span
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
                style="position: absolute; right: 10px; top: 35px; cursor: pointer;"
              >
                <i :class="showConfirmPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
              </span>
            </div>

            <!-- Reset Password Button -->
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Reset Password</button>
            </div>

            <!-- Back to Login Button -->
            <div class="text-center mt-3">
              <button type="button" class="btn btn-link" @click="showForgotPassword = false">Back to Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center py-4 bg-light">
      <p class="mb-0">&copy; 2025 SPARK TUTORIAL. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      snackbar: false,
      text: '',
      timeout: 2000,
      showPassword: false, // Toggle password visibility
      showNewPassword: false, // Toggle new password visibility
      showConfirmPassword: false, // Toggle confirm password visibility
      showForgotPassword: false, // Toggle between login and forgot password forms
      showResetPassword: false, // Toggle between forgot password and reset password forms
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

    // Handle Login Form Submission
//     async handleLogin() {
//   const payload = {
//     email: this.email,
//     password: this.password,
//   };
//   try {
//     const res = await this.$store.dispatch('login', payload);
//     if (res) {
//       this.text = 'Successfully logged in';
//       this.snackbar = true;
//       console.log('Redirecting to homepage...');  // Add this for debugging
//       this.$router.push('/');  // Redirect to the homepage
//     } else {
//       this.text = 'Login failed';
//       this.snackbar = true;
//     }
//   } catch (error) {
//     this.text = 'Something went wrong';
//     this.snackbar = true;
//     console.error(error);
//   }
// },

    async handleLogin() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        const res = await this.$store.dispatch('login', payload);
        if (res) {
          this.text = 'Successfully logged in';
          this.snackbar = true;
          this.$router.push('/useraction');
        } else {
          this.text = 'Login failed';
          this.snackbar = true;
        }
      } catch (error) {
        this.text = 'Something went wrong';
        this.snackbar = true;
        console.error(error);
      }
    },

    // Handle Forgot Password Request (Step 1)
    handleForgotPasswordRequest() {
      // Simulating the reset password flow
      this.showForgotPassword = false;
      this.showResetPassword = true;
      alert('Proceed to reset password.');
    },

    // Navigate to Sign Up Page
    goToSignUp() {
      this.$router.push('/usersignup');
    },

    // Handle Google Login
    handleGoogleLogin() {
      alert('Google login (mock).');
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.form-container {
  flex-grow: 1;
}

.form-box {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.password-toggle {
  cursor: pointer;
}

.btn-blue {
  background-color: #4285f4;
  color: white;
}

.btn-blue:hover {
  background-color: #357ae8;
}

.footer {
  background-color: #f8f9fa;
}
</style>
