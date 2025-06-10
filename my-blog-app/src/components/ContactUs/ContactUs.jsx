import React, { useState } from 'react';
import axios from '../../axiosinstance'; 

const ContactUs = () => {
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
      const { data } = await axios.post('/api/email/sendemail', formData); // ✅ simplified pattern
      if (data.success) {
        setShowPopup(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(data.message || 'Failed to send email. Please try again.');
      }
    } catch (err) {
      console.error('Error sending message:', err.response?.data || err.message);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 font-serif">📬 Contact Me</h2>
      <p className="text-lg text-gray-600 mb-8 text-center font-serif">
        I'm always excited to connect with other developers, collaborators, or anyone who shares a passion for technology!
        Feel free to reach out to me with any questions, suggestions, or opportunities.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mb-12">
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
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-700 transition font-serif"
        >
          Send Message
        </button>
      </form>

      {/* Social Links */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-serif">Connect With Me</h3>
        <div className="flex justify-center gap-32">
          <a
            href="https://www.linkedin.com/in/avneet-kaur-271953225/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-blue-800 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Avneetkau"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-blue-800 hover:underline font-serif"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-serif">Follow Me</h3>
        <p className="text-lg text-gray-600 font-serif">
          Stay connected through LinkedIn or GitHub for updates on my latest projects, blogs, and open-source contributions!
        </p>
      </div>

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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-red-700 font-serif"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;




