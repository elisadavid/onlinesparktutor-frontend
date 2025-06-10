<template>
  <div class="booking-session">
    <div class="booking-container">
      <div class="booking-header">
        <h1>Book Your Session</h1>
        <p class="subtitle">Schedule a personalized learning session with your tutor</p>
      </div>

      <div v-if="tutor" class="tutor-profile">
        <div class="profile-header">
          <div class="profile-image">
            <img :src="tutor.profilePic || 'https://via.placeholder.com/150'" :alt="tutor.name">
          </div>
          <div class="profile-info">
            <h2>{{ tutor.name }}</h2>
            <span class="subject-badge">{{ tutor.subjectName }}</span>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <div class="info-content">
              <label>Email</label>
              <p>{{ tutor.email }}</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-phone"></i>
            <div class="info-content">
              <label>Phone</label>
              <p>{{ tutor.phnNo }}</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <div class="info-content">
              <label>Location</label>
              <p>{{ tutor.location }}</p>
            </div>
          </div>
        </div>

        <div class="booking-actions">
          <button class="btn-book" @click="proceedBooking">
            <i class="fas fa-calendar-check"></i> Confirm Booking
          </button>
          <button class="btn-cancel" @click="cancelBooking">
            <i class="fas fa-times"></i> Cancel
          </button>
        </div>
      </div>

      <div v-else class="loading-state">
        <div class="spinner"></div>
        <p>Loading tutor details...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookSession',
  props: ['id'],
  data() {
    return {
      tutor: null,
      loading: true
    };
  },
  mounted() {
    this.fetchTutorDetails();
  },
  methods: {
    async fetchTutorDetails() {
      try {
        const response = await axios.get(`http://localhost:8089/api/bookings/tutor/1`);
        this.tutor = response.data;
      } catch (error) {
        console.error("Error fetching tutor details:", error);
      } finally {
        this.loading = false;
      }
    },
    proceedBooking() {
      // Add booking confirmation logic here
      this.$router.push('/confirmation');
    },
    cancelBooking() {
      this.$router.push('/useraction');
    }
  }
};
</script>

<style scoped>
.booking-session {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
}

.booking-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.booking-header {
  text-align: center;
  margin-bottom: 3rem;
}

.booking-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.tutor-profile {
  padding: 2rem;
  border-radius: 8px;
  background: #fff;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-image {
  width: 120px;
  height: 120px;
  margin-right: 2rem;
}

.profile-image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-info h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subject-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.info-item i {
  font-size: 1.2rem;
  color: #3498db;
  margin-right: 1rem;
  margin-top: 0.2rem;
}

.info-content label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.2rem;
}

.info-content p {
  margin: 0;
  color: #2c3e50;
  font-weight: 500;
}

.booking-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn-book,
.btn-cancel {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-book {
  background: #2ecc71;
  color: white;
}

.btn-book:hover {
  background: #27ae60;
}

.btn-cancel {
  background: #e74c3c;
  color: white;
}

.btn-cancel:hover {
  background: #c0392b;
}

.loading-state {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .booking-container {
    padding: 1rem;
    margin: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-image {
    margin: 0 auto 1rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .booking-actions {
    flex-direction: column;
  }

  .btn-book,
  .btn-cancel {
    width: 100%;
    justify-content: center;
  }
}
</style>
  
  