import React, { useState, useEffect } from 'react';
import { Star, BookOpen, Trophy, Gift, Users, Download, Calendar, CheckCircle, Award, Target } from 'lucide-react';

const BookOfMormonApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [readingProgress, setReadingProgress] = useState({});
  const [selectedChallenge, setSelectedChallenge] = useState('3months');
  const [userName, setUserName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [completedBooks, setCompletedBooks] = useState(new Set());

  const books = [
    { name: "Introduction & Witnesses", chapters: 1 },
    { name: "1 Nephi", chapters: 22 },
    { name: "2 Nephi", chapters: 33 },
    { name: "Jacob", chapters: 7 },
    { name: "Enos", chapters: 1 },
    { name: "Jarom", chapters: 1 },
    { name: "Omni", chapters: 1 },
    { name: "Words of Mormon", chapters: 1 },
    { name: "Mosiah", chapters: 29 },
    { name: "Alma", chapters: 63 },
    { name: "Helaman", chapters: 16 },
    { name: "3 Nephi", chapters: 30 },
    { name: "4 Nephi", chapters: 1 },
    { name: "Mormon", chapters: 9 },
    { name: "Ether", chapters: 15 },
    { name: "Moroni", chapters: 10 }
  ];

  const totalChapters = books.reduce((sum, book) => sum + book.chapters, 0);

  const challenges = {
    '3months': { name: '3 Months', days: 90, chaptersPerDay: Math.ceil(totalChapters / 90) },
    '6months': { name: '6 Months', days: 180, chaptersPerDay: Math.ceil(totalChapters / 180) },
    '9months': { name: '9 Months', days: 270, chaptersPerDay: Math.ceil(totalChapters / 270) },
    '1year': { name: '1 Year', days: 365, chaptersPerDay: Math.ceil(totalChapters / 365) }
  };

  const studyIdeas = [
    "🎨 Draw your favorite scripture hero",
    "📝 Write about what you learned today",
    "🎭 Act out a scripture story with family",
    "🎵 Sing a song about the scriptures",
    "🗺️ Make a map of the Book of Mormon lands",
    "📚 Create a scripture journal",
    "🌟 Share a favorite verse with a friend",
    "🏠 Build Nephi's ship with blocks or Legos"
  ];

  const qaQuestions = [
    { q: "Who was the first prophet in the Book of Mormon?", a: "Lehi was the first prophet we read about in the Book of Mormon!" },
    { q: "What did Nephi build to cross the ocean?", a: "Nephi built a ship with help from the Lord!" },
    { q: "Who is Jesus Christ in the Book of Mormon?", a: "Jesus Christ is our Savior who visited the people in America!" },
    { q: "What does it mean to have faith?", a: "Faith means believing and trusting in Jesus Christ, even when we can't see Him!" }
  ];

  const getProgressPercentage = () => {
    const completed = Object.values(readingProgress).filter(Boolean).length;
    return Math.round((completed / totalChapters) * 100);
  };

  const markChapterComplete = (bookIndex, chapter) => {
    const key = `${bookIndex}-${chapter}`;
    setReadingProgress(prev => ({...prev, [key]: !prev[key]}));
    
    // Check if book is completed
    const bookChapters = books[bookIndex].chapters;
    const bookCompleted = Array.from({length: bookChapters}, (_, i) => 
      readingProgress[`${bookIndex}-${i+1}`] || (i === chapter - 1 && !readingProgress[key])
    ).every(Boolean);
    
    if (bookCompleted) {
      setCompletedBooks(prev => new Set([...prev, bookIndex]));
    }
  };

  const generateCertificate = () => {
    if (getProgressPercentage() === 100) {
      setShowCertificate(true);
    }
  };

  const Sidebar = () => (
    <div className="w-64 bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4 h-full">
      <div className="text-center mb-8">
        <BookOpen className="mx-auto mb-2" size={40} />
        <h1 className="text-xl font-bold">Book of Mormon Heroes</h1>
        <p className="text-sm opacity-80">Scripture Adventure!</p>
      </div>
      
      <nav className="space-y-3">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Star },
          { id: 'reading', label: 'Reading Tracker', icon: BookOpen },
          { id: 'challenge', label: 'Reading Challenge', icon: Target },
          { id: 'qa', label: 'Q&A Fun', icon: Gift },
          { id: 'ideas', label: 'Study Ideas', icon: Trophy },
          { id: 'printables', label: 'Printables', icon: Download },
          { id: 'stickers', label: 'Reward Stickers', icon: Award }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === item.id ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Welcome, Scripture Hero! 🌟</h2>
        
        {/* Hero Image Section */}
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl p-8 mb-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-full h-64 bg-white/20 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-white/40">
              <div className="text-center text-white">
                <BookOpen size={48} className="mx-auto mb-2 opacity-60" />
                <p className="text-lg font-semibold">Hero Image Placeholder</p>
                <p className="text-sm opacity-80">Add your favorite Book of Mormon hero!</p>
                <p className="text-xs opacity-60 mt-2">(Nephi, Moroni, Captain Moroni, etc.)</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Today's Scripture Hero: Nephi</h3>
            <p className="text-white/90 text-sm">"I will go and do the things which the Lord hath commanded" - 1 Nephi 3:7</p>
          </div>
        </div>
        
        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 max-w-2xl mx-auto">
          <div className="marquee overflow-hidden">
            <p className="animate-bounce text-lg text-yellow-800 font-semibold">
              "Search the scriptures; for in them ye think ye have eternal life" - John 5:39 ✨
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white p-6 rounded-xl shadow-lg">
          <Trophy className="mb-3" size={32} />
          <h3 className="text-xl font-bold">Reading Progress</h3>
          <p className="text-2xl font-bold">{getProgressPercentage()}%</p>
          <p className="opacity-90">Keep going, hero!</p>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-6 rounded-xl shadow-lg">
          <BookOpen className="mb-3" size={32} />
          <h3 className="text-xl font-bold">Chapters Read</h3>
          <p className="text-2xl font-bold">{Object.values(readingProgress).filter(Boolean).length}</p>
          <p className="opacity-90">of {totalChapters} chapters</p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-xl shadow-lg">
          <Award className="mb-3" size={32} />
          <h3 className="text-xl font-bold">Books Completed</h3>
          <p className="text-2xl font-bold">{completedBooks.size}</p>
          <p className="opacity-90">of 16 books</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Star className="mr-2 text-yellow-500" />
          Today's Scripture Prompt
        </h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-medium">
            "And it came to pass that I, Nephi, said unto my father: I will go and do the things which the Lord hath commanded" - 1 Nephi 3:7
          </p>
          <p className="mt-2 text-gray-600">
            Think about: How can you be like Nephi today? What is something hard that you can do with faith?
          </p>
        </div>
      </div>
    </div>
  );

  const ReadingTracker = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Reading Tracker 📖</h2>
      <div className="grid gap-4">
        {books.map((book, bookIndex) => (
          <div key={bookIndex} className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg flex items-center">
                {completedBooks.has(bookIndex) && <CheckCircle className="text-green-500 mr-2" size={20} />}
                {book.name}
              </h3>
              <span className="text-sm text-gray-500">{book.chapters} chapters</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({length: book.chapters}, (_, i) => {
                const chapterNum = i + 1;
                const isCompleted = readingProgress[`${bookIndex}-${chapterNum}`];
                return (
                  <button
                    key={chapterNum}
                    onClick={() => markChapterComplete(bookIndex, chapterNum)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {chapterNum}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {getProgressPercentage() === 100 && (
        <button
          onClick={generateCertificate}
          className="w-full bg-gold bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl font-bold text-lg"
        >
          🎉 Generate My Completion Certificate! 🎉
        </button>
      )}
    </div>
  );

  const Challenge = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Reading Challenge 🎯</h2>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Choose Your Challenge!</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(challenges).map(([key, challenge]) => (
            <button
              key={key}
              onClick={() => setSelectedChallenge(key)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedChallenge === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <h4 className="font-bold">{challenge.name}</h4>
              <p className="text-sm text-gray-600">
                ~{challenge.chaptersPerDay} chapter{challenge.chaptersPerDay > 1 ? 's' : ''} per day
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Invite a Friend! 👫</h3>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="mb-3">Challenge your friends and family to read with you!</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const QASection = () => {
    const [currentQ, setCurrentQ] = useState(0);
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-600">Q&A Fun Time! 🤔</h2>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold mb-2">Question {currentQ + 1}</h3>
            <p className="text-gray-700 mb-4">{qaQuestions[currentQ].q}</p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">{qaQuestions[currentQ].a}</p>
            </div>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            {qaQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`w-8 h-8 rounded-full ${
                  i === currentQ ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const StudyIdeas = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Fun Study Ideas! 💡</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {studyIdeas.map((idea, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
            <p className="text-gray-700">{idea}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const Printables = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Printables & Activities 🖨️</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold mb-3">Reading Charts</h3>
          <p className="text-gray-600 mb-3">Beautiful charts to track your progress</p>
          <a 
            href="https://etsy.com/search?q=book+of+mormon+reading+chart" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
          >
            <Download className="mr-2" size={16} />
            View on Etsy
          </a>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold mb-3">Coloring Pages</h3>
          <p className="text-gray-600 mb-3">Scripture heroes and stories to color</p>
          <a 
            href="https://etsy.com/search?q=book+of+mormon+coloring+pages" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
          >
            <Download className="mr-2" size={16} />
            View on Etsy
          </a>
        </div>
      </div>
    </div>
  );

  const Stickers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Reward Stickers! 🌟</h2>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {['⭐', '🏆', '📖', '💎', '👑', '🎉', '🌈', '⚡', '🔥', '💯', '🎯', '🚀'].map((sticker, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-2">{sticker}</div>
            <p className="text-xs text-gray-600">Earned!</p>
          </div>
        ))}
      </div>
      <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 text-center">
        <p className="text-yellow-800 font-medium">
          Complete chapters to unlock more stickers! 🎁
        </p>
      </div>
    </div>
  );

  const Certificate = () => (
    showCertificate && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 text-center">
          <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
          <p className="mb-4">You have completed the entire Book of Mormon!</p>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg mb-4">
            <h3 className="font-bold">Certificate of Completion</h3>
            <p>Awarded to: {userName || 'Scripture Hero'}</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => setShowCertificate(false)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    )
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'reading' && <ReadingTracker />}
        {activeTab === 'challenge' && <Challenge />}
        {activeTab === 'qa' && <QASection />}
        {activeTab === 'ideas' && <StudyIdeas />}
        {activeTab === 'printables' && <Printables />}
        {activeTab === 'stickers' && <Stickers />}
        <Certificate />
      </main>
    </div>
  );
};

export default BookOfMormonApp;