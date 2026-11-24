import { useNavigate } from 'react-router-dom'
import { AI_PARTNER_SCENARIOS, STUDY_PLAN } from '../mockData'
import { useGame } from '../state/GameContext'

// "Your own study plan: lessons fit your level and goals" — the same
// scenarios as the free picker, but presented as an ordered path for your
// plan's language: each lesson unlocks only once the one before it is done.
export default function StudyPlan() {
  const navigate = useNavigate()
  const { completedScenarios } = useGame()
  const scenarios = AI_PARTNER_SCENARIOS[STUDY_PLAN.languageCode]

  function keyFor(scenario) {
    return `${STUDY_PLAN.languageCode}:${scenario.id}`
  }

  return (
    <div className="screen">
      <header className="screen-header">
        <h1>Your Study Plan</h1>
      </header>

      <div className="plan-banner">
        <div>
          <span className="label-caps accent">{STUDY_PLAN.level} · {STUDY_PLAN.language}</span>
          <p>{STUDY_PLAN.goal}</p>
        </div>
      </div>

      <div className="lesson-list">
        {scenarios.map((scenario, index) => {
          const isDone = completedScenarios.includes(keyFor(scenario))
          const prevDone = index === 0 || completedScenarios.includes(keyFor(scenarios[index - 1]))
          const isLocked = !isDone && !prevDone

          return (
            <button
              key={scenario.id}
              className={`lesson-row ${isLocked ? 'locked' : ''}`}
              disabled={isLocked}
              onClick={() => navigate(`/ai-partner/${STUDY_PLAN.languageCode}/${scenario.id}`)}
            >
              <span className="lesson-step">{index + 1}</span>
              <span className="lesson-icon">{scenario.icon}</span>
              <div className="lesson-text">
                <strong>{scenario.title}</strong>
                <span>{scenario.topic}</span>
              </div>
              <span className="lesson-status">{isLocked ? '🔒' : isDone ? '✓' : 'Start'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
