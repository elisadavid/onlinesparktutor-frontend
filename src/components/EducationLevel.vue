<template>
  <div class="education-level-page">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">
          <i class="fas fa-graduation-cap me-2"></i>SPARK TUTORIAL
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><router-link class="nav-link" to="/"><i class="fas fa-home me-1"></i>Home</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/about"><i class="fas fa-info-circle me-1"></i>About Us</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/contact"><i class="fas fa-envelope me-1"></i>Contact</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container text-center py-5">
        <h1 class="display-4 fw-bold text-white mb-3">Find Your Perfect Tutor</h1>
        <p class="lead text-white-50">Select your education level and get matched with expert tutors</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container main-container">
      <!-- Progress Steps -->
      <div class="progress-steps mb-5">
        <div class="step" :class="{ active: !selectedLevel, completed: selectedLevel }">
          <div class="step-icon">
            <i class="fas fa-school"></i>
          </div>
          <div class="step-label">Education Level</div>
        </div>
        <div class="step" :class="{ active: selectedLevel && !selectedStream, completed: selectedStream }">
          <div class="step-icon">
            <i class="fas fa-stream"></i>
          </div>
          <div class="step-label">Stream</div>
        </div>
        <div class="step" :class="{ active: selectedStream && !selectedSubject, completed: selectedSubject }">
          <div class="step-icon">
            <i class="fas fa-book"></i>
          </div>
          <div class="step-label">Subject</div>
        </div>
        <div class="step" :class="{ active: selectedSubject }">
          <div class="step-icon">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
          <div class="step-label">Tutors</div>
        </div>
      </div>

      <!-- Selection Content -->
      <div class="content-wrapper">
        <!-- Education Level Selection -->
        <div v-if="!selectedLevel" class="selection-section">
          <h2 class="section-title text-center mb-4">Choose Your Education Level</h2>
          <div class="row g-4">
            <div v-for="level in educationLevels" :key="level.educationLevelId" class="col-lg-4 col-md-6">
              <div class="selection-card" @click="selectLevel(level)">
                <div class="card-icon">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <h3>{{ level.educationLevel }}</h3>
                <div class="card-overlay">
                  <span>Select</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stream Selection -->
        <div v-else-if="selectedLevel && !selectedStream" class="selection-section">
          <div class="section-header">
            <button class="btn btn-back" @click="selectedLevel = null">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="section-title">Select Your Stream</h2>
          </div>
          <div class="row g-4">
            <div v-for="stream in streams" :key="stream.streamId" class="col-lg-4 col-md-6">
              <div class="selection-card" @click="selectStream(stream)">
                <div class="card-icon">
                  <i class="fas fa-stream"></i>
                </div>
                <h3>{{ stream.streamName }}</h3>
                <div class="card-overlay">
                  <span>Select</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subject Selection -->
        <div v-else-if="selectedStream && !selectedSubject" class="selection-section">
          <div class="section-header">
            <button class="btn btn-back" @click="selectedStream = null">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="section-title">Select Your Subject</h2>
          </div>
          <div class="row g-4">
            <div v-for="subject in subjects" :key="subject.subjectId" class="col-lg-4 col-md-6">
              <div class="selection-card" @click="selectSubject(subject.subjectId)">
                <div class="card-icon">
                  <i class="fas fa-book"></i>
                </div>
                <h3>{{ subject.subjectName }}</h3>
                <div class="card-overlay">
                  <span>Select</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tutor Display -->
        <div v-else class="tutor-section">
          <div class="section-header">
            <button class="btn btn-back" @click="selectedSubject = null">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="section-title">Available Tutors</h2>
          </div>
          <div class="row g-4">
            <div v-for="tutor in tutors" :key="tutor.tutor_id" class="col-lg-4 col-md-6">
              <div class="tutor-card">
                <div class="tutor-header">
                  <!-- <img :src="tutor.profilePic || require('@/assets/default-avatar.png')" :alt="tutor.name" class="tutor-avatar"> -->
                  <h3>{{ tutor.name }}</h3>
                  <p class="tutor-degree">{{ tutor.degree }}</p>
                </div>
                <div class="tutor-details">
                  <p><i class="fas fa-map-marker-alt"></i> {{ tutor.location }}</p>
                  <p><i class="fas fa-envelope"></i> {{ tutor.email }}</p>
                  <p><i class="fas fa-star"></i> 4.5/5 Rating</p>
                </div>
                <button class="btn btn-contact">Contact Tutor</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      educationLevels: [],
      selectedLevel: null,
      streams: [],
      selectedStream: null,
      subjects: [],
      selectedSubject: null,
      tutors: [],
    };
  },
  methods: {
    async fetchEducationLevels() {
      try {
        const response = await axios.get('http://localhost:8089/api/admin/get/education');
        this.educationLevels = response.data;
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    },
    async selectLevel(level) {
      this.selectedLevel = level;
      this.selectedStream = null;
      this.selectedSubject = null;
      await this.fetchStreams(level.educationLevelId);
    },
    async fetchStreams(educationLevelId) {
      try {
        const response = await axios.get(`http://localhost:8089/api/admin/getEducationalStream?educationlevelId=${educationLevelId}`);
        this.streams = response.data;
      } catch (error) {
        console.error('Error fetching streams:', error);
      }
    },
    async selectStream(stream) {
      this.selectedStream = stream;
      this.selectedSubject = null;
      try {
        const response = await axios.get(`http://localhost:8089/api/admin/getStreamSubjectDetails?streamId=${stream.streamId}`);
        this.subjects = response.data;
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    },
    async selectSubject(subjectId) {
      this.selectedSubject = subjectId;
      try {
        const response = await axios.get(`http://localhost:8089/api/tutor/searchtutor/service?subjectId=${subjectId}`);
        this.tutors = response.data;
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    },
  },
  mounted() {
    this.fetchEducationLevels();
  },
};
</script>

<style scoped>
.education-level-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  padding: 1rem 0;
}

.hero-section {
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  padding: 4rem 0;
  margin-bottom: -3rem;
}

.main-container {
  position: relative;
  padding: 3rem 1.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 3rem;
}

.step {
  flex: 1;
  text-align: center;
  position: relative;
}

.step::after {
  content: '';
  position: absolute;
  top: 30px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #e9ecef;
}

.step:last-child::after {
  display: none;
}

.step.active .step-icon {
  background: #3498db;
  color: white;
}

.step.completed .step-icon {
  background: #2ecc71;
  color: white;
}

.step-icon {
  width: 60px;
  height: 60px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  color: #6c757d;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.step-label {
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.selection-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.selection-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(52, 152, 219, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.card-overlay span {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.selection-card:hover .card-overlay {
  opacity: 1;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-back {
  background: none;
  border: none;
  color: #3498db;
  font-size: 1.5rem;
  padding: 0.5rem;
  margin-right: 1rem;
  transition: all 0.3s ease;
}

.btn-back:hover {
  color: #2c3e50;
  transform: translateX(-5px);
}

.section-title {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.tutor-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.tutor-header {
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  padding: 2rem;
  text-align: center;
  color: white;
}

.tutor-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  margin-bottom: 1rem;
  object-fit: cover;
}

.tutor-degree {
  color: rgba(255,255,255,0.8);
  margin: 0;
}

.tutor-details {
  padding: 1.5rem;
}

.tutor-details p {
  margin: 0.5rem 0;
  color: #6c757d;
}

.tutor-details i {
  width: 20px;
  color: #3498db;
  margin-right: 0.5rem;
}

.btn-contact {
  width: 100%;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  transition: all 0.3s ease;
}

.btn-contact:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .progress-steps {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .step::after {
    display: none;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .step-icon {
    margin: 0;
  }
}
</style>

