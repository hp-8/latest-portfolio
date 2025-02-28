import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Junior MERN Developer</h4>
                <h5>ShapeYourWeb</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
            Developed and optimized full-stack applications using Next.js, React, and Node.js, improving performance and scalability. Resolved 20+ critical bugs in client projects and implemented key SaaS features, including dynamic pricing and appointment booking. Integrated AWS services for enhanced security and scalability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Customer Success Engineer</h4>
                <h5>ScriptAssist</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
            Provided technical support and product insights, ensuring a 98% client satisfaction rate. Analyzed user feedback to drive product improvements and conducted demos & training for better client onboarding. Collaborated with cross-functional teams to enhance user experience.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Quality Assurance Engineer</h4>
                <h5>ScriptAssist</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
            Tested web applications to identify and report bugs and performance issues. Conducted manual and API testing to improve product reliability. Worked closely with developers to ensure smoother deployments and enhance overall system stability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
