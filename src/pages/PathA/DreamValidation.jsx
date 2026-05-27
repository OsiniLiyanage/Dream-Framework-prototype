import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'
import StepProgress from '../../components/StepProgress'

// Words that suggest extrinsic motivation
const EXTRINSIC_WORDS = [
  'rich', 'famous', 'money', 'wealth', 'wealthy', 'followers',
  'successful', 'success', 'popular', 'status', 'likes', 'views',
  'celebrity', 'millionaire', 'billion', 'viral',
]

function detectExtrinsic(text) {
  const lower = text.toLowerCase()
  return EXTRINSIC_WORDS.some(w => lower.includes(w))
}

export default function DreamValidation() {
  const navigate = useNavigate()
  const dream = localStorage.getItem('dream_text') || 'your dream'
  const hasExtrinsic = detectExtrinsic(dream)

  // Build steps dynamically — Bridge only appears if extrinsic detected
  const allSteps = [
    'the-why',
    ...(hasExtrinsic ? ['bridge'] : []),
    'beyond-self',
    'regret',
    'complete',
  ]

  const [stepIndex, setStepIndex] = useState(0)
  const currentStep = allSteps[stepIndex]

  // Answers
  const [why, setWhy] = useState('')
  const [bridgeAnswer, setBridgeAnswer] = useState('')
  const [beyondSelf, setBeyondSelf] = useState('')
  const [regretFeel, setRegretFeel] = useState('')

  const canAdvance = () => {
    if (currentStep === 'the-why') return why.trim().length > 10
    if (currentStep === 'bridge') return bridgeAnswer.trim().length > 5
    if (currentStep === 'beyond-self') return true // optional
    if (currentStep === 'regret') return regretFeel !== ''
    return true
  }

  const handleNext = () => {
    if (stepIndex < allSteps.length - 1) {
      setStepIndex(i => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (stepIndex === 0) navigate('/path-a')
    else {
      setStepIndex(i => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFinish = () => {
    // Save validation answers
    localStorage.setItem('dream_why', why)
    localStorage.setItem('dream_beyond_self', beyondSelf)
    localStorage.setItem('dream_regret', regretFeel)
    // Navigate to next step (Vision — we'll build this in Step 3)
    navigate('/vision')
  }

  const totalDisplaySteps = allSteps.length - 1 // exclude 'complete'

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
            color="#1E3A5F"
          />
        )}

        {/* ── STEP: THE WHY ── */}
        {currentStep === 'the-why' && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1E3A5F]">
                Dream Validation · Step 1
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mt-2 mb-3">
                Why does this dream matter to you?
              </h2>
              <p className="text-[#78716C] leading-relaxed">
                Not the surface answer. The real one. Why, at your core, is this the
                destination you are choosing?
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                Surface answer නෙමේ. Real answer. ඇයි ඔබ මේ destination choose කළේ?
              </p>
            </div>

            {/* Dream shown */}
            <div className="bg-[#EEF4FF] border border-blue-100 rounded-xl px-5 py-4 mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F] mb-1">
                Your dream
              </p>
              <p className="text-[#1E3A5F] font-semibold text-[16px] leading-snug">
                "{dream}"
              </p>
            </div>

            {/* Why this question matters */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Why we ask this
              </p>
              <p className="text-sm text-[#78716C] leading-relaxed">
                Research consistently shows that dreams anchored to a deep personal
                "why" — not just an external outcome — survive the hard days. When
                motivation drops (and it will), the "why" is what keeps you going.
              </p>
              <p className="font-sinhala text-[13px] text-[#A8A29E] mt-3">
                Hard days වලදී motivation drop වෙනවා — ඒ guaranteed. ඒ moments වලදී
                ඔබව forward කරන්නේ deep "why" එකයි. Surface reason නෙමේ.
              </p>
              <ResearchNote
                researcher="Ryan & Deci (SDT)"
                finding="Intrinsic goals — those rooted in personal growth, relationships, and meaning — sustain motivation through difficulty. Extrinsic goals produce bursts of energy but collapse under pressure."
                sinhala="Intrinsic goals (growth, meaning) hard times වලදීත් survive කරයි. Extrinsic goals (money, fame) quickly fade කරයි."
              />
            </div>

            <label className="block text-sm font-semibold text-[#1C1917] mb-2">
              This matters to me because...
            </label>
            <textarea
              value={why}
              onChange={e => setWhy(e.target.value)}
              placeholder="Be honest. No one is judging this. Write what you actually feel..."
              rows={5}
              className="w-full rounded-xl bg-white border border-[#E8E4DC] focus:border-[#1E3A5F]
                         px-5 py-4 text-[#1C1917] text-[15px] leading-relaxed
                         resize-none outline-none shadow-sm placeholder:text-[#A8A29E] mb-2
                         transition-colors"
            />
          </div>
        )}

        {/* ── STEP: BRIDGE ── */}
        {currentStep === 'bridge' && (
          <div>
            <div className="mb-5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B45309]">
                Dream Validation · Deeper Anchor
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mt-2 mb-3">
                Let's find the deeper need underneath
              </h2>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 mb-5">
              <p className="text-sm text-[#92400E] leading-relaxed">
                Your dream has an <strong>external dimension</strong> — which is completely
                valid. But external goals alone tend to produce short-lived motivation.
                Let's find the deeper need underneath it so your motivation survives the hard days.
              </p>
              <p className="font-sinhala text-[13px] text-[#B45309] mt-2">
                ඔබේ dream එකේ external dimension එකක් තිබෙනවා — ඒ completely fine.
                ඒත් external goals alone hard days survive කරන්නේ නෑ.
                Underneath ඇති deeper need එක find කරමු.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                The Bridge Technique
              </p>
              <p className="text-sm text-[#78716C] leading-relaxed mb-3">
                Consider this example: <em>"I want to earn a lot of money"</em> → underneath
                that is often <em>"To give my family complete security and freedom."</em> The money
                is the tool. The family security is the actual dream.
              </p>
              <p className="font-sinhala text-[13px] text-[#A8A29E]">
                "Money" → underneath: "Family security and freedom." Money ≠ dream.
                Family security = actual dream. Tool vs destination.
              </p>
              <ResearchNote
                researcher="Brickman & Campbell (Hedonic Treadmill)"
                finding="External achievements produce temporary satisfaction, then return to baseline. The deeper need the achievement serves is what holds lasting meaning."
                sinhala="External achievements ලැබුණාට satisfaction temporary. Underneath ඇති need fulfill වෙනකොට — ඒකයි lasting."
              />
            </div>

            <p className="text-sm font-semibold text-[#1C1917] mb-4">
              Answer any of these that resonate:
            </p>

            {[
              'What would achieving this make possible for you?',
              'Who would benefit beyond you if you achieved this?',
              'What does this let you BE that you cannot be without it?',
            ].map((q, i) => (
              <div key={i} className="mb-3 p-4 bg-[#F5F3EE] rounded-xl border border-[#E8E4DC]">
                <p className="text-[13px] text-[#78716C] italic mb-1">{q}</p>
              </div>
            ))}

            <textarea
              value={bridgeAnswer}
              onChange={e => setBridgeAnswer(e.target.value)}
              placeholder="Write what comes to mind..."
              rows={4}
              className="w-full mt-3 rounded-xl bg-white border border-[#E8E4DC] focus:border-[#B45309]
                         px-5 py-4 text-[#1C1917] text-[15px] leading-relaxed
                         resize-none outline-none shadow-sm placeholder:text-[#A8A29E]
                         transition-colors"
            />
          </div>
        )}

        {/* ── STEP: BEYOND SELF ── */}
        {currentStep === 'beyond-self' && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1E3A5F]">
                Dream Validation · Step {hasExtrinsic ? 3 : 2}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mt-2 mb-3">
                Who else does this affect?
              </h2>
              <p className="text-[#78716C] leading-relaxed">
                This is optional — purely personal dreams are completely valid.
                But the research on this question is remarkable.
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                Optional question. Purely personal dreams valid ම ය.
                ඒත් මේ question ගැන research results remarkable ය.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-5">
              <ResearchNote
                researcher="Bronk (2014, Stanford/Templeton)"
                finding="Dreams with a 'beyond-self' dimension — where someone other than you benefits — sustain motivation dramatically longer. People pursuing these dreams show significantly higher wellbeing and persistence through difficulty."
                sinhala="ඔබ හැර වෙන කෙනෙකුට benefit වෙන dream — 'beyond-self' dimension — motivation dramatically longer sustain කරයි. Research එකෙන් clear ලෙස prove කර ඇත."
              />
            </div>

            <label className="block text-sm font-semibold text-[#1C1917] mb-2">
              If you achieve this dream, who else benefits beyond you?
              <span className="font-normal text-[#A8A29E] ml-1">(optional)</span>
            </label>
            <textarea
              value={beyondSelf}
              onChange={e => setBeyondSelf(e.target.value)}
              placeholder="This might be family, a community, a cause — or no one. All answers are valid."
              rows={4}
              className="w-full rounded-xl bg-white border border-[#E8E4DC] focus:border-[#1E3A5F]
                         px-5 py-4 text-[#1C1917] text-[15px] leading-relaxed
                         resize-none outline-none shadow-sm placeholder:text-[#A8A29E]
                         transition-colors"
            />
            <p className="font-sinhala text-[13px] text-[#A8A29E] mt-2">
              Family, community, cause — හෝ කවුරුත් නෑ. සියල්ල valid.
            </p>
          </div>
        )}

        {/* ── STEP: ANTICIPATED REGRET ── */}
        {currentStep === 'regret' && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1E3A5F]">
                Dream Validation · Final Step
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mt-2 mb-3">
                Imagine you didn't try.
              </h2>
              <p className="text-[#78716C] leading-relaxed">
                Five years from now, you look back. You never pursued this dream.
                How does that feel?
              </p>
              <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
                අවුරුදු 5 කට පස්සේ, ඔබ look back කරනවා. මේ dream pursue කළේ නෑ.
                ඒ feeling කෙසේ ද?
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-5 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                Why this question
              </p>
              <p className="text-sm text-[#78716C] leading-relaxed">
                This is not pessimism — it is a powerful psychological tool. Imagining
                the regret of <em>not</em> acting is consistently more motivating than
                imagining the reward of succeeding. It uses your brain's natural
                loss-aversion to work for you instead of against you.
              </p>
              <p className="font-sinhala text-[13px] text-[#A8A29E] mt-3">
                Pessimism නෙමේ. Succeed වුනොත් ලැබෙන reward imagine කරනවාට වඩා,
                try නොකළොත් feel වෙන regret imagine කිරීම more motivating ය.
                ඔබේ brain's loss-aversion ඔබ වෙනුවෙන් use කිරීමයි.
              </p>
              <ResearchNote
                researcher="Sheeran (2002)"
                finding="Imagining the regret of not acting is more motivating than imagining the reward of succeeding — in multiple studies across diverse goal types."
                sinhala="Action නොගැනීමේ regret imagine කිරීම, success imagine කිරීමට වඩා motivating. Multiple studies across diverse goals confirm this."
              />
            </div>

            <p className="text-sm font-semibold text-[#1C1917] mb-4">
              If you never tried this dream, in five years that would feel...
            </p>

            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  value: 'devastating',
                  label: 'Devastating',
                  sub: 'This is not optional for me. Not trying is unthinkable.',
                  si: 'Try නොකිරීම unthinkable.',
                  color: '#1E3A5F',
                  bg: '#EEF4FF',
                  border: '#BFDBFE',
                },
                {
                  value: 'significant',
                  label: 'Significant regret',
                  sub: 'I would always wonder "what if" — and that would bother me deeply.',
                  si: '"What if" කියලා always wonder වෙනවා.',
                  color: '#0F5E52',
                  bg: '#ECFDF5',
                  border: '#A7F3D0',
                },
                {
                  value: 'uncomfortable',
                  label: 'Uncomfortable',
                  sub: 'I would feel I let myself down, even if life went on fine.',
                  si: 'Myself down let කළා කියලා feel වෙනවා.',
                  color: '#92400E',
                  bg: '#FFFBEB',
                  border: '#FDE68A',
                },
                {
                  value: 'okay',
                  label: 'Okay with it',
                  sub: 'Life has other paths. This dream is a want, not a need.',
                  si: 'Life other paths ඇත. This is a want, not a need.',
                  color: '#78716C',
                  bg: '#F5F3EE',
                  border: '#E8E4DC',
                },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setRegretFeel(option.value)}
                  style={{
                    border: `1.5px solid ${regretFeel === option.value ? option.color : option.border}`,
                    background: regretFeel === option.value ? option.bg : 'white',
                  }}
                  className="rounded-xl p-4 text-left transition-all duration-150 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#1C1917] text-[15px] mb-1">
                        {option.label}
                      </p>
                      <p className="text-[13px] text-[#78716C] leading-snug mb-1">
                        {option.sub}
                      </p>
                      <p className="font-sinhala text-[12px] text-[#A8A29E]">
                        {option.si}
                      </p>
                    </div>
                    {regretFeel === option.value && (
                      <div
                        style={{ background: option.color }}
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-3 mt-0.5"
                      >
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── COMPLETE ── */}
        {currentStep === 'complete' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#EEF4FF] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-[#1E3A5F]" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-3">
              Your dream is validated.
            </h2>
            <p className="text-[#78716C] leading-relaxed mb-2 max-w-md mx-auto">
              You've done something most people never do — you've examined your dream
              honestly. That is the foundation everything above it rests on.
            </p>
            <p className="font-sinhala text-[14px] text-[#A8A29E] mb-8 max-w-md mx-auto">
              බොහෝ දෙනා කවදාවත් නොකරන දේ ඔබ කළා — ඔබේ dream honestly examine කළා.
              ඒකෙ මත ඉදිනෙ everything.
            </p>

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-6 text-left mb-8 max-w-md mx-auto">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-4">
                Your foundation
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F] mb-1">
                    Dream
                  </p>
                  <p className="text-[#1C1917] font-semibold">"{dream}"</p>
                </div>
                {why && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1">
                      Why it matters
                    </p>
                    <p className="text-[14px] text-[#78716C] italic leading-relaxed">
                      "{why}"
                    </p>
                  </div>
                )}
                {beyondSelf && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1">
                      Beyond self
                    </p>
                    <p className="text-[14px] text-[#78716C] italic leading-relaxed">
                      "{beyondSelf}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2
                         rounded-xl py-4 px-6 text-base font-semibold bg-[#1E3A5F] text-white
                         hover:bg-[#162d4a] transition-colors"
            >
              Build your Vision
              <ArrowRight size={18} />
            </button>
            <p className="text-[12px] text-[#A8A29E] mt-3">
              Next: Who are you when this dream is real?
              <br />
              <span className="font-sinhala text-[11px]">
                ඊළඟ step: Dream real වුනොත් ඔබ කවුද?
              </span>
            </p>
          </div>
        )}

        {/* Navigation buttons — not on complete screen */}
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
              style={{ background: '#1E3A5F' }}
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