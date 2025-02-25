<template>
  <div class="page-container">
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

      <!-- Collapsible menu -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="ms-auto d-flex">
          <template v-if="!role">
            <button class="btn btn-success me-2" @click="showSignup">Login</button>
            <button class="btn btn-primary" @click="goToRegister">Register</button>
          </template>
          <template v-else>
            <button class="btn btn-primary me-2" @click="showAdmin">Admin</button>
            <button class="btn btn-success me-2" @click="showTutor">Tutor</button>
            <button class="btn btn-warning" @click="showUser">User</button>
          </template>
        </div>
      </div>
    </nav>

    <!-- Image Carousel -->
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <!-- Use the correct image path -->
          <img :src="require('@/assets/home_cursol1.jpg')" class="d-block w-100 carousel-image" alt="Online Tutor">
          <div class="carousel-caption">
            <h3>Empowering Minds</h3>
            <p>"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="require('@/assets/home_cursol2.jpg')" class="d-block w-100 carousel-image" alt="...">
          <div class="carousel-caption">
            <h3>Personalized Learning</h3>
            <p>"The beautiful thing about learning is that no one can take it away from you." - B.B. King</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="require('@/assets/home_cursol3.jpg')" class="d-block w-100 carousel-image" alt="...">
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
          Welcome to <strong>SPARK TUTORIAL</strong>, your one-stop destination for quality education and personalized learning. We are dedicated to helping students achieve their academic goals through expert guidance and innovative teaching methods. Whether you're a student, tutor, or administrator, we have the tools and resources to support your journey.
        </p>
        <div class="text-center">
          <router-link to="/" class="btn btn-outline-primary">Learn More</router-link>
        </div>
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
      role: null,
    };
  },
  methods: {
    showSignup() {
      this.role = 'Admin';
    },
    goToRegister() {
      this.$router.push('/register'); // Navigate to the registration page
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
  },
};
</script>

<style scoped>
/* Custom styles for a more attractive design */

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

/* Carousel styling */
.carousel {
  flex: 1; /* Allow the carousel to grow and fill the remaining space */
  margin-top: 1rem; /* Add margin to the top of the carousel */
}

.carousel-item img {
  width: 100%; /* Ensure the image takes the full width */
  height: calc(100vh - 150px); /* Adjust height dynamically based on viewport height */
  object-fit: cover; /* Ensure images cover the area */
  filter: blur(2px); /* Add a slight blur effect to the images */
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for captions */
  padding: 20px;
  border-radius: 10px;
}

.carousel-caption h3 {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
}

.carousel-caption p {
  font-size: 1.2rem;
  color: #fff;
}
/* Footer styling */
.footer {
  background-color: #f8f9fa; /* Light background color */
  padding: 1rem 0; /* Add padding to the footer */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow at the top */
}
</style>