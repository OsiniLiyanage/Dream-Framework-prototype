import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Plus, Trash2, GripVertical } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'

const DURATION_OPTIONS = [
  { label: '1–2 weeks', months: 0.4 },
  { label: '1 month', months: 1 },
  { label: '2–3 months', months: 2.5 },
  { label: '6 months', months: 6 },
  { label: '1 year', months: 12 },
  { label: '2+ years', months: 24 },
]

const MISSION_EXAMPLES = [
  'Complete my medical degree',
  'Build the first version of the product',
  'Write the first draft of the book',
  'Save the startup capital',
  'Learn the core technical skills',
  'Build the community from 0 to 100 people',
]

function totalMonths(missions) {
  return missions.reduce((sum, m) => sum + (m.months || 0), 0)
}

function formatJourney(months) {
  if (months < 1) return 'a few weeks'
  if (months < 12) return `about ${Math.round(months)} month${Math.round(months) === 1 ? '' : 's'}`
  const years = months / 12
  if (years < 2) return 'about 1 year'
  return `about ${Math.round(years)} years`
}

function getHierarchyDepth(months) {
  if (months <= 0.25) return { label: 'Dream → Goals → Daily Actions', setup: '15 min' }
  if (months <= 1) return { label: 'Dream → Goals → Objectives → Actions', setup: '25 min' }
  if (months <= 6) return { label: 'Dream → Vision → Goals → Objectives → Actions', setup: '35 min' }
  return { label: 'Full 7 levels', setup: '50 min' }
}

export default function Mission() {
  const navigate = useNavigate()
  const dream = localStorage.getItem('dream_text') || 'your dream'
  const identity = localStorage.getItem('vision_identity') || ''

  const [stepIndex, setStepIndex] = useState(0)
  const steps = ['intro', 'build', 'review', 'complete']
  const currentStep = steps[stepIndex]

  const [missions, setMissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('missions')) || [
        { id: 1, title: '', months: null, description: '' },
      ]
    } catch {
      return [{ id: 1, title: '', months: null, description: '' }]
    }
  })

  const [activeMission, setActiveMission] = useState(0)

  const saveMissions = (updated) => {
    setMissions(updated)
    localStorage.setItem('missions', JSON.stringify(updated))
  }

  const addMission = () => {
    const newMission = {
      id: Date.now(),
      title: '',
      months: null,
      description: '',
    }
    saveMissions([...missions, newMission])
    setActiveMission(missions.length)
  }

  const updateMission = (index, field, value) => {
    const updated = missions.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    )
    saveMissions(updated)
  }

  const removeMission = (index) => {
    if (missions.length === 1) return
    const updated = missions.filter((_, i) => i !== index)
    saveMissions(updated)
    if (activeMission >= updated.length) setActiveMission(updated.length - 1)
  }

  const canAdvanceFromBuild = () => {
    return missions.every(m => m.title.trim().length > 2 && m.months !== null)
  }

  const totalM = totalMonths(missions)
  const journeyLabel = formatJourney(totalM)
  const hierarchy = getHierarchyDepth(totalM)

  const handleNext = () => {
    setStepIndex(i => i + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    if (stepIndex === 0) navigate('/vision')
    else {
      setStepIndex(i => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFinish = () => {
    localStorage.setItem('missions', JSON.stringify(missions))
    localStorage.setItem('journey_months', totalM)
    navigate('/milestone')
  }

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

        {/* Dream + Identity anchor */}
        <div className="bg-[#EEF4FF] border border-blue-100 rounded-xl px-5 py-3 mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F] mb-1">
            Your dream
          </p>
          <p className="text-[#1E3A5F] font-semibold text-[15px] leading-snug mb-2">
            "{dream}"
          </p>
          {identity && (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0F5E52] mb-1">
                Your identity
              </p>
              <p className="text-[#0F5E52] text-[13px] italic leading-snug">
                "{identity}"
              </p>
            </>
          )}
        </div>

        {/* ── INTRO ── */}
        {currentStep === 'intro' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7C3AED]">
                  Level 3 — Missions
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1C1917] mb-3">
                What are the major chapters of your dream?
              </h1>
              <p className="text-[#78716C] leading-relaxed">
                A dream is too large to plan all at once. Missions break it into
                major chapters — each with its own battlefield, timeline, and set of goals.
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                Dream එක once plan කරන්න too large. Missions ඒකව major chapters
                ලෙස break කරයි — හැම chapter-ටම own timeline, own battlefield.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                What makes a good mission?
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: '◈',
                    text: 'A significant chunk of the journey — weeks to years, not days.',
                    si: 'Journey-ේ significant chunk — days නෙමේ, weeks to years.',
                  },
                  {
                    icon: '◈',
                    text: 'Has a clear completion point — you know when it is done.',
                    si: 'Clear completion point — done වුනාම ඔබ දනී.',
                  },
                  {
                    icon: '◈',
                    text: 'Without this mission being completed, the dream cannot happen.',
                    si: 'මේ mission නැතිව dream happen වෙන්න බෑ.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#7C3AED] text-sm mt-0.5 shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm text-[#78716C] leading-relaxed">{item.text}</p>
                      <p className="font-sinhala text-[12px] text-[#A8A29E]">{item.si}</p>
                    </div>
                  </div>
                ))}
              </div>

              <ResearchNote
                researcher="Collins & Porras (BHAG Builder)"
                finding="Large goals must be broken into Sub-BHAGs — each of which must be achieved for the main dream to happen. Planning all sub-goals upfront produces a skeleton that guides focus even when detailed plans don't yet exist."
                sinhala="Large goals Sub-BHAGs ලෙස break කිරීම required. Upfront skeleton — detailed plans නැතත් — focus guide කරයි."
              />
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#B45309] mb-2">
                How this works
              </p>
              <p className="text-sm text-[#92400E] leading-relaxed">
                You will define <strong>all your missions now</strong> — titles and time estimates only.
                Then we fully build out <strong>Mission 1</strong> in detail.
                Missions 2, 3... stay as outlines until you have lived Mission 1
                and have real knowledge to plan with.
              </p>
              <p className="font-sinhala text-[13px] text-[#B45309] mt-2">
                දැන් missions සියල්ල define කරයි — title + time estimate only.
                Mission 1 fully build කරයි. Others outline ලෙස stay — real
                knowledge ලැබුණාට build කරයි.
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 px-6
                         text-base font-semibold text-white transition-colors"
              style={{ background: '#7C3AED' }}
            >
              Define my Missions
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── BUILD ── */}
        {currentStep === 'build' && (
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-2">
                Define your missions
              </h2>
              <p className="text-[#78716C] text-sm leading-relaxed">
                Add all the major chapters. Title + time estimate for each.
                You can reorder them later.
              </p>
            </div>

            {/* Mission cards */}
            <div className="space-y-3 mb-4">
              {missions.map((mission, index) => (
                <div
                  key={mission.id}
                  className="bg-white rounded-2xl border shadow-sm overflow-hidden transition-all"
                  style={{
                    borderColor: activeMission === index ? '#7C3AED' : '#E8E4DC',
                  }}
                >
                  {/* Card header */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    onClick={() => setActiveMission(activeMission === index ? -1 : index)}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{
                        background: mission.title ? '#7C3AED' : '#E8E4DC',
                        color: mission.title ? 'white' : '#A8A29E',
                      }}
                    >
                      {index + 1}
                    </div>
                    <p className="flex-1 text-sm font-medium text-[#1C1917] truncate">
                      {mission.title || 'Untitled mission'}
                    </p>
                    {mission.months && (
                      <span className="text-[11px] text-[#A8A29E] shrink-0">
                        {DURATION_OPTIONS.find(d => d.months === mission.months)?.label}
                      </span>
                    )}
                    {missions.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeMission(index) }}
                        className="text-[#A8A29E] hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {/* Expanded form */}
                  {activeMission === index && (
                    <div className="px-4 pb-4 border-t border-[#F5F3EE] pt-3 space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                          Mission title
                        </label>
                        <input
                          type="text"
                          value={mission.title}
                          onChange={e => updateMission(index, 'title', e.target.value)}
                          placeholder="e.g. Complete my degree"
                          className="w-full rounded-xl bg-[#FAF9F6] border border-[#E8E4DC]
                                     focus:border-[#7C3AED] px-4 py-2.5 text-[#1C1917]
                                     text-[15px] outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                          How long will this take?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {DURATION_OPTIONS.map((opt) => (
                            <button
                              key={opt.label}
                              onClick={() => updateMission(index, 'months', opt.months)}
                              className="rounded-xl py-2 px-3 text-[12px] font-medium
                                         border transition-all duration-150 text-center"
                              style={{
                                background: mission.months === opt.months ? '#7C3AED' : 'white',
                                color: mission.months === opt.months ? 'white' : '#78716C',
                                borderColor: mission.months === opt.months ? '#7C3AED' : '#E8E4DC',
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                          One-line description <span className="font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={mission.description}
                          onChange={e => updateMission(index, 'description', e.target.value)}
                          placeholder="What does completing this mission mean?"
                          className="w-full rounded-xl bg-[#FAF9F6] border border-[#E8E4DC]
                                     focus:border-[#7C3AED] px-4 py-2.5 text-[#1C1917]
                                     text-[14px] outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add mission */}
            <button
              onClick={addMission}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3
                         border border-dashed border-[#C4B5FD] text-[#7C3AED]
                         text-sm font-medium hover:bg-[#F5F3FF] transition-colors mb-6"
            >
              <Plus size={16} />
              Add another mission
            </button>

            {/* Examples */}
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Need inspiration?
              </p>
              <div className="flex flex-wrap gap-2">
                {MISSION_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => updateMission(activeMission >= 0 ? activeMission : 0, 'title', ex)}
                    className="text-[12px] text-[#78716C] bg-[#F5F3EE] border border-[#E8E4DC]
                               rounded-full px-3 py-1.5 hover:border-[#7C3AED] hover:text-[#7C3AED]
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
                disabled={!canAdvanceFromBuild()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-6
                           text-base font-semibold text-white transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: '#7C3AED' }}
              >
                Review my journey
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
                Your journey at a glance
              </h2>
              <p className="text-[#78716C] text-sm leading-relaxed">
                Based on your estimates, here is what your journey looks like.
                This is a reflection — not a commitment.
              </p>
              <p className="font-sinhala text-[13px] text-[#A8A29E] mt-1">
                Commitment නෙමේ — reflection. ඔබේ estimates based ගණනය.
              </p>
            </div>

            {/* Journey duration card */}
            <div
              className="rounded-2xl p-6 mb-5 text-center"
              style={{ background: '#F5F3FF', border: '1.5px solid #C4B5FD' }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C3AED] mb-2">
                Estimated journey length
              </p>
              <p className="text-4xl font-bold text-[#1C1917] mb-1">
                {journeyLabel}
              </p>
              <p className="text-[13px] text-[#78716C]">
                across {missions.length} mission{missions.length === 1 ? '' : 's'}
              </p>
            </div>

            {/* Hierarchy depth */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Framework depth for your journey
              </p>
              <p className="text-[#1C1917] font-semibold text-[15px] mb-1">
                {hierarchy.label}
              </p>
              <p className="text-[13px] text-[#78716C]">
                Setup time: ~{hierarchy.setup}
              </p>
              <p className="font-sinhala text-[12px] text-[#A8A29E] mt-2">
                ඔබේ journey length-ට ගැළපෙන framework depth auto-adapt වෙයි.
              </p>
            </div>

            {/* Mission list */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-4">
                Your missions
              </p>
              <div className="space-y-3">
                {missions.map((mission, index) => (
                  <div key={mission.id} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0
                                 text-xs font-bold mt-0.5"
                      style={{ background: '#7C3AED', color: 'white' }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#1C1917] font-semibold text-[15px] leading-snug">
                        {mission.title}
                      </p>
                      {mission.description && (
                        <p className="text-[13px] text-[#78716C] mt-0.5">{mission.description}</p>
                      )}
                      <p className="text-[11px] text-[#A8A29E] mt-0.5">
                        {DURATION_OPTIONS.find(d => d.months === mission.months)?.label}
                        {index === 0 && (
                          <span className="ml-2 text-[#7C3AED] font-semibold">← We build this first</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-[#92400E] leading-relaxed">
                <strong>These are estimates, not deadlines.</strong> Life changes.
                The timeline adapts with you. What matters is the direction — not
                the exact pace.
              </p>
              <p className="font-sinhala text-[12px] text-[#B45309] mt-2">
                Deadlines නෙමේ — estimates. Life change වෙනකොට timeline adapt වෙයි.
                Direction important — exact pace නෙමේ.
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
                style={{ background: '#7C3AED' }}
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
            <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📋</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-3">
              Your mission map is set.
            </h2>
            <p className="text-[#78716C] leading-relaxed mb-2 max-w-md mx-auto">
              You have the skeleton of your entire journey. Now we go deep into
              Mission 1 — setting the milestones that tell you you're on track.
            </p>
            <p className="font-sinhala text-[14px] text-[#A8A29E] mb-8 max-w-md mx-auto">
              Journey-ේ skeleton ready. දැන් Mission 1 deep ලෙස build කරයි —
              on track ද කියලා කියන milestones set කරයි.
            </p>

            {/* Mission 1 highlight */}
            <div
              className="rounded-2xl p-5 text-left mb-8 max-w-md mx-auto"
              style={{ background: '#F5F3FF', border: '1.5px solid #C4B5FD' }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7C3AED] mb-2">
                Up next — Mission 1
              </p>
              <p className="text-[#1C1917] font-bold text-[17px]">
                {missions[0]?.title}
              </p>
              <p className="text-[13px] text-[#78716C] mt-1">
                {DURATION_OPTIONS.find(d => d.months === missions[0]?.months)?.label}
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2
                         rounded-xl py-4 px-6 text-base font-semibold text-white
                         hover:opacity-90 transition-opacity"
              style={{ background: '#7C3AED' }}
            >
              Set Mission 1 Milestones
              <ArrowRight size={18} />
            </button>
            <p className="text-[12px] text-[#A8A29E] mt-3">
              Next: Evidence markers that tell you you're on track.
              <br />
              <span className="font-sinhala text-[11px]">
                ඊළඟ step: On track ද කියලා කියන evidence markers.
              </span>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}