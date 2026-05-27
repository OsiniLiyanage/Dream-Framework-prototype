import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'
import StepProgress from '../../components/StepProgress'

const IDENTITY_EXAMPLES = [
  'I am a surgeon who gives children in rural Sri Lanka a second chance at life.',
  'I am a writer whose stories change how people see themselves.',
  'I am a builder who creates spaces where communities grow.',
  'I am a teacher who makes the next generation believe in themselves.',
]

const WORLD_EXAMPLES = [
  'My family is financially secure. My parents do not worry about money.',
  'I work from anywhere. My mornings belong to me.',
  'My community has a place to learn that did not exist before I built it.',
]

const BEYOND_EXAMPLES = [
  'The students I teach go on to build things I could never imagine.',
  'My patients live full lives because of what I learned to do.',
  'The people I employ have stability their families never had.',
]

export default function Vision() {
  const navigate = useNavigate()
  const dream = localStorage.getItem('dream_text') || 'your dream'

  const [stepIndex, setStepIndex] = useState(0)
  const steps = ['identity', 'world', 'beyond', 'complete']
  const currentStep = steps[stepIndex]

  const [identity, setIdentity] = useState(
    () => localStorage.getItem('vision_identity') || ''
  )
  const [world, setWorld] = useState(
    () => localStorage.getItem('vision_world') || ''
  )
  const [beyond, setBeyond] = useState(
    () => localStorage.getItem('vision_beyond') || ''
  )

  const [focused, setFocused] = useState(false)

  const canAdvance = () => {
    if (currentStep === 'identity') return identity.trim().length > 10
    if (currentStep === 'world') return world.trim().length > 10
    if (currentStep === 'beyond') return true // optional
    return true
  }

  const handleNext = () => {
    // Auto-save as they go
    localStorage.setItem('vision_identity', identity)
    localStorage.setItem('vision_world', world)
    localStorage.setItem('vision_beyond', beyond)

    if (stepIndex < steps.length - 1) {
      setStepIndex(i => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (stepIndex === 0) navigate('/path-a/validate')
    else {
      setStepIndex(i => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFinish = () => {
    localStorage.setItem('vision_identity', identity)
    localStorage.setItem('vision_world', world)
    localStorage.setItem('vision_beyond', beyond)
    navigate('/mission')
  }

  const totalDisplaySteps = steps.length - 1

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

        {/* Progress */}
        {currentStep !== 'complete' && (
          <StepProgress
            current={stepIndex + 1}
            total={totalDisplaySteps}
            color="#0F5E52"
          />
        )}

        {/* Dream anchor — always visible */}
        <div className="bg-[#EEF4FF] border border-blue-100 rounded-xl px-5 py-3 mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F] mb-1">
            Your dream
          </p>
          <p className="text-[#1E3A5F] font-semibold text-[15px] leading-snug">
            "{dream}"
          </p>
        </div>

        {/* ── STEP: IDENTITY ── */}
        {currentStep === 'identity' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#0F5E52] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0F5E52]">
                  Level 2 — Vision · Part 1
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1C1917] mb-3">
                Who are you when this dream is real?
              </h1>
              <p className="text-[#78716C] leading-relaxed">
                Write this in present tense — not "I will be" but "I am."
                Not what you'll do. Who you are.
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                Present tense — "I will be" නෙමේ, "I am." කරන දේ නෙමේ — ඔබ කවුද.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Why present tense matters
              </p>
              <p className="text-sm text-[#78716C] leading-relaxed">
                The way you describe yourself to yourself is the single strongest predictor
                of whether your intentions become actions. "I am a writer" produces
                dramatically more follow-through than "I want to write." Identity statements
                activate self-schemas — the mental models your brain uses to decide what
                is consistent with who you are.
              </p>
              <p className="font-sinhala text-[13px] text-[#A8A29E] mt-3">
                "I am a writer" vs "I want to write" — brain response completely different.
                Identity statement activate වෙද්දී, brain automatically consistent
                behavior support කරයි.
              </p>
              <ResearchNote
                researcher="Sheeran (2002)"
                finding="Self-schemas — identity beliefs about who you are — are the strongest single predictor of whether intentions become actions. 'I am an exerciser' produces more follow-through than 'I want to exercise.'"
                sinhala="Identity belief 'I am X' — actions follow කිරීමේ strongest predictor. 'I want to X' than completely different psychological mechanism."
              />
            </div>

            {/* Examples */}
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Examples — tap to use
              </p>
              <div className="space-y-2">
                {IDENTITY_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setIdentity(ex)}
                    className="w-full text-left text-[13px] text-[#78716C] bg-[#F5F3EE]
                               border border-[#E8E4DC] rounded-xl px-4 py-3
                               hover:border-[#0F5E52] hover:text-[#0F5E52]
                               transition-all duration-150 leading-snug"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm font-semibold text-[#1C1917] mb-2">
              I am...
            </label>
            <textarea
              value={identity}
              onChange={e => setIdentity(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="I am a _____ who _____. Write it in present tense, as if it is already true."
              rows={4}
              style={{
                border: `1.5px solid ${focused ? '#0F5E52' : '#E8E4DC'}`,
                transition: 'border-color 0.2s',
              }}
              className="w-full rounded-xl bg-white px-5 py-4 text-[#1C1917]
                         text-[16px] leading-relaxed resize-none outline-none
                         shadow-sm placeholder:text-[#A8A29E]"
            />
            <p className="text-[11px] text-[#A8A29E] mt-1.5">
              Start with "I am" — not "I will be" or "I want to be."
              <br />
              <span className="font-sinhala">"I will be" හෝ "I want to be" නෙමේ. "I am" කියලා start කරන්න.</span>
            </p>
          </div>
        )}

        {/* ── STEP: WORLD ── */}
        {currentStep === 'world' && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0F5E52]">
                Vision · Part 2
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mt-2 mb-3">
                What does your world look like?
              </h2>
              <p className="text-[#78716C] leading-relaxed">
                When the dream is real — describe the world around you. Where are you?
                Who is in your life? What does a normal day look like?
                Specific details make this real to your brain.
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                Dream real වුනාම ඔබ ඉන්නේ කොතැනද? ජීවිතය කොහොමද?
                Specific details brain-ට real feel කරවයි.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Why specificity matters
              </p>
              <p className="text-sm text-[#78716C] leading-relaxed">
                Vague visions produce vague behavior. When your brain can clearly picture
                what the achieved dream looks like — the environment, the relationships,
                the daily texture — it begins filtering for opportunities to close that gap.
                This is not visualization mysticism. It is how the brain's reticular activating
                system works: it prioritizes what you have told it matters.
              </p>
              <p className="font-sinhala text-[13px] text-[#A8A29E] mt-3">
                Vague vision → vague behavior. Specific picture → brain automatically
                related opportunities filter කරයි. ඒක reticular activating system
                — visualisation mysticism නෙමේ, neuroscience.
              </p>
            </div>

            {/* Examples */}
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Examples — tap to use
              </p>
              <div className="space-y-2">
                {WORLD_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setWorld(ex)}
                    className="w-full text-left text-[13px] text-[#78716C] bg-[#F5F3EE]
                               border border-[#E8E4DC] rounded-xl px-4 py-3
                               hover:border-[#0F5E52] hover:text-[#0F5E52]
                               transition-all duration-150 leading-snug"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm font-semibold text-[#1C1917] mb-2">
              When my dream is real, my world looks like...
            </label>
            <textarea
              value={world}
              onChange={e => setWorld(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Describe it in present tense. Where are you? Who is around you? What does your day feel like?"
              rows={5}
              style={{
                border: `1.5px solid ${focused ? '#0F5E52' : '#E8E4DC'}`,
                transition: 'border-color 0.2s',
              }}
              className="w-full rounded-xl bg-white px-5 py-4 text-[#1C1917]
                         text-[16px] leading-relaxed resize-none outline-none
                         shadow-sm placeholder:text-[#A8A29E]"
            />
          </div>
        )}

        {/* ── STEP: BEYOND ── */}
        {currentStep === 'beyond' && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0F5E52]">
                Vision · Part 3
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mt-2 mb-3">
                What changes in the world beyond you?
              </h2>
              <p className="text-[#78716C] leading-relaxed">
                Optional — but powerful. Who else's world is different because you pursued this?
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                Optional. ඒත් powerful. ඔබ pursue කළ නිසා වෙනත් කාගේ world
                different වෙනවාද?
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <ResearchNote
                researcher="Bronk (2014, Stanford/Templeton)"
                finding="People whose vision includes a 'beyond-self' dimension — where someone other than themselves benefits — show dramatically higher persistence through difficulty and significantly higher wellbeing over time."
                sinhala="Beyond-self dimension ඇති vision — ඔබ හැර කෙනෙකුට benefit — persistence dramatically higher. Long-term wellbeing significantly higher. Research clearly confirm කර ඇත."
              />
            </div>

            {/* Examples */}
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Examples — tap to use
              </p>
              <div className="space-y-2">
                {BEYOND_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setBeyond(ex)}
                    className="w-full text-left text-[13px] text-[#78716C] bg-[#F5F3EE]
                               border border-[#E8E4DC] rounded-xl px-4 py-3
                               hover:border-[#0F5E52] hover:text-[#0F5E52]
                               transition-all duration-150 leading-snug"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm font-semibold text-[#1C1917] mb-2">
              Because I achieve this dream...
              <span className="font-normal text-[#A8A29E] ml-1">(optional)</span>
            </label>
            <textarea
              value={beyond}
              onChange={e => setBeyond(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Who else benefits? What changes beyond your own life?"
              rows={4}
              style={{
                border: `1.5px solid ${focused ? '#0F5E52' : '#E8E4DC'}`,
                transition: 'border-color 0.2s',
              }}
              className="w-full rounded-xl bg-white px-5 py-4 text-[#1C1917]
                         text-[16px] leading-relaxed resize-none outline-none
                         shadow-sm placeholder:text-[#A8A29E]"
            />
            <p className="font-sinhala text-[13px] text-[#A8A29E] mt-2">
              ඕනෙම answer valid. "කවුරුත් නෑ" කිව්වත් fine.
            </p>
          </div>
        )}

        {/* ── COMPLETE ── */}
        {currentStep === 'complete' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👁</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-3">
                Your Vision is written.
              </h2>
              <p className="text-[#78716C] leading-relaxed max-w-md mx-auto">
                This is now the lens through which every decision in this framework is made.
                Every mission, every goal, every daily action — all of it exists to close the
                gap between who you are now and this.
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-3 max-w-md mx-auto">
                මෙතැන් සිට හැම decision ම මේ lens through ගමන් කරයි.
                Present Self සිට Dream Self දක්වා gap close කිරීමයි ඉදිරි සෑම step ම.
              </p>
            </div>

            {/* Full Vision Summary */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-6 mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-5">
                Your Vision
              </p>

              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0F5E52] mb-2">
                    Identity
                  </p>
                  <p className="text-[#1C1917] font-semibold text-[16px] leading-relaxed italic">
                    "{identity}"
                  </p>
                </div>

                {world && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-2">
                      World
                    </p>
                    <p className="text-[15px] text-[#78716C] italic leading-relaxed">
                      "{world}"
                    </p>
                  </div>
                )}

                {beyond && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-2">
                      Beyond self
                    </p>
                    <p className="text-[15px] text-[#78716C] italic leading-relaxed">
                      "{beyond}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-2
                         rounded-xl py-4 px-6 text-base font-semibold bg-[#0F5E52] text-white
                         hover:bg-[#0a4a3f] transition-colors"
            >
              Build your Missions
              <ArrowRight size={18} />
            </button>
            <p className="text-center text-[12px] text-[#A8A29E] mt-3">
              Next: The major chapters of your dream.
              <br />
              <span className="font-sinhala text-[11px]">
                ඊළඟ step: ඔබේ dream-ේ major chapters.
              </span>
            </p>
          </div>
        )}

        {/* Navigation — not on complete */}
        {currentStep !== 'complete' && (
          <div className="mt-8 flex gap-3">
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
              style={{ background: '#0F5E52' }}
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}