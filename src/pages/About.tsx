const About = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6">
          About SujhavMitra
        </h1>
        <p className="text-lg mb-4">
          SujhavMitra is your intelligent companion for personalized
          recommendations. Whether you're searching for your next favorite book
          or a movie that matches your mood, SujhavMitra is here to guide you.
          Built with advanced machine learning models and curated datasets, we
          provide relevant and smart suggestions to help you explore more of
          what you love.
        </p>
        <p className="text-lg mb-4">
          This platform bridges the gap between technology and human
          preferences. By understanding your search context, SujhavMitra
          recommends titles similar in theme, genre, or user behavior — all in
          real-time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>📚 Book recommendations based on reader patterns</li>
          <li>
            🎬 Movie suggestions that match your viewing history or interest
          </li>
          <li>🚀 Fast and responsive interface built with React & Vite</li>
          <li>💡 Intelligent search powered by a Python Flask API</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Our Mission</h2>
        <p className="text-lg mb-4">
          We aim to help users make quicker, smarter entertainment choices by
          providing intelligent suggestions without the noise. No scrolling
          endlessly — just relevant recommendations at your fingertips.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Tech Stack</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>🧠 Flask + Python for the backend recommendation engine</li>
          <li>⚡ React + TypeScript + Vite for a fast, modern frontend</li>
          <li>
            📊 Pandas, Numpy, and similarity matrices for smart suggestions
          </li>
          <li>🌐 REST API with full CORS support</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Meet the Developer</h2>
        <p className="text-lg">
          This project was created by an enthusiastic developer who believes in
          the power of AI to improve everyday decisions. SujhavMitra started as
          a learning project and has grown into a helpful tool for bookworms and
          cinephiles alike.
        </p>
      </div>
    </>
  );
};

export default About;
