import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Compass, ArrowLeft, ArrowRight, Layers, Sparkles, Heart } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'
import StepProgress from '../../components/StepProgress'

export default function DreamDiscovery() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 1: Values State (Tracks scores for value clusters)
  const [valuesScores, setValuesScores] = useState({ Growth: 0, Fairness: 0, Freedom: 0, Impact: 0 })
  const [currentScenario, setCurrentScenario] = useState(0)

  // Step 2: Life Domains State
  const [domains, setDomains] = useState({
    Purpose: { current: 3, target: 9 },
    WorkCraft: { current: 4, target: 8 },
    Mind: { current: 5, target: 8 }
  })

  // Step 3 & 4: Future Casting & Dissatisfaction State
  const [futureVision, setFutureVision] = useState('')
  const [dissatisfaction, setDissatisfaction] = useState('')

  // Step 5: Ikigai Choice State
  const [wantsIkigai, setWantsIkigai] = useState(null) // null, true, false
  const [ikigaiLove, setIkigaiLove] = useState('')

  // Scenarios for Step 1 Values Discovery
  const scenarios = [
    {
      q: "You have worked hard on a project for 3 months. Your manager takes credit for it publicly. Your first instinct is:",
      optA: "Focus on what I learned — the growth is what counts.",
      valA: "Growth",
      optB: "Feel angry — fairness matters deeply to me.",
      valB: "Fairness"
    },
    {
      q: "You are offered a high-paying role with rigid, strict hours, or a lower-paying role with absolute autonomy. You choose:",
      optA: "The flexible role — I need total control over my time.",
      valA: "Freedom",
      optB: "The structured high-pay role — I want my work to have major leverage.",
      valB: "Impact"
    }
  ]

  const handleScenarioAnswer = (valCluster) => {
    setValuesScores(prev => ({ ...prev, [valCluster]: prev[valCluster] + 1 }))
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
    } else {
      setStep(2)
    }
  }

  const handleDomainChange = (key, field, val) => {
    setDomains(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: val }
    }))
  }

  const handleCompleteDiscovery = (selectedCandidate) => {
    localStorage.setItem('dream_text', selectedCandidate)
    localStorage.setItem('discovery_completed', 'true')
    // Converges directly into Path A Validation flow seamlessly
    navigate('/path-a/validate')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917] px-6 py-12 flex flex-col justify-center">
      <div className="max-w-xl w-full mx-auto bg-white border border-[#E8E4DC] rounded-2xl p-8 shadow-sm">
        
        {/* Step Progress Visual Tracker */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-xs text-[#A8A29E] hover:text-[#78716C]">
            <ArrowLeft size={14} /> Back to Doorways
          </button>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0F5E52]">
            Discovery Protocol · Stage {step} of 6
          </span>
        </div>

        {/* ── STEP 1: VALUES EXCAVATION ── */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                <Compass className="text-[#0F5E52]" size={22} />
                Values Excavation Layer
              </h2>
              <p className="text-xs text-[#78716C] mt-1">
                Goals that conflict with your core values collapse under pressure. Let's surface them through realistic operational trade-offs.
              </p>
              <p className="font-sinhala text-[12px] text-[#A8A29E] mt-1">
                සිංහල: ඔබේ සැබෑ වටිනාකම් (Core Values) හඳුනා ගැනීමට මෙම ප්‍රශ්න උදවු වේ. ඔබේ වටිනාකම්වලට පටහැනි ඉලක්ක පීඩනයක් හමුවේ බිඳ වැටේ.
              </p>
            </div>

            <div className="p-5 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl space-y-4">
              <span className="text-[9px] font-mono font-bold text-[#A8A29E] uppercase">Diagnostic Scenario {currentScenario + 1}</span>
              <p className="text-sm font-medium leading-relaxed">"{scenarios[currentScenario].q}"</p>
              
              <div className="space-y-3 pt-2">
                <button 
                  onClick={() => handleScenarioAnswer(scenarios[currentScenario].valA)}
                  className="w-full text-left p-4 bg-white border border-[#E8E4DC] rounded-xl hover:border-[#0F5E52] transition-all text-xs font-medium"
                >
                  {scenarios[currentScenario].optA}
                </button>
                <button 
                  onClick={() => handleScenarioAnswer(scenarios[currentScenario].valB)}
                  className="w-full text-left p-4 bg-white border border-[#E8E4DC] rounded-xl hover:border-[#0F5E52] transition-all text-xs font-medium"
                >
                  {scenarios[currentScenario].optB}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: LIFE DOMAINS ASSESSMENT ── */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Life Domains Assessment</h2>
              <p className="text-xs text-[#78716C] mt-1">
                Where is the energy pulling you? The metric gap isolates exactly where systemic tension lies.
              </p>
            </div>

            <div className="space-y-4 bg-[#FAF9F6] p-5 border border-[#E8E4DC] rounded-xl">
              {Object.keys(domains).map((key) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#78716C]">
                    <span>{key === 'WorkCraft' ? 'Work & Craft' : key}</span>
                    <span>Gap: {domains[key].target - domains[key].current}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[11px]">
                    <div>
                      <label className="text-[#A8A29E]">Present (1-10): {domains[key].current}</label>
                      <input type="range" min="1" max="10" value={domains[key].current} onChange={e => handleDomainChange(key, 'current', Number(e.target.value))} className="w-full accent-[#0F5E52]" />
                    </div>
                    <div>
                      <label className="text-[#A8A29E]">Intended Target: {domains[key].target}</label>
                      <input type="range" min="1" max="10" value={domains[key].target} onChange={e => handleDomainChange(key, 'target', Number(e.target.value))} className="w-full accent-[#0F5E52]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setStep(3)} className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-xs font-semibold bg-[#1C1917] text-white">
              Initialize Future Casting <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* ── STEP 3: FUTURE CASTING ── */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Future Casting Protocol</h2>
              <p className="text-xs text-[#78716C] mt-1">
                Imagine you have already locked in your deep targets. Describe what problem in the world you helped solve before noon today.
              </p>
            </div>

            <textarea
              value={futureVision} onChange={e => setFutureVision(e.target.value)}
              placeholder="Do not filter for realism yet. Describe what you explicitly see..."
              rows={4} className="w-full p-4 text-xs bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#0F5E52] resize-none"
            />

            <button onClick={() => setStep(4)} disabled={futureVision.trim().length < 10} className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-xs font-semibold bg-[#1C1917] text-white disabled:opacity-30">
              Advance to Dissatisfaction Probe <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* ── STEP 4: LIFE DISSATISFACTION PROBE ── */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Life Dissatisfaction Probe</h2>
              <p className="text-xs text-[#78716C] mt-1">
                What in your current landscape bothers you most when you think about it at 2:00 AM? Many strong life purposes emerge directly from friction.
              </p>
            </div>

            <textarea
              value={dissatisfaction} onChange={e => setDissatisfaction(e.target.value)}
              placeholder="State the honest truth about what needs to change in your environment..."
              rows={4} className="w-full p-4 text-xs bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#0F5E52] resize-none"
            />

            <button onClick={() => setStep(5)} disabled={dissatisfaction.trim().length < 10} className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-xs font-semibold bg-[#1C1917] text-white disabled:opacity-30">
              Propose Optional Ikigai Step <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* ── STEP 5: OPTIONAL IKIGAI CONNECTOR ── */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Optional Ikigai Integration</h2>
              <p className="text-xs text-[#78716C] mt-1">
                Would you like to run a brief 60-second structural audit intersection layer mapping what you love vs what the environment requires?
              </p>
            </div>

            {wantsIkigai === null && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setWantsIkigai(true)} className="p-4 bg-[#FAF9F6] border border-[#E8E4DC] hover:border-[#0F5E52] rounded-xl font-bold text-xs">
                  Yes, map intersection vectors.
                </button>
                <button onClick={() => setStep(6)} className="p-4 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl text-xs text-[#78716C]">
                  Skip directly to candidates.
                </button>
              </div>
            )}

            {wantsIkigai === true && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold text-[#78716C] mb-1">What do you love doing — even if you aren't an expert yet?</label>
                  <input type="text" value={ikigaiLove} onChange={e => setIkigaiLove(e.target.value)} placeholder="e.g., Designing complex architecture, teaching algorithms..." className="w-full p-3 text-xs bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none" />
                </div>
                <button onClick={() => setStep(6)} disabled={!ikigaiLove} className="w-full py-3 bg-[#0F5E52] text-white rounded-xl text-xs font-bold">
                  Synthesize Synthesis Mapping Profiles
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 6: SYNTHESIZED DREAM CANDIDATES ── */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0F5E52]">Dynamic Output Profiles</span>
              <h2 className="text-2xl font-serif font-bold mt-1">Select your optimized focus matrix candidate</h2>
              <p className="text-xs text-[#78716C] mt-1">
                The protocol has synthesized matching evolutionary paths based on your data profiles. Selecting a card unlocks your verification track.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Build scalable decentralized learning frameworks to democratize operational skills.",
                "Design structural core platforms focused on technical engineering equity parameters.",
                "Establish localized system repositories to eliminate tracking optimization barriers."
              ].map((candidate, i) => (
                <div 
                  key={i} onClick={() => handleCompleteDiscovery(candidate)}
                  className="p-4 bg-[#FAF9F6] border border-[#E8E4DC] hover:border-[#0F5E52] hover:bg-white rounded-xl cursor-pointer transition-all space-y-1"
                >
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#0F5E52] uppercase tracking-wider">
                    <Sparkles size={12} /> <span>Synthesized Candidate Path {i + 1}</span>
                  </div>
                  <p className="text-xs font-medium text-[#1C1917]">"{candidate}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}