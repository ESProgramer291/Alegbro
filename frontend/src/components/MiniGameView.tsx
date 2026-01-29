'use client';

import React, { useState } from 'react';
import { MiniGame } from '@/lib/games';
import { useAuthStore, useGameStore } from '@/lib/store';
import { calculateXP } from '@/lib/gameUtils';
import toast from 'react-hot-toast';

interface MiniGameViewProps {
  miniGame: MiniGame;
  onComplete: (xpEarned: number) => void;
}

export default function MiniGameView({ miniGame, onComplete }: MiniGameViewProps) {
  const [startTime] = useState(Date.now());
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const user = useAuthStore((state) => state.user);
  const addProgress = useGameStore((state) => state.addProgress);

  const handleAnswerSelect = (answer: string) => {
    if (Array.isArray(miniGame.interaction?.correctAnswer)) {
      setSelectedAnswers((prev) =>
        prev.includes(answer)
          ? prev.filter((a) => a !== answer)
          : [...prev, answer]
      );
    } else {
      setSelectedAnswers([answer]);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) {
      toast.error('Please select an answer');
      return;
    }

    const correct = Array.isArray(miniGame.interaction?.correctAnswer)
      ? selectedAnswers.every((ans) =>
          (miniGame.interaction!.correctAnswer as string[]).includes(ans)
        ) &&
        selectedAnswers.length ===
          (miniGame.interaction?.correctAnswer as string[]).length
      : selectedAnswers[0] === miniGame.interaction?.correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const timeSpent = (Date.now() - startTime) / 1000;
      const xpCalc = calculateXP(miniGame.xpReward, timeSpent, 100, user?.streak || 0, user?.premium);
      
      addProgress({
        gameId: miniGame.gameId,
        miniGameId: miniGame.id,
        completed: true,
        earnedXP: xpCalc.totalXP,
      });

      toast.success(`Great job! +${xpCalc.totalXP} XP`);
      
      setTimeout(() => {
        onComplete(xpCalc.totalXP);
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card mb-8">
        <h2 className="text-3xl font-bold mb-4">{miniGame.title}</h2>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-gray-300 whitespace-pre-wrap">{miniGame.content}</p>
        </div>

        {miniGame.type === 'practice' || miniGame.type === 'interactive' ? (
          <div className="space-y-6">
            <div className="bg-dark-900 p-6 rounded-lg border border-primary-700">
              <p className="text-lg font-semibold mb-4">
                {miniGame.interaction?.question}
              </p>

              <div className="space-y-3">
                {miniGame.interaction?.question.includes('\nA)') ? (
                  // Multi-choice format
                  ['A', 'B', 'C', 'D'].map((option) => {
                    const lines = miniGame.interaction!.question.split('\n');
                    const optionLine = lines.find((l) => l.startsWith(option + ')'));
                    if (!optionLine) return null;

                    const optionText = optionLine.slice(2).trim();
                    const isSelected = selectedAnswers.includes(option);

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition ${
                          isSelected
                            ? 'border-accent-blue bg-primary-800'
                            : 'border-primary-700 bg-dark-800 hover:border-primary-600'
                        }`}
                      >
                        <span className="font-semibold">{option})</span> {optionText}
                      </button>
                    );
                  })
                ) : null}
              </div>

              {!showFeedback && (
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary w-full mt-6"
                >
                  Check Answer
                </button>
              )}
            </div>

            {showFeedback && (
              <div
                className={`p-6 rounded-lg border-2 ${
                  isCorrect
                    ? 'border-accent-blue bg-accent-blue/10'
                    : 'border-accent-pink bg-accent-pink/10'
                }`}
              >
                <p
                  className={`font-semibold mb-2 ${
                    isCorrect ? 'text-accent-blue' : 'text-accent-pink'
                  }`}
                >
                  {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
                </p>
                <p className="text-gray-200 whitespace-pre-wrap">
                  {miniGame.interaction?.explanation}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300">
              {miniGame.type === 'concept'
                ? 'Read and understand the concept, then continue to the next mini-game'
                : 'Read the analogy to understand the concept better'}
            </p>
            <button onClick={() => onComplete(miniGame.xpReward)} className="btn btn-primary">
              I understand, continue
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-400">
        <p>+{miniGame.xpReward} XP available</p>
      </div>
    </div>
  );
}
