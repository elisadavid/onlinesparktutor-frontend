<template>
  <div class="registration-page">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <a class="navbar-brand" href="#">SPARK TUTORIAL</a>
      <button class="navbar-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggle-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
    </nav>

    <!-- Registration Form -->
    <div class="registration-container">
      <h1 class="registration-title">Tutor Registration</h1>
      <form @submit.prevent="submitDetails" class="registration-form">
        <!-- Stream and Subject Selection -->
        <div class="form-grid">
          <div class="form-section">
            <label for="streamId">Stream</label>
            <select v-model="streamId" @change="fetchSubjectsByStream" required>
              <option value="">Select a stream</option>
              <option v-for="stream in streams" :key="stream.streamId" :value="stream.streamId">
                {{ stream.streamName }}
              </option>
            </select>
          </div>

          <div class="form-section">
            <label>Subjects</label>
            <div v-if="loading" class="loader">
              <div class="spinner"></div>
            </div>
            <div v-else-if="subjects.length > 0" class="subject-options">
              <div v-for="subject in subjects" :key="subject.subjectId" class="subject-option">
                <input type="radio" :id="'subject-' + subject.subjectId" :value="subject.subjectId" v-model="subjectId">
                <label :for="'subject-' + subject.subjectId">{{ subject.subjectName }}</label>
              </div>
            </div>
            <div v-else class="empty-state">Please select a stream to view subjects</div>
          </div>
        </div>

        <!-- Time Slots -->
        <div class="time-slots">
          <div class="time-slot">
            <h3>Morning Session</h3>
            <div class="time-inputs">
              <div class="time-input">
                <label for="morningStartTime">Start Time</label>
                <input type="time" id="morningStartTime" v-model="morningStartTime" required>
              </div>
              <div class="time-input">
                <label for="morningEndTime">End Time</label>
                <input type="time" id="morningEndTime" v-model="morningEndTime" required>
              </div>
            </div>
          </div>

          <div class="time-slot">
            <h3>Evening Session</h3>
            <div class="time-inputs">
              <div class="time-input">
                <label for="eveningStartTime">Start Time</label>
                <input type="time" id="eveningStartTime" v-model="eveningStartTime" required>
              </div>
              <div class="time-input">
                <label for="eveningEndTime">End Time</label>
                <input type="time" id="eveningEndTime" v-model="eveningEndTime" required>
              </div>
            </div>
          </div>
        </div>

        <!-- Rates Section -->
        <div class="rates-section">
          <h3>Rate Settings</h3>
          <div class="rates-grid">
            <div class="rate-input">
              <label for="weekdayRate">Weekday Rate (per hour)</label>
              <input type="number" id="weekdayRate" v-model="weekdayRate" min="0" step="0.01" required>
            </div>
            <div class="rate-input">
              <label for="weekendRate">Weekend Rate (per hour)</label>
              <input type="number" id="weekendRate" v-model="weekendRate" min="0" step="0.01" required>
            </div>
            <div class="rate-input">
              <label for="extraHourlyRate">Extra Hour Rate</label>
              <input type="number" id="extraHourlyRate" v-model="extraHourlyRate" min="0" step="0.01" required>
            </div>
          </div>
        </div>

        <!-- Available Days -->
        <div class="days-section">
          <h3>Available Days</h3>
          <div class="days-grid">
            <div v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" 
                 :key="day" 
                 class="day-option">
              <input type="checkbox" :id="day.toLowerCase()" :value="day" v-model="availableDays">
              <label :for="day.toLowerCase()">{{ day }}</label>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div class="experience-section">
          <label for="experience">Experience</label>
          <input type="text" id="experience" v-model="experience" required>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button">Complete Registration</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: [],
      streams: [],
      subjectIds: [],
      location:'',
      subjectId: '',
      streamId: '',
      loading: false,
      morningStartTime: '',
      morningEndTime: '',
      eveningStartTime: '',
      eveningEndTime: '',
      weekdayRate: '',
      weekendRate: '',
      extraHourlyRate: '',
      subjectName:'',
      experience:'',
      rating:'',
      qualification:'',
      availableDays: [],
      tutorId : this.$route.query.tutorId
    }
  },
  async created() {
    await this.fetchStreams() // Only fetch streams initially
  },
  methods: {
    async fetchStreams() {
      try {
        const response = await fetch('http://localhost:8089/api/admin/get/stream')
        if (!response.ok) throw new Error('Failed to fetch streams')
        this.streams = await response.json()
      } catch (error) {
        console.error('Error fetching streams:', error)
      }
    },
    async fetchSubjectsByStream() {
      this.subjects = [] 
      this.subjectIds = []
      
      if (!this.streamId) return

      this.loading = true
      try {
        const response = await fetch(`http://localhost:8089/api/admin/getStreamSubjectDetails?streamId=${this.streamId}`)
        if (!response.ok) throw new Error('Failed to fetch subjects')
        const newsubjects = await response.json()
        this.subjects.push(...newsubjects);
      } catch (error) {
        console.error('Error fetching subjects for stream:', error)
      } finally {
        this.loading = false
      }
    },
    async submitDetails() {
      try {
        const availabilityPayload = {
          morningStartTime: this.morningStartTime,
          morningEndTime: this.morningEndTime,
          eveningStartTime: this.eveningStartTime,
          eveningEndTime: this.eveningEndTime,
          ratePerHourWeekday: this.weekdayRate,
          ratePerHourWeekend: this.weekendRate,
          extraHourRate: this.extraHourlyRate,
          availableDays: this.availableDays,
          location: this.location,
          subjectId: this.subjectId,
          streamId: this.streamId,
          tutorId : this.tutorId,
          experience: this.experience,
          subjectName:this.subjectName,
          streamName:this.streamName,
          rating:this.rating
        }

        const response = await fetch('http://localhost:8089/api/tutor/add/availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(availabilityPayload)
        })

        if (response.ok) {
          alert('Registration successful!')
          // this.$router.push('/tutoraction')
          this.$router.push({path: '/tutoraction',query: { tutorId: this.tutorId } });

        } else {
          throw new Error('Registration failed')
        }
      } catch (error) {
        console.error('Error submitting details:', error)
        alert('Registration failed. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
.registration-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.navbar {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #3498db;
}

.registration-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.registration-title {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.registration-form {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.form-section label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
}

select, input[type="text"], input[type="number"], input[type="time"] {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

select:focus, input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52,152,219,0.2);
  outline: none;
}

.subject-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.subject-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.time-slot h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.time-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.rates-section {
  margin-bottom: 3rem;
}

.rates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.days-section {
  margin-bottom: 3rem;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.day-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.experience-section {
  margin-bottom: 3rem;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.loader {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  color: #7f8c8d;
  padding: 1rem;
}

@media (max-width: 768px) {
  .registration-form {
    padding: 1.5rem;
  }

  .time-inputs {
    grid-template-columns: 1fr;
  }

  .nav-links {
    display: none;
  }

  .navbar-toggle {
    display: block;
  }

  .nav-links.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
}
</style>

