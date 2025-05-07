<template>
  <div class="dashboard-container">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <a class="navbar-brand" href="#">
          <i class="fas fa-graduation-cap me-2"></i>SPARK TUTORIAL
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#home">
                <i class="fas fa-home me-1"></i>Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#goals">
                <i class="fas fa-bullseye me-1"></i>Goals
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#tutors">
                <i class="fas fa-chalkboard-teacher me-1"></i>Tutors
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#payment">
                <i class="fas fa-credit-card me-1"></i>Payment
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#reviews">
                <i class="fas fa-star me-1"></i>Reviews
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="hero-title">Transform Your Learning Journey</h1>
            <p class="hero-subtitle">Unlock your potential with personalized tutoring and expert guidance</p>
            <a href="#goals" class="cta-button">
              Get Started
              <i class="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <img src="@/assets/hero-image.png" alt="Education" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Goals Section -->
    <section id="goals" class="goals-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">LEARNING GOALS</span>
          <h2 class="section-title">Choose Your Learning Path</h2>
        </div>
        <div class="goals-grid">
          <div class="goal-card" @click="selectGoal('exam')">
            <div class="goal-icon">
              <i class="fas fa-book-reader"></i>
            </div>
            <h3>Exam Preparation</h3>
            <p>Structured study plans and practice tests</p>
          </div>
          <div class="goal-card" @click="selectGoal('skills')">
            <div class="goal-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Skills Upgrade</h3>
            <p>Enhance your practical knowledge</p>
          </div>
          <div class="goal-card" @click="selectGoal('general')">
            <div class="goal-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h3>General Learning</h3>
            <p>Flexible learning at your own pace</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tutors Section -->
    <section id="tutors" class="tutors-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">EXPERT TUTORS</span>
          <h2 class="section-title">Meet Our Professional Tutors</h2>
        </div>
        <div class="tutors-grid">
          <div class="tutor-card" v-for="tutor in tutors" :key="tutor.id">
            <div class="tutor-header">
              <img :src="tutor.image" :alt="tutor.name" class="tutor-avatar">
              <div class="tutor-rating">
                <i class="fas fa-star"></i>
                <span>{{ tutor.rating }}</span>
              </div>
            </div>
            <div class="tutor-info">
              <h3>{{ tutor.name }}</h3>
              <p class="tutor-specialty">{{ tutor.specialty }}</p>
              <p class="tutor-experience">{{ tutor.experience }} Years Experience</p>
            </div>
            <button class="book-button" @click="bookTutor(tutor.id)">
              Book Session
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Section -->
    <section id="payment" class="payment-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">PAYMENT</span>
          <h2 class="section-title">Simple & Secure Payment</h2>
        </div>
        <div class="payment-wrapper">
          <div class="payment-options">
            <div class="payment-card">
              <h3>Basic Package</h3>
              <div class="price">$49<span>/month</span></div>
              <ul class="features-list">
                <li><i class="fas fa-check"></i> 4 Sessions per month</li>
                <li><i class="fas fa-check"></i> Study materials included</li>
                <li><i class="fas fa-check"></i> Email support</li>
              </ul>
              <button class="payment-button" @click="selectPackage('basic')">
                Select Plan
              </button>
            </div>
            <div class="payment-card featured">
              <div class="featured-badge">Popular</div>
              <h3>Premium Package</h3>
              <div class="price">$89<span>/month</span></div>
              <ul class="features-list">
                <li><i class="fas fa-check"></i> 8 Sessions per month</li>
                <li><i class="fas fa-check"></i> All study materials</li>
                <li><i class="fas fa-check"></i> 24/7 support</li>
                <li><i class="fas fa-check"></i> Progress tracking</li>
              </ul>
              <button class="payment-button featured" @click="selectPackage('premium')">
                Select Plan
              </button>
            </div>
            <div class="payment-card">
              <h3>Pro Package</h3>
              <div class="price">$129<span>/month</span></div>
              <ul class="features-list">
                <li><i class="fas fa-check"></i> Unlimited sessions</li>
                <li><i class="fas fa-check"></i> All premium features</li>
                <li><i class="fas fa-check"></i> Personal mentor</li>
                <li><i class="fas fa-check"></i> Career guidance</li>
              </ul>
              <button class="payment-button" @click="selectPackage('pro')">
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section id="reviews" class="reviews-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">TESTIMONIALS</span>
          <h2 class="section-title">What Our Students Say</h2>
        </div>
        <div class="reviews-grid">
          <div class="review-card" v-for="review in reviews" :key="review.id">
            <div class="review-rating">
              <i class="fas fa-star" v-for="n in review.rating" :key="n"></i>
            </div>
            <p class="review-text">{{ review.text }}</p>
            <div class="reviewer-info">
              <img :src="review.image" :alt="review.name" class="reviewer-avatar">
              <div>
                <h4>{{ review.name }}</h4>
                <p>{{ review.course }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container">
        <p>&copy; 2025 SPARK TUTORIAL. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "UserAction",
  data() {
    return {
      tutors: [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          specialty: "Mathematics Expert",
          experience: 8,
          rating: 4.9,
          // image: require("@/assets/tutor1.jpg")
        },
        {
          id: 2,
          name: "Prof. Michael Chen",
          specialty: "Physics Specialist",
          experience: 12,
          rating: 4.8,
          // image: require("@/assets/tutor2.jpg")
        },
        {
          id: 3,
          name: "Dr. Emily Brown",
          specialty: "Chemistry Expert",
          experience: 10,
          rating: 4.9,
          // image: require("@/assets/tutor3.jpg")
        }
      ],
      reviews: [
        {
          id: 1,
          name: "John Smith",
          course: "Advanced Mathematics",
          rating: 5,
          text: "Excellent learning experience! The tutors are highly qualified and supportive.",
          // image: require("@/assets/student1.j/
        },
        {
          id: 2,
          name: "Emma Wilson",
          course: "Physics",
          rating: 5,
          text: "Great platform for learning. The tutors are very knowledgeable and patient.",
          // image: require("@/assets/student2.jpg")
        },
        {
          id: 3,
          name: "David Lee",
          course: "Chemistry",
          rating: 4,
          text: "Very helpful tutors and well-structured courses. Highly recommended!",
          // image: require("@/assets/student3.jpg")
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    selectGoal(goal) {
      console.log('Selected goal:', goal);
      document.getElementById('tutors').scrollIntoView({ behavior: 'smooth' });
    },
    bookTutor(tutorId) {
      console.log('Booking tutor:', tutorId);
      const tutor = this.tutors.find(t => t.id === tutorId);
      if (tutor) {
        document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
      }
    },
    selectPackage(packageType) {
      console.log('Selected package:', packageType);
      alert(`Thank you for selecting the ${packageType} package! We'll contact you shortly.`);
    }
  }
};
</script>




<style scoped>
.dashboard-container {
  padding-top: 76px;
}

/* Navbar Styles */
.navbar {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: 700;
  color: #2c3e50;
}

.nav-link {
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #3498db;
  transform: translateY(-2px);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  padding: 8rem 0;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: white;
  color: #2c3e50;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Section Common Styles */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  border-radius: 25px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
}

/* Goals Section */
.goals-section {
  padding: 6rem 0;
  background: #f8f9fa;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.goal-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.goal-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.goal-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.goal-icon i {
  font-size: 2rem;
  color: white;
}

/* Tutors Section */
.tutors-section {
  padding: 6rem 0;
  background: white;
}

.tutors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tutor-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.tutor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.tutor-header {
  position: relative;
  margin-bottom: 1.5rem;
}

.tutor-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tutor-rating {
  position: absolute;
  top: 0;
  right: 0;
  background: #ffd700;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  color: #2c3e50;
}

/* Payment Section */
.payment-section {
  padding: 6rem 0;
  background: #f8f9fa;
}

.payment-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.payment-card {
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
}

.payment-card.featured {
  transform: scale(1.05);
  border: 2px solid #3498db;
}

.featured-badge {
  position: absolute;
  top: -15px;
  right: 20px;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
}

.price {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 1.5rem 0;
}

.price span {
  font-size: 1rem;
  color: #6c757d;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.features-list li {
  margin-bottom: 1rem;
  color: #6c757d;
}

.features-list i {
  color: #3498db;
  margin-right: 0.5rem;
}

/* Reviews Section */
.reviews-section {
  padding: 6rem 0;
  background: white;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.review-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.reviewer-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* Footer */
.site-footer {
  background: #2c3e50;
  color: white;
  padding: 2rem 0;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .payment-card.featured {
    transform: none;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .goals-grid,
  .tutors-grid,
  .payment-options,
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}
.back-button {
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.back-button:hover {
  background: rgba(52, 152, 219, 0.1);
  transform: translateX(-3px);
}

.book-button {
  width: 100%;
  padding: 0.75rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.book-button:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.payment-button {
  width: 100%;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 1rem;
}

.payment-button:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.payment-button.featured {
  background: linear-gradient(135deg, #3498db, #2980b9);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.2);
}
</style>





