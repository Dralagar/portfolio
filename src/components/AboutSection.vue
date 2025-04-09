    <template>
    <section id="about" class="about-section">
        <div class="container">
        <h3 class="section-title">About Me</h3>
        <div class="content">
            <div class="about-grid">
                <div class="about-text">
                    <p class="description">
                        As a Full-Stack Developer and Digital Advocate, I combine technical expertise with a passion for social impact. My journey in technology is driven by a vision to bridge the digital divide and empower communities through innovative solutions.
                    </p>
                    <p class="description">
                        With a unique blend of political science background and technical skills, I bring a holistic approach to problem-solving. My expertise spans from crafting responsive web applications to leading digital transformation initiatives that create lasting social impact.
                    </p>
                    <div class="key-points">
                        <div class="point">
                            <i class="fas fa-code"></i>
                            <span>Full-Stack Development</span>
                        </div>
                        <div class="point">
                            <i class="fas fa-users"></i>
                            <span>Community Leadership</span>
                        </div>
                        <div class="point">
                            <i class="fas fa-lightbulb"></i>
                            <span>Innovation & Strategy</span>
                        </div>
                    </div>
                </div>
                <div class="about-stats">
                    <div class="stat-item">
                        <span class="stat-number">5+</span>
                        <span class="stat-label">Years Experience</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">20+</span>
                        <span class="stat-label">Projects Completed</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">100+</span>
                        <span class="stat-label">Community Members Impacted</span>
                    </div>
                </div>
            </div>
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5rem 2rem;
        background: linear-gradient(135deg, #F5EFE7 0%, #ffffff 100%);
        color: #213555;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .section-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 3rem;
        color: #3C5B6F;
        text-align: center;
        position: relative;
    }

    .section-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background-color: #3E5879;
    }

    .about-grid {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 4rem;
        align-items: start;
    }

    .about-text {
        text-align: left;
    }

    .description {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 2rem;
        color: #4a5568;
    }

    .key-points {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 3rem;
    }

    .point {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .point i {
        font-size: 2rem;
        color: #3E5879;
        margin-bottom: 1rem;
    }

    .about-stats {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .stat-item {
        text-align: center;
        padding: 1.5rem;
        border-bottom: 1px solid #eee;
    }

    .stat-item:last-child {
        border-bottom: none;
    }

    .stat-number {
        display: block;
        font-size: 2.5rem;
        font-weight: bold;
        color: #3E5879;
        margin-bottom: 0.5rem;
    }

    .stat-label {
        font-size: 1rem;
        color: #4a5568;
    }

    @media (max-width: 768px) {
        .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .key-points {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .section-title {
            font-size: 2rem;
        }

        .description {
            font-size: 1rem;
        }
    }
    </style>
