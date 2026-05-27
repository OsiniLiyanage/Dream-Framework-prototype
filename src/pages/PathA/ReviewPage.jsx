import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardCheck, HelpCircle, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react'
import ResearchNote from '../../components/ResearchNote'

export default function ReviewPage() {
  const navigate = useNavigate()
  
  // Local Review State
  const [reviewStep, setReviewStep] = useState(1) // 1: Weekly Check-in, 2: Triple-A Appraisal
  const [completionRate, setCompletionRate] = useState(50)
  const [confidence, setConfidence] = useState(5)
  const [whatBlocked, setWhatBlocked] = useState('')
  const [selectedAppraisal, setSelectedAppraisal] = useState('')

  // Trigger conditions for early warning system intervention
  const isEarlyWarningTriggered = confidence < 4 && completionRate < 40

  const handleWeeklySubmit = () => {
    // Save metric logs to cache
    localStorage.setItem('last_completion_rate', completionRate.toString())
    localStorage.setItem('last_confidence_score', confidence.toString())
    localStorage.setItem('last_blocker_notes', whatBlocked)

    if (isEarlyWarningTriggered || completionRate < 50) {
      // Divert straight into Triple-A Diagnostic Appraisal
      setReviewStep(2)
    } else {
      // Metrics are healthy, push back to dashboard workspace
      navigate('/dashboard')
    }
  }

  const handleAppraisalSubmit = () => {
    if (!selectedAppraisal) return
    localStorage.setItem('active_failure_appraisal', selectedAppraisal)

    // Route user directly into their specialized recovery workflow protocol
    navigate('/recovery')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917] px-6 py-12 flex flex-col justify-center">
      <div className="max-w-xl w-full mx-auto bg-white border border-[#E8E4DC] rounded-2xl p-8 shadow-sm">
        
        {/* ── STEP 1: STANDARD WEEKLY CADENCE CHECK-IN ── */}
        {reviewStep === 1 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ClipboardCheck className="text-[#5B2D8E]" size={18} />
                <span className="text-[10px] font-bold tracking-widest text-[#5B2D8E] uppercase">10-Minute Weekly Diagnostic [Level 4]</span>
              </div>
              <h2 className="text-2xl font-serif font-bold">Assess your input performance loop</h2>
              <p className="text-xs text-[#78716C] mt-1">
                We measure goal-performance discrepancies to adjust parameters before tracking friction stalls your momentum.
              </p>
              <p className="font-sinhala text-[12px] text-[#A8A29E] mt-1">
                සිංහල: සතිපතා ඔබ ලබාගත් ප්‍රගතිය සහ ඇතිවූ බාධාවන් විශ්ලේෂණය කර දෛනික පුරුදු නිවැරදිව වෙනස් කර ගැනීමට මෙම පියවර උදවු වේ.
              </p>
            </div>

            {/* Sliders Input Module Layout */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#78716C]">
                  <span>1. Estimated Action Completion Rate</span>
                  <span className="font-mono text-[#1C1917]">{completionRate}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="10"
                  value={completionRate} onChange={e => setCompletionRate(Number(e.target.value))}
                  className="w-full accent-[#5B2D8E]" 
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#78716C]">
                  <span>2. Objective Confidence Score</span>
                  <span className="font-mono text-[#1C1917]">{confidence} / 10</span>
                </div>
                <input 
                  type="range" min="1" max="100" step="1"
                  value={confidence} onChange={e => setConfidence(Number(e.target.value))}
                  className="w-full accent-[#5B2D8E]" 
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#78716C]">3. System Blockers: What got in the way of execution? [cite: 285]</label>
                <textarea 
                  value={whatBlocked} onChange={e => setWhatBlocked(e.target.value)}
                  placeholder="e.g., Conflicting timelines, low focus retention, unpredictable workflows..."
                  rows={3}
                  className="w-full p-3 text-xs bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#5B2D8E] resize-none"
                />
              </div>
            </div>

            {/* Early Warning Intercept Coaching Indicator Overlay */}
            {isEarlyWarningTriggered && (
              <div className="bg-[#991B1B]/5 border border-[#991B1B]/10 rounded-xl p-4 space-y-1 text-xs text-[#991B1B]">
                <div className="flex items-center gap-1.5 font-bold">
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Soft Intervention Diagnostic Triggered [cite: 289]</span>
                </div>
                <p>This looks like it has been a hard stretch[cite: 289]. The system is routing you directly into the Triple-A Appraisal system to inspect adjustments gracefully[cite: 290].</p>
                <p className="font-sinhala text-[11px] opacity-80">සිංහල: පසුගිය සති කිහිපය ඔබට අපහසු වූ බව පද්ධතියට වැටහේ. අපි කිසිදු වටහාගැනීමකින් තොරව ගැටලුව හඳුනා ගනිමු.</p>
              </div>
            )}

            <button
              onClick={handleWeeklySubmit}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm font-semibold bg-[#5B2D8E] text-white transition-all"
            >
              Process Metric Verification
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ── STEP 2: THE TRIPLE-A CAUSAL APPRAISAL MECHANISM ── */}
        {reviewStep === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#991B1B] uppercase block">Triple-A Framework · Causal Appraisal [cite: 298, 304]</span>
              <h2 className="text-2xl font-serif font-bold mt-1">Why did this specific result happen? [cite: 304]</h2>
              <p className="text-xs text-[#78716C] mt-1">
                We attribute setbacks to temporary actionable strategies, never to your underlying identity vector[cite: 416].
              </p>
            </div>

            {/* The Five Research-Backed Attribution Vectors Layout */}
            <div className="space-y-3">
              {[
                {
                  id: 'effort',
                  title: 'Effort Matrix Gap',
                  desc: 'I carried the correct operational method, but failed to put in consistent physical hours[cite: 306].',
                  cite: 'Research: Effort attribution is healthier. Inputs remain variable elements you fully control[cite: 307].'
                },
                {
                  id: 'strategy',
                  title: 'Flawed Tactical Strategy',
                  desc: 'I worked with heavy willpower, but the underlying execution framework or setup was incorrect[cite: 308].',
                  cite: 'Research: Strategy failure is highly common and fixable. The workflow simply needs layout redesign[cite: 309].'
                },
                {
                  id: 'capacity',
                  title: 'Infrastructure Capacity Bounds',
                  desc: 'A structural, genuine skill or resource barrier is actively blocking my output track right now[cite: 310].',
                  cite: 'Research: Höpfner & Keith (2021) confirm that the correct response requires dropping down to a guaranteed success ladder[cite: 312].'
                },
                {
                  id: 'circumstance',
                  title: 'External Unpredictable Circumstance',
                  desc: 'Uncontrollable real-world factors completely shifted my context profile workspace[cite: 313].',
                  cite: 'Research: External tracking is valid when honest. Ensure context variables are not hiding structural strategy gaps[cite: 314, 315].'
                }
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedAppraisal(option.id)}
                  className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex flex-col space-y-1 ${selectedAppraisal === option.id ? 'border-[#991B1B] bg-[#991B1B]/5' : 'border-[#E8E4DC] bg-[#FAF9F6] hover:bg-white'}`}
                >
                  <span className="font-bold text-[#1C1917]">{option.title}</span>
                  <span className="text-[#78716C] leading-snug">{option.desc}</span>
                  <span className="text-[10px] text-[#A8A29E] italic border-t border-[#E8E4DC]/40 pt-1 mt-1 block">{option.cite}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleAppraisalSubmit}
              disabled={!selectedAppraisal}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm font-semibold bg-[#1C1917] text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Route Into Adjustment Protocol [cite: 319]
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}