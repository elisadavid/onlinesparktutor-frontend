<template>
    <div>
      <!-- Navigation Bar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <a class="navbar-brand fw-bold" href="#">SPARK TUTORIAL</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/about">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/contact">Contact</router-link>
            </li>
          </ul>
        </div>
      </nav>
  
      <!-- Welcome Section -->
      <div class="welcome-section text-center py-5 bg-light">
        <h1 class="display-4">Unlock Your Learning Potential</h1>
        <p class="lead">Find expert tutors, tailored lessons, and achieve your academic goals with ease.</p>
      </div>
  
      <!-- Goal Selection Section -->
      <div class="goals text-center py-5 bg-white">
        <h4 class="mb-4">What’s Your Learning Goal?</h4>
        <div class="btn-group" role="group">
          <input type="radio" value="1" class="btn-check" id="examPrep" v-model="selectedSpecificGoal" />
          <label class="btn btn-outline-primary" for="examPrep">Exam Preparation</label>
  
          <input type="radio" value="2" class="btn-check" id="generalLearning" v-model="selectedSpecificGoal" />
          <label class="btn btn-outline-primary" for="generalLearning">General Learning</label>
  
          <input type="radio" value="3" class="btn-check" id="skillsUpgrade" v-model="selectedSpecificGoal" />
          <label class="btn btn-outline-primary" for="skillsUpgrade">Skills Upgrade</label>
        </div>
      </div>
  
      <!-- Subject Selection Section -->
      <div class="subjects text-center py-5 bg-light" v-if="selectedSpecificGoal">
        <h4 class="mb-4">Choose Your Subject</h4>
        <select v-model="selectedSubject" class="form-select w-auto mx-auto" @change="filterTutorsByGoal">
          <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
            {{ subject.name }}
          </option>
        </select> 
      </div>
  
      <!-- Tutor Display Section -->
      <div v-if="selectedSubject && filteredTutors.length" class="tutors-section py-5 bg-white">
        <h2 class="text-center mb-5">Top Tutors for {{ selectedSubjectName }}</h2>
        <div class="row justify-content-center">
          <div v-for="tutor in filteredTutors" :key="tutor.tutor_id" class="col-md-4 mb-4">
            <div class="card tutor-card shadow-lg">
              <div class="card-body text-center">
                <img :src="tutor.profilePic || 'https://via.placeholder.com/100'" alt="Profile Picture" class="profile-pic mb-3" />
                <h5>{{ tutor.name }}</h5>
                <p class="text-muted">{{ tutor.degree }} from {{ tutor.location }}</p>
                <p class="text-info"><strong>Email: </strong>{{ tutor.email }}</p>
  
                <!-- Display Resources Based on Specific Goal -->
                <div v-if="selectedSpecificGoal === '1' && tutor.examPrepVideo">
                  <p><strong>Exam Prep Video Available:</strong></p>
                  <video :src="tutor.examPrepVideo" controls class="tutor-video"></video>
                </div>
  
                <div v-if="selectedSpecificGoal === '2' && tutor.generalLearningMaterial">
                  <p><strong>General Learning Material:</strong></p>
                  <a :href="tutor.generalLearningMaterial" target="_blank" class="btn btn-info">View Material</a>
                </div>
  
                <div v-if="selectedSpecificGoal === '3' && tutor.skillsUpgradeTutorial">
                  <p><strong>Skills Upgrade Tutorial:</strong></p>
                  <a :href="tutor.skillsUpgradeTutorial" target="_blank" class="btn btn-info">View Tutorial</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- No Tutors Found Message -->
      <div v-else-if="selectedSubject && !filteredTutors.length" class="no-tutors py-5 text-center">
        <p class="text-muted">No tutors available for {{ selectedSubjectName }} at the moment. Please check back later!</p>
      </div>
      <!-- footer -->
      <footer class="text-center py-4 bg-light">
      <p class="mb-0">&copy; 2025 SPARK TUTORIAL. All Rights Reserved.</p>
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
  .navbar {
  background-color: #f8f9fa;
}

.content {
  margin-top: 50px;
}
  .welcome-section {
    background-image: url('https://via.placeholder.com/1200x400');
    background-size: cover;
    color: black;
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  
  .tutor-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
  }
  
  .tutor-video {
    width: 100%;
    margin-top: 10px;
  }
  
  .no-tutors {
    font-size: 18px;
  }
  </style>
  
  