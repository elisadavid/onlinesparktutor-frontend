<template>
    <div class="manage-tutor-page">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a class="navbar-brand" href="#">SPARK TUTORIAL</a>
        <div class="ms-auto d-flex">
          <button class="btn btn-outline-primary me-2" @click="showOnlineTuition">Online Tuition</button>
          <button class="btn btn-outline-primary me-2" @click="showManageTutor">Manage Tutor</button>
          <button class="btn btn-outline-primary me-2" @click="showViewUsers">View Users</button>
          <button class="btn btn-outline-primary" @click="showViewCourses">View Courses</button>
        </div>
      </nav>
  
      <!-- Dynamic Content -->
      <div class="content-container">
        <!-- Mission & Vision (Default View) -->
        <div v-if="currentView === 'missionVision'" class="mission-vision">
          <h2 class="text-center mb-4">Our Mission & Vision</h2>
          <p class="text-center lead">
            <strong>Mission:</strong> To provide quality education through innovative teaching methods and personalized learning experiences.
          </p>
          <p class="text-center lead">
            <strong>Vision:</strong> To become the leading online tuition platform, empowering students to achieve their academic goals.
          </p>
        </div>
  
        <!-- Online Tuition -->
        <div v-if="currentView === 'onlineTuition'" class="online-tuition">
          <h2 class="text-center mb-4">Online Tuition Courses</h2>
          <div class="row">
            <div v-for="course in courses" :key="course.id" class="col-md-4 mb-4">
              <div class="card">
                <img :src="course.image" class="card-img-top" alt="Course Image" />
                <div class="card-body">
                  <h5 class="card-title">{{ course.name }}</h5>
                  <p class="card-text">{{ course.description }}</p>
                  <p class="card-text"><strong>Duration:</strong> {{ course.duration }}</p>
                  <p class="card-text"><strong>Price:</strong> {{ course.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Manage Tutor -->
        <div v-if="currentView === 'manageTutor'" class="manage-tutor">
          <h2 class="text-center mb-4">Manage Tutors</h2>
          <div class="search-bar mb-4">
            <input
              type="text"
              class="form-control"
              placeholder="Search tutors..."
              v-model="searchQuery"
            />
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Tutor ID</th>
                <th>Tutor Name</th>
                <th>Email ID</th>
                <th>Contact Number</th>
                <th>School Name</th>
                <th>Qualification</th>
                <th>Grade</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tutor in filteredTutors" :key="tutor.id">
                <td>
                  <img :src="tutor.image" alt="Tutor Image" class="tutor-image" />
                </td>
                <td>{{ tutor.id }}</td>
                <td>{{ tutor.name }}</td>
                <td>{{ tutor.email }}</td>
                <td>{{ tutor.contact }}</td>
                <td>{{ tutor.school }}</td>
                <td>{{ tutor.qualification }}</td>
                <td>{{ tutor.grade }}</td>
                <td>{{ tutor.city }}</td>
                <td>
                  <button class="btn btn-danger btn-sm me-2" @click="deleteTutor(tutor.id)">Delete</button>
                  <button class="btn btn-warning btn-sm" @click="modifyTutor(tutor.id)">Modify</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- View Users -->
        <div v-if="currentView === 'viewUsers'" class="view-users">
          <h2 class="text-center mb-4">View Users</h2>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <button class="btn btn-info btn-sm me-2" @click="viewUser(user.id)">View</button>
                  <button class="btn btn-warning btn-sm" @click="updateUser(user.id)">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- View Courses -->
        <div v-if="currentView === 'viewCourses'" class="view-courses">
          <h2 class="text-center mb-4">View Courses</h2>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in courses" :key="course.id">
                <td>{{ course.id }}</td>
                <td>{{ course.name }}</td>
                <td>{{ course.description }}</td>
                <td>{{ course.duration }}</td>
                <td>{{ course.price }}</td>
                <td>
                  <button class="btn btn-info btn-sm me-2" @click="viewCourse(course.id)">View</button>
                  <button class="btn btn-warning btn-sm" @click="updateCourse(course.id)">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Fixed Footer -->
      <footer class="footer py-3 bg-light fixed-bottom">
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
        currentView: 'missionVision', // Default view
        searchQuery: '', // For tutor search
        tutors: [
          {
            id: 1,
            image: require('@/assets/person1.jpg'), // Placeholder image
            name: 'John Doe',
            email: 'john@example.com',
            contact: '1234567890',
            school: 'ABC School',
            qualification: 'M.Sc',
            grade: 'Grade 10',
            city: 'New York',
          },
          {
            id: 2,
            image:require('@/assets/person2.jpg'), // Placeholder image
            name: 'Jane Smith',
            email: 'jane@example.com',
            contact: '9876543210',
            school: 'XYZ School',
            qualification: 'B.Ed',
            grade: 'Grade 8',
            city: 'Los Angeles',
          },
        ],
        courses: [
          {
            id: 1,
            image: require('@/assets/maths.jpg'), // Placeholder image
            name: 'Mathematics for Grade 10',
            description: 'Comprehensive course covering algebra, geometry, and trigonometry.',
            duration: '3 months',
            price: '$200',
          },
          {
            id: 2,
            image: require('@/assets/science.jpg'), // Placeholder image
            name: 'Science for Grade 8',
            description: 'Learn physics, chemistry, and biology with hands-on experiments.',
            duration: '2 months',
            price: '$150',
          },
        ],
        users: [
          { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
          { id: 2, name: 'Michael Brown', email: 'michael@example.com' },
        ],
      };
    },
    computed: {
      // Filter tutors based on search query
      filteredTutors() {
        return this.tutors.filter((tutor) =>
          tutor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      showOnlineTuition() {
        this.currentView = 'onlineTuition';
      },
      showManageTutor() {
        this.currentView = 'manageTutor';
      },
      showViewUsers() {
        this.currentView = 'viewUsers';
      },
      showViewCourses() {
        this.currentView = 'viewCourses';
      },
      deleteTutor(id) {
        this.tutors = this.tutors.filter((tutor) => tutor.id !== id);
        alert(`Tutor with ID ${id} deleted.`);
      },
      modifyTutor(id) {
        alert(`Modify tutor with ID ${id}.`);
      },
      viewUser(id) {
        alert(`View user with ID ${id}.`);
      },
      updateUser(id) {
        alert(`Update user with ID ${id}.`);
      },
      viewCourse(id) {
        alert(`View course with ID ${id}.`);
      },
      updateCourse(id) {
        alert(`Update course with ID ${id}.`);
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar-brand {
    font-size: 1.5rem; /* Increase font size for the title */
    font-weight: bold; /* Make the title bold */
    color: #2c3e50 !important; /* Change title color */
  }
  .manage-tutor-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 60px; /* Add padding to prevent content from being hidden behind the fixed footer */
  }
  
  .content-container {
    padding: 2rem;
    flex: 1; /* Allow content to grow and fill the remaining space */
  }
  
  .mission-vision,
  .online-tuition,
  .manage-tutor,
  .view-users,
  .view-courses {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .search-bar {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .tutor-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .table {
    margin-top: 1rem;
  }
  
  .card {
    height: 100%;
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f8f9fa; /* Light background color */
    padding: 1rem 0; /* Add padding to the footer */
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow at the top */
  }
  </style>