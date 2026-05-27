import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Plus, Trash2, Info } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'

// ─── SMART validation helpers ───────────────────────────────────────────────

const SMART_CRITERIA = [
  {
    key: 's',
    label: 'Specific',
    question: 'Is it clear exactly what you will achieve?',
    hint: 'Vague: "get better at coding" → Specific: "build and deploy 3 full-stack projects"',
    si: 'Exactly what achieve කරනවාද clear ද?',
  },
  {
    key: 'm',
    label: 'Measurable',
    question: 'Can you tell, without guessing, whether you have achieved it?',
    hint: 'Add a number, a threshold, or a binary yes/no marker.',
    si: 'Guess නැතිව achieved ද කියලා කිව්ව හැකිද?',
  },
  {
    key: 'a',
    label: 'Achievable',
    question: 'Is this genuinely possible within Mission 1s timeline?',
    hint: 'Challenging is good. Impossible destroys motivation.',
    si: 'Mission 1 timeline ඇතුළේ genuinely possible ද?',
  },
  {
    key: 'r',
    label: 'Relevant',
    question: 'Does achieving this directly advance Mission 1?',
    hint: 'If Mission 1 can succeed without this, it may belong to a different mission.',
    si: 'Mission 1 directly advance කරයිද?',
  },
  {
    key: 't',
    label: 'Trackable',
    question: 'Can you track progress toward this, not just the final result?',
    hint: 'Not a deadline — a way to see movement. Weekly word count, monthly revenue, etc.',
    si: 'Final result නෙමේ — progress track කළ හැකිද?',
  },
]

const GOAL_EXAMPLES = [
  'Complete all 6 core modules of my degree with above 65%',
  'Launch a working MVP used by at least 50 real users',
  'Write and complete a 60,000-word first draft',
  'Save $15,000 in a dedicated fund',
  'Acquire 3 paying clients at a sustainable rate',
  'Reach conversational fluency — hold a 20-min discussion',
  'Publish 3 peer-reviewed papers in my field',
  'Build a community of 500 engaged members',
]

const LEARNING_REWRITES = {
  keywords: ['achieve', 'win', 'get', 'earn', 'reach', 'hit', 'obtain'],
  suggestion: 'Consider framing as "master", "build", "develop", or "complete" — learning language sustains motivation when you fall short.',
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function Goal() {
  const navigate = useNavigate()

  const dream = localStorage.getItem('dream_text') || 'your dream'
  const missions = (() => {
    try { return JSON.parse(localStorage.getItem('missions')) || [] } catch { return [] }
  })()
  const mission1 = missions[0] || { title: 'Mission 1', months: 6 }

  const steps = ['intro', 'build', 'smart', 'review', 'complete']
  const [stepIndex, setStepIndex] = useState(0)
  const currentStep = steps[stepIndex]

  const [goals, setGoals] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('goals')) || [
        { id: 1, title: '', why: '', smart: { s: null, m: null, a: null, r: null, t: null } },
      ]
    } catch {
      return [{ id: 1, title: '', why: '', smart: { s: null, m: null, a: null, r: null, t: null } }]
    }
  })

  const [activeGoal, setActiveGoal] = useState(0)
  const [smartGoalIndex, setSmartGoalIndex] = useState(0)
  const [smartCriterionIndex, setSmartCriterionIndex] = useState(0)
  const [showLearningHint, setShowLearningHint] = useState(false)

  // ── Storage ──
  const saveGoals = (updated) => {
    setGoals(updated)
    localStorage.setItem('goals', JSON.stringify(updated))
  }

  const addGoal = () => {
    saveGoals([
      ...goals,
      { id: Date.now(), title: '', why: '', smart: { s: null, m: null, a: null, r: null, t: null } },
    ])
    setActiveGoal(goals.length)
  }

  const updateGoal = (index, field, value) => {
    saveGoals(goals.map((g, i) => (i === index ? { ...g, [field]: value } : g)))
    // Learning language nudge
    if (field === 'title') {
      const lower = value.toLowerCase()
      setShowLearningHint(LEARNING_REWRITES.keywords.some(kw => lower.startsWith(kw)))
    }
  }

  const updateSmart = (goalIndex, key, value) => {
    saveGoals(
      goals.map((g, i) =>
        i === goalIndex ? { ...g, smart: { ...g.smart, [key]: value } } : g
      )
    )
  }

  const removeGoal = (index) => {
    if (goals.length === 1) return
    const updated = goals.filter((_, i) => i !== index)
    saveGoals(updated)
    if (activeGoal >= updated.length) setActiveGoal(updated.length - 1)
  }

  // ── Validation ──
  const canAdvanceBuild = () =>
    goals.every(g => g.title.trim().length > 5)

  const currentGoalSmartDone = () => {
    const g = goals[smartGoalIndex]
    return g && Object.values(g.smart).every(v => v !== null)
  }

  const allSmartDone = () =>
    goals.every(g => Object.values(g.smart).every(v => v !== null))

  const smartPassCount = (goal) =>
    Object.values(goal.smart).filter(v => v === true).length

  // ── Navigation ──
  const handleNext = () => {
    if (currentStep === 'build') {
      // Enter SMART for first goal
      setSmartGoalIndex(0)
      setSmartCriterionIndex(0)
    }
    setStepIndex(i => i + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    if (stepIndex === 0) navigate('/milestone')
    else { setStepIndex(i => i - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  const handleFinish = () => {
    localStorage.setItem('goals', JSON.stringify(goals))
    navigate('/objective') // Step 7
  }

  // ── SMART step helpers ──
  const currentCriterion = SMART_CRITERIA[smartCriterionIndex]
  const isLastCriterion = smartCriterionIndex === SMART_CRITERIA.length - 1
  const isLastGoal = smartGoalIndex === goals.length - 1

  const handleSmartAnswer = (value) => {
    updateSmart(smartGoalIndex, currentCriterion.key, value)
    if (!isLastCriterion) {
      setSmartCriterionIndex(i => i + 1)
    } else if (!isLastGoal) {
      setSmartGoalIndex(i => i + 1)
      setSmartCriterionIndex(0)
    } else {
      // All done → review
      setStepIndex(steps.indexOf('review'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center px-6 py-12">
      <div className="max-w-xl w-full">

        {/* Back */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#A8A29E] hover:text-[#78716C]
                     text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Anchor */}
        <div className="bg-[#EEF4FF] border border-blue-100 rounded-xl px-5 py-3 mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F] mb-1">
            Your dream
          </p>
          <p className="text-[#1E3A5F] font-semibold text-[15px] leading-snug mb-2">
            "{dream}"
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7C3AED] mb-1">
            Mission 1
          </p>
          <p className="text-[#7C3AED] font-semibold text-[14px] leading-snug">
            {mission1.title}
          </p>
        </div>

        {/* ── INTRO ── */}
        {currentStep === 'intro' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#D97706] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">5</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D97706]">
                  Level 5 — Goals
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1C1917] mb-3">
                What results prove Mission 1 is succeeding?
              </h1>
              <p className="text-[#78716C] leading-relaxed">
                Goals are specific outcomes inside Mission 1. Not tasks — results.
                We frame them as learning goals, not performance goals, and validate
                each one against the SMART framework.
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                Goals = Mission 1 ඇතුළේ specific outcomes. Tasks නෙමේ — results.
                Learning goals ලෙස frame කර SMART validate කරයි.
              </p>
            </div>

            {/* Learning vs Performance */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Why learning goals — not performance goals?
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    type: 'Performance goal',
                    example: '"I must hit $10,000 revenue by March"',
                    problem: 'When you fall short, it feels like identity failure. Motivation collapses.',
                    color: '#EF4444',
                    bg: '#FEF2F2',
                  },
                  {
                    type: 'Learning goal',
                    example: '"Master the sales process well enough to convert 1 in 5 leads"',
                    problem: 'When you fall short, it is data — not defeat. You adjust and continue.',
                    color: '#D97706',
                    bg: '#FFFBEB',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{ background: item.bg, border: `1px solid ${item.color}20` }}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: item.color }}>
                      {item.type}
                    </p>
                    <p className="text-[14px] font-medium text-[#1C1917] mb-1">{item.example}</p>
                    <p className="text-[12px] text-[#78716C]">{item.problem}</p>
                  </div>
                ))}
              </div>

              <ResearchNote
                researcher="Höpfner & Keith (2021)"
                finding="Learning goals dramatically reduce the psychological harm of failure. Performance goals cause people to feel incapable when they fall short. Learning goals make falling short data, not identity — which sustains motivation through difficulty."
                sinhala="Learning goals fail වීමේ psychological harm dramatically reduce කරයි. Performance goals identity damage කරයි. Learning goals: falling short = data, not defeat."
              />
            </div>

            {/* SMART preview */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#B45309] mb-2">
                How this works
              </p>
              <p className="text-sm text-[#92400E] leading-relaxed">
                You write your goals first, then we run a quick SMART check on each one —
                5 yes/no questions per goal. If anything doesn't pass, you refine it.
                The goal you end with is validated and ready.
              </p>
              <p className="font-sinhala text-[13px] text-[#B45309] mt-2">
                Goals write කරයි → SMART check (5 yes/no per goal) → Refine →
                Validated goal ready.
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 px-6
                         text-base font-semibold text-white transition-colors"
              style={{ background: '#D97706' }}
            >
              Write my Goals
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── BUILD ── */}
        {currentStep === 'build' && (
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-2">
                Write your goals
              </h2>
              <p className="text-[#78716C] text-sm leading-relaxed">
                What results, if achieved, would prove Mission 1 is succeeding?
                Write 1–4 goals. We'll SMART-validate each one next.
              </p>
            </div>

            {/* Goal cards */}
            <div className="space-y-3 mb-4">
              {goals.map((goal, index) => (
                <div
                  key={goal.id}
                  className="bg-white rounded-2xl border shadow-sm overflow-hidden transition-all"
                  style={{ borderColor: activeGoal === index ? '#D97706' : '#E8E4DC' }}
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    onClick={() => setActiveGoal(activeGoal === index ? -1 : index)}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{
                        background: goal.title ? '#D97706' : '#E8E4DC',
                        color: goal.title ? 'white' : '#A8A29E',
                      }}
                    >
                      {index + 1}
                    </div>
                    <p className="flex-1 text-sm font-medium text-[#1C1917] truncate">
                      {goal.title || 'Untitled goal'}
                    </p>
                    {goals.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeGoal(index) }}
                        className="text-[#A8A29E] hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {activeGoal === index && (
                    <div className="px-4 pb-4 border-t border-[#F5F3EE] pt-3 space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                          Goal — what result proves this mission is succeeding?
                        </label>
                        <textarea
                          rows={2}
                          value={goal.title}
                          onChange={e => updateGoal(index, 'title', e.target.value)}
                          placeholder="e.g. Master the core curriculum well enough to pass all Year 1 exams above 70%"
                          className="w-full rounded-xl bg-[#FAF9F6] border border-[#E8E4DC]
                                     focus:border-[#D97706] px-4 py-2.5 text-[#1C1917]
                                     text-[14px] outline-none transition-colors resize-none leading-relaxed"
                        />
                        {showLearningHint && activeGoal === index && (
                          <div className="mt-2 flex items-start gap-2 bg-amber-50 rounded-lg px-3 py-2">
                            <Info size={13} className="text-[#D97706] mt-0.5 shrink-0" />
                            <p className="text-[12px] text-[#92400E]">
                              {LEARNING_REWRITES.suggestion}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                          Why does this goal matter? <span className="font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={goal.why}
                          onChange={e => updateGoal(index, 'why', e.target.value)}
                          placeholder="What does achieving this make possible?"
                          className="w-full rounded-xl bg-[#FAF9F6] border border-[#E8E4DC]
                                     focus:border-[#D97706] px-4 py-2.5 text-[#1C1917]
                                     text-[14px] outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add goal */}
            {goals.length < 4 && (
              <button
                onClick={addGoal}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3
                           border border-dashed border-[#FCD34D] text-[#D97706]
                           text-sm font-medium hover:bg-[#FFFBEB] transition-colors mb-6"
              >
                <Plus size={16} />
                Add another goal
              </button>
            )}

            {/* Examples */}
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Need inspiration?
              </p>
              <div className="flex flex-wrap gap-2">
                {GOAL_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => updateGoal(activeGoal >= 0 ? activeGoal : 0, 'title', ex)}
                    className="text-[11px] text-[#78716C] bg-[#F5F3EE] border border-[#E8E4DC]
                               rounded-full px-3 py-1.5 hover:border-[#D97706] hover:text-[#D97706]
                               transition-all duration-150"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E8E4DC]
                           text-[#78716C] font-medium text-sm hover:border-[#A8A29E]
                           transition-colors bg-white"
              >
                <ArrowLeft size={15} />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canAdvanceBuild()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-6
                           text-base font-semibold text-white transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: '#D97706' }}
              >
                SMART check →
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── SMART VALIDATION ── */}
        {currentStep === 'smart' && (
          <div>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E]">
                  SMART check — Goal {smartGoalIndex + 1} of {goals.length}
                </p>
                <p className="text-[11px] text-[#A8A29E]">
                  {smartCriterionIndex + 1} / {SMART_CRITERIA.length}
                </p>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-[#F5F3EE] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background: '#D97706',
                    width: `${((smartGoalIndex * 5 + smartCriterionIndex + 1) / (goals.length * 5)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Goal being validated */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B45309] mb-1">
                Goal {smartGoalIndex + 1}
              </p>
              <p className="text-[#92400E] font-medium text-[14px] leading-snug">
                {goals[smartGoalIndex]?.title}
              </p>
            </div>

            {/* Criterion card */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-6 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                  style={{ background: '#D97706' }}
                >
                  {currentCriterion.key.toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-[#1C1917] text-[17px]">
                    {currentCriterion.label}
                  </p>
                  <p className="font-sinhala text-[12px] text-[#A8A29E]">
                    {currentCriterion.si}
                  </p>
                </div>
              </div>

              <p className="text-[16px] text-[#1C1917] font-medium leading-relaxed mb-3">
                {currentCriterion.question}
              </p>

              <div className="bg-[#FAF9F6] rounded-xl px-4 py-3 mb-5">
                <p className="text-[12px] text-[#A8A29E] flex items-start gap-2">
                  <Info size={12} className="mt-0.5 shrink-0" />
                  {currentCriterion.hint}
                </p>
              </div>

              {/* Yes / No */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSmartAnswer(true)}
                  className="rounded-xl py-3 text-base font-semibold border-2 transition-all duration-150"
                  style={{ borderColor: '#D97706', color: '#D97706', background: 'white' }}
                >
                  ✓ Yes
                </button>
                <button
                  onClick={() => handleSmartAnswer(false)}
                  className="rounded-xl py-3 text-base font-semibold border-2 transition-all duration-150"
                  style={{ borderColor: '#E8E4DC', color: '#78716C', background: 'white' }}
                >
                  ✗ Not yet
                </button>
              </div>
            </div>

            <p className="text-[12px] text-[#A8A29E] text-center">
              "Not yet" doesn't fail the goal — it flags where to refine after reviewing.
              <br />
              <span className="font-sinhala text-[11px]">
                "Not yet" = goal fail නෙමේ — refine කළ යුතු place flag කරයි.
              </span>
            </p>
          </div>
        )}

        {/* ── REVIEW ── */}
        {currentStep === 'review' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-2">
                Your goals — SMART reviewed
              </h2>
              <p className="text-[#78716C] text-sm leading-relaxed">
                Here is how your goals scored. Goals with "Not yet" answers are still valid —
                they just need a small refinement. Tap any goal to edit it now.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {goals.map((goal, gi) => {
                const passes = smartPassCount(goal)
                const total = SMART_CRITERIA.length
                const allPass = passes === total
                return (
                  <div
                    key={goal.id}
                    className="bg-white rounded-2xl border shadow-sm p-5"
                    style={{ borderColor: allPass ? '#D97706' : '#E8E4DC' }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5"
                        style={{ background: '#D97706', color: 'white' }}
                      >
                        {gi + 1}
                      </div>
                      <p className="text-[#1C1917] font-semibold text-[15px] leading-snug flex-1">
                        {goal.title}
                      </p>
                    </div>

                    {/* SMART badges */}
                    <div className="flex gap-2 flex-wrap ml-9">
                      {SMART_CRITERIA.map(c => {
                        const val = goal.smart[c.key]
                        return (
                          <span
                            key={c.key}
                            className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                            style={{
                              background: val === true ? '#FFFBEB' : val === false ? '#FEF2F2' : '#F5F3EE',
                              color: val === true ? '#D97706' : val === false ? '#EF4444' : '#A8A29E',
                              border: `1px solid ${val === true ? '#FCD34D' : val === false ? '#FECACA' : '#E8E4DC'}`,
                            }}
                          >
                            {c.key.toUpperCase()} {val === true ? '✓' : val === false ? '✗' : '–'}
                          </span>
                        )
                      })}
                    </div>

                    {/* Refinement hint for failing criteria */}
                    {!allPass && (
                      <div className="ml-9 mt-3 bg-[#FEF2F2] rounded-xl px-3 py-2">
                        <p className="text-[12px] text-[#991B1B]">
                          Consider refining: {SMART_CRITERIA.filter(c => goal.smart[c.key] === false).map(c => c.label).join(', ')}.
                          Tap the goal title to edit.
                        </p>
                      </div>
                    )}

                    {goal.why && (
                      <p className="ml-9 mt-2 text-[12px] text-[#78716C] italic">
                        Why: {goal.why}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            <ResearchNote
              researcher="Locke & Latham (1990) — 400+ studies"
              finding="Specific, challenging goals outperform vague ones in 90% of studies. The SMART framework operationalises specificity and measurability — the two dimensions with the strongest performance effect."
              sinhala="Specific, challenging goals vague ones outperform කරයි — 90% studies. SMART = specificity + measurability operationalise කිරීම."
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E8E4DC]
                           text-[#78716C] font-medium text-sm hover:border-[#A8A29E]
                           transition-colors bg-white"
              >
                <ArrowLeft size={15} />
                Edit goals
              </button>
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-6
                           text-base font-semibold text-white transition-colors"
                style={{ background: '#D97706' }}
              >
                These are my goals
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── COMPLETE ── */}
        {currentStep === 'complete' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#FFFBEB] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-3">
              Goals validated.
            </h2>
            <p className="text-[#78716C] leading-relaxed mb-2 max-w-md mx-auto">
              You have {goals.length} SMART-checked goal{goals.length === 1 ? '' : 's'} inside
              Mission 1. Next we define the Objectives inside Goal 1 —
              the repeatable outputs that produce these results.
            </p>
            <p className="font-sinhala text-[14px] text-[#A8A29E] mb-8 max-w-md mx-auto">
              {goals.length} SMART-checked goal{goals.length === 1 ? '' : 's'} ready.
              දැන් Goal 1 ඇතුළේ Objectives define කරයි — results produce කරන repeatable outputs.
            </p>

            {/* Goals summary */}
            <div
              className="rounded-2xl p-5 text-left mb-8 max-w-md mx-auto"
              style={{ background: '#FFFBEB', border: '1.5px solid #FCD34D' }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D97706] mb-3">
                Your goals inside Mission 1
              </p>
              <div className="space-y-3">
                {goals.map((goal, i) => (
                  <div key={goal.id} className="flex items-start gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5"
                      style={{ background: '#D97706', color: 'white' }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-[14px] text-[#1C1917] font-medium leading-snug">
                        {goal.title}
                      </p>
                      {i === 0 && (
                        <p className="text-[11px] text-[#D97706] font-semibold mt-0.5">
                          ← We build Objectives here first
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2
                         rounded-xl py-4 px-6 text-base font-semibold text-white
                         hover:opacity-90 transition-opacity"
              style={{ background: '#D97706' }}
            >
              Define Goal 1 Objectives
              <ArrowRight size={18} />
            </button>
            <p className="text-[12px] text-[#A8A29E] mt-3">
              Next: Repeatable outputs validated with the OITT framework.
              <br />
              <span className="font-sinhala text-[11px]">
                ඊළඟ step: OITT framework validated repeatable outputs.
              </span>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}