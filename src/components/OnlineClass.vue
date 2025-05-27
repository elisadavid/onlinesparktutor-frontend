<template>
  <div class="online-class">
    <!-- Navigation Bar - Always visible -->
    <nav class="navbar">
      <div class="nav-container">
        <a class="nav-brand" href="#">SPARK TUTORIAL</a>
        <div class="nav-menu">
          <ul class="nav-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Initial View - Show when no goal is selected -->
    <div v-if="!selectedSpecificGoal" class="page-section">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Unlock Your Learning Potential</h1>
          <p>Find expert tutors, tailored lessons, and achieve your academic goals with ease.</p>
        </div>
      </section>

      <!-- Goal Selection Section -->
      <section class="goals-section">
        <h2>What's Your Learning Goal?</h2>
        <div class="goal-options">
          <label class="goal-option">
            <input type="radio" value="1" v-model="selectedSpecificGoal">
            <span class="goal-card">
              <i class="fas fa-book-open"></i>
              <span>Exam Preparation</span>
            </span>
          </label>

          <label class="goal-option">
            <input type="radio" value="2" v-model="selectedSpecificGoal">
            <span class="goal-card">
              <i class="fas fa-graduation-cap"></i>
              <span>General Learning</span>
            </span>
          </label>

          <label class="goal-option">
            <input type="radio" value="3" v-model="selectedSpecificGoal">
            <span class="goal-card">
              <i class="fas fa-chart-line"></i>
              <span>Skills Upgrade</span>
            </span>
          </label>
        </div>
      </section>
    </div>

    <!-- Learning Path View - Show after goal selection -->
    <div v-else class="page-section">
      <div class="learning-path-header">
        <button class="back-button" @click="selectedSpecificGoal = null">
          <i class="fas fa-arrow-left"></i> Back to Goals
        </button>
        <h2 class="path-title">
          {{ 
            selectedSpecificGoal === '1' ? 'Exam Preparation' :
            selectedSpecificGoal === '2' ? 'General Learning' : 'Skills Upgrade'
          }}
        </h2>
      </div>

      <!-- Subject Selection -->
      <section class="subject-section">
        <h3>Choose Your Subject</h3>
        <div class="select-wrapper">
          <select v-model="selectedSubject" @change="filterTutorsByGoal">
            <option value="" disabled selected>Select a subject</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
              {{ subject.name }}
            </option>
          </select>
        </div>
      </section>

      <!-- Tutors Grid -->
      <section class="tutors-section" v-if="selectedSubject && filteredTutors.length">
        <h3>Available Tutors for {{ selectedSubjectName }}</h3>
        <div class="tutors-grid">
          <div v-for="tutor in filteredTutors" :key="tutor.tutor_id" class="tutor-card">
            <div class="tutor-header">
              <img :src="tutor.profilePic || 'https://via.placeholder.com/100'" :alt="tutor.name">
              <div class="tutor-info">
                <h4>{{ tutor.name }}</h4>
                <p class="tutor-credentials">{{ tutor.degree }}</p>
                <p class="tutor-location">{{ tutor.location }}</p>
              </div>
            </div>

            <div class="tutor-contact">
              <p><i class="fas fa-envelope"></i> {{ tutor.email }}</p>
            </div>

            <div class="tutor-resources">
              <!-- Exam Prep Resources -->
              <div v-if="selectedSpecificGoal === '1' && tutor.examPrepVideo" class="resource-section">
                <h5>Exam Preparation Video</h5>
                <video :src="tutor.examPrepVideo" controls></video>
              </div>

              <!-- General Learning Resources -->
              <div v-if="selectedSpecificGoal === '2' && tutor.generalLearningMaterial" class="resource-section">
                <h5>Learning Materials</h5>
                <a :href="tutor.generalLearningMaterial" target="_blank" class="resource-link">
                  <i class="fas fa-file-pdf"></i> View Material
                </a>
              </div>

              <!-- Skills Upgrade Resources -->
              <div v-if="selectedSpecificGoal === '3' && tutor.skillsUpgradeTutorial" class="resource-section">
                <h5>Skills Tutorial</h5>
                <a :href="tutor.skillsUpgradeTutorial" target="_blank" class="resource-link">
                  <i class="fas fa-video"></i> View Tutorial
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- No Tutors Message -->
      <section class="no-tutors" v-else-if="selectedSubject && !filteredTutors.length">
        <div class="message">
          <i class="fas fa-search"></i>
          <p>No tutors available for {{ selectedSubjectName }} at the moment.</p>
          <p>Please check back later!</p>
        </div>
      </section>
    </div>

    <!-- Footer - Always visible -->
    <footer class="footer">
      <p>&copy; 2025 SPARK TUTORIAL. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSpecificGoal: null,
      selectedSubject: null,
      subjects: [
        { id: 1, name: 'Mathematics' },
        { id: 2, name: 'Physics' },
        { id: 3, name: 'Chemistry' }
      ],
      tutors: [
        {
          tutor_id: 1,
          name: 'John Doe',
          profilePic: '',
          degree: 'PhD in Physics',
          location: 'New York',
          email: 'johndoe@email.com',
          examPrepVideo: 'https://example.com/video1.mp4',
          generalLearningMaterial: 'https://example.com/material1.pdf',
          skillsUpgradeTutorial: 'https://example.com/tutorial1.pdf'
        },
        {
          tutor_id: 2,
          name: 'Jane Smith',
          profilePic: '',
          degree: 'MSc in Mathematics',
          location: 'Los Angeles',
          email: 'janesmith@email.com',
          examPrepVideo: 'https://example.com/video2.mp4',
          generalLearningMaterial: 'https://example.com/material2.pdf',
          skillsUpgradeTutorial: 'https://example.com/tutorial2.pdf'
        }
      ],
      filteredTutors: []
    };
  },
  computed: {
    selectedSubjectName() {
      const selected = this.subjects.find(subject => subject.id === this.selectedSubject);
      return selected ? selected.name : '';
    }
  },
  methods: {
    filterTutorsByGoal() {
      if (this.selectedSpecificGoal) {
        // In a real app, you'd filter based on the specific goal and subject from the backend
        this.filteredTutors = this.tutors.filter(tutor => {
          // Custom logic based on goal and available materials in each tutor
          if (this.selectedSpecificGoal === '1' && tutor.examPrepVideo) return true;
          if (this.selectedSpecificGoal === '2' && tutor.generalLearningMaterial) return true;
          if (this.selectedSpecificGoal === '3' && tutor.skillsUpgradeTutorial) return true;
          return false;
        });
      }
    }
  }
};
</script>

<style scoped>
.online-class {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navbar Styles */
.navbar {
  background: rgba(44, 62, 80, 0.95);
  padding: 1.2rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  color: white;
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -0.5px;
  position: relative;
  padding: 0.5rem 0;
}

.nav-brand::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.nav-brand:hover::after {
  width: 100%;
}

.nav-list {
  display: flex;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-list a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.8rem 1.2rem;
  position: relative;
  transition: color 0.3s ease;
}

.nav-list a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: #3498db;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-list a:hover {
  color: white;
}

.nav-list a:hover::after {
  width: 100%;
}

.nav-list a.router-link-active {
  color: #3498db;
}

.nav-list a.router-link-active::after {
  width: 100%;
  background-color: #3498db;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem 0;
  }

  .nav-brand {
    font-size: 1.5rem;
  }

  .nav-list {
    gap: 1.5rem;
  }

  .nav-list a {
    font-size: 1rem;
    padding: 0.6rem 1rem;
  }
}

/* Hero Section */
.hero {
  background: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.7)),
              url('https://via.placeholder.com/1920x1080') center/cover;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-top: 60px;
}

.hero-content {
  max-width: 800px;
  padding: 0 2rem;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
  opacity: 0.9;
}

/* Goals Section */
.goals-section {
  padding: 4rem 2rem;
  text-align: center;
  background: #f8f9fa;
}

.goal-options {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.goal-option input {
  display: none;
}

.goal-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 200px;
}

.goal-card i {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.goal-option input:checked + .goal-card {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(52, 152, 219, 0.2);
  border: 2px solid #3498db;
}

/* Subject Selection */
.subject-section {
  padding: 4rem 2rem;
  text-align: center;
}

.select-wrapper {
  max-width: 400px;
  margin: 2rem auto;
}

select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  appearance: none;
  background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 1rem center;
}

/* Tutors Grid */
.tutors-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.tutors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto 0;
}

.tutor-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.tutor-card:hover {
  transform: translateY(-5px);
}

.tutor-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.tutor-header img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.tutor-info h3 {
  margin: 0;
  color: #2c3e50;
}

.tutor-credentials,
.tutor-location {
  margin: 0.5rem 0 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.tutor-contact {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.tutor-contact p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #34495e;
}

.resource-section {
  padding: 1.5rem;
}

.resource-section h4 {
  margin: 0 0 1rem;
  color: #2c3e50;
}

video {
  width: 100%;
  border-radius: 10px;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.resource-link:hover {
  background: #2980b9;
}

/* No Tutors Message */
.no-tutors {
  padding: 4rem 2rem;
  text-align: center;
}

.message {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.message i {
  font-size: 3rem;
  color: #95a5a6;
  margin-bottom: 1rem;
}

/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .goal-options {
    flex-direction: column;
    align-items: center;
  }

  .goal-card {
    width: 100%;
    max-width: 300px;
  }

  .tutors-grid {
    grid-template-columns: 1fr;
  }

  .tutor-header {
    flex-direction: column;
    text-align: center;
  }
}

/* New styles for page transitions */
.page-section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.learning-path-header {
  padding: 2rem;
  margin-top: 60px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-button {
  background: none;
  border: none;
  color: #3498db;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background: #f8f9fa;
}

.path-title {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
}

/* Update existing styles */
.subject-section {
  background: white;
  margin-top: 0;
}

.tutors-section {
  margin-top: 0;
}
</style>
  
  