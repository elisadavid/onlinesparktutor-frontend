<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Dashboard</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li :class="{ active: currentView === 'profile' }" @click="currentView = 'profile'">
            <i class="fas fa-user"></i>
            <span>My Profile</span>
          </li>
          <li :class="{ active: currentView === 'users' }" @click="currentView = 'users'">
            <i class="fas fa-users"></i>
            <span>My Users</span>
          </li>
          <li :class="{ active: currentView === 'courses' }" @click="currentView = 'courses'">
            <i class="fas fa-book"></i>
            <span>My Courses</span>
          </li>
          <li :class="{ active: currentView === 'scheduling' }" @click="currentView = 'scheduling'">
            <i class="fas fa-calendar"></i>
            <span>Scheduling</span>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-header">
        <h1>{{ getPageTitle }}</h1>
        <div class="breadcrumb">Dashboard / {{ currentView }}</div>
      </div>

      <!-- Profile Section -->
      <section v-if="currentView === 'profile'" class="profile-section">
        <div class="profile-card">
          <div class="profile-avatar">
            <img :src="getAvatarUrl" :alt="tutorProfile.name">
          </div>
          <div class="profile-info">
            <h2>{{ tutorProfile.name }}</h2>
            <div class="info-grid">
              <div class="info-item"><i class="fas fa-envelope"></i> <span>{{ tutorProfile.email }}</span></div>
              <div class="info-item"><i class="fas fa-phone"></i> <span>{{ tutorProfile.phn_no }}</span></div>
              <div class="info-item"><i class="fas fa-map-marker-alt"></i> <span>{{ tutorProfile.location }}</span></div>
              <div class="info-item"><i class="fas fa-venus-mars"></i> <span>{{ tutorProfile.gender }}</span></div>
              <div class="info-item"><i class="fas fa-graduation-cap"></i> <span>{{ tutorProfile.qualification }}</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- <div class="profile-info">
  <h2>{{ tutorProfile.name }}</h2>
  <div class="info-grid"> -->
    <!-- existing fields -->
  <!-- </div> -->
  <button class="edit-btn" @click="openEditDialog">Edit Profile</button>
<!-- </div> -->

<v-dialog v-model="editDialog" max-width="500">
  <v-card>
    <v-card-title>Edit Profile</v-card-title>
    <v-card-text>
      <v-text-field label="Name" v-model="editProfile.name" required></v-text-field>
      <v-text-field label="Email" v-model="editProfile.email" required></v-text-field>
      <v-text-field label="Phone" v-model="editProfile.phn_no" required></v-text-field>
      <v-text-field label="Location" v-model="editProfile.location" required></v-text-field>
      <v-select
        :items="['Male', 'Female', 'Other']"
        label="Gender"
        v-model="editProfile.gender"
        required
      ></v-select>
      <v-select
        :items="['UG', 'PG', 'PhD']"
        label="Qualification"
        v-model="editProfile.qualification"
        required
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="grey" @click="editDialog = false">Cancel</v-btn>
      <v-btn color="primary" @click="updateTutorProfile">Update</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>



      <!-- Users Section -->
      <section v-if="currentView === 'users'" class="users-section">
        <div class="section-header">
          <v-select
            v-model="streamId"
            :items="viewStreamlist"
            item-title="streamName"
            item-value="streamId"
            label="Select Stream"
            class="stream-select"
            @update:model-value="onStreamSelect"
            required
          ></v-select>
        </div>
        <div class="table-container">
          <table class="data-table" v-if="users.length">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.userId">
                <td>#{{ user.userId }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phn_no }}</td>
                <td>
                  <span class="mode-badge">{{ getTeachingMode(user.teachingModeId) }}</span>
                </td>
                <td class="actions">
                  <button class="btn-view" @click="viewUser(user.userId)">view<i class="fas fa-eye"></i></button>
                  <v-btn color="primary" @click="openDialog(user.userId)">Notify User</v-btn>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-state">
            <i class="fas fa-users"></i>
            <p>No users found for this stream</p>
          </div>
        </div>
      </section>

      <!-- Courses Section -->
      <section v-if="currentView === 'courses'" class="courses-section">
        <h3>Manage Courses</h3>
        <table class="table" v-if="courses.length">
          <thead>
            <tr>
              <!-- <th>Course ID</th> -->
              <th>SubjectName</th>
              <th>StreamName</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.courseId">
              <!-- <td>{{ course.courseId }}</td> -->
              <td>{{ course.subjectName }}</td>
              <td>{{ course.streamName }}</td>
              <td>
                <button @click="viewCourse(course.courseId)">View</button>
                <button @click="updateCourse(course.courseId)">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No courses available.</div>
      </section>

      <!-- Scheduling Section -->

<section v-if="currentView === 'scheduling'" class="scheduling-section">
  <h3 class="heading">Scheduling</h3>

  <div v-if="schedules.length" class="schedule-grid">
    <div
      v-for="schedule in schedules"
      :key="schedule.sessionId"
      class="schedule-card"
    >
      <!-- 🕒 Time Grid -->
      <div class="section-title">Time Slots</div>
      <div class="time-grid">
        <div class="time-slot">
          <h4>Morning</h4>
          <p>{{ schedule.morningStartTime }} - {{ schedule.morningEndTime }}</p>
        </div>
        <div class="time-slot">
          <h4>Evening</h4>
          <p>{{ schedule.eveningStartTime }} - {{ schedule.eveningEndTime }}</p>
        </div>
      </div>

      <!-- 💸 Rate Grid -->
      <div class="section-title">Rates</div>
      <div class="rate-grid">
        <div class="rate-box">
          <h4>Weekday</h4>
          <p>₹{{ schedule.ratePerHourWeekday }}</p>
        </div>
        <div class="rate-box">
          <h4>Weekend</h4>
          <p>₹{{ schedule.ratePerHourWeekend }}</p>
        </div>
        <div class="rate-box">
          <h4>Extra Hour</h4>
          <p>₹{{ schedule.extraHourRate }}</p>
        </div>
      </div>

      <!-- 🛠 Actions -->
      <div class="actions">
        <button @click="viewSchedule(schedule.sessionId)" class="view-btn">
          View
        </button>
        <button @click="updateSchedule(schedule.sessionId)" class="update-btn">
          Update
        </button>
        <button @click="deleteSchedule(schedule.sessionId)" class="delete-btn">
          Delete
        </button>
      </div>
    </div>
  </div>

  <div v-else class="empty-state">No scheduling data available.</div>
</section>


<v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Send Notification</v-card-title>

        <v-card-text>
          <v-text-field
            label="User ID"
            v-model="userId"
            readonly
          ></v-text-field>
          <v-textarea
            label="Message"
            v-model="message"
            rows="3"
            required
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="sendNotification">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


      <button class="logout-btn" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
     
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import profilePic from '@/assets/profile pic.jpg';

export default {
  data() {
    return {
      tutorId: this.$route.query.tutorId,
      currentView: 'profile',
      tutorProfile: {},
      users: [],
      courses: [],
      schedules: [],
      viewStreamlist: [],
      streamId: null,
       dialog: false,
      userId: '',
      message: '',

      editDialog: false,
    editProfile: {
      name: '',
      email: '',
      phn_no: '',
      location: '',
      gender: '',
      qualification: ''
    }
    };
  },
  computed: {
    getAvatarUrl() {
      return profilePic;
    },
    getPageTitle() {
      switch (this.currentView) {
        case 'profile': return 'My Profile';
        case 'users': return 'My Users';
        case 'courses': return 'My Courses';
        case 'scheduling': return 'Scheduling';
        default: return 'Dashboard';
      }
    }
  },
  methods: {
    async fetchProfile() {
      try {
        const res = await axios.get(`http://localhost:8089/api/tutor/tutor/profile/${this.tutorId}`);
        if (res.status >= 200 && res.status < 300) {
          this.tutorProfile = res.data;
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },

   
  openEditDialog() {
    this.editProfile = {
      name: this.tutorProfile.name,
      email: this.tutorProfile.email,
      phn_no: this.tutorProfile.phn_no,
      location: this.tutorProfile.location,
      gender: this.tutorProfile.gender,
      qualification: this.tutorProfile.qualification
    };
    this.editDialog = true;
  },

  // async updateTutorProfile() {
  //   const tutorId = this.tutorProfile.tutorId;
  //   try {
  //     const response = await fetch(`http://localhost:8089/api/tutor/update/profile/${tutorId}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(this.editProfile)
  //     });

  //     if (response.ok) {
  //       alert('Profile updated successfully.');
  //       this.editDialog = false;
  //       this.fetchTutorProfile(); // Reload updated data
  //     } else {
  //       alert('Failed to update profile.');
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     alert('An error occurred.');
  //   }
  // },
 async updateTutorProfile() {
  try {
    const tutorId = this.tutorProfile.tutorId || sessionStorage.getItem('tutorId'); // fallback if not loaded
    if (!tutorId) {
      alert('Tutor ID is missing. Cannot update profile.');
      return;
    }

    const response = await fetch(`http://localhost:8089/api/tutor/update/profile/${tutorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.editProfile)
    });

    if (response.ok) {
      alert('Profile updated successfully.');
      this.editDialog = false;
      await this.fetchProfile(); // Refresh profile data
    } else {
      const errorText = await response.text();
      alert('Failed to update profile: ' + errorText);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('An error occurred while updating the profile.');
  }
},



    logout() {
      console.log('Logging out...')
      sessionStorage.clear()
      this.$router.push('/tutor')  // You can modify this based on your route
    },

    async onStreamSelect(selectedStreamId) {
      this.streamId = selectedStreamId;
      await this.fetchUsers();
    },
    async fetchUsers() {
      try {
        const users = await axios.get(`http://localhost:8089/api/User/users/stream?tutorId=${this.tutorId}&streamId=${this.streamId}`);
        if (users.status >= 200 && users.status < 300) {
          this.users = users.data;
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchStream() {
      try {
        const response = await axios.get("http://localhost:8089/api/admin/get/stream");
        this.viewStreamlist = response.data;
      } catch (error) {
        console.error("Error fetching streams:", error);
      }
    },
    async fetchCourses() {
      try {
        const response = await axios.get(`http://localhost:8089/api/tutor/getStreamSubDetailsByTutor/${this.tutorId}`);
        this.courses = response.data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    },
    getTeachingMode(id) {
      if (id === 1) return 'Online'
      if (id === 2) return 'Offline'
      return 'Unknown'
    },

    async fetchSchedules() {
      try {
        const response = await axios.get(`http://localhost:8089/api/tutor/get/timeslot/scheduling/details`, {
          params: { tutorId: this.tutorId }
        });
        this.schedules = response.data;
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    },
    viewUser(userId) {
      alert(`Viewing user with ID: ${userId}`);
    },
     openDialog(id) {
      this.userId = id;
      this.dialog = true;
    },
    async sendNotification() {
      if (!this.userId || !this.message) {
        this.responseMessage = "User ID and message are required.";
        this.snackbar = true;
        return;
      }

      try {
        const res = await axios.post("http://localhost:8089/api/notify/user", {
          userId: this.userId,
          message: this.message,
          tutorId: this.tutorId
        });
        this.responseMessage = res.data;
      } catch (error) {
        this.responseMessage = "Failed to send notification.";
        console.error(error);
      } finally {
        this.snackbar = true;
        this.dialog = false;
        this.userId = '';
        this.message = '';
      }
    },
    viewCourse(courseId) {
      alert(`Viewing course with ID: ${courseId}`);
    },
    updateCourse(courseId) {
      alert(`Updating course with ID: ${courseId}`);
    },
    viewSchedule(sessionId) {
      console.log('Viewing session:', sessionId);
    },
    updateSchedule(sessionId) {
      console.log('Updating session:', sessionId);
    },
    deleteSchedule(sessionId) {
      console.log('Deleting session:', sessionId);
    }
  },
  mounted() {
    this.fetchProfile();
    this.fetchCourses();
    this.fetchStream();
    this.fetchSchedules();
  }
};
</script>


<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Sidebar Styling */
.sidebar {
  width: 260px;
  background: linear-gradient(to bottom, #2c3e50, #3498db);
  color: white;
  padding: 20px 0;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-title {
  font-size: 1.8rem;
  font-weight: bold;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.sidebar-nav li {
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.3s;
}

.sidebar-nav li:hover,
.sidebar-nav li.active {
  background-color: rgba(255, 255, 255, 0.15);
  border-left: 4px solid #fff;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
}


.sidebar-nav i {
  margin-right: 10px;
}

/* Main Content Styling */
.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background-color: #ffffff;
}

.content-header h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.breadcrumb {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 20px;
}

/* Profile Card */
.profile-section .profile-card {
  display: flex;
  gap: 30px;
  background-color: #fdfdfd;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 100%;
  object-fit: cover;
  border: 4px solid #3498db;
}

.profile-info h2 {
  margin-bottom: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
}

.edit-btn {
  background-color: #1976d2;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.edit-btn:hover {
  background-color: #125ea3;
}


/* Table Styling */
.table-container,
.courses-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  margin-top: 20px;
}

.data-table,
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th,
.data-table td,
.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f0f4f8;
  color: #333;
  font-weight: 600;
}

.mode-badge {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.actions button {
  margin-right: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
}

.actions .btn-view {
  color: #3498db;
}

.actions .btn-edit {
  color: #2ecc71;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #aaa;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 10px;
}

/* Stream Select Dropdown */
.stream-select {
  width: 300px;
  margin-bottom: 20px;
}

/* Scheduling Cards already look good from Tailwind */
.scheduling-section {
  background-color: #f4f7fb;
  padding: 2rem 1rem;
  border-radius: 1rem;
  min-height: 100vh;
}

.heading {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.schedule-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .schedule-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.schedule-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease-in-out;
}

.schedule-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.time-grid,
.rate-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.time-slot h4,
.rate-box h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #3b5998;
  margin-bottom: 0.25rem;
}

.time-slot p,
.rate-box p {
  font-size: 0.9rem;
  color: #2d3748;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.actions button {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.view-btn {
  background-color: #3498db;
  color: white;
}

.view-btn:hover {
  background-color: #2980b9;
}

.update-btn {
  background-color: #2ecc71;
  color: white;
}

.update-btn:hover {
  background-color: #27ae60;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.empty-state {
  text-align: center;
  color: #7f8c8d;
  font-size: 1rem;
  margin-top: 2rem;
}



/* Responsive Adjustments */
@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    align-items: center;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    width: 100%;
    position: fixed;
    height: auto;
    z-index: 999;
  }

  .main-content {
    margin-top: 200px;
    padding: 15px;
  }
}
</style>

 