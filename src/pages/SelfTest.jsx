import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const questionData = {
  "5-12": [
    "Do you get upset when someone asks you to stop using a phone or tablet?",
    "Do you feel bored or sad when you are not using the phone, tablet, or computer?",
    "Do you forget to eat, sleep, or do homework because you are using screens?",
    "Do you spend more time online or gaming than you planned to?",
    "Do you get angry if the internet doesn’t work or the game doesn’t load?",
    "Do you prefer being on your device instead of playing outside or with friends?",
    "Do you sneak time on your device when your parents or teachers say 'No'?",
    "Do you think about your games or videos even when you’re not playing?",
    "Do your parents or teachers say you use screens too much?",
    "Do you feel happier or calmer only when using a phone, tablet, or computer?",
  ],
  "13-18": [
    "I lose track of time while using my phone, social media, or playing games.",
    "I feel irritated or anxious when I can’t use my phone or access the internet.",
    "I often choose screen time over studying or completing school assignments.",
    "I use my phone or social media even during meals or family time.",
    "My sleep is disturbed because I stay online late at night.",
    "I feel sad, left out, or jealous after looking at others' social media posts.",
    "I find it hard to stop scrolling even when I want to.",
    "I skip outdoor or physical activities because of screen use.",
    "I use screen time to escape from negative emotions or problems.",
    "My parents or teachers have expressed concern about my screen time habits.",
  ],
  "19-23": [
    "I often procrastinate important tasks because of screen use.",
    "I check my phone or social media first thing in the morning and before sleeping.",
    "I use my phone excessively even in social gatherings or public spaces.",
    "I feel restless, anxious, or uncomfortable when I can’t access the internet.",
    "I spend more time on screens than I originally intended.",
    "My online habits interfere with my work/studies or responsibilities.",
    "I find it difficult to concentrate because of constant digital distractions.",
    "I use the internet or games to cope with stress, loneliness, or sadness.",
    "I avoid real-world responsibilities by engaging with digital content.",
    "I have tried to reduce screen time but failed to do so.",
  ],
};

const options = {
  "5-12": ["Never", "Sometimes", "Often / Always"],
  "13-18": ["Strongly Disagree", "Disagree", "Neutral / Sometimes", "Agree", "Strongly Agree"],
  "19-23": ["Strongly Disagree", "Disagree", "Neutral / Sometimes", "Agree", "Strongly Agree"],
};

const scoring = {
  "5-12": {
    "Never": 1,
    "Sometimes": 3,
    "Often / Always": 5,
  },
  "13-18": {
    "Strongly Disagree": 1,
    "Disagree": 2,
    "Neutral / Sometimes": 3,
    "Agree": 4,
    "Strongly Agree": 5,
  },
  "19-23": {
    "Strongly Disagree": 1,
    "Disagree": 2,
    "Neutral / Sometimes": 3,
    "Agree": 4,
    "Strongly Agree": 5,
  },
};

const SelfTest = () => {
  const [ageGroup, setAgeGroup] = useState("5-12");
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = answers.reduce((total, ans) => total + (scoring[ageGroup][ans] || 0), 0);
    navigate("/result", { state: { score: totalScore, ageGroup } });
  };

  const renderQuestions = () =>
    questionData[ageGroup]?.map((question, index) => (
      <motion.div
        key={index}
        className="mb-4 bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <p className="font-semibold mb-2">{index + 1}. {question}</p>
        <div className="flex flex-wrap gap-4">
          {options[ageGroup].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name={`q${index}`}
                value={opt}
                checked={answers[index] === opt}
                onChange={() => handleChange(index, opt)}
                required
              />
              {opt}
            </label>
          ))}
        </div>
      </motion.div>
    ));

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-10 px-4 mt-9">
      <motion.div
        className="max-w-4xl mx-auto p-6 rounded-xl shadow-2xl bg-white/90 backdrop-blur"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-yellow-800 mb-6">
          Digital Wellness Self-Test
        </h1>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Select your age group:
          </label>
          <select
            value={ageGroup}
            onChange={(e) => {
              setAgeGroup(e.target.value);
              setAnswers([]);
            }}
            className="w-full border border-yellow-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="5-12">5–12 years</option>
            <option value="13-18">13–18 years</option>
            <option value="19-23">19–23 years</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {renderQuestions()}
          <div className="text-center mt-6">
            <motion.button
              type="submit"
              className="bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-yellow-700 transition shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default SelfTest;