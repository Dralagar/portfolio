    <template>
    <section id="about" class="about-section">
        <div class="container">
        <h3 class="section-title">About Me</h3>
        <div class="content">
            <p class="description">
            I am a passionate developer with a strong background in building dynamic and responsive web applications. My expertise lies in using modern technologies like Vue.js and TypeScript to create seamless user experiences.
            </p>
            <p class="description">
            With a keen eye for design and a commitment to writing clean, efficient code, I strive to deliver high-quality projects that meet the needs of users and clients alike.
            </p>
            <p class="description">
            When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and engaging with the developer community.
            </p>
        </div>
        </div>
    </section>
    </template>

    <script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
    name: 'AboutSection'
    });
    </script>

    <style scoped>
    .about-section {
        padding: 4rem 2rem;
        background-color: #DFD0B8;
        color: #153448;
        text-align: center;
        margin-top: 80px;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .section-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 2rem;
        color: #3C5B6F;
    }

    .content {
        max-width: 800px;
        margin: 0 auto;
    }

    .description {
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        color: #4a5568;
    }

    @media (min-width: 768px) {
        .about-section {
            padding: 6rem 2rem;
            text-align: left;
        }

        .section-title {
            font-size: 2.5rem;
        }

        .description {
            font-size: 1.125rem;
        }
    }
    </style>
