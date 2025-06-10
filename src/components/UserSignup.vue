<template>
  <div class="register-page">
    <!-- Snackbar for Notifications -->
    <v-snackbar v-model="snackbar" :timeout="timeout" location="top">
      {{ text }}
    </v-snackbar>

    <!-- Registration Form -->
    <div class="register-content">
      <h1 class="text-center mb-4">User Registration</h1>
      <form @submit.prevent="submitForm" class="registration-form">
        <!-- Name, Email, Password -->
        <div class="row mb-3">
          <div class="col">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" v-model="name" required />
          </div>
          <div class="col">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" v-model="email" required />
          </div>
          <div class="col">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" required />
          </div>
        </div>

        <!-- Phone, Education Level -->
        <div class="row mb-3">
          <div class="col">
            <label class="form-label">Phone Number</label>
            <input type="text" class="form-control" v-model="phone" required />
          </div>
          <div class="col">
            <label class="form-label">Level of Education</label>
            <select class="form-select" v-model="levelOfEducation" required @change="fetchStreams">
              <option value="">Select Level</option>
              <option v-for="option in educationOptions" :key="option.educationLevelId" :value="option.educationLevelId">
                {{ option.educationLevel }}
              </option>
            </select>
          </div>
        </div>

        <!-- Teaching Mode, Availability -->
        <div class="row mb-3">
          <div class="col">
            <label class="form-label">Teaching Mode</label>
            <select class="form-select" v-model="teachingMode" required>
              <option value="">Select Teaching Mode</option>
              <option v-for="option in teachingModeOptions" :key="option.teachingModeId" :value="option.teachingModeId">
                {{ option.teachingMode }}
              </option>
            </select>
          </div>
          <div class="col">
            <label class="form-label">Availability</label>
            <select class="form-select" v-model="weekId" required>
              <option value="">Select Availability</option>
              <option v-for="option in availabilityOptions" :key="option.weekId" :value="option.weekId">
                {{ option.week }}
              </option>
            </select>
          </div>
        </div>

        <!-- Stream and Subject Selection -->
        <div class="row mb-4">
          <div class="col-md-6">
            <label class="form-label">Stream</label>
            <select class="form-control" v-model="streamId" required @change="fetchSubjectsByStream">
              <option value="">Select a stream</option>
              <option v-for="stream in streams" :key="stream.streamId" :value="stream.streamId">
                {{ stream.streamName }}
              </option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Subjects</label>
            <div v-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else-if="subjects.length > 0" class="subject-grid">
              <div v-for="subject in subjects" :key="subject.subjectId" class="form-check">
                <input type="radio" class="form-check-input" :id="'subject-' + subject.subjectId" :value="subject.subjectId" v-model="subjectId" />
                <label class="form-check-label" :for="'subject-' + subject.subjectId">
                  {{ subject.subjectName }}
                </label>
              </div>
            </div>
            <div v-else class="text-muted">Please select a stream to view available subjects</div>
          </div>
        </div>

        <!-- Location and Goals -->
        <div class="row mb-3">
          <div class="col">
            <label class="form-label">Location</label>
            <input type="text" class="form-control" v-model="location" required />
          </div>
          <div class="col">
            <label class="form-label">Specific Goals</label>
            <select class="form-select" v-model="specificGoals" required>
              <option value="">Select Specific Goal</option>
              <option v-for="option in goalsOptions" :key="option.specificGoalId" :value="option.specificGoalId">
                {{ option.specificGoal }}
              </option>
            </select>
          </div>
        </div>

        <!-- Submit -->
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
      name: '',
      email: '',
      password: '',
      phone: '',
      location: '',
      levelOfEducation: '',
      streamId: '',
      subjectId: '',
      specificGoals: '',
      teachingMode: '',
      weekId: '',
      subjects: [],
      streams: [],
      streamName:'',
      educationOptions: [],
      teachingModeOptions: [],
      availabilityOptions: [],
      goalsOptions: [],
      loading: false,
      snackbar: false,
      timeout: 3000,
      text: ''
    };
  },
  watch: {
    levelOfEducation(newVal) {
      if (newVal) {
        this.fetchStreams();
      } else {
        this.streams = [];
        this.subjects = [];
      }
    }
  },
  methods: {
    async fetchDropdownData() {
      try {
        const [education, teaching, week, goals] = await Promise.all([
          fetch('http://localhost:8089/api/admin/get/education').then(res => res.json()),
          fetch('http://localhost:8089/api/tutor/teachinglist').then(res => res.json()),
          fetch('http://localhost:8089/api/tutor/weeklist').then(res => res.json()),
          fetch('http://localhost:8089/api/User/specificGoal/list').then(res => res.json())
        ]);

        this.educationOptions = education;
        this.teachingModeOptions = teaching;
        this.availabilityOptions = week;
        this.goalsOptions = goals;
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        this.snackbar = true;
        this.text = "Failed to load form data";
      }
    },

   async fetchStreams() {
  this.loading = true;
  try {
    const response = await fetch(`http://localhost:8089/api/admin/getEducationalStream?educationlevelId=${this.levelOfEducation}`);
    if (!response.ok) throw new Error('Failed to fetch streams');
    
    // const data = await response.json();

    // Optional: you might not even need this filter if the backend filters it already
    this.streams =await response.json();
  } catch (error) {
    console.error("Error fetching streams:", error);
    this.text = "Failed to load streams";
    this.snackbar = true;
  } finally {
    this.loading = false;
  }
},


    async fetchSubjectsByStream() {
      this.subjects = [];
      if (!this.streamId) return;
      this.loading = true;
      try {
        const res = await fetch(`http://localhost:8089/api/admin/getStreamSubjectDetails?streamId=${this.streamId}`);
        if (!res.ok) throw new Error('Failed to fetch subjects');
        this.subjects = await res.json();
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        this.loading = false;
      }
    },

    async submitForm() {
      const payload = {
        username: this.name,
        email: this.email,
        phn_no: this.phone,
        password: this.password,
        educationLevelId: this.levelOfEducation,
        teachingModeId: this.teachingMode,
        weekId: this.weekId,
        location: this.location,
        subjectId: this.subjectId,
        streamId: this.streamId,
        specificGoalId: this.specificGoals,
        streamName:this.streamName
      };

      try {
        const response = await axios.post('http://localhost:8089/api/User/register', payload);
        if (response.status === 200) {
          sessionStorage.setItem("streamId", response.data.streamId);
          this.text = "Registered Successfully";
          this.snackbar = true;
          this.$router.push("/user");
        } else {
          this.text = "Registration Failed";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error during registration:", error);
        this.text = "Something went wrong";
        this.snackbar = true;
      }
    }
  },
  mounted() {
    this.fetchDropdownData();
  console.log("Education level ID:", this.educationlevelId)
  }
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
