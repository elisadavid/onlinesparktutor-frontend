<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Admin Dashboard</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li :class="{ active: currentView === 'overview' }" @click="currentView = 'overview'">
            <i class="fas fa-tachometer-alt"></i><span>Overview</span>
          </li>
          <li :class="{ active: currentView === 'tutors' }" @click="currentView = 'tutors'">
            <i class="fas fa-chalkboard-teacher"></i><span>Tutors</span>
          </li>
          <li :class="{ active: currentView === 'students' }" @click="currentView = 'students'">
            <i class="fas fa-user-graduate"></i><span>Students</span>
          </li>
          <li :class="{ active: currentView === 'streams' }" @click="currentView = 'streams'">
            <i class="fas fa-stream"></i><span>Streams</span>
          </li>
          <!-- <li :class="{ active: currentView === 'subjects' }" @click="currentView = 'subjects'">
            <i class="fas fa-book"></i><span>Subjects</span>
          </li> -->
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-nav">
        <h2>{{ getPageTitle }}</h2>
        <button class="btn btn-danger" @click="logout">Logout</button>
      </header>

      <!-- Overview Section -->
      <section v-if="currentView === 'overview'" class="overview-section">
        <div class="stats-grid">
          <div class="stat-card" @click="currentView = 'tutors'">
            <div class="stat-icon"><i class="fas fa-chalkboard-teacher"></i></div>
            <div class="stat-info">
              <h3>Total Tutors</h3>
              <p>{{ tutorCount }}</p>
            </div>
          </div>
          <div class="stat-card" @click="currentView = 'students'">
            <div class="stat-icon"><i class="fas fa-user-graduate"></i></div>
            <div class="stat-info">
              <h3>Total Students</h3>
              <p>{{ studentCount }}</p>
            </div>
          </div>
          <div class="stat-card" @click="currentView = 'streams'">
            <div class="stat-icon"><i class="fas fa-stream"></i></div>
            <div class="stat-info">
              <h3>Active Streams</h3>
              <p>{{ streamCount }}</p>
            </div>
          </div>
          <!-- <div class="stat-card" @click="currentView = 'subjects'">
            <div class="stat-icon"><i class="fas fa-book"></i></div>
            <div class="stat-info">
              <h3>Total Subjects</h3>
              <p>{{ subjectCount }}</p>
            </div>
          </div> -->
        </div>
      </section>

      <!-- Tutors Section -->
      <section v-if="currentView === 'tutors'" class="detail-section">
        <div class="section-header">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input v-model="tutorSearch" type="text" placeholder="Search tutors..." />
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Qualification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tutor in filteredTutors" :key="tutor.tutorId">
                <td class="name-cell">
                  <img :src="`https://ui-avatars.com/api/?name=${tutor.name}`" :alt="tutor.name" />
                  <span>{{ tutor.name }}</span>
                </td>
                <td>{{ tutor.email }}</td>
                <td>{{ tutor.phn_no }}</td>
                <td>{{ tutor.location }}</td>
                <td>{{ getQualificationName(tutor.qualificationId)  }}</td>
                <td class="actions-cell">
                
<button @click="deleteEntity(tutor.tutor_id)">Delete</button>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Students Section -->
      <section v-if="currentView === 'students'" class="detail-section">
        <div class="section-header">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input v-model="studentSearch" type="text" placeholder="Search students..." />
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Stream</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in filteredStudents" :key="student.user_id">
                <td class="name-cell">
                  <img :src="`https://ui-avatars.com/api/?name=${student.name}`" :alt="student.name" />
                  <span>{{ student.name }}</span>
                </td>
                <td>{{ student.email }}</td>
                <td>{{ student.phn_no }}</td>
                <td>{{ student.location }}</td>
                <td>{{ getStreamName(student.streamId) }}</td>
                <td class="actions-cell">
                  <!-- <button class="action-btn view"><i class="fas fa-eye"></i></button>
                  <button class="action-btn edit"><i class="fas fa-edit"></i></button> -->
                 <button @click="deleteUser(student.userId)">Delete</button>
                 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

   <!-- Streams Section -->
<section v-if="currentView === 'streams'" class="detail-section">

  <!-- Show all streams ONLY if no stream is selected -->
  <div class="stats-grid" v-if="!selectedStreamDetails">
    <div
      class="stat-card stream-card"
      v-for="stream in streams"
      :key="stream.streamId"
      @click="selectStream(stream)"
      style="cursor:pointer;"
    >
      <div class="stat-icon"><i class="fas fa-stream"></i></div>
      <div class="stat-info">
        <h3>{{ stream.streamName }}</h3>
        <p>{{ getStreamSubjectsCount(stream.streamId) }} Subjects</p>
      </div>
    </div>
  </div>

  <!-- Show details of selected stream -->
  <div
    v-if="selectedStreamDetails"
    class="stream-details-card"
    style="margin-top: 20px; padding: 20px; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px;"
  >
    <h2>{{ selectedStreamDetails.streamName }} </h2>
    <p><strong>Education Level:</strong> {{ selectedStreamDetails.educationLevel }}</p>

    <div>
      <strong>Subjects:</strong>
      <ul>
        <li v-for="subject in selectedStreamDetails.subjectName" :key="subject">{{ subject }}</li>
      </ul>
    </div>

    <div>
      <strong>Teachers & Students Info:</strong>
      <ul>
        <li v-for="teacher in selectedStreamDetails.name" :key="teacher">{{ teacher }}</li>
      </ul>
    </div>

    <!-- Back & Delete Buttons -->
    <div style="margin-top: 20px;">
      <button
        @click="selectedStreamDetails=null"
        style="margin-right: 10px; background: #444; color: white; padding: 8px 12px; border:none; border-radius: 5px; cursor:pointer;"
      >
        Back
      </button>

      <!-- <button
        @click="deleteStream(selectedStreamDetails.streamId)"
        style="background: red; color: white; padding: 8px 12px; border:none; border-radius: 5px; cursor:pointer;"
      >
        Delete Stream
      </button> -->
    </div>
  </div>
</section>


      <!-- Subjects Section -->
      <!-- <section v-if="currentView === 'subjects'" class="detail-section">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Stream</th>
                <th>Total Tutors</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="subject in subjects" :key="subject.subjectId">
                <td>{{ subject.subjectName }}</td>
                <td>{{ getStreamName(subject.streamId) }}</td>
                <td>{{ getSubjectTutorsCount(subject.subjectId) }}</td>
                <td class="actions-cell"> -->
                  <!-- <button class="action-btn view"><i class="fas fa-eye"></i></button>
                  <button class="action-btn edit"><i class="fas fa-edit"></i></button> -->
                  <!-- <button class="action-btn delete"><i class="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section> -->
    </main>
  </div>
  
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      currentView: 'overview',
      tutorSearch: '',
      studentSearch: '',
      tutorCount: 0,
      studentCount: 0,
      streamCount: 0,
      subjectCount: 0,
      tutors: [],
      students: [],
      streams: [],
      subjects: [],
      selectedStream: null,
      selectedStreamDetails: null,
      qualifications:[],
    };
  },

  computed: {
    getPageTitle() {
      const titles = {
        overview: 'Dashboard Overview',
        tutors: 'Manage Tutors',
        students: 'Manage Students',
        streams: 'Manage Streams',
        // subjects: 'Manage Subjects'
      };
      return titles[this.currentView];
    },
    filteredTutors() {
      return this.tutors.filter(tutor =>
        (tutor.name?.toLowerCase() || '').includes(this.tutorSearch.toLowerCase()) ||
        (tutor.email?.toLowerCase() || '').includes(this.tutorSearch.toLowerCase())
      );
    },
    filteredStudents() {
      return this.students.filter(student =>
        (student.name?.toLowerCase() || '').includes(this.studentSearch.toLowerCase()) ||
        (student.email?.toLowerCase() || '').includes(this.studentSearch.toLowerCase())
      );
    },
    subjectsBySelectedStream() {
      if (!this.selectedStream) return [];
      return this.subjects.filter(subject => subject.streamId === this.selectedStream.streamId);
    }
  },

  methods: {
    getSubjectTutorsCount(subjectId) {
      return this.tutors.filter(tutor => tutor.subjectId === subjectId).length;
    },
    getSubjectStudentsCount(subjectId) {
      return this.students.filter(student => student.subjectId === subjectId).length;
    },
    getStreamSubjectsCount(streamId) {
      return this.subjects.filter(subject => subject.streamId === streamId).length;
    },
    getStreamName(streamId) {
      const stream = this.streams.find(s => s.streamId === streamId);
      return stream ? stream.streamName : 'Unknown';
    },
    getQualificationName(id) {
      const qualification = this.qualifications.find(q => q.qual_id === id);
      return qualification ? qualification.qualification : 'Unknown';
    },
    async fetchDashboardData() {
      try {
        const [tutorRes, studentRes, streamRes,  qualificationRes] = await Promise.all([
          fetch('http://localhost:8089/api/tutor/gettutor'),
          fetch('http://localhost:8089/api/User/getuser'),
          fetch('http://localhost:8089/api/admin/get/stream'),
          // fetch('http://localhost:8089/api/admin/get/subject'),
          fetch('http://localhost:8089/api/tutor/get/qualification')

        ]);

        const [tutorData, studentData, streamData,  qualificationData] = await Promise.all([
          tutorRes.json(), studentRes.json(), streamRes.json(),  qualificationRes.json()
        ]);

        this.tutors = tutorData;
        this.streams = streamData;
        // this.subjects = subjectData;
        this.qualifications = qualificationData;

        

        // Add stream name to students
        this.students = studentData.map(student => {
  const stream = streamData.find(s => s.streamId === student.stream_id);
  return {
    ...student,
    streamName: stream ? stream.streamName : ''
  };
});


        this.tutorCount = tutorData.length;
        this.studentCount = studentData.length;
        this.streamCount = streamData.length;
        // this.subjectCount = subjectData.length;
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    },
    async getStreamDetails(streamId) {
      try {
        const response = await fetch(`http://localhost:8089/api/admin/getStreamDetails/${streamId}`);
        if (response.ok) {
          const data = await response.json();
          this.selectedStreamDetails = data;
        } else {
          console.error('Failed to fetch stream details');
          this.selectedStreamDetails = null;
        }
      } catch (error) {
        console.error('Error fetching stream details:', error);
        this.selectedStreamDetails = null;
      }
    },
    selectStream(stream) {
      this.selectedStream = stream;
      this.getStreamDetails(stream.streamId);
    },

   async deleteEntity(tutorId) {
  const confirmed = confirm(`Are you sure you want to delete this tutor?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:8089/api/tutor/delete/${tutorId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Tutor deleted successfully.');
      this.fetchDashboardData(); // Refresh list
    } else {
      alert('Failed to delete tutor.');
      console.error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting tutor:', error);
    alert('An error occurred while deleting the tutor.');
  }
},




 async deleteUser(userId) {
  const confirmed = confirm(`Are you sure you want to delete ?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:8089/api/User/delete/${userId}`, {
      method: 'DELETE'
    });

    if (response) {
      alert('User deleted successfully.');
      this.fetchDashboardData(); // Refresh list
    } else {
      alert('Failed to delete user.');
      console.error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    alert('An error occurred while deleting the user.');
  }
},



    logout() {
      localStorage.removeItem('adminToken');
      this.$router.push('/admin');
    }
  },

  mounted() {
    this.fetchDashboardData();
  }
};
</script>


<style scoped>
/* ===== Dashboard Base Layout ===== */
.dashboard-container {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* ===== Sidebar ===== */
.sidebar {
  width: 250px;
  background: linear-gradient(180deg, #2c3e50, #3498db);
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1.5rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.sidebar-nav li i {
  margin-right: 1rem;
}

.sidebar-nav li:hover,
.sidebar-nav li.active {
  background-color: rgba(255, 255, 255, 0.15);
}

/* ===== Main Content ===== */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-x: hidden;
}

/* ===== Top Navigation ===== */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

/* ===== Stats Cards ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(52, 152, 219, 0.15);
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-info h3 {
  margin: 0;
  font-size: 0.95rem;
  color: #7f8c8d;
}

.stat-info p {
  margin: 0.3rem 0 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
}

/* ===== Detail Section ===== */
.detail-section {
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.section-header {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

/* ===== Search Bar ===== */
.search-bar {
  position: relative;
  max-width: 300px;
  margin-bottom: 1rem;
}

.search-bar i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
}

/* ===== Table Styles ===== */
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eaeaea;
}

th {
  background-color: #f4f6f8;
  font-weight: 600;
  color: #2c3e50;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.name-cell img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

/* ===== Action Buttons ===== */
.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.action-btn.view {
  background: rgba(52, 152, 219, 0.15);
  color: #3498db;
}

.action-btn.edit {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.action-btn.delete {
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
}

.action-btn:hover {
  transform: translateY(-2px);
}

/* ===== Responsive Design ===== */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;
  }

  .main-content {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .detail-section {
    padding: 1rem;
  }

  table, th, td {
    font-size: 0.85rem;
  }
}

/* ===== Stream Cards ===== */
.stream-card {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e1e4e8;
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
}

.stream-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #3498db;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(231, 76, 60, 0.1);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
}

.delete-btn i {
  color: #e74c3c;
  font-size: 14px;
}

.stream-card:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: rgba(231, 76, 60, 0.2);
  transform: scale(1.1);
}

/* ===== Stream Details Modal ===== */
.stream-details-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.detail-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.detail-item h4 {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.detail-item p {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

/* ===== Subjects List in Modal ===== */
.subjects-list {
  margin-top: 2rem;
}

.subject-card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.subject-card:hover {
  transform: translateX(5px);
  border-color: #3498db;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #dc3545;
}
</style>
