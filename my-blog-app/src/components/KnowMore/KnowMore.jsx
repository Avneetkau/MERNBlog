import React, { useState } from 'react';
import axios from '../../axiosInstance'; 
const KnowMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/email/sendemail", formData);

      if (response.data.success) {
        setShowPopup(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-6 text-center font-serif">👋 Get to Know Me</h2>
      <p className="text-lg text-gray-700 mb-4 text-center font-serif">
        I’m a Full Stack Developer specializing in the MERN stack — MongoDB, Express, React, and Node.js. I build scalable, secure, and responsive web applications from the ground up.
      </p>
      <p className="text-lg text-gray-700 mb-6 text-center font-serif">
        Passionate about clean code, strong architecture, and learning every day. Whether it's frontend interactivity or backend logic, I love solving problems and creating impactful experiences.
      </p>

      <h3 className="text-2xl font-semibold mt-12 mb-4 text-center font-serif">📬 Contact Me</h3>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border p-3 rounded-lg font-serif"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full border p-3 rounded-lg font-serif"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full border p-3 rounded-lg font-serif"
          rows={5}
          required
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-900 transition font-serif"
        >
          Send Message
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h2 className="text-2xl font-semibold mb-4 font-serif">🎉 Thank You!</h2>
            <p className="text-gray-700 mb-4 font-serif">
              Your message has been sent successfully!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900 font-serif"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowMe;
