<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Dashboard</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li :class="{ active: currentView === 'recommendedTutors' }" @click="currentView = 'recommendedTutors'">
            <i class="fas fa-chalkboard-teacher"></i>
            <span>Recommended Tutors</span>
          </li>
          <li :class="{ active: currentView === 'myTutor' }" @click="currentView = 'myTutor'">
            <i class="fas fa-user-check"></i>
            <span>My Tutor</span>
          </li>
          <li :class="{ active: currentView === 'profile' }" @click="currentView = 'profile'">
            <i class="fas fa-user"></i>
            <span>Profile</span>
          </li>
          <li :class="{ active: currentView === 'notifications' }" @click="currentView = 'notifications'">
            <i class="fas fa-bell"></i>
            <span>Notifications</span>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="content-header">
        <h1>{{ pageTitle }}</h1>
        <div class="user-info">
          <span>Welcome, {{ userProfile.name }}</span>
          <button class="logout-btn" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </header>

      <!-- Profile Section -->
      <section v-if="currentView === 'profile'" class="profile-section">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <img :src="userProfile.avatar" :alt="userProfile.name" />
            </div>
            <h2>{{ userProfile.username }}</h2>
            <p>{{ userProfile.email }}</p>
          </div>
          <div class="profile-details">
            <div class="detail-item">
              <i class="fas fa-phone"></i>
              <div class="detail-content">
                <label>Phone</label>
                <span>{{ userProfile.phn_no }}</span>
              </div>
            </div>
            <div class="detail-item">
              <i class="fas fa-stream"></i>
              <div class="detail-content">
                <label>Stream</label>
                <span>{{ userProfile.streamName }}</span>
              </div>
            </div>
            <div class="detail-item">
              <i class="fas fa-book"></i>
              <div class="detail-content">
                <label>Subject</label>
                <span>{{ userProfile.subjectName }}</span>
              </div>
            </div>
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <div class="detail-content">
                <label>Location</label>
                <span>{{ userProfile.location }}</span>
              </div>
            </div>
            <div class="detail-item">
              <i class="fas fa-graduation-cap"></i>
              <div class="detail-content">
                <label>Education</label>
                <span>{{ userProfile.educationLevel }}</span>
              </div>
            </div>
          </div>
        </div>
        <button class="edit-btn" @click="openEditDialog">
          <i class="fas fa-edit"></i> Edit Profile
        </button>
      </section>

      <!-- Edit Profile Dialog -->
      <v-dialog v-model="editDialog" max-width="600px">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold">Edit Profile</v-card-title>
          <v-card-text>
            <v-form ref="editFormRef" lazy-validation>
              <v-text-field v-model="editForm.username" label="Name" required />
              <v-text-field v-model="editForm.email" label="Email" required />
              <v-text-field v-model="editForm.phn_no" label="Phone Number" required />
              <v-text-field v-model="editForm.location" label="Location" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="error" @click="editDialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="saveProfile">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Recommended Tutors -->
      <section v-if="currentView === 'recommendedTutors'" class="tutors-section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">EXPERT TUTORS</span>
            <h2 class="section-title">Meet Our Professional Tutors</h2>
          </div>
          <div class="tutors-grid">
            <div class="tutor-card" v-for="tutor in tutors" :key="tutor.id">
              <div class="tutor-header">
                <img :src="tutor.image" :alt="tutor.name" class="tutor-avatar" />
                <div class="tutor-rating">
                  <i class="fas fa-star"></i>
                  <span>{{ tutor.rating }}</span>
                </div>
              </div>
              <div class="tutor-info">
                <h3 class="tutor-name">{{ tutor.name }}</h3>
                <p class="tutor-specialty">{{ tutor.specialty }}</p>
                <div class="tutor-details">
                  <p><i class="fas fa-graduation-cap"></i> {{ tutor.subjectName }}</p>
                  <p><i class="fas fa-stream"></i> {{ tutor.streamName }}</p>
                  <p><i class="fas fa-clock"></i> {{ tutor.experience }} Years Experience</p>
                </div>
              </div>
              <button class="book-button" @click="openDialog(tutor)" :disabled="isTutorBooked(tutor.id)">
                <i class="fas fa-calendar-check"></i>
                {{ isTutorBooked(tutor.id) ? 'Already Booked' : 'Book Session' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- My Tutor Section -->
      <section v-if="currentView === 'myTutor'" class="my-tutor-section">
        <div class="container">
          <div class="section-header">
            <h2>Your Booked Tutors</h2>
          </div>

          <div v-if="myTutors.length > 0" class="tutors-grid">
            <div class="tutor-card" v-for="tutor in myTutors" :key="tutor.id">
              <div class="tutor-header">
                <img :src="tutor.image" :alt="tutor.tutorId" class="tutor-avatar" />
                <div class="tutor-rating">
                  <i class="fas fa-star"></i>
                  <span>{{ tutor.rating }}</span>
                </div>
              </div>
              <div class="tutor-info">
                <h3 class="tutor-name">{{ getTutorNameById(tutor.tutorId) }}</h3>
                <p class="tutor-specialty">TutorId: {{ tutor.tutorId }}</p>
                <div class="tutor-details">
                  <p><i class="fas fa-stream"></i> {{ getStreamNameById(tutor.tutorId) }}</p>
                  <p><i class="fas fa-clock"></i> {{ getExperienceById(tutor.tutorId) }} Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <p>No tutors booked yet.</p>
          </div>
        </div>
      </section>

      <!-- Notifications Section -->
      <section v-if="currentView === 'notifications'" class="notifications-section">
        <div class="container">
          <h3>Your Notifications</h3>
          <v-list v-if="notifications.length > 0">
            <v-list-item v-for="notification in notifications" :key="notification.id">
              <v-list-item-content>
                <div class="notification-header">
                  <span class="tutor-name">Tutor: {{ getTutorNameById(notification.tutorId) }}</span>
                  <span class="timestamp">{{ formatTimestamp(notification.timestamp) }}</span>
                </div>
                <div class="notification-message">
                  {{ notification.message }}
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div v-else>
            No notifications found.
          </div>
        </div>
      </section>

      <!-- Booking Dialog -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold">
            Booking Session with {{ selectedTutor?.name }}
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Subject</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedTutor?.subjectName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Stream</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedTutor?.streamName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Teaching Mode</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedTutor?.teachingMode }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedTutor?.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Phone Number</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedTutor?.phn_no }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Week</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedTutor?.week }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="confirmBooking">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </main>
  </div>
</template>



<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'UserDashboard',
  data() {
    return {
      currentView: 'profile',
      userProfile: {},
      tutors: [],
      dialog: false,
      selectedTutor: null,
      notifications: [],
      userId: null,
      streamId: null,
      myTutors: [],
      bookedTutorId: null,

      editDialog: false,
      editForm: {
        username: '',
        email: '',
        phn_no: '',
        location: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getuserId']),
    pageTitle() {
      const titles = {
        profile: 'My Profile',
        tutors: 'My Tutors',
        recommended: 'Recommended Tutors',
        notifications: 'Notifications'
      }
      return titles[this.currentView] || 'Dashboard'
    },
    isTutorBooked() {
      return tutorId => {
        return this.tutors.find(t => t.id === tutorId)?.isBooked || false
      }
    }
  },
  methods: {
    async fetchuserprofile() {
      try {
        const userId = this.getuserId
        if (!userId) return
        const res = await axios.get(`http://localhost:8089/api/User/user/profile/${userId}`)
        if (res.status >= 200 && res.status < 300) {
          this.userProfile = res.data
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    },

    async fetchmytutors() {
      try {
        if (!this.userId) return
        const res = await axios.get(`http://localhost:8089/api/bookings/user/${this.userId}`)
        if (res.status >= 200 && res.status < 300) {
          this.myTutors = res.data
        }
      } catch (error) {
        console.error('Error fetching tutor profile:', error)
      }
    },

    async fetchRecommendedTutors() {
      try {
        this.streamId = sessionStorage.getItem('streamId')
        if (!this.streamId) {
          console.warn('streamId not found in sessionStorage')
          return
        }
        console.log('Fetching tutors for streamId:', this.streamId)
        const response = await axios.get(`http://localhost:8089/api/tutor/getTutorbystream/${this.streamId}`)
        this.tutors = response.data.map(tutor => ({
          id: tutor.tutorId,
          name: tutor.name,
          email: tutor.email,
          phn_no: tutor.phn_no,
          subjectId: tutor.subjectId,
          streamId: tutor.streamId,
          streamName: tutor.streamName,
          subjectName: tutor.subjectName,
          image: 'https://via.placeholder.com/100',
          rating: 4.5,
          experience: tutor.experience,
          specialty: 'Subject Specialist',
          isBooked: false,
          teachingMode: tutor.teachingMode,
          week: tutor.week
        }))
      } catch (error) {
        console.error('Failed to fetch tutors:', error)
      }
    },

    async saveProfile() {
      try {
        const userId = this.getuserId
        if (!userId) return alert('User not logged in')
        const res = await axios.put(`http://localhost:8089/api/User/update/profile/${userId}`, this.editForm)
        if (res.status >= 200 && res.status < 300) {
          this.userProfile = { ...this.userProfile, ...this.editForm }
          alert('Profile updated successfully!')
          this.editDialog = false
        } else {
          alert('Update failed.')
        }
      } catch (error) {
        console.error('Update error:', error)
        alert('An error occurred while updating the profile.')
      }
    },

    openEditDialog() {
      this.editForm = {
        name: this.userProfile.name || '',
        email: this.userProfile.email || '',
        phn_no: this.userProfile.phn_no || '',
        location: this.userProfile.location || ''
      }
      this.editDialog = true
    },

    async confirmBooking() {
      try {
        const userId = sessionStorage.getItem('userId')
        if (!userId) return alert('User not logged in')
        if (!this.selectedTutor) return alert('No tutor selected')

        const tutorId = this.selectedTutor.id
        const streamId = this.selectedTutor.streamId
        const subjectId = this.selectedTutor.subjectId
        const teachingMode = this.selectedTutor.teachingMode
        const week = this.selectedTutor.week

        const response = await axios.get(`http://localhost:8089/api/bookings/user/${userId}`)
        const existingBooking = response.data.find(booking => booking.tutorId === tutorId)

        if (existingBooking) {
          alert('Booking Confirmed.')
          this.dialog = false
          return
        }

        const bookingRes = await axios.post('http://localhost:8089/api/bookings/create', {
          userId,
          tutorId,
          streamId,
          subjectId,
          teachingMode,
          week
        })

        const bookingId = bookingRes.data.bookingId
        await axios.put(`http://localhost:8089/api/bookings/confirm/${bookingId}`)

        alert('Tutor booked successfully!')
        this.dialog = false

        // Refresh tutors
        await this.fetchRecommendedTutors()

        const tutorIndex = this.tutors.findIndex(t => t.id === tutorId)
        if (tutorIndex !== -1) {
          this.tutors[tutorIndex].isBooked = true
        }
      } catch (error) {
        console.error('Booking error:', error)
        alert('Something went wrong. Please try again.')
      }
    },

    markTutorAsBooked(tutorId) {
      this.tutors = this.tutors.map(tutor => ({
        ...tutor,
        isBooked: tutor.id === tutorId
      }))
    },

    openDialog(tutor) {
      this.markTutorAsBooked(tutor.id)
      localStorage.setItem('bookedTutorId', tutor.id)
      this.selectedTutor = tutor
      this.dialog = true
    },

    logout() {
      console.log('Logging out...')
      sessionStorage.clear()
      this.$router.push('/user') // Adjust route as needed
    },

    async fetchNotifications() {
      try {
        const userId = this.getuserId
        if (!userId) {
          console.warn('User ID not set')
          return
        }
        const res = await axios.get(`http://localhost:8089/api/notify/user/${userId}`)
        this.notifications = res.data
      } catch (error) {
        console.error('Failed to fetch notifications', error)
      }
    },

    getTutorNameById(id) {
      const tutor = this.tutors.find(t => t.id === id)
      return tutor ? tutor.name : 'Unknown Tutor'
    },

    getStreamNameById(tutorId) {
      const tutor = this.tutors.find(t => t.id === tutorId)
      return tutor ? tutor.streamName : 'Unknown Stream'
    },

    getExperienceById(tutorId) {
      const tutor = this.tutors.find(t => t.id === tutorId)
      return tutor ? tutor.experience : 'N/A'
    },

    formatTimestamp(ts) {
      return new Date(ts).toLocaleString()
    }
  },
  mounted() {
    const bookedTutorId = localStorage.getItem('bookedTutorId')
    if (bookedTutorId) {
      this.markTutorAsBooked(parseInt(bookedTutorId))
    }
    this.userId = this.getuserId
    this.fetchuserprofile()
    this.fetchRecommendedTutors()
    this.fetchNotifications()
    this.fetchmytutors()
  }
}
</script>


<style scoped>
h3 {
  margin-bottom: 1rem;
}
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background: linear-gradient(to bottom, #2c3e50, #3498db);
  color: white;
  padding: 1.5rem 0;
  position: fixed;
  height: 100vh;
}

.sidebar-header {
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.sidebar-nav li {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-nav li i {
  margin-right: 0.75rem;
  width: 20px;
}

.sidebar-nav li:hover,
.sidebar-nav li.active {
  background-color: rgba(255, 255, 255, 0.1);
}


.edit-btn {
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #2c3e50;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* Profile Styles */
.profile-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  background: linear-gradient(to right, #2c3e50, #3498db);
  color: white;
  padding: 2rem;
  text-align: center;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-details {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.detail-item i {
  color: #3498db;
  font-size: 1.2rem;
}

.detail-content {
  display: flex;
  flex-direction: column;
}

.detail-content label {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

/* Courses Styles */
.courses-grid,
.tutors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.course-card,
.tutor-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.course-card:hover,
.tutor-card:hover {
  transform: translateY(-5px);
}

.course-header,
.tutor-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.course-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.course-status.active {
  background: #e3fcef;
  color: #00875a;
}

.course-status.upcoming {
  background: #e3f2fd;
  color: #0d47a1;
}

.course-content,
.tutor-content {
  padding: 1.5rem;
}

.course-content p,
.tutor-content p {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0;
  color: #6c757d;
}

.course-actions,
.tutor-actions {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
}

.btn-view,
.btn-contact {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.btn-view {
  background-color: #3498db;
  color: white;
}

.btn-view:hover {
  background-color: #2980b9;
}

.btn-contact {
  background-color: #2ecc71;
  color: white;
}

.btn-contact:hover {
  background-color: #27ae60;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 0;
    transform: translateX(-100%);
  }

  .main-content {
    margin-left: 0;
  }

  .profile-details,
  .courses-grid,
  .tutors-grid {
    grid-template-columns: 1fr;
  }

  .content-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
.tutors-section {
  padding: 2rem;
  background-color: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-badge {
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.section-title {
  color: #2c3e50;
  font-size: 2.5rem;
  margin: 0;
}

.tutors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.tutor-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tutor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.tutor-header {
  position: relative;
  padding: 1.5rem;
  text-align: center;
  background: linear-gradient(45deg, #3498db, #2ecc71);
}

.tutor-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  margin: 0 auto;
}

.tutor-rating {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tutor-rating i {
  color: #f1c40f;
}

.tutor-info {
  padding: 1.5rem;
}

.tutor-name {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
  text-align: center;
}

.tutor-specialty {
  color: #7f8c8d;
  text-align: center;
  margin: 0.5rem 0;
}

.tutor-details {
  margin-top: 1rem;
}

.tutor-details p {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.75rem 0;
  color: #34495e;
}

.tutor-details i {
  color: #3498db;
  width: 20px;
}

.book-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.book-button:hover {
  opacity: 0.9;
}

.book-button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  opacity: 0.7;
}

.book-button:disabled:hover {
  opacity: 0.7;
}
.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: #555;
}

.tutor-name {
  font-weight: 600;
  color: #3f51b5;
}

.timestamp {
  font-style: italic;
  color: #888;
}

.notification-message {
  font-size: 1.05rem;
  color: #333;
  font-weight: 500;
  padding-left: 2px;
}



@media (max-width: 768px) {
  .tutors-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>



