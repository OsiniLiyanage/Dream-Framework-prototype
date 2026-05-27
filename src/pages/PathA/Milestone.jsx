import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'

// ─── Helpers ───────────────────────────────────────────────────────────────

const MILESTONE_EXAMPLES = [
  'I have completed my first clinical rotation',
  'I have my first 10 paying customers',
  'I have written 50,000 words of my first draft',
  'I have saved the first $10,000',
  'I can hold a 10-minute conversation in the new language',
  'I have performed on stage for the first time',
  'I have shipped version 1.0 to real users',
  'I have my first published academic paper',
]

const TIMING_OPTIONS = [
  { label: '2 weeks in', fraction: 0.15 },
  { label: '1 month in', fraction: 0.25 },
  { label: 'Quarter way', fraction: 0.25 },
  { label: 'Halfway', fraction: 0.5 },
  { label: '¾ of the way', fraction: 0.75 },
  { label: 'Near the end', fraction: 0.9 },
]

// ─── Component ─────────────────────────────────────────────────────────────

export default function Milestone() {
  const navigate = useNavigate()

  const dream = localStorage.getItem('dream_text') || 'your dream'
  const identity = localStorage.getItem('vision_identity') || ''

  const missions = (() => {
    try { return JSON.parse(localStorage.getItem('missions')) || [] } catch { return [] }
  })()
  const mission1 = missions[0] || { title: 'Mission 1', months: 6 }

  const DURATION_OPTIONS = [
    { label: '1–2 weeks', months: 0.4 },
    { label: '1 month', months: 1 },
    { label: '2–3 months', months: 2.5 },
    { label: '6 months', months: 6 },
    { label: '1 year', months: 12 },
    { label: '2+ years', months: 24 },
  ]
  const missionDurationLabel =
    DURATION_OPTIONS.find(d => d.months === mission1.months)?.label || ''

  // ── State ──
  const [stepIndex, setStepIndex] = useState(0)
  const steps = ['intro', 'build', 'review', 'complete']
  const currentStep = steps[stepIndex]

  const [milestones, setMilestones] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('milestones')) || [
        { id: 1, statement: '', timing: null, achieved: false },
      ]
    } catch {
      return [{ id: 1, statement: '', timing: null, achieved: false }]
    }
  })

  const [active, setActive] = useState(0)

  // ── Storage ──
  const saveMilestones = (updated) => {
    setMilestones(updated)
    localStorage.setItem('milestones', JSON.stringify(updated))
  }

  const addMilestone = () => {
    saveMilestones([
      ...milestones,
      { id: Date.now(), statement: '', timing: null, achieved: false },
    ])
    setActive(milestones.length)
  }

  const updateMilestone = (index, field, value) => {
    saveMilestones(milestones.map((m, i) => (i === index ? { ...m, [field]: value } : m)))
  }

  const removeMilestone = (index) => {
    if (milestones.length === 1) return
    const updated = milestones.filter((_, i) => i !== index)
    saveMilestones(updated)
    if (active >= updated.length) setActive(updated.length - 1)
  }

  // ── Validation ──
  const canAdvance = () =>
    milestones.every(m => m.statement.trim().length > 5 && m.timing !== null)

  // ── Navigation ──
  const handleNext = () => {
    setStepIndex(i => i + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleBack = () => {
    if (stepIndex === 0) navigate('/mission')
    else { setStepIndex(i => i - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }
  const handleFinish = () => {
    localStorage.setItem('milestones', JSON.stringify(milestones))
    navigate('/goal')   // Step 6 — Goals
  }

  // ── Render ──
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

        {/* Dream + Mission anchor */}
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
            {missionDurationLabel && (
              <span className="font-normal text-[#A8A29E] ml-2">· {missionDurationLabel}</span>
            )}
          </p>
        </div>

        {/* ── INTRO ── */}
        {currentStep === 'intro' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#059669] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#059669]">
                  Level 4 — Milestones
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1C1917] mb-3">
                How will you know you're on track?
              </h1>
              <p className="text-[#78716C] leading-relaxed">
                Milestones are not goals. They are evidence markers — checkpoints inside
                Mission 1 that tell you you are moving in the right direction before it is
                too late to adjust.
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                Milestones goals නෙමේ — evidence markers. Mission 1 ඇතුළේ checkpoints.
                Too late වෙන්නෙ කලින් on track ද කියලා කියයි.
              </p>
            </div>

            {/* What makes a good milestone */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                What makes a good milestone?
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: '◈',
                    text: 'It is observable — you can see or measure it clearly.',
                    si: 'Observable — clearly see හෝ measure කළ හැකි.',
                  },
                  {
                    icon: '◈',
                    text: 'It is phrased "I will know I am on track when…" — not a task.',
                    si: '"I will know I am on track when..." — task නෙමේ.',
                  },
                  {
                    icon: '◈',
                    text: 'It appears at a point inside the mission where adjustment is still possible.',
                    si: 'Adjustment possible point-ලදී appear වෙයි — end-ලදී නෙමේ.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#059669] text-sm mt-0.5 shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm text-[#78716C] leading-relaxed">{item.text}</p>
                      <p className="font-sinhala text-[12px] text-[#A8A29E]">{item.si}</p>
                    </div>
                  </div>
                ))}
              </div>

              <ResearchNote
                researcher="Triple-A Revision Model"
                finding="Regular assessment of goal-performance discrepancy requires visible markers. Without milestones inside a long mission, there is no feedback signal until the end — when it is too late to course-correct. Milestones create the feedback loop that allows timely adjustment."
                sinhala="Milestones නැත්නම් feedback signal නෑ — end-ලදී වෙනකන්. Milestones timely adjustment allow කරයි."
              />
            </div>

            {/* Good vs Weak examples */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Good vs. weak milestones
              </p>
              <div className="space-y-3">
                {[
                  {
                    weak: 'Study for my exams',
                    strong: 'I have passed my first three clinical exams with above 70%',
                  },
                  {
                    weak: 'Get customers',
                    strong: 'I have 10 paying customers who have renewed at least once',
                  },
                  {
                    weak: 'Write more',
                    strong: 'I have a complete first draft of Part 1 — 25,000 words',
                  },
                ].map((ex, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 text-xs mt-0.5 shrink-0">✗</span>
                      <p className="text-[13px] text-[#A8A29E] italic">{ex.weak}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#059669] text-xs mt-0.5 shrink-0">✓</span>
                      <p className="text-[13px] text-[#1C1917] font-medium">{ex.strong}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 px-6
                         text-base font-semibold text-white transition-colors"
              style={{ background: '#059669' }}
            >
              Set my Milestones
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── BUILD ── */}
        {currentStep === 'build' && (
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-2">
                Define your milestones
              </h2>
              <p className="text-[#78716C] text-sm leading-relaxed">
                For Mission 1: <span className="font-semibold text-[#7C3AED]">{mission1.title}</span>.
                Write 2–4 evidence markers and mark where in the mission each one falls.
              </p>
              <p className="font-sinhala text-[13px] text-[#A8A29E] mt-1">
                Mission 1 ඇතුළේ 2–4 evidence markers. හැම milestone-ටම timing mark කරන්න.
              </p>
            </div>

            {/* Milestone cards */}
            <div className="space-y-3 mb-4">
              {milestones.map((ms, index) => (
                <div
                  key={ms.id}
                  className="bg-white rounded-2xl border shadow-sm overflow-hidden transition-all"
                  style={{ borderColor: active === index ? '#059669' : '#E8E4DC' }}
                >
                  {/* Card header */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    onClick={() => setActive(active === index ? -1 : index)}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{
                        background: ms.statement ? '#059669' : '#E8E4DC',
                        color: ms.statement ? 'white' : '#A8A29E',
                      }}
                    >
                      {index + 1}
                    </div>
                    <p className="flex-1 text-sm font-medium text-[#1C1917] truncate">
                      {ms.statement || 'Untitled milestone'}
                    </p>
                    {ms.timing && (
                      <span className="text-[11px] text-[#A8A29E] shrink-0">
                        {TIMING_OPTIONS.find(t => t.label === ms.timing)?.label}
                      </span>
                    )}
                    {milestones.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeMilestone(index) }}
                        className="text-[#A8A29E] hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {/* Expanded form */}
                  {active === index && (
                    <div className="px-4 pb-4 border-t border-[#F5F3EE] pt-3 space-y-4">
                      {/* Statement */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                          I will know I am on track when…
                        </label>
                        <textarea
                          rows={2}
                          value={ms.statement}
                          onChange={e => updateMilestone(index, 'statement', e.target.value)}
                          placeholder="e.g. I have completed my first clinical rotation with a passing grade"
                          className="w-full rounded-xl bg-[#FAF9F6] border border-[#E8E4DC]
                                     focus:border-[#059669] px-4 py-2.5 text-[#1C1917]
                                     text-[14px] outline-none transition-colors resize-none leading-relaxed"
                        />
                      </div>

                      {/* Timing */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                          When in the mission does this happen?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {TIMING_OPTIONS.map((opt) => (
                            <button
                              key={opt.label}
                              onClick={() => updateMilestone(index, 'timing', opt.label)}
                              className="rounded-xl py-2 px-2 text-[11px] font-medium
                                         border transition-all duration-150 text-center"
                              style={{
                                background: ms.timing === opt.label ? '#059669' : 'white',
                                color: ms.timing === opt.label ? 'white' : '#78716C',
                                borderColor: ms.timing === opt.label ? '#059669' : '#E8E4DC',
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add milestone */}
            {milestones.length < 5 && (
              <button
                onClick={addMilestone}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3
                           border border-dashed border-[#6EE7B7] text-[#059669]
                           text-sm font-medium hover:bg-[#F0FDF9] transition-colors mb-6"
              >
                <Plus size={16} />
                Add another milestone
              </button>
            )}

            {/* Examples */}
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Need inspiration?
              </p>
              <div className="flex flex-wrap gap-2">
                {MILESTONE_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() =>
                      updateMilestone(active >= 0 ? active : 0, 'statement', ex)
                    }
                    className="text-[11px] text-[#78716C] bg-[#F5F3EE] border border-[#E8E4DC]
                               rounded-full px-3 py-1.5 hover:border-[#059669] hover:text-[#059669]
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
                disabled={!canAdvance()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-6
                           text-base font-semibold text-white transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: '#059669' }}
              >
                Review milestones
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── REVIEW ── */}
        {currentStep === 'review' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-2">
                Your mission map with checkpoints
              </h2>
              <p className="text-[#78716C] text-sm leading-relaxed">
                Here is how your milestones sit inside Mission 1. These are the moments
                where the Triple-A Review fires.
              </p>
              <p className="font-sinhala text-[13px] text-[#A8A29E] mt-1">
                Milestones Mission 1 ඇතුළේ මෙසේ sit කරයි. Triple-A Review fire වන moments.
              </p>
            </div>

            {/* Visual timeline */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-4">
                Mission 1 timeline
              </p>

              {/* Start */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-5 h-5 rounded-full bg-[#7C3AED] shrink-0" />
                <p className="text-[13px] font-semibold text-[#7C3AED]">
                  Mission begins — {mission1.title}
                </p>
              </div>

              {/* Milestones sorted by fraction */}
              {[...milestones]
                .sort((a, b) => {
                  const fa = TIMING_OPTIONS.find(t => t.label === a.timing)?.fraction ?? 0.5
                  const fb = TIMING_OPTIONS.find(t => t.label === b.timing)?.fraction ?? 0.5
                  return fa - fb
                })
                .map((ms, i) => (
                  <div key={ms.id} className="flex items-start gap-3 ml-2 my-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-0.5 h-4 bg-[#E8E4DC]" />
                      <div className="w-5 h-5 rounded-full border-2 border-[#059669] bg-white flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#059669]" />
                      </div>
                    </div>
                    <div className="pt-4 flex-1">
                      <p className="text-[11px] text-[#059669] font-semibold uppercase tracking-wider mb-0.5">
                        {ms.timing} · Checkpoint {i + 1}
                      </p>
                      <p className="text-[14px] text-[#1C1917] leading-snug font-medium">
                        {ms.statement}
                      </p>
                    </div>
                  </div>
                ))}

              {/* End */}
              <div className="flex items-center gap-3 ml-2 mt-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-0.5 h-4 bg-[#E8E4DC]" />
                  <div className="w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center shrink-0">
                    <span className="text-white text-[9px] font-bold">✓</span>
                  </div>
                </div>
                <p className="text-[13px] font-semibold text-[#059669] pt-4">
                  Mission 1 complete
                </p>
              </div>
            </div>

            {/* What happens at milestones */}
            <div className="bg-[#F0FDF9] border border-emerald-100 rounded-xl p-5 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#065F46] mb-2">
                What happens when you reach a milestone?
              </p>
              <div className="space-y-2">
                {[
                  'A brief celebration acknowledgment',
                  'Quick assessment: "What does this tell you about your approach?"',
                  'Prompt to define the next layer of goals if not yet filled in',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs mt-0.5 shrink-0">◈</span>
                    <p className="text-sm text-[#065F46]">{item}</p>
                  </div>
                ))}
              </div>
              <p className="font-sinhala text-[12px] text-[#059669] mt-3">
                Milestone reach කරනකොට: celebration + assessment + next layer prompt.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E8E4DC]
                           text-[#78716C] font-medium text-sm hover:border-[#A8A29E]
                           transition-colors bg-white"
              >
                <ArrowLeft size={15} />
                Edit
              </button>
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-6
                           text-base font-semibold text-white transition-colors"
                style={{ background: '#059669' }}
              >
                This looks right
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── COMPLETE ── */}
        {currentStep === 'complete' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#F0FDF9] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">◉</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-3">
              Your checkpoints are set.
            </h2>
            <p className="text-[#78716C] leading-relaxed mb-2 max-w-md mx-auto">
              You will now know exactly when to stop and assess — before it is too late
              to change course. Next, we define the Goals that sit inside Mission 1.
            </p>
            <p className="font-sinhala text-[14px] text-[#A8A29E] mb-8 max-w-md mx-auto">
              Checkpoints set. Course-correct කරන්න too late කලින්. දැන් Mission 1
              ඇතුළේ Goals define කරයි.
            </p>

            {/* Milestone summary */}
            <div
              className="rounded-2xl p-5 text-left mb-8 max-w-md mx-auto"
              style={{ background: '#F0FDF9', border: '1.5px solid #6EE7B7' }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#059669] mb-3">
                Your {milestones.length} checkpoint{milestones.length === 1 ? '' : 's'}
              </p>
              <div className="space-y-2">
                {milestones.map((ms, i) => (
                  <div key={ms.id} className="flex items-start gap-2">
                    <Circle size={14} className="text-[#059669] mt-0.5 shrink-0" />
                    <p className="text-[13px] text-[#1C1917] leading-snug">
                      {ms.statement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2
                         rounded-xl py-4 px-6 text-base font-semibold text-white
                         hover:opacity-90 transition-opacity"
              style={{ background: '#059669' }}
            >
              Define Mission 1 Goals
              <ArrowRight size={18} />
            </button>
            <p className="text-[12px] text-[#A8A29E] mt-3">
              Next: Specific, learning-framed goals with SMART validation.
              <br />
              <span className="font-sinhala text-[11px]">
                ඊළඟ step: Learning-framed goals — SMART validated.
              </span>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}