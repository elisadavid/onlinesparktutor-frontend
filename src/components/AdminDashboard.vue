<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Admin Dashboard</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li :class="{ active: currentView === 'overview' }" @click="currentView = 'overview'">
            <i class="fas fa-home"></i> Overview
          </li>
          <li :class="{ active: currentView === 'tutors' }" @click="currentView = 'tutors'">
            <i class="fas fa-chalkboard-teacher"></i> Tutors
          </li>
          <li :class="{ active: currentView === 'students' }" @click="currentView = 'students'">
            <i class="fas fa-user-graduate"></i> Students
          </li>
          <li :class="{ active: currentView === 'streams' }" @click="currentView = 'streams'">
            <i class="fas fa-stream"></i> Streams
          </li>
          <li :class="{ active: currentView === 'subjects' }" @click="currentView = 'subjects'">
            <i class="fas fa-book"></i> Subjects
          </li>
          <li :class="{ active: currentView === 'settings' }" @click="currentView = 'settings'">
            <i class="fas fa-cog"></i> Settings
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Navigation -->
      <nav class="top-nav">
        <div class="search-bar">
          <input type="text" placeholder="Search..." v-model="searchQuery">
        </div>
        <div class="nav-right">
          <div class="admin-profile">
            <span>Admin</span>
            <button class="btn btn-outline-danger" @click="logout">Logout</button>
          </div>
        </div>
      </nav>

      <!-- Dynamic Content -->
      <div class="content-area">
        <!-- Overview Section -->
        <div v-if="currentView === 'overview'" class="overview-section">
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Total Tutors</h3>
              <p>{{ tutorCount }}</p>
            </div>
            <div class="stat-card">
              <h3>Total Students</h3>
              <p>{{ studentCount }}</p>
            </div>
            <div class="stat-card">
              <h3>Active Streams</h3>
              <p>{{ streamCount }}</p>
            </div>
            <div class="stat-card">
              <h3>Total Subjects</h3>
              <p>{{ subjectCount }}</p>
            </div>
          </div>
        </div>

        <!-- Other Views -->
        <component :is="currentComponent"></component>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentView: 'overview',
      searchQuery: '',
      tutorCount: 0,
      studentCount: 0,
      streamCount: 0,
      subjectCount: 0
    }
  },
  computed: {
    currentComponent() {
      return this.currentView + '-component'
    }
  },
  methods: {
    async fetchDashboardStats() {
      try {
        const response = await fetch('http://localhost:8089/api/admin/dashboard/stats')
        if (response.ok) {
          const data = await response.json()
          this.tutorCount = data.tutorCount
          this.studentCount = data.studentCount
          this.streamCount = data.streamCount
          this.subjectCount = data.subjectCount
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      }
    },
    logout() {
      // Clear admin session/token
      localStorage.removeItem('adminToken')
      this.$router.push('/admin-login')
    }
  },
  created() {
    this.fetchDashboardStats()
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 1rem;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-title {
  font-size: 1.5rem;
  margin: 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.sidebar-nav li {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.sidebar-nav li:hover, .sidebar-nav li.active {
  background: rgba(255, 255, 255, 0.1);
}

.main-content {
  flex: 1;
  background: #f8f9fa;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-bar input {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.content-area {
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-card h3 {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.stat-card p {
  margin: 0.5rem 0 0;
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-profile span {
  font-weight: 500;
}
</style>
  
  
  
  