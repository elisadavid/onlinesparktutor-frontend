<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a class="navbar-brand" href="#">SPARK TUTORIAL</a>
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Tutor Registration Page -->
    <div class="tutor-register-page">
      <!-- Snackbar for Notifications -->
      <v-snackbar v-model="snackbar" :timeout="timeout" location="top">
        {{ text }}
      </v-snackbar>

      <!-- Registration Form -->
      <div class="register-content">
        <h1 class="text-center mb-4">Tutor Registration</h1>
        <form
          @submit.prevent="submitForm"
          enctype="multipart/form-data"
          class="registration-form"
        >
          <!-- Row 1: Name, Email, Password -->
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" v-model="name" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Row 2: Phone Number, Gender -->
          <div class="form-row">
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                required
              />
            </div>

            <div class="form-group">
              <label for="phn_no">Phone Number</label>
              <input
                type="text"
                v-model="phn_no"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Row 3: Qualification, Subject -->
          <div class="form-row">
            <div class="form-group">
              <label for="genderId">Gender</label>
              <select v-model="genderId" class="form-control" required>
                <option value="">Select Gender</option>
                <option
                  v-for="option in genderOptions"
                  :key="option.genderId"
                  :value="option.genderId"
                >
                  {{ option.genderType }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="qualificationId">Qualification</label>
              <select v-model="qualificationId" class="form-control" required>
                <option value="">Select Qualification</option>
                <option
                  v-for="option in qualificationOptions"
                  :key="option.qual_id"
                  :value="option.qual_id"
                >
                  {{ option.qualification }}
                </option>
              </select>
            </div>
            <!-- <div class="form-group">
              <label for="subjectId">Subject</label>
              <select v-model="subjectId" class="form-control" required>
                <option value="">Select Subject</option>
                <option v-for="subject in subjectOptions" :key="subject.subjectId" :value="subject.subjectId">
                  {{ subject.subjectName }}
                </option>
              </select>
            </div> -->
          </div>

          <!-- Row 4: Teaching Mode, Certificate Upload -->
          <div class="form-row">
            <div class="form-group">
              <label for="teachingModeId">Teaching Mode</label>
              <select v-model="teachingModeId" class="form-control" required>
                <option value="">Select Teaching Mode</option>
                <option
                  v-for="option in teachingModeOptions"
                  :key="option.teachingModeId"
                  :value="option.teachingModeId"
                >
                  {{ option.teachingMode }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="qualificationCertificate"
                >Upload Qualification Certificate</label
              >
              <input
                type="file"
                class="form-control-file"
                @change="onFileChange"
                accept=".pdf,.jpg,.png,.doc,.docx"
                required
              />
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="Uploaded Image"
                class="uploaded-img"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-group text-center">
            <button
              type="submit"
              class="btn btn-primary"
              @click="StoreRegister"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      phn_no: "",
      genderId: "",
      qualificationId: "",
      location: "",
      teachingModeId: "",
      subjectId: "",
      qualificationCertificate: null,
      genderOptions: [],
      qualificationOptions: [],
      teachingModeOptions: [],
      // subjectOptions: [],
      snackbar: false,
      text: "",
      timeout: 3000,
      imageUrl: null,
    };
  },
  mounted() {
    this.fetchGenderOptions();
    this.fetchQualificationOptions();
    this.fetchTeachingModeOptions();
    // this.fetchSubjectOptions();
  },
  methods: {
    onFileChange(event) {
      this.qualificationCertificate = event.target.files[0];
    },
    // async StoreRegister() {
    //   const formData = new FormData();
    //   formData.append("qualificationCertificate", this.qualificationCertificate);

    //   const tutorModel = new Blob(
    //     [JSON.stringify({
    //       name: this.name,
    //       email: this.email,
    //       password: this.password,
    //       phn_no: this.phn_no,
    //       genderId: this.genderId,
    //       qualificationId: this.qualificationId,
    //       location: this.location,
    //       teachingModeId: this.teachingModeId,
    //       // subjectId: this.subjectId,
    //     })],
    //     { type: "application/json" }
    //   );

    //   formData.append("tutorModel", tutorModel);

    //   try {
    //     const response = await this.$store.dispatch("registerStore", formData);
    //     if (response) {
    //       alert("Registered Successfully! Welcome, " + response.data.name);
    //     } else {
    //       console.log("Error during registration");
    //     }
    //   } catch (error) {
    //     console.error("Error occurred during registration:", error);
    //   }

    async StoreRegister() {
      const formData = new FormData();
      if (this.qualificationCertificate) {
        formData.append(
          "qualificationCertificate",
          this.qualificationCertificate
        );
      }

      // Create tutorModel JSON and append to FormData as a Blob
      const tutorModel = {
        name: this.name,
        email: this.email,
        password: this.password,
        phn_no: this.phn_no,
        genderId: this.genderId,
        qualificationId: this.qualificationId,
        location: this.location,
        teachingModeId: this.teachingModeId,
      };
      formData.append(
        "tutorModel",
        new Blob([JSON.stringify(tutorModel)], { type: "application/json" })
      );

      try {
        const response = await this.$store.dispatch("registerStore", formData);
        if (response) {
          // console.log("Response: ", response.data.tutor_id); 
          alert("Registered Successfully! Welcome, ");
          // this.snackbar = true;
          this.$router.push({path: '/tutorregister',query: { tutorId: response.data.tutor_id } });
        } else {
          console.log("Invalid response structure: ", response);
        }
      } catch (error) {
        console.error("Error occurred during registration:", error);
      }
    },

    async fetchGenderOptions() {
      const response = await fetch("http://localhost:8089/api/User/genderlist");
      const data = await response.json();
      this.genderOptions = data;
    },
    async fetchQualificationOptions() {
      const response = await fetch(
        "http://localhost:8089/api/tutor/get/qualification"
      );
      const data = await response.json();
      this.qualificationOptions = data;
    },
    async fetchTeachingModeOptions() {
      const response = await fetch(
        "http://localhost:8089/api/tutor/teachinglist"
      );
      const data = await response.json();
      this.teachingModeOptions = data;
    },
    // async fetchSubjectOptions() {
    //   const response = await fetch("http://localhost:8089/api/admin/get/subject");
    //   const data = await response.json();
    //   this.subjectOptions = data;
    // },
  },
};
</script>

<style scoped>
.tutor-register-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.register-content h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group {
  flex: 1;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-group .form-control-file {
  border: none;
}

.form-group .uploaded-img {
  margin-top: 10px;
  max-width: 100px;
  border-radius: 5px;
}

.form-group button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
}

.navbar {
  margin-bottom: 20px;
}
</style>
