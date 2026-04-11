import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          About Carbon Footprint Tracker
        </h1>

        <p className="text-gray-700 mb-6">
          Carbon Footprint Tracker is a web application designed to help users
          understand and monitor their environmental impact. Many daily
          activities like electricity usage, transportation, and lifestyle
          habits contribute to carbon emissions. This platform helps visualize
          those impacts in a simple and interactive way.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Our Mission
        </h2>

        <p className="text-gray-700 mb-6">
          Our mission is to raise awareness about climate change and encourage
          people to adopt eco-friendly habits that reduce their carbon
          footprint.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Features
        </h2>

        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Track environmental impact</li>
          <li>View carbon emission trends</li>
          <li>Compare environmental performance</li>
          <li>Leaderboard for eco-friendly competition</li>
          <li>Suggestions for reducing carbon footprint</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          Technologies Used
        </h2>

        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Vite</li>
        </ul>

      </div>
    </div>
  );
};

export default About;