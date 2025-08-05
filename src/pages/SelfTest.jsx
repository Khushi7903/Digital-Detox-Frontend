import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const questionData = {
  "5-12": {
    questions: [
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
    options: ["Never", "Sometimes", "Often / Always"],
    scores: { "Never": 1, "Sometimes": 2, "Often / Always": 3 },
    interpretation: { silver: [10, 15], bronze: [16, 22], gold: [23, 30] },
  },
  "13-18": {
    questions: [
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
    options: ["Strongly Agree", "Agree", "Neutral / Sometimes", "Disagree", "Strongly Disagree"],
    scores: { "Strongly Agree": 5, "Agree": 4, "Neutral / Sometimes": 3, "Disagree": 2, "Strongly Disagree": 1 },
    interpretation: { silver: [10, 20], bronze: [24, 36], gold: [37, 50] },
  },
  "19-23": {
    questions: [
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
    options: ["Strongly Agree", "Agree", "Neutral / Sometimes", "Disagree", "Strongly Disagree"],
    scores: { "Strongly Agree": 5, "Agree": 4, "Neutral / Sometimes": 3, "Disagree": 2, "Strongly Disagree": 1 },
    interpretation: { silver: [10, 20], bronze: [24, 36], gold: [37, 50] },
  },
};

const SelfTest = () => {
  const [ageGroup, setAgeGroup] = useState("");
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const handleSubmit = () => {
    const data = questionData[ageGroup];
    const totalScore = Object.values(answers).reduce(
      (acc, ans) => acc + (data.scores[ans] || 0),
      0
    );

    navigate("/result", {
      state: {
        score: totalScore,
        zone:
          totalScore <= data.interpretation.silver[1]
            ? "Silver Zone"
            : totalScore <= data.interpretation.bronze[1]
            ? "Bronze Zone"
            : "Golden Star Zone",
      },
    });
  };

  const currentData = questionData[ageGroup];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-4 bg-gradient-to-r from-blue-100 to-green-100 flex flex-col items-center mt-14">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-2xl p-6 w-full max-w-5xl"
      >
        {/* Header */}
        <motion.h1
          className="text-4xl font-bold text-center text-blue-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          📱 Self-Test
        </motion.h1>
        <p className="text-center text-gray-700 mb-8">
          Understand your screen habits and see where you stand!
        </p>

        {/* Age Group Selection */}
        <div className="mb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-green-800 mb-2"
          >
            👨‍👩‍👧‍👦 Choose Your Age Group
          </motion.h2>
          <p className="text-sm text-gray-700 mb-4">
            This helps us ask the right questions just for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center max-w-3xl mx-auto">
            {["5-12", "13-18", "19-23"].map((group) => (
              <motion.div
                key={group}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer rounded-xl shadow-md p-6 bg-white bg-opacity-40 backdrop-blur-md transition-all ${
                  ageGroup === group ? "ring-4 ring-green-400" : ""
                }`}
                onClick={() => {
                  setAgeGroup(group);
                  setAnswers({});
                }}
              >
                <h3 className="text-xl font-bold text-blue-700">
                  {group === "5-12" && "5 – 12 Years"}
                  {group === "13-18" && "13 – 18 Years"}
                  {group === "19-23" && "19 – 23 Years"}
                </h3>
                <p className="text-sm text-gray-800 mt-1">
                  {group === "5-12" && "Children & early gamers"}
                  {group === "13-18" && "Teenagers with social & study balance"}
                  {group === "19-23" && "Young adults with work/study focus"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fallback Message */}
        {!ageGroup && (
          <p className="text-center text-red-500 font-medium mt-4 animate-pulse">
            Please select your age group to start the test.
          </p>
        )}

        {/* Questions */}
        {ageGroup && (
          <div className="space-y-6">
            {currentData.questions.map((question, index) => (
              <motion.div
                key={index}
                // whileHover={{ scale: 1.02 }}
                className="p-4 bg-white bg-opacity-40 rounded-lg shadow-md"
              >
                <p className="font-medium mb-3 text-blue-900">
                  {index + 1}. {question}
                </p>
                <div className="space-y-2">
                  {currentData.options.map((option, i) => (
                    <label key={i} className="block text-sm text-gray-700">
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() => handleAnswer(index, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition"
              >
                Submit Test
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default SelfTest;
