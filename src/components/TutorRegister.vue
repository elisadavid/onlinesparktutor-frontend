<template>
  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 px-4 shadow-sm">
    <a class="navbar-brand font-weight-bold text-dark" href="#">SPARK TUTORIAL</a>
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
          <router-link class="nav-link text-dark" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/about">About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/contact">Contact</router-link>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Tutor Registration Form -->
  <div class="container mt-5">
    <h1 class="text-center mb-4 font-weight-bold text-dark">Tutor Registration</h1>
    <form @submit.prevent="submitDetails" class="p-5 bg-white rounded-lg shadow-lg">
      <!-- Subject and Stream Selection Section -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="form-group">
            <label for="streamId" class="form-label font-weight-bold">Stream</label>
            <select v-model="streamId" class="form-control custom-select" required @change="fetchSubjectsByStream">
              <option value="">Select a stream</option>
              <option v-for="stream in streams" :key="stream.streamId" :value="stream.streamId">
                {{ stream.streamName }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-label font-weight-bold">Subjects</label>
            <div v-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else-if="subjects.length > 0" class="subject-grid">
              <!-- <div v-for="subject in subjects" :key="subject.subjectId" class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :id="'subject-' + subject.subjectId"
                  :value="subject.subjectId"
                  v-model="subjectIds"
                />
                <label class="form-check-label" :for="'subject-' + subject.subjectId">
                  {{ subject.subjectName }}
                </label>
              </div> -->
              <div v-for="subject in subjects" :key="subject.subjectId" class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  :id="'subject-' + subject.subjectId"
                  :value="subject.subjectId"
                  v-model="subjectId"
                />
                <label class="form-check-label" :for="'subject-' + subject.subjectId">
                  {{ subject.subjectName }}
                </label>
              </div>

            </div>
            <div v-else class="text-muted">
              Please select a stream to view available subjects
            </div>
          </div>
        </div>
      </div>

      <!-- Morning Session Time Section -->
      <div class="row mb-4">
        <h4 class="mb-3">Morning Session</h4>
        <div class="col-md-6">
          <div class="form-group">
            <label for="morningStartTime" class="form-label">Start Time</label>
            <input
              type="time"
              id="morningStartTime"
              v-model="morningStartTime"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="morningEndTime" class="form-label">End Time</label>
            <input
              type="time"
              id="morningEndTime"
              v-model="morningEndTime"
              class="form-control"
              required
            />
          </div>
        </div>
      </div>

      <!-- Evening Session Time Section -->
      <div class="row mb-4">
        <h4 class="mb-3">Evening Session</h4>
        <div class="col-md-6">
          <div class="form-group">
            <label for="eveningStartTime" class="form-label">Start Time</label>
            <input
              type="time"
              id="eveningStartTime"
              v-model="eveningStartTime"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="eveningEndTime" class="form-label">End Time</label>
            <input
              type="time"
              id="eveningEndTime"
              v-model="eveningEndTime"
              class="form-control"
              required
            />
          </div>
        </div>
      </div>

      <!-- Rate Settings Section -->
      <div class="row mb-4">
        <h4 class="mb-3">Rate Settings</h4>
        <div class="col-md-4">
          <div class="form-group">
            <label for="weekdayRate" class="form-label">Weekday Rate (per hour)</label>
            <input
              type="number"
              id="weekdayRate"
              v-model="weekdayRate"
              class="form-control"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="weekendRate" class="form-label">Weekend Rate (per hour)</label>
            <input
              type="number"
              id="weekendRate"
              v-model="weekendRate"
              class="form-control"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="extraHourlyRate" class="form-label">Extra Hour Rate</label>
            <input
              type="number"
              id="extraHourlyRate"
              v-model="extraHourlyRate"
              class="form-control"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
      </div>

      <!-- Available Days Section -->
      <div class="form-group mb-4">
        <label class="form-label font-weight-bold d-block">Available Days</label>
        <div class="d-flex flex-wrap gap-3">
          <div v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" 
               :key="day" 
               class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              :id="day.toLowerCase()"
              :value="day"
              v-model="availableDays"
            />
            <label class="form-check-label" :for="day.toLowerCase()">{{ day }}</label>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg px-5">
          Submit Registration
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: [],
      streams: [],
      subjectIds: [],
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
          subjectId: this.subjectId,
          streamId: this.streamId,
          tutorId : this.tutorId
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
.subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.form-check {
  margin-bottom: 0.5rem;
}

.gap-3 {
  gap: 1rem;
}

.form-control:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
}

.btn-primary {
  background-color: #4a90e2;
  border-color: #4a90e2;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #357abd;
  border-color: #357abd;
  transform: translateY(-1px);
}

h4 {
  color: #2c3e50;
  font-weight: 600;
}

.form-label {
  color: #34495e;
  font-weight: 500;
}

.spinner-border {
  width: 1.5rem;
  height: 1.5rem;
}

.text-muted {
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
}
</style>

