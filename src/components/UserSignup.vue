<template>
  <div class="register-page">
    <!-- Snackbar for Notifications -->
    <v-snackbar v-model="snackbar" :timeout="timeout" location="top">
      {{ text }}
    </v-snackbar>
    
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a class="navbar-brand" href="#">SPARK TUTORIAL</a>
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Registration Form -->
    <div class="register-content">
      <h1 class="text-center mb-4">User Registration</h1>
      <form @submit.prevent="submitForm" class="registration-form">
        <!-- Name and Email -->
        <div class="row mb-3">
          <div class="col">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" v-model="name" required />
          </div>
          <div class="col">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" v-model="email" required />
          </div>
          <div class="col">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" required />
          </div>
        </div>

        <!-- Phone and Level of Education -->
        <div class="row mb-3">
          <div class="col">
            <label for="phone" class="form-label">Phone Number</label>
            <input type="text" class="form-control" v-model="phone" required />
          </div>
          <div class="col">
            <label for="levelOfEducation" class="form-label">Level of Education</label>
            <select class="form-select" v-model="levelOfEducation" required>
              <option value="">Select Level</option>
              <option v-for="option in educationOptions" :key="option.educationLevelId" :value="option.educationLevelId">
                {{ option.educationLevel }}
              </option>
            </select>
          </div>
        </div>

        <!-- Teaching Mode and Availability -->
        <div class="row mb-3">
          <div class="col">
            <label for="teachingMode" class="form-label">Teaching Mode</label>
            <select class="form-select" v-model="teachingMode" required>
              <option value="">Select Teaching Mode</option>
              <option v-for="option in teachingModeOptions" :key="option.teachingModeId" :value="option.teachingModeId">
                {{ option.teachingMode }}
              </option>
            </select>
          </div>
          <div class="col">
            <label for="weekId" class="form-label">Availability</label>
            <select class="form-select" v-model="weekId" required>
              <option value="">Select Availability</option>
              <option v-for="option in availabilityOptions" :key="option.weekId" :value="option.weekId">
                {{ option.week }}
              </option>
            </select>
          </div>
        </div>

        <!-- Location and Specific Goals -->
        <div class="row mb-3">
          <div class="col">
            <label for="location" class="form-label">Location</label>
            <input type="text" class="form-control" v-model="location" required />
          </div>
          <div class="col">
            <label for="specificGoals" class="form-label">Specific Goals</label>
            <select class="form-select" v-model="specificGoals" required>
              <option value="">Select Specific Goals</option>
              <option v-for="option in goalsOptions" :key="option.specificGoalId" :value="option.specificGoalId">
                {{ option.specificGoal }}
              </option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      location: "",
      password: "",
      specificGoals: "",
      educationLevel: [],
      teachingMode: [],
      weekId: [],
      goalsOptions: [],
      snackbar: false,
      timeout: 3000,
      text: ""
    };
  },
  methods: {
    async fetchDropdownData() {
      try {
        // Fetch education levels
        const educationResponse = await fetch('http://localhost:8089/api/admin/get/education');
        const educationData = await educationResponse.json();
        this.educationOptions = educationData;

        // Fetch teaching modes
        const teachingModeResponse = await fetch('http://localhost:8089/api/tutor/teachinglist');
        const teachingModeData = await teachingModeResponse.json();
        this.teachingModeOptions = teachingModeData;

        // Fetch week availability
        const availabilityResponse = await fetch('http://localhost:8089/api/tutor/weeklist');
        const availabilityData = await availabilityResponse.json();
        this.availabilityOptions = availabilityData;

        // Fetch specific goals
        const goalsResponse = await fetch('http://localhost:8089/api/User/specificGoal/list');
        const goalsData = await goalsResponse.json();
        this.goalsOptions = goalsData;
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        this.text = 'Error loading form data';
        this.snackbar = true;
      }
    },
    async submitForm() {
      const payload = {
        username: this.name,
        email: this.email,
        phn_no: this.phone,
        password:this.password,
        educationLevelId: this.levelOfEducation,
        teachingModeId: this.teachingMode,
        weekId: this.weekId,
        location: this.location,
        specificGoalId: this.specificGoals,
      };

      try {
  // Make API call to register user
  const response = await axios.post('http://localhost:8089/api/User/register', payload);

  // Check if the status is 200 (OK)
  if (response.status === 200) {
    this.text = 'Registered Successfully';
    this.snackbar = true;
    this.$router.push('/useraction');
  } else {
    this.text = 'Registration Failed';
    this.snackbar = true;
  }
} catch (error) {
  this.text = 'Something went wrong';
  this.snackbar = true;
  console.error('Error during registration:', error);
}
    },
  },
  mounted() {
    this.fetchDropdownData(); // Fetch dropdown data when component is mounted
  },
};
</script>

<style scoped>
.register-page {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.register-content {
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #343a40;
}

.form-label {
  font-weight: 600;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.text-center {
  margin-top: 20px;
}
</style>
