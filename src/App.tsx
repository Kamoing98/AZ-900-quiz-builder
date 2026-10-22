import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, BarChart3, Settings, Sparkles, ChevronRight, RotateCcw, CheckCircle2, XCircle, Clock, Target, Zap, Award, Shuffle, Home } from 'lucide-react';
import { questions, topics, getQuestionsByTopic, shuffleArray, Question } from './data/questions';

type View = 'home' | 'quiz' | 'results' | 'builder' | 'stats';
type QuizMode = 'topic' | 'mixed' | 'custom';

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  showExplanation: boolean;
  selectedAnswer: number | null;
  timeStarted: number;
  totalTime: number;
}

interface QuizStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  bestScore: number;
  topicScores: Record<string, { correct: number; total: number }>;
  streakDays: number;
  lastPlayed: string;
}

function App() {
  const [view, setView] = useState<View>('home');
  const [quizMode, setQuizMode] = useState<QuizMode>('topic');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    showExplanation: false,
    selectedAnswer: null,
    timeStarted: 0,
    totalTime: 0,
  });
  const [stats, setStats] = useState<QuizStats>(() => {
    const saved = localStorage.getItem('az900-stats');
    return saved ? JSON.parse(saved) : {
      totalQuizzes: 0,
      totalCorrect: 0,
      totalQuestions: 0,
      bestScore: 0,
      topicScores: {},
      streakDays: 0,
      lastPlayed: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('az900-stats', JSON.stringify(stats));
  }, [stats]);

  const startQuiz = (mode: QuizMode, topicId?: string) => {
    let quizQs: Question[] = [];
    
    if (mode === 'topic' && topicId) {
      quizQs = shuffleArray(getQuestionsByTopic(topicId));
    } else if (mode === 'mixed') {
      quizQs = shuffleArray([...questions]);
    } else if (mode === 'custom') {
      // Custom quiz will be handled by the builder
      return;
    }

    setQuizMode(mode);
    setSelectedTopic(topicId || '');
    setQuizQuestions(quizQs);
    setQuizState({
      currentQuestion: 0,
      answers: new Array(quizQs.length).fill(null),
      showExplanation: false,
      selectedAnswer: null,
      timeStarted: Date.now(),
      totalTime: 0,
    });
    setView('quiz');
  };

  const startCustomQuiz = (customQuestions: Question[]) => {
    const shuffled = shuffleArray(customQuestions);
    setQuizMode('custom');
    setQuizQuestions(shuffled);
    setQuizState({
      currentQuestion: 0,
      answers: new Array(shuffled.length).fill(null),
      showExplanation: false,
      selectedAnswer: null,
      timeStarted: Date.now(),
      totalTime: 0,
    });
    setView('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    if (quizState.showExplanation) return;

    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    
    setQuizState({
      ...quizState,
      answers: newAnswers,
      selectedAnswer: answerIndex,
      showExplanation: true,
    });
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        showExplanation: false,
        selectedAnswer: null,
      });
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const totalTime = Math.round((Date.now() - quizState.timeStarted) / 1000);
    const correctCount = quizState.answers.reduce<number>((acc, answer, idx) => {
      return acc + (answer === quizQuestions[idx].correctAnswer ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / quizQuestions.length) * 100);

    // Update stats
    const today = new Date().toISOString().split('T')[0];
    const lastPlayed = stats.lastPlayed;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = stats.streakDays;
    
    if (lastPlayed === today) {
      // Same day, no change
    } else if (lastPlayed === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    const topicScores = { ...stats.topicScores };
    quizQuestions.forEach((q, idx) => {
      if (!topicScores[q.topic]) {
        topicScores[q.topic] = { correct: 0, total: 0 };
      }
      topicScores[q.topic].total += 1;
      if (quizState.answers[idx] === q.correctAnswer) {
        topicScores[q.topic].correct += 1;
      }
    });

    setStats({
      totalQuizzes: stats.totalQuizzes + 1,
      totalCorrect: stats.totalCorrect + correctCount,
      totalQuestions: stats.totalQuestions + quizQuestions.length,
      bestScore: Math.max(stats.bestScore, score),
      topicScores,
      streakDays: newStreak,
      lastPlayed: today,
    });

    setQuizState({ ...quizState, totalTime });
    setView('results');
  };

  const getResults = () => {
    const correctCount = quizState.answers.reduce<number>((acc, answer, idx) => {
      return acc + (answer === quizQuestions[idx].correctAnswer ? 1 : 0);
    }, 0);
    return {
      correct: correctCount,
      total: quizQuestions.length,
      percentage: Math.round((correctCount / quizQuestions.length) * 100),
      time: quizState.totalTime,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setView('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">AZ-900 Quiz Builder</h1>
              <p className="text-xs text-blue-300/70">Smart Exam Prep</p>
            </div>
          </button>
          <nav className="flex items-center gap-1">
            <NavButton icon={<Home className="w-4 h-4" />} label="Home" active={view === 'home'} onClick={() => setView('home')} />
            <NavButton icon={<BarChart3 className="w-4 h-4" />} label="Stats" active={view === 'stats'} onClick={() => setView('stats')} />
            <NavButton icon={<Settings className="w-4 h-4" />} label="Builder" active={view === 'builder'} onClick={() => setView('builder')} />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <HomeView onStartQuiz={startQuiz} stats={stats} />
            </motion.div>
          )}
          {view === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <QuizView
                question={quizQuestions[quizState.currentQuestion]}
                questionNumber={quizState.currentQuestion + 1}
                totalQuestions={quizQuestions.length}
                selectedAnswer={quizState.selectedAnswer}
                showExplanation={quizState.showExplanation}
                correctAnswer={quizQuestions[quizState.currentQuestion]?.correctAnswer}
                onAnswer={handleAnswer}
                onNext={nextQuestion}
                onQuit={() => setView('home')}
              />
            </motion.div>
          )}
          {view === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ResultsView results={getResults()} questions={quizQuestions} answers={quizState.answers} onRetry={() => startQuiz(quizMode, selectedTopic)} onHome={() => setView('home')} />
            </motion.div>
          )}
          {view === 'builder' && (
            <motion.div key="builder" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <BuilderView onStartQuiz={startCustomQuiz} />
            </motion.div>
          )}
          {view === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <StatsView stats={stats} onReset={() => setStats({ totalQuizzes: 0, totalCorrect: 0, totalQuestions: 0, bestScore: 0, topicScores: {}, streakDays: 0, lastPlayed: '' })} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Navigation Button
function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        active ? 'bg-blue-500/20 text-blue-300' : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// Home View
function HomeView({ onStartQuiz, stats }: { onStartQuiz: (mode: QuizMode, topicId?: string) => void; stats: QuizStats }) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold">AZ-900 Exam Prep</h2>
        <p className="text-slate-400 max-w-lg mx-auto">Master Microsoft Azure Fundamentals with smart quizzes, instant feedback, and detailed explanations.</p>
        
        {/* Quick Stats */}
        {stats.totalQuizzes > 0 && (
          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300">Best: {stats.bestScore}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-slate-300">Streak: {stats.streakDays} days</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-slate-300">{stats.totalQuizzes} quizzes</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Start */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onStartQuiz('mixed')}
          className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/30 text-left hover:border-blue-400/50 transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Shuffle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Mixed Quiz</h3>
              <p className="text-sm text-slate-400">All {questions.length} questions</p>
            </div>
          </div>
          <p className="text-sm text-slate-300">Test yourself across all AZ-900 topics with randomized questions.</p>
          <ChevronRight className="w-5 h-5 text-blue-400 mt-3 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onStartQuiz('topic', 'cloud-concepts')}
          className="p-6 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/20 border border-purple-500/30 text-left hover:border-purple-400/50 transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Quick Practice</h3>
              <p className="text-sm text-slate-400">Cloud Concepts</p>
            </div>
          </div>
          <p className="text-sm text-slate-300">Start with cloud concepts and build your foundation.</p>
          <ChevronRight className="w-5 h-5 text-purple-400 mt-3 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Topics */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Study by Topic
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, idx) => {
            const topicQs = getQuestionsByTopic(topic.id);
            const topicStat = stats.topicScores[topic.id];
            const accuracy = topicStat ? Math.round((topicStat.correct / topicStat.total) * 100) : 0;
            
            return (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartQuiz('topic', topic.id)}
                className="p-5 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div>
                    <h4 className="font-semibold">{topic.name}</h4>
                    <p className="text-xs text-slate-400">{topicQs.length} questions</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">{topic.description}</p>
                {topicStat && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Accuracy</span>
                      <span className={accuracy >= 80 ? 'text-green-400' : accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}>{accuracy}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${accuracy >= 80 ? 'bg-green-500' : accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Quiz View
function QuizView({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showExplanation,
  correctAnswer,
  onAnswer,
  onNext,
  onQuit,
}: {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showExplanation: boolean;
  correctAnswer: number;
  onAnswer: (idx: number) => void;
  onNext: () => void;
  onQuit: () => void;
}) {
  const progress = (questionNumber / totalQuestions) * 100;
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Question {questionNumber} of {totalQuestions}</span>
          <button onClick={onQuit} className="text-slate-400 hover:text-red-400 transition-colors text-sm">
            ✕ Quit
          </button>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
            question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {question.difficulty}
          </span>
          <span className="text-xs text-slate-500">
            {topics.find(t => t.id === question.topic)?.name}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let optionStyle = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20';
            
            if (showExplanation) {
              if (idx === correctAnswer) {
                optionStyle = 'bg-green-500/20 border-green-500/50';
              } else if (idx === selectedAnswer && idx !== correctAnswer) {
                optionStyle = 'bg-red-500/20 border-red-500/50';
              } else {
                optionStyle = 'bg-white/5 border-white/5 opacity-50';
              }
            } else if (selectedAnswer === idx) {
              optionStyle = 'bg-blue-500/20 border-blue-500/50';
            }

            return (
              <motion.button
                key={idx}
                whileHover={!showExplanation ? { scale: 1.01 } : {}}
                whileTap={!showExplanation ? { scale: 0.99 } : {}}
                onClick={() => onAnswer(idx)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${optionStyle}`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  showExplanation && idx === correctAnswer ? 'bg-green-500 text-white' :
                  showExplanation && idx === selectedAnswer ? 'bg-red-500 text-white' :
                  'bg-white/10 text-slate-300'
                }`}>
                  {showExplanation && idx === correctAnswer ? <CheckCircle2 className="w-4 h-4" /> :
                   showExplanation && idx === selectedAnswer && idx !== correctAnswer ? <XCircle className="w-4 h-4" /> :
                   String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className={`p-5 rounded-2xl border ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
          >
            <div className="flex items-center gap-2 mb-3">
              {isCorrect ? (
                <><CheckCircle2 className="w-5 h-5 text-green-400" /><span className="font-semibold text-green-400">Correct!</span></>
              ) : (
                <><XCircle className="w-5 h-5 text-red-400" /><span className="font-semibold text-red-400">Incorrect</span></>
              )}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{question.explanation}</p>
            {question.reference && (
              <a href={question.reference} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs text-blue-400 hover:text-blue-300">
                📚 Learn more
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {showExplanation && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25"
          >
            {questionNumber < totalQuestions ? 'Next Question →' : 'See Results'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

// Results View
function ResultsView({ results, questions: quizQuestions, answers, onRetry, onHome }: {
  results: { correct: number; total: number; percentage: number; time: number };
  questions: Question[];
  answers: (number | null)[];
  onRetry: () => void;
  onHome: () => void;
}) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Score Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
      >
        <div className="mb-4">
          {results.percentage >= 80 ? (
            <Award className="w-16 h-16 text-yellow-400 mx-auto" />
          ) : results.percentage >= 60 ? (
            <Trophy className="w-16 h-16 text-blue-400 mx-auto" />
          ) : (
            <Target className="w-16 h-16 text-orange-400 mx-auto" />
          )}
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {results.percentage >= 80 ? 'Excellent!' : results.percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
        </h2>
        <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          {results.percentage}%
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-400" /> {results.correct}/{results.total} correct</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-400" /> {formatTime(results.time)}</span>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <button onClick={onRetry} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all">
          <RotateCcw className="w-4 h-4" /> Retry
        </button>
        <button onClick={onHome} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all">
          <Home className="w-4 h-4" /> Home
        </button>
      </div>

      {/* Question Review */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Review Answers</h3>
        {quizQuestions.map((q, idx) => {
          const isCorrect = answers[idx] === q.correctAnswer;
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">{q.question}</p>
                  <p className="text-xs text-slate-400">
                    Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>{answers[idx] !== null ? q.options[answers[idx]!] : 'Not answered'}</span>
                    {!isCorrect && <span className="text-green-400 ml-2">Correct: {q.options[q.correctAnswer]}</span>}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Builder View
function BuilderView({ onStartQuiz }: { onStartQuiz: (questions: Question[]) => void }) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) ? prev.filter(t => t !== topicId) : [...prev, topicId]
    );
  };

  const toggleDifficulty = (diff: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(diff) ? prev.filter(item => item !== diff) : [...prev, diff]
    );
  };

  const getFilteredQuestions = () => {
    let filtered = [...questions];
    
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(q => selectedTopics.includes(q.topic));
    }
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter(q => selectedDifficulty.includes(q.difficulty));
    }
    
    return filtered;
  };

  const filteredQuestions = getFilteredQuestions();
  const canStart = filteredQuestions.length > 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Settings className="w-6 h-6 text-blue-400" />
          Custom Quiz Builder
        </h2>
        <p className="text-slate-400">Create a personalized quiz by selecting topics and difficulty levels.</p>
      </div>

      {/* Topic Selection */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          Select Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => toggleTopic(topic.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTopics.includes(topic.id)
                  ? 'bg-blue-500/30 border border-blue-500/50 text-blue-300'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              {topic.icon} {topic.name}
            </button>
          ))}
        </div>
        {selectedTopics.length === 0 && (
          <p className="text-xs text-slate-500 mt-2">No topics selected = all topics included</p>
        )}
      </div>

      {/* Difficulty Selection */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          Select Difficulty
        </h3>
        <div className="flex flex-wrap gap-2">
          {['easy', 'medium', 'hard'].map(diff => (
            <button
              key={diff}
              onClick={() => toggleDifficulty(diff)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                selectedDifficulty.includes(diff)
                  ? diff === 'easy' ? 'bg-green-500/30 border border-green-500/50 text-green-300'
                    : diff === 'medium' ? 'bg-yellow-500/30 border border-yellow-500/50 text-yellow-300'
                    : 'bg-red-500/30 border border-red-500/50 text-red-300'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
        {selectedDifficulty.length === 0 && (
          <p className="text-xs text-slate-500 mt-2">No difficulty selected = all difficulties included</p>
        )}
      </div>

      {/* Question Count */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" />
          Number of Questions
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={Math.min(filteredQuestions.length, 20)}
            value={Math.min(questionCount, filteredQuestions.length)}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="flex-1 accent-blue-500"
          />
          <span className="text-lg font-bold text-blue-400 w-8 text-center">{Math.min(questionCount, filteredQuestions.length)}</span>
        </div>
      </div>

      {/* Summary & Start */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400">Available questions:</p>
            <p className="text-2xl font-bold">{filteredQuestions.length}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Quiz size:</p>
            <p className="text-2xl font-bold text-blue-400">{Math.min(questionCount, filteredQuestions.length)}</p>
          </div>
        </div>
        <button
          onClick={() => {
            const filtered = getFilteredQuestions();
            const selected = shuffleArray(filtered).slice(0, Math.min(questionCount, filtered.length));
            onStartQuiz(selected);
          }}
          disabled={!canStart}
          className={`w-full py-3 rounded-xl font-semibold text-lg transition-all ${
            canStart
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25'
              : 'bg-white/10 text-slate-500 cursor-not-allowed'
          }`}
        >
          {canStart ? '🚀 Start Custom Quiz' : 'No questions match your criteria'}
        </button>
      </div>
    </div>
  );
}

// Stats View
function StatsView({ stats, onReset }: { stats: QuizStats; onReset: () => void }) {
  const overallAccuracy = stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          Your Progress
        </h2>
        <p className="text-slate-400">Track your AZ-900 exam preparation journey.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Target className="w-5 h-5 text-blue-400" />} label="Quizzes Taken" value={stats.totalQuizzes.toString()} />
        <StatCard icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} label="Questions Answered" value={stats.totalQuestions.toString()} />
        <StatCard icon={<Trophy className="w-5 h-5 text-yellow-400" />} label="Best Score" value={`${stats.bestScore}%`} />
        <StatCard icon={<Zap className="w-5 h-5 text-orange-400" />} label="Day Streak" value={stats.streakDays.toString()} />
      </div>

      {/* Overall Accuracy */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="font-semibold mb-4">Overall Accuracy</h3>
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke={overallAccuracy >= 80 ? '#22c55e' : overallAccuracy >= 60 ? '#eab308' : '#ef4444'}
                strokeWidth="8"
                strokeDasharray={`${overallAccuracy * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{overallAccuracy}%</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-400 mb-1">
              {stats.totalCorrect} correct out of {stats.totalQuestions} questions
            </p>
            <p className="text-sm text-slate-400">
              {overallAccuracy >= 80 ? '🎉 Great progress! You\'re ready for the exam.' :
               overallAccuracy >= 60 ? '👍 Good progress! Keep practicing to improve.' :
               '📚 Keep studying! Review the topics you missed.'}
            </p>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="font-semibold mb-4">Topic Breakdown</h3>
        <div className="space-y-4">
          {topics.map(topic => {
            const topicStat = stats.topicScores[topic.id];
            const accuracy = topicStat ? Math.round((topicStat.correct / topicStat.total) * 100) : 0;
            const totalQs = getQuestionsByTopic(topic.id).length;
            
            return (
              <div key={topic.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <span>{topic.icon}</span>
                    <span>{topic.name}</span>
                  </span>
                  <span className="text-xs text-slate-400">
                    {topicStat ? `${topicStat.correct}/${topicStat.total}` : `0/${totalQs}`}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${accuracy}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`h-full rounded-full ${
                      accuracy >= 80 ? 'bg-green-500' : accuracy >= 60 ? 'bg-yellow-500' : accuracy > 0 ? 'bg-red-500' : 'bg-white/20'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      {stats.totalQuizzes > 0 && (
        <div className="text-center">
          <button onClick={onReset} className="text-sm text-slate-500 hover:text-red-400 transition-colors">
            Reset all progress
          </button>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

export default App;
