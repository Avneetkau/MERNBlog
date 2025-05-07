import React from 'react';

const MottoAndSkills = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">🚀 Our Motto</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        My mission is to create dynamic, scalable, and secure blog platforms using the power of the MERN stack — <strong>MongoDB</strong>, 
        <strong>Express</strong>, <strong>React</strong>, and <strong>Node.js</strong>. I am committed to delivering smooth user experiences, responsive design, and real-time content interaction that encourages creativity, community, and engagement.
      </p>

      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">🛠️ My Skills & Expertise</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Skill 1 - Frontend Development */}
        <div className="text-center p-6 border rounded-lg shadow-lg hover:bg-gray-100 transition">
          <h3 className="text-2xl font-semibold text-red-700 mb-4">Frontend Development</h3>
          <p className="text-gray-700">
            Building intuitive and visually appealing user interfaces using <strong>React.js</strong>, creating responsive layouts with <strong>CSS3</strong>, <strong>HTML5</strong>, and modern JavaScript to ensure a delightful user experience across devices.
          </p>
        </div>

        {/* Skill 2 - Backend Development */}
        <div className="text-center p-6 border rounded-lg shadow-lg hover:bg-gray-100 transition">
          <h3 className="text-2xl font-semibold text-red-700 mb-4">Backend Development</h3>
          <p className="text-gray-700">
            Developing efficient and secure backend services with <strong>Node.js</strong> and <strong>Express.js</strong>. Building RESTful APIs to handle dynamic data, ensuring high performance and scalability with <strong>MongoDB</strong>.
          </p>
        </div>

        

        {/* Skill 3 - Authentication & Security */}
        <div className="text-center p-6 border rounded-lg shadow-lg hover:bg-gray-100 transition">
          <h3 className="text-2xl font-semibold text-red-700 mb-4">Authentication & Security</h3>
          <p className="text-gray-700">
            Implementing secure user authentication with <strong>JWT</strong> (JSON Web Tokens) and ensuring role-based access control for personalized and secure user experiences.
          </p>
        </div>

        

        {/* Skill 4 - Version Control & Collaboration */}
        <div className="text-center p-6 border rounded-lg shadow-lg hover:bg-gray-100 transition">
          <h3 className="text-2xl font-semibold text-red-700 mb-4">Version Control & Collaboration</h3>
          <p className="text-gray-700">
            Efficiently managing code using <strong>Git</strong> and collaborating in teams through GitHub, ensuring organized and streamlined development workflows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MottoAndSkills;
