// src/pages/SelfTest.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const questions = [
  "I check my phone first thing in the morning.",
  "I feel anxious or restless when I’m offline for too long.",
  "I lose track of time when I’m scrolling or gaming.",
  "I have trouble sleeping because of screen time.",
  "I compare myself to people I follow on social media.",
  "I often feel low or insecure after using social media.",
  "I hide or lie about how much time I spend online.",
  "I eat or skip meals while being on my device.",
  "I avoid offline social events in favor of being online.",
  "My family or friends complain about my screen time.",
  "I feel angry or irritated when someone interrupts me online.",
  "I use my device to escape boredom or emotions.",
  "I’ve posted things online just to get likes or comments.",
  "I’ve experienced online bullying or trolling.",
  "I worry about missing out if I’m not constantly checking updates.",
  "I use my phone during class, study time, or while doing homework.",
  "I feel like I’m wasting time but can’t stop scrolling.",
  "I’ve thought about deleting some apps but haven’t done it.",
  "I feel happier or calmer after spending a day offline.",
  "I want to regain control over my screen habits."
];

export default function SelfTest() {
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = answers.reduce((total, ans) => total + (ans === "yes" ? 5 : 1), 0);
    navigate("/result", { state: { score } });
  };

  return (
    <><Navbar />
    <section className="min-h-screen px-4 py-20 bg-gradient-to-br from-white via-cyan-50 to-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-cyan-700 mb-6">Cyber Psychology Self-Test</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <p className="font-medium text-gray-800">{index + 1}. {q}</p>
              <div className="mt-2 flex gap-4">
                <label>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="yes"
                    onChange={() => handleChange(index, "yes")}
                    required /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="no"
                    onChange={() => handleChange(index, "no")}
                    required /> No
                </label>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full mt-6 bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition"
          >
            Submit & View Results
          </button>
        </form>
      </div>
    </section>
    <Footer/></>
  );
}