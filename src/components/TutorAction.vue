<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Dashboard</h2>
      <nav class="sidebar-nav">
        <ul>
          <li @click="currentView = 'profile'">My Profile</li>
          <li @click="currentView = 'users'">My Users</li>
          <li @click="currentView = 'courses'">My Courses</li>
          <li @click="currentView = 'scheduling'">Scheduling</li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Profile Section -->
      <section v-if="currentView === 'profile'" class="profile-section">
        <div class="profile-header">
          <h2>Welcome, {{ tutorProfile.name }}</h2>
        </div>
        <div class="profile-details">
          <div class="profile-item">Email: {{ tutorProfile.email }}</div>
          <div class="profile-item">Phone: {{ tutorProfile.phn_no }}</div>
          <div class="profile-item">Location: {{ tutorProfile.location }}</div>
          <div class="profile-item">Gender: {{ tutorProfile.gender }}</div>
          <div class="profile-item">Qualification: {{ tutorProfile.qualification }}</div>
          <div class="profile-item">Teaching Mode: {{ tutorProfile.teachingMode }}</div>
        </div>
      </section>

      <!-- My Users Section -->
      <section v-if="currentView === 'users'" class="users-section">
        <h3>Manage Users</h3>

        <v-select
          v-model="streamId"
          :items="viewStreamlist"
          item-title="streamName"
          item-value="streamId"
          label="Stream"
          @update:model-value="onStreamSelect"
          required
        ></v-select>


        <table class="table" v-if="users.length">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.userId">
              <td>{{ user.userId }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button @click="viewUser(user.userId)">View</button>
                <button @click="updateUser(user.userId)">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No users found.</div>
      </section>

      <!-- My Courses Section -->
      <section v-if="currentView === 'courses'" class="courses-section">
        <h3>Manage Courses</h3>
        <table class="table" v-if="courses.length">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.courseId">
              <td>{{ course.courseId }}</td>
              <td>{{ course.courseName }}</td>
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
        <h3>Scheduling</h3>
        <table class="table" v-if="schedules.length">
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Day</th>
              <th>Time Slot</th>
              <th>Rate per Hour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="schedule in schedules" :key="schedule.sessionId">
              <td>{{ schedule.sessionId }}</td>
              <td>{{ schedule.day }}</td>
              <td>{{ schedule.timeSlot }}</td>
              <td>{{ schedule.ratePerHour }}</td>
              <td>
                <button @click="viewSchedule(schedule.sessionId)">View</button>
                <button @click="updateSchedule(schedule.sessionId)">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No scheduling data available.</div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tutorId : this.$route.query.tutorId,
      currentView: 'profile',
      tutorProfile: {},
      users: [],
      courses: [],
      schedules: [],
      viewStreamlist:[],
    };
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
    async onStreamSelect(selectedStreamId) {
      this.streamId = selectedStreamId;
      await this.fetchUsers();
    },
    async fetchUsers() {
      try {
//         // const res = await axios.get(`http://localhost:8089/api/tutor/tutor/profile/${this.tutorId}`);
        const users = await axios.get("http://localhost:8089/api/User/users/stream", {
  params: { streamId: this.streamId,tutorId: this.tutorId }
});
        
        if (users.status >= 200 && users.status < 300) {
          this.users = users.data;
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
logSelectedStream(streamId){
  console.log("Selected Stream ID:", streamId);
},
     async fetchStream(){
       try{const response=await axios.get("http://localhost:8089/api/admin/get/stream");
        this.viewStreamlist=response.data;
        console.log("stream,",response.data);
       }
       catch(error)
       {console.error("errorfetching",error);}
     },

    async fetchCourses() {
  try {
    const response = await axios.get(`http://localhost:8089/api/tutor/getStreamSubDetailsByTutor/${this.tutorId}`);
    this.courses = response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
},

    async fetchSchedules() {
      try {
        const response = await axios.get(`http://localhost:8089/api/tutor/get/timeslot/scheduling/details`,{
          params:{
            tutorId:this.tutorId
          }
        }); // Replace with your actual API
        this.schedules = response.data;
        console.log(this.tutorId);
        console.log("response",response.data);
        
        
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    },
    getGender(genderId) {
      const gender = this.genderOptions.find(g => g.value === genderId);
      return gender ? gender.text : 'Unknown';
    },
    getQualification(qualificationId) {
      const qualification = this.qualificationOptions.find(q => q.id === qualificationId);
      return qualification ? qualification.text : 'Unknown';
    },
    getTeachingMode(teachingModeId) {
      const mode = this.teachingModeOptions.find(m => m.id === teachingModeId);
      return mode ? mode.text : 'Unknown';
    },
    viewUser(userId) {
      alert(`Viewing user with ID: ${userId}`);
    },
    updateUser(userId) {
      alert(`Updating user with ID: ${userId}`);
    },
    viewCourse(courseId) {
      alert(`Viewing course with ID: ${courseId}`);
    },
    updateCourse(courseId) {
      alert(`Updating course with ID: ${courseId}`);
    },
    viewSchedule(sessionId) {
      alert(`Viewing schedule with ID: ${sessionId}`);
    },
    updateSchedule(sessionId) {
      alert(`Updating schedule with ID: ${sessionId}`);
    }
  },
  mounted() {
    this.fetchProfile();
    this.fetchCourses();
    this.fetchSchedules();
    this.fetchStream();
  }
};
</script>

<style scoped>
/* Same CSS styling as your original, unchanged for layout */
.dashboard-container {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  padding: 20px;
  color: white;
}
.sidebar-title {
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 20px;
}
.sidebar-nav ul {
  list-style-type: none;
  padding: 0;
}
.sidebar-nav li {
  padding: 10px;
  cursor: pointer;
}
.sidebar-nav li:hover {
  background-color: #34495e;
}
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
}
.profile-section,
.users-section,
.courses-section,
.scheduling-section {
  margin-bottom: 20px;
}
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}
.profile-details {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.profile-details .profile-item {
  margin-bottom: 10px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.table th, .table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}
.table th {
  background-color: #2c3e50;
  color: white;
}
.table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
