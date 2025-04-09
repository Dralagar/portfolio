<template>
    <section class="cv-section">
      <div class="container">
        <h2 class="section-title">My CV</h2>
        <button @click="showCVModal = true" class="view-cv-button">View CV</button>
        <button @click="downloadCV" class="download-cv-button">Download CV</button>
  
        <div v-if="showCVModal" class="cv-modal">
          <div class="cv-modal-content">
            <span class="close" @click="closeCVModal">&times;</span>
            <div id="cv-content" class="cv-content">
              <nav class="navbar navbar-expand-lg bg-primary">
                <div class="container-fluid">
                  <a class="navbar-brand"><img src="https://pbs.twimg.com/profile_banners/1575847529953972224/1668447665/1080x360" width="100" alt="Logo"/></a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li class="nav-item"><a class="nav-link" href="./index.html">Home</a></li>
                      <li class="nav-item"><a class="nav-link active" href="#">CV</a></li>
                      <li class="nav-item"><a class="nav-link" href="./project.html">Projects</a></li>
                      <li class="nav-item"><a class="nav-link" href="./contact.html">Contact</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div class="paper-background">
                <header id="info">
                  <div class="left">
                    <h1>George Dralagar</h1>
                    <h2>Web Developer & Digital Advocate</h2>
                  </div>
                  <div class="right">
                    <strong>Email:</strong> <a href="mailto:gdralagar@gmail.com">gdralagar@gmail.com</a><br/>
                    <strong>GitHub:</strong> <a href="https://github.com/Dralagar">github.com/Dralagar</a><br />
                    <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/george-dralagar-107931113">linkedin.com/in/george-dralagar</a>
                  </div>
                </header>
                <main>
                  <hr />
                  <section id="profile">
                    <h3>Profile</h3>
                    <p>Innovative web developer, political scientist, and digital advocate passionate about bridging the digital divide. Skilled in full-stack development, digital advocacy, and strategic communication, empowering communities through technology.</p>
                  </section>
                  <hr />
                  <section id="skills">
                    <h3>Skills</h3>
                    <ul>
                      <li>Full-Stack Web Development (React, Next.js, Node.js, MongoDB, Express)</li>
                      <li>UI/UX Design & Responsive Web Design (CSS, Tailwind, Bootstrap)</li>
                      <li>API Development & Integration (REST, GraphQL)</li>
                      <li>Database Management (MongoDB, MySQL, Firebase)</li>
                      <li>Digital Advocacy & Policy Research</li>
                      <li>Project Management & Strategic Planning</li>
                      <li>Public Speaking, Blogging & Social Media Strategy</li>
                    </ul>
                  </section>
                  <hr />
                  <section id="experience">
                    <h3>Experience</h3>
                    <div class="work-item">
                      <h4>Director of Programs</h4>
                      <p>Youth Voices Community | 2023 - Present</p>
                      <ul>
                        <li>Leading digital livelihood programs to empower refugee youth through technology.</li>
                        <li>Managing advocacy campaigns and strategic partnerships for community development.</li>
                      </ul>
                    </div>
                    <div class="work-item">
                      <h4>Web Developer</h4>
                      <p>Freelance | 2021 - Present</p>
                      <ul>
                        <li>Developing scalable web applications and business websites with modern frameworks.</li>
                        <li>Implementing SEO strategies and performance optimizations.</li>
                      </ul>
                    </div>
                  </section>
                  <hr />
                  <section id="education">
                    <h3>Education</h3>
                    <p>Bachelor's Degree in Political Science & Sociology | [University Name]</p>
                    <p>Web Development Bootcamp | Glad Technology</p>
                  </section>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import html2pdf from 'html2pdf.js';
  import VueTypedJs from 'vue-typed-js';

  interface Education {
    institution: string;
    degree: string;
    year: string;
    show: boolean;
  }

  export default defineComponent({
    name: 'CVSection',
    components: {
      VueTypedJs
    },
    setup() {
      const showCVModal = ref(false);
      const education = ref<Education[]>([
        { institution: 'University of Nairobi', degree: 'B.A. Political Science', year: '2015-2019', show: false },
        // Add more education entries as needed
      ]);
  
      const closeCVModal = () => {
        showCVModal.value = false;
      };
  
      const downloadCV = () => {
        const element = document.getElementById('cv-content');
        if (element) {
          html2pdf().from(element).set({
            margin: 1,
            filename: 'George_Dralagar_CV.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { format: 'a4', orientation: 'portrait' }
          }).save().catch((error: any) => {
            console.error('Error generating PDF:', error);
          });
        } else {
          console.error('Element not found for PDF generation');
        }
      };
  
      return {
        showCVModal,
        downloadCV,
        education,
        closeCVModal
      };
    }
  });
  </script>
  
  <style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: "Lucida Sans", Geneva, Verdana, sans-serif;
    font-weight: 300;
    color: #333;
    background-color: #f5f5f5;
    overflow-y: auto;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: 300;
    margin: 0;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #047;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.5rem;
    font-style: italic;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    font-style: italic;
    margin: 0 0 0 10px;
  }
  
  h4, h5 {
    font-size: 1rem;
    margin: 0 0 0 10px;
  }
  
  .paper-background {
    background-color: #fff;
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow-y: auto;
    max-height: 80vh;
  }
  
  #info, main {
    max-width: 1000px;
    padding: 0 20px;
  }
  
  #info {
    margin: 30px auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  #info .left, #info .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  main {
    margin: 0 auto;
    text-align: justify;
  }
  
  section {
    margin-bottom: 20px;
  }
  
  section h3 {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  section .right {
    margin: 20px;
  }
  
  ul {
    list-style-type: none; /* Remove bullets */
    padding-left: 0;
    margin: 0;
  }
  
  ul li {
    margin-bottom: 0.5rem;
  }
  
  .navbar {
    background-color: #3474e6;
    color: white;
    margin-bottom: 20px;
  }
  
  .navbar a {
    color: white;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
  }
  
  .navbar a:hover {
    color: #ffcc00;
  }
  
  .contact-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .form-label {
    font-weight: bold;
  }
  
  button[type="submit"] {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #256ac4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button[type="submit"]:hover {
    background-color: #ffcc00;
    color: #256ac4;
  }
  
  @media screen and (max-width: 799px) {
    #info {
      grid-template-columns: 1fr;
      text-align: center;
    }
    section {
      grid-template-columns: 1fr;
    }
  }
  
  .cv-section {
    padding: 4rem 2rem;
    text-align: center;
  }
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  
  .view-cv-button,
  .download-cv-button {
    margin: 1rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .view-cv-button {
    background-color: #3E5879;
    color: #fff;
  }
  
  .download-cv-button {
    background-color: #213555;
    color: #fff;
  }
  
  .view-cv-button:hover,
  .download-cv-button:hover {
    transform: translateY(-2px);
  }
  
  .cv-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .cv-modal-content {
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    position: relative;
    width: 80%;
    max-width: 800px;
    overflow-y: auto;
    max-height: 90vh;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 2rem;
    cursor: pointer;
  }
  
  .cv-content {
    padding: 1rem;
  }
  
  .cv-content nav,
  .cv-content header,
  .cv-content main {
    margin-bottom: 1rem;
  }
  
  .cv-content h1,
  .cv-content h2,
  .cv-content h3,
  .cv-content h4,
  .cv-content h5 {
    margin: 0.5rem 0;
  }
  
  .cv-content p,
  .cv-content ul {
    margin: 0.5rem 0;
  }
  
  .cv-content ul {
    list-style-type: none; /* Remove bullets */
    padding-left: 0;
  }
  </style>
  