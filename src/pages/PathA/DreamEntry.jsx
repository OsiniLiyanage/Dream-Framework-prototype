import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'

const EXAMPLES = [
  'Become a surgeon',
  'Build a school in my village',
  'Write a novel',
  'Start a business that matters',
  'Learn to play piano properly',
  'Raise a family I am proud of',
]

export default function DreamEntry() {
  const navigate = useNavigate()
  const [dream, setDream] = useState(
    () => localStorage.getItem('dream_text') || ''
  )
  const [focused, setFocused] = useState(false)

  const handleContinue = () => {
    if (dream.trim().length < 5) return
    localStorage.setItem('dream_text', dream.trim())
    navigate('/path-a/validate')
  }

  const handleExample = (text) => {
    setDream(text)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center px-6 py-12">
      <div className="max-w-xl w-full">

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#A8A29E] hover:text-[#78716C]
                     text-sm font-medium mb-10 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1E3A5F]">
              Level 1 — Dream
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#1C1917] mb-3">
            What is your dream?
          </h1>
          <p className="text-[#78716C] leading-relaxed">
            No format. No rules. Just the honest, unfiltered thing you want.
            It could be big or small, practical or audacious. It just has to be yours.
          </p>
          <p className="font-sinhala text-[14px] text-[#A8A29E] mt-2">
            Format නෑ. Rules නෑ. ඔබ ඇත්තෙන්ම want කරන දේ, honest විදිහට, ලියන්න.
            ඒක කොච්චර විශාල වුනත්, කොච්චර personal වුනත් කමක් නෑ. ඔබේ දේ ලියන්න.
          </p>
        </div>

        {/* What is a dream — explainer card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-6 mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-4">
            What counts as a dream?
          </p>

          <div className="space-y-3">
            {[
              {
                icon: '◈',
                text: 'The big destination — who you want to become or what you want to create.',
                si: 'ඔබ become වීමට want කරන person, හෝ create කිරීමට want කරන දේ.',
              },
              {
                icon: '◈',
                text: 'No timeline forced. No "realistic" filter. Just the honest destination.',
                si: '"Realistic" ද කියලා check කරන්න එපා. ඒ කාමය ලස්සනට later කරමු.',
              },
              {
                icon: '◈',
                text: 'One sentence is enough. You can refine it as you go.',
                si: 'Sentence එකක් ඇති. ඒ sentence eka later refine කරන්න පුළුවන්.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#1E3A5F] text-sm mt-0.5 shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm text-[#78716C] leading-relaxed">{item.text}</p>
                  <p className="font-sinhala text-[12px] text-[#A8A29E]">{item.si}</p>
                </div>
              </div>
            ))}
          </div>

          <ResearchNote
            researcher="Bronk (2014, Stanford)"
            finding="Purpose must be self-meaningful, stable, and ideally carry an impact beyond yourself. But it starts with honest self-knowledge — not with what sounds impressive."
            sinhala="Purpose එක ඔබට personally meaningful ද — ඒකයි important. 'Impressive' sound කරන දේ නෙමේ. ඔබේ honest truth."
          />
        </div>

        {/* Text area */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#1C1917] mb-2">
            My dream is...
          </label>
          <textarea
            value={dream}
            onChange={e => setDream(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Write it here, in your own words..."
            rows={5}
            style={{
              border: `1.5px solid ${focused ? '#1E3A5F' : '#E8E4DC'}`,
              transition: 'border-color 0.2s',
            }}
            className="w-full rounded-xl bg-white px-5 py-4 text-[#1C1917]
                       text-[16px] leading-relaxed resize-none outline-none
                       shadow-sm placeholder:text-[#A8A29E]"
          />
          <p className="text-[11px] text-[#A8A29E] mt-1.5">
            {dream.length === 0
              ? 'There is no wrong answer here.'
              : `${dream.length} characters`}
          </p>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
            Need inspiration? Try one of these
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleExample(ex)}
                className="text-[13px] text-[#78716C] bg-[#F5F3EE] border border-[#E8E4DC]
                           rounded-full px-4 py-1.5 hover:border-[#1E3A5F] hover:text-[#1E3A5F]
                           transition-all duration-150"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={dream.trim().length < 5}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-4 px-6
                     text-base font-semibold transition-all duration-200
                     disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: dream.trim().length >= 5 ? '#1E3A5F' : '#1E3A5F',
            color: '#fff',
          }}
        >
          Continue to Dream Validation
          <ArrowRight size={18} />
        </button>

        <p className="text-center text-[12px] text-[#A8A29E] mt-4">
          Next: We explore <em>why</em> this dream matters to you.
          <br />
          <span className="font-sinhala text-[11px]">
            ඊළඟ step: ඒ dream ඔබට ඇයි important කියලා explore කරමු.
          </span>
        </p>

      </div>
    </div>
  )
}