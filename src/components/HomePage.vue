<template>
  <div class="page-container">
    <!-- Navbar -->
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
        <div class="ms-auto d-flex">
          <template v-if="!role">
            <!-- Navbar Items -->
            <!-- <a class="nav-link dropdown-toggle me-3" href="#" id="subjectsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Subjects
            </a> -->
            <!-- <router-link class="btn" to="/search">Search</router-link> -->
            <!-- <router-link class="btn btn-success me-2" to="/aboutus">About Us</router-link> -->
            <!-- <router-link class="btn" to="/contact-support">Contact</router-link> -->
            <button class="btn" @click="showSignup">Login</button>
            <!-- <button class="btn btn-success me-2">Signup</button> -->
          </template>
          <template v-else>
            <button class="btn" @click="showAdmin">Admin</button>
            <button class="btn" @click="showTutor">Tutor</button>
            <button class="btn" @click="showUser">User</button>
          </template>
        </div>
      </div>
    </nav>

    <!-- Image Carousel -->
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="require('@/assets/home_cursol1.jpg')" class="d-block w-100 carousel-image" alt="Empowering Minds">
          <div class="carousel-caption">
            <h3>Empowering Minds</h3>
            <p>"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="require('@/assets/home_cursol2.jpg')" class="d-block w-100 carousel-image" alt="Personalized Learning">
          <div class="carousel-caption">
            <h3>Personalized Learning</h3>
            <p>"The beautiful thing about learning is that no one can take it away from you." - B.B. King</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="require('@/assets/home_cursol3.jpg')" class="d-block w-100 carousel-image" alt="Expert Guidance">
          <div class="carousel-caption">
            <h3>Expert Guidance</h3>
            <p>"The expert in anything was once a beginner." - Helen Hayes</p>
          </div>
        </div>
      </div>
      <!-- Carousel Controls -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- About Us Section -->
    <div class="about-us-section py-5">
      <div class="container">
        <h2 class="text-center mb-4">About Us</h2>
        <p class="text-center lead">
          Welcome to <strong>SPARK TUTORIAL</strong>, your one-stop destination for quality education and personalized learning. We help students achieve their academic goals through expert guidance and innovative teaching methods.
        </p>
        <div class="text-center">
          <button class="btn btn-outline-primary" @click="toggleLearnMore">
            {{ showLearnMore ? 'Show Less' : 'Learn More' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Learn More Continuation Section -->
    <div v-if="showLearnMore" class="learn-more-extended-section py-5">
      <div class="container">
        <!-- <h2 class="text-center mb-4">Why Choose SPARK TUTORIAL?</h2> -->
        <div class="row">
          <div class="col-md-6">
            <h4>Personalized Learning Experience</h4>
            <p>
              At SPARK TUTORIAL, we understand that every student is unique. Our platform is designed to provide tailored learning experiences that cater to individual learning styles, paces, and academic needs. We empower students by offering customizable learning paths, ensuring every student reaches their full potential.
            </p>
          </div>
          <div class="col-md-6">
            <h4>Interactive & Engaging Sessions</h4>
            <p>
              Learning should be interactive and fun! Our tutors use innovative teaching methods, including interactive sessions, live quizzes, and multimedia resources, to make learning engaging and enjoyable. This helps students retain information better and develop a deeper understanding of the subject.
            </p>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-md-6">
            <h4>Continuous Support & Feedback</h4>
            <p>
              SPARK TUTORIAL offers continuous support to students, with real-time feedback and progress tracking. Our platform allows students to communicate directly with their tutors, ask questions, and receive personalized feedback to improve their learning journey.
            </p>
          </div>
          <div class="col-md-6">
            <h4>Affordable Education for All</h4>
            <p>
              We believe that quality education should be accessible to everyone. SPARK TUTORIAL offers affordable pricing options and a range of flexible payment plans, ensuring that students from all backgrounds can benefit from top-tier education without financial constraints.
            </p>
          </div>
        </div>

       
      </div>
    </div>

    <!-- Learn More Continuation (Goals & Mission Section) -->
    <div class="goals-mission-section py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-4">Our Goals & Mission</h2>
        <p class="text-center lead mb-5">
          At SPARK TUTORIAL, we believe in transforming education through personalized learning experiences. Our mission is to provide accessible and high-quality education that empowers students to excel in their academic journey and beyond.
        </p>
        <div class="row text-center">
          <div class="col-md-4">
            <i class="fas fa-graduation-cap fa-3x mb-3"></i>
            <h4 class="mb-3">Quality Education</h4>
            <p>We strive to offer top-notch learning resources that cater to diverse learning styles and academic needs.</p>
          </div>
          <div class="col-md-4">
            <i class="fas fa-user-tie fa-3x mb-3"></i>
            <h4 class="mb-3">Expert Tutors</h4>
            <p>Our platform connects students with experienced tutors who are passionate about teaching and mentoring.</p>
          </div>
          <div class="col-md-4">
            <i class="fas fa-globe fa-3x mb-3"></i>
            <h4 class="mb-3">Global Reach</h4>
            <p>With our online platform, students can access tutors from around the world, breaking geographical barriers to education.</p>
          </div>
        </div>
        <div class="text-center mt-4">
          <p >Start Your Learning Journey</p>
          <router-link to="/usersignup" class="usersignup">Join Us Today</router-link>
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
import axios from 'axios';

export default {
  data() {
    return {
      role: null,
      showLearnMore: false, // State for Learn More toggle
      subjects: [] // Subjects array to store fetched data
    };
  },
  created() {
    this.fetchSubjects(); // Fetch subjects when the component is created
  },
  methods: {
    showSignup() {
      this.role = 'Admin';
    },
    showAdmin() {
      this.$router.push({ name: 'Admin' });
    },
    showTutor() {
      this.$router.push({ name: 'Tutor' });
    },
    showUser() {
      this.$router.push({ name: 'User' });
    },
    toggleLearnMore() {
      this.showLearnMore = !this.showLearnMore;
    },
    // Method to fetch subjects from the backend
    fetchSubjects() {
      axios
        .get('http://localhost:8089/api/admin/get/subject')
        .then((response) => {
          this.subjects = response.data; // Store the fetched data in the subjects array
        })
        .catch((error) => {
          console.error('Error fetching subjects:', error);
        });
    }
  }
};
</script>

<style>
.carousel-image {
  height: 500px;
  object-fit: cover;
}

.about-us-section {
  background-color: #f8f9fa;
}

.learn-more-extended-section {
  background-color: #fff;
}

.goals-mission-section {
  background-color: #f0f4f8;
}

.link {
  color: #007bff;
  text-decoration: underline;
}
</style>
