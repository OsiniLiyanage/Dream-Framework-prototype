import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'
import StepProgress from '../../components/StepProgress'

// Behavioral Analysis Engine: Outlines phrases indicating outcome-oriented traps
const OUTCOME_TRIGGERS = [
  'lose', 'gain', 'earn', 'get', 'achieve', 'win', 'find', 'make money',
  'become', 'finish the book', 'acquire', 'complete code', 'sell'
]

function detectOutcomeTrap(text) {
  const lower = text.toLowerCase()
  return OUTCOME_TRIGGERS.some(trigger => lower.includes(trigger))
}

export default function ObjectivePage() {
  const navigate = useNavigate()
  const activeGoal = localStorage.getItem('goal_text') || 'Master functional modular programming structures.'
  
  // Component State
  const [objective, setObjective] = useState(() => localStorage.getItem('objective_text') || '')
  const [indicator, setIndicator] = useState(() => localStorage.getItem('objective_indicator') || '')
  const [target, setTarget] = useState(() => localStorage.getItem('objective_target') || '')
  const [timeframe, setTimeframe] = useState(() => localStorage.getItem('objective_timeframe') || '')
  
  const [focused, setFocused] = useState(false)
  const isTrapDetected = objective.trim().length > 4 && detectOutcomeTrap(objective)

  const handleAdvance = () => {
    if (objective.trim().length < 5 || !indicator || !target || !timeframe) return
    
    // Lock metrics into persistent cache
    localStorage.setItem('objective_text', objective.trim())
    localStorage.setItem('objective_indicator', indicator.trim())
    localStorage.setItem('objective_target', target.trim())
    localStorage.setItem('objective_timeframe', timeframe.trim())
    
    // Proceed forward to Level 7: Daily Input Habits
    navigate('/daily-action')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center px-6 py-12">
      <div className="max-w-xl w-full">
        
        {/* Back Navigation Trace */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#A8A29E] hover:text-[#78716C] text-sm font-medium mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Goal Settings
        </button>

        {/* Level Banner Context */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-[#166534] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-mono font-bold">6</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#166534]">
              Level 6 — Objective Architecture
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#1C1917] mb-3">
            Design your repeatable output.
          </h1>
          <p className="text-[#78716C] text-sm leading-relaxed">
            Objectives describe what you <span className="font-semibold text-[#1C1917]">DO</span> — not what you get[cite: 54]. You cannot directly control a result; you can only control your physical inputs[cite: 143].
          </p>
          <p className="font-sinhala text-[13px] text-[#A8A29E] mt-2">
            සිංහල: Objective එකකින් කියවෙන්නේ ඔබ කරන ක්‍රියාවයි (Process). ප්‍රතිඵල (Outcomes) සෘජුව පාලනය කළ නොහැකි වුවද, ඔබේ දෛනික ක්‍රියාවන් ඔබට සම්පූර්ණයෙන්ම පාලනය කළ හැකිය[cite: 54, 143].
          </p>
        </div>

        {/* Dynamic Goal Context Node */}
        <div className="bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl px-5 py-4 mb-6">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#78716C]">Parent Goal [Level 5]</span>
          <p className="text-[#1C1917] font-medium text-sm mt-0.5">"{activeGoal}"</p>
        </div>

        {/* Text Input Block */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">
            What process-oriented action will you repeat? [cite: 54]
          </label>
          <textarea
            value={objective}
            onChange={e => setObjective(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="e.g., Write clear modular codebase blocks or review documentation lines..."
            rows={3}
            style={{ border: `1.5px solid ${focused ? '#166534' : '#E8E4DC'}` }}
            className="w-full rounded-xl bg-white px-5 py-4 text-[#1C1917] text-[15px] leading-relaxed resize-none outline-none shadow-sm transition-all"
          />
        </div>

        {/* Dynamic Coaching Engine Prompt Intercept */}
        {isTrapDetected && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B45309]">
              <HelpCircle size={16} />
              <span>OUTCOME-ORIENTED DETECTION WARNING</span>
            </div>
            <p className="text-xs text-[#92400E] leading-relaxed">
              "<strong>{objective}</strong>" sounds like an external result that depends on variables outside your control[cite: 137, 138]. What specific physical action, executed with absolute consistency, generates this outcome? Let us frame it as an action statement instead[cite: 138].
            </p>
            <div className="text-[11px] bg-white/60 p-2 rounded border border-amber-100 font-mono text-[#78716C]">
              <span className="text-red-700 font-bold">❌ Outcome (Weak):</span> "Finish writing the book." [cite: 55]<br />
              <span className="text-green-700 font-bold">✅ Process (Strong):</span> "Write 500 words every morning after brewing coffee." [cite: 55]
            </div>
            <p className="font-sinhala text-[12px] text-[#B45309] mt-1">
              සිංහල: මෙය ප්‍රතිඵලයක් (Outcome). බාහිර සාධක මත රඳා නොපවතින, ඔබට ස්වයංව පාලනය කළ හැකි සරල ක්‍රියාවක් ලෙස මෙය වෙනස් කරන්න[cite: 136, 138].
            </p>
          </div>
        )}

        {/* The OITT Matrix Form Fields Layout */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm mb-8 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#FAF9F6]">
            <ShieldCheck size={16} className="text-[#166534]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1C1917]">OITT Framework Validation Matrix </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#78716C] mb-1">1. Indicator — What measurable token track point will you count? [cite: 53, 56]</label>
            <input 
              type="text" 
              placeholder="e.g., lines of pristine code / minutes timed / words committed" 
              value={indicator}
              onChange={e => setIndicator(e.target.value)}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#166534]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#78716C] mb-1">2. Target Value [cite: 53, 57]</label>
              <input 
                type="text" 
                placeholder="e.g., 50 lines / 45 mins" 
                value={target}
                onChange={e => setTarget(e.target.value)}
                className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#166534]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#78716C] mb-1">3. Timeframe Boundaries </label>
              <input 
                type="text" 
                placeholder="e.g., Every morning before 8am" 
                value={timeframe}
                onChange={e => setTimeframe(e.target.value)}
                className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#166534]"
              />
            </div>
          </div>

          <ResearchNote
            researcher="SMART Papers (N9/N10)"
            finding="Process-oriented behavioral definitions yield up to a 40% reduction in tracking friction over purely performance-focused outcomes." 
            sinhala="ක්‍රියාවට මුල්තැන දෙන ඉලක්ක (Process Objectives), ප්‍රතිඵල පමණක් බලාපොරොත්තු වන ඉලක්කවලට වඩා සාර්ථක වන බව පර්යේෂණ මඟින් තහවුරු කර ඇත."
          />
        </div>

        {/* CTA Execution Button Container */}
        <button
          onClick={handleAdvance}
          disabled={objective.trim().length < 5 || !indicator || !target || !timeframe}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-4 px-6 text-base font-semibold bg-[#166534] text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Lock Objective Parameters
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}