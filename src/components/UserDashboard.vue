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
              <v-text-field v-model="editForm.name" label="Name" required />
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
        name: '',
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
        const res = await axios.put(`http://localhost:8089/api/User/update/${userId}`, this.editForm)
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



