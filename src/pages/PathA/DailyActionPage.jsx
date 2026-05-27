import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Zap, AlertTriangle, Sparkles } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'

export default function DailyActionPage() {
  const navigate = useNavigate()
  const activeObjective = localStorage.getItem('objective_text') || 'Write modular codebase blocks.'

  // 1. WOOP State
  const [wish, setWish] = useState('')
  const [outcome, setOutcome] = useState('')
  const [obstacle, setObstacle] = useState('')
  const [plan, setPlan] = useState('')

  // 2. Implementation Intention State
  const [whenWhere, setWhenWhere] = useState('')

  // 3. Fogg Behavior Design State
  const [anchor, setAnchor] = useState('')
  const [tinyVersion, setTinyVersion] = useState('')
  const [celebration, setCelebration] = useState('')

  // Check if user is trying to type an external obstacle (like time/money) instead of an internal one
  const isExternalObstacleDetected = 
    obstacle.toLowerCase().includes('time') || 
    obstacle.toLowerCase().includes('money') || 
    obstacle.toLowerCase().includes('busy')

  const handleAdvance = () => {
    if (!wish || outcome.trim().length < 30 || !obstacle || !plan || !whenWhere || !anchor || !tinyVersion || !celebration) return

    // Commit behavioral parameters to global localStorage cache
    localStorage.setItem('action_wish', wish)
    localStorage.setItem('action_outcome', outcome)
    localStorage.setItem('action_obstacle', obstacle)
    localStorage.setItem('action_plan', plan)
    localStorage.setItem('action_when_where', whenWhere)
    localStorage.setItem('action_anchor', anchor)
    localStorage.setItem('action_tiny_version', tinyVersion)
    localStorage.setItem('action_celebration', celebration)

    // Save initial state fields to unlock the dashboard mock
    localStorage.setItem('dashboard_initialized', 'true')
    
    // Redirect to the system dashboard
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center px-6 py-12">
      <div className="max-w-xl w-full">
        
        {/* Navigation Trace */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#A8A29E] hover:text-[#78716C] text-sm font-medium mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Objective
        </button>

        {/* Level Header banner */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-[#065F46] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-mono font-bold">7</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#065F46]">
              Level 7 — Daily Input Habit
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#1C1917] mb-3">
            Build habits that hold without willpower.
          </h1>
          <p className="text-[#78716C] text-sm leading-relaxed">
            This is the smallest atomic unit of your entire framework[cite: 58]. We protect this singular habit using three interlocking behavioral blueprints[cite: 218].
          </p>
          <p className="font-sinhala text-[13px] text-[#A8A29E] mt-2">
            සිංහල: මෙය මුළු පද්ධතියේම කුඩාම ඒකකයයි. කිසිදු බලකිරීමකින් තොරව දෛනිකව ඉබේම සිදුකරගෙන යා හැකි වන පරිදි මනෝවිද්‍යාත්මක ක්‍රමවේද 3ක් ඔස්සේ මෙම පුරුද්ද ආරක්ෂා කරමු.
          </p>
        </div>

        {/* Parent Objective Tracker context */}
        <div className="bg-[#F5F3EE] border border-[#E8E4DC] rounded-xl px-5 py-3 mb-8">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#78716C]">Parent Objective [Level 6]</span>
          <p className="text-[#1C1917] font-medium text-sm mt-0.5">"{activeObjective}"</p>
        </div>

        {/* ── TOOL 1: THE WOOP PROTOCOL ── */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm mb-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#FAF9F6]">
            <Zap size={16} className="text-[#065F46]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1C1917]">Tool 1 — The WOOP Protocol</span>
          </div>
          
          <p className="text-xs text-[#78716C] leading-relaxed">
            Pure positive thinking tricks your brain into feeling like you've already succeeded[cite: 220]. WOOP introduces an internal obstacle to force active problem-solving upfront[cite: 220].
          </p>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">W — Wish: What do you truly want from this action today? [cite: 222]</label>
            <input 
              type="text" 
              placeholder="e.g., Run clean layout checks / Commit early drafts"
              value={wish} onChange={e => setWish(e.target.value)}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#065F46]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">O — Outcome: Describe the best possible visual result (Min 30 words) [cite: 222, 223]</label>
            <textarea 
              placeholder="Visualize the clean feeling of checking off this block, how clear your desk will look, and the deep stress-free headspace you carry into the evening hours..."
              value={outcome} onChange={e => setOutcome(e.target.value)} rows={3}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#065F46] resize-none"
            />
            <span className="text-[10px] text-[#A8A29E] block text-right">{outcome.length} characters (Aim for deep description) [cite: 223]</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">O — Internal Obstacle: What feeling, urge, or habit will stop you? [cite: 224]</label>
            <input 
              type="text" 
              placeholder="e.g., The urgent urge to open social feeds / Fear of a bad draft"
              value={obstacle} onChange={e => setObstacle(e.target.value)}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#065F46]"
            />
          </div>

          {/* External Obstacle Guardrail Intervention */}
          {isExternalObstacleDetected && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-[#92400E] space-y-1">
              <div className="flex items-center gap-1.5 font-bold"><AlertTriangle size={14} /><span>Internal Focus Prompt [cite: 226]</span></div>
              <p>That looks like an external variable[cite: 226]. What is the internal feeling or urge that makes it hard? For example: the urge to scroll, procrastination, or fear[cite: 226].</p>
              <p className="font-sinhala text-[11px] opacity-80">සිංහල: කාලය හෝ සල්ලි වැනි බාහිර දේ වෙනුවට, කල්දැමීමේ පුරුද්ද හෝ කම්මැලිකම වැනි ඔබේ ඇතුළත ඇති බාධාව ලියන්න.</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">P — If-Then Plan: If I feel the obstacle, what immediate action happens? [cite: 227]</label>
            <input 
              type="text" 
              placeholder="e.g., If I feel the urge to scroll, then I will close all browser tabs and count down from 5..."
              value={plan} onChange={e => setPlan(e.target.value)}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#065F46]"
            />
          </div>

          <ResearchNote 
            researcher="Oettingen (NYU, 20 Years)" 
            finding="Pre-committing to response pathways before obstacles arise bypasses standard decision fatigue[cite: 220]."
            sinhala="බාධාවන් ඇතිවීමට පෙර ඒවාට දෙන පිළිතුර සූදානම් කර තැබීමෙන් මොළයට තීරණ ගැනීමේදී ඇතිවන වෙහෙස (Decision Fatigue) මඟහැරේ."
          />
        </div>

        {/* ── TOOL 2: IMPLEMENTATION INTENTIONS ── */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm mb-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#FAF9F6]">
            <Zap size={16} className="text-[#065F46]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1C1917]">Tool 2 — Implementation Intention [cite: 230]</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">Specify precisely WHEN and WHERE this fires: [cite: 231]</label>
            <input 
              type="text" 
              placeholder="e.g., At 6:30 AM on the office desk workspace"
              value={whenWhere} onChange={e => setWhenWhere(e.target.value)}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#065F46]"
            />
          </div>
          <p className="text-[11px] text-[#78716C]">
            Linking precise situations directly to targeted physical movements converts a decision into an automatic habit[cite: 231].
          </p>
        </div>

        {/* ── TOOL 3: FOGG BEHAVIOR DESIGN ── */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm mb-8 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#FAF9F6]">
            <Sparkles size={16} className="text-[#065F46]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1C1917]">Tool 3 — Fogg Stanford Systems Layout [cite: 235]</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">1. The Anchor (Existing Daily Routine Habit) [cite: 236, 238]</label>
            <input 
              type="text" placeholder="e.g., Immediately after I brew my morning cup of hot coffee..."
              value={anchor} onChange={e => setAnchor(e.target.value)}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#065F46]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">2. The 2-Minute Micro Version (For Your Hardest, Lowest Energy Days) [cite: 236, 240]</label>
            <input 
              type="text" placeholder="e.g., Open the codebase layout file and inspect one modular function block."
              value={tinyVersion} onChange={e => setTinyVersion(e.target.value)}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#065F46]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">3. The Organic Micro-Celebration Word/Feeling [cite: 236, 242]</label>
            <input 
              type="text" placeholder="e.g., Take a deep breath, smile, and whisper 'That is consistency.'"
              value={celebration} onChange={e => setCelebration(e.target.value)}
              className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#065F46]"
            />
            <span className="text-[10px] text-[#A8A29E] mt-1 block">This celebration is the neurological mechanism that wires the habit loop[cite: 236, 242]. Don't skip it.</span>
          </div>
        </div>

        {/* Global Blueprint Initialization Trigger */}
        <button
          onClick={handleAdvance}
          disabled={!wish || outcome.trim().length < 30 || !obstacle || !plan || !whenWhere || !anchor || !tinyVersion || !celebration}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-4 px-6 text-base font-semibold bg-[#065F46] text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Initialize Framework Blueprint
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}