const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex items-center justify-center">
      <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">About Us</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to <span className="font-semibold">EduSpark</span>, your trusted E-learning platform designed to empower students and educators alike. We provide a seamless digital space where learning meets innovation.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our mission is to make quality education accessible, engaging, and effective for everyone—whether you're a student, a teacher, or a lifelong learner.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Join us to explore interactive courses, track your progress, and achieve your goals at your own pace.
        </p>
      </div>
    </div>
  );
};

export default About;
