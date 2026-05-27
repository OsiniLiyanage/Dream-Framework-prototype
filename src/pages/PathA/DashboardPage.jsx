import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Layers, ShieldAlert, Activity } from 'lucide-react'

export default function DashboardPage() {
  const navigate = useNavigate()
  
  // Hydrate states dynamically out of persistent storage layers
  const dream = localStorage.getItem('dream_text') || 'Build a local community learning framework.'
  const activeObjective = localStorage.getItem('objective_text') || 'Review development codebase lines.'
  const tinyHabit = localStorage.getItem('action_tiny_version') || 'Open file layout module and read 1 block.'
  const currentAltitude = localStorage.getItem('loop_altitude') || '0'
  
  const [habitCompleted, setHabitCompleted] = useState(false)
  const [reflection, setReflection] = useState('')

  // Simulated metrics tracking the Gap Pentagon matrix layout [cite: 105, 115]
  const gapDimensions = [
    { title: 'Domain Knowledge', current: 4, target: 10 },
    { title: 'Execution Velocity', current: 3, target: 9 },
    { title: 'Resource Allocation', current: 5, target: 8 },
    { title: 'Community Synergy', current: 2, target: 10 }
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917] px-6 py-12 flex flex-col justify-between">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        
        {/* Top Operational Meta Banner Bar */}
        <div className="flex justify-between items-center border-b border-[#E8E4DC] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#166534] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#78716C] uppercase">System Space: Active</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold bg-[#F5F3EE] px-2.5 py-1 rounded border border-[#E8E4DC] text-[#78716C]">
              Altitude: {currentAltitude} ⟲
            </span>
            <button 
              onClick={() => navigate('/review')}
              className="text-xs text-[#5B2D8E] bg-[#5B2D8E]/5 hover:bg-[#5B2D8E]/10 font-bold border border-[#5B2D8E]/20 px-3 py-1.5 rounded-lg transition-all"
            >
              Run Weekly Check-In
            </button>
          </div>
        </div>

        {/* Level 1 & 2 Identity Core Card Block [cite: 262, 264] */}
        <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#1E3A5F] uppercase block mb-1">Active Dream Anchor [Level 1]</span>
            <h2 className="text-2xl font-serif font-medium text-[#1C1917] tracking-tight">"{dream}"</h2>
          </div>
          <div className="pt-3 border-t border-[#F5F3EE]">
            <span className="text-[10px] font-bold text-[#78716C] uppercase tracking-wider block">Emergent Identity State [Level 2]</span>
            <p className="text-sm italic text-[#1C1917] mt-0.5">"I am a focused modular designer systematically building infrastructure components."</p>
          </div>
        </div>

        {/* Middle Matrix Split View: Input Execution and Gap Metrics [cite: 265, 268] */}
        <div className="grid md:grid-cols-5 gap-6">
          
          {/* Daily Action Controller Input Habits Module [cite: 268, 269] */}
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-sm md:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base">Daily Input Execution</h3>
                <p className="text-[11px] text-[#78716C]">Tactical actions calculated for minimized friction.</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#065F46]/10 text-[#065F46] rounded">Level 7</span>
            </div>

            <div className="p-4 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl space-y-3">
              <div className="flex items-start gap-3">
                <button 
                  onClick={() => setHabitCompleted(!habitCompleted)}
                  className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${habitCompleted ? 'bg-[#166534] border-[#166534] text-white' : 'border-[#A8A29E] bg-white'}`}
                >
                  {habitCompleted && <Check size={13} strokeWidth={3} />}
                </button>
                <div className="flex-grow">
                  <p className={`text-sm font-medium transition-all ${habitCompleted ? 'line-through text-[#A8A29E]' : 'text-[#1C1917]'}`}>
                    {activeObjective}
                  </p>
                  
                  {/* Micro Habit Accordion [cite: 269] */}
                  <details className="mt-2 text-xs text-[#78716C] cursor-pointer selection:bg-transparent">
                    <summary className="text-[#92400E] font-medium hover:underline text-[11px]">Low Mental Energy? Open 2-Minute Micro-Habit</summary>
                    <p className="mt-1.5 p-2.5 bg-white rounded border border-[#E8E4DC] italic text-[#78716C] leading-relaxed">
                      "On difficult days, adjust your target velocity back to the minimum floor: <strong>{tinyHabit}</strong>"
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Acknowledgment Feed Anchor [cite: 271, 272] */}
            {habitCompleted && (
              <div className="bg-[#166534]/5 border border-[#166534]/10 rounded-xl p-3 text-xs text-[#166534] font-medium animate-fade-in">
                "You showed up to build consistency today. The habit loop remains alive."
              </div>
            )}
          </div>

          {/* Side Mini Radar Sliders Representation [cite: 265, 266] */}
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-sm md:col-span-2 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#92400E] uppercase block mb-3">Gap Meter Progress</span>
              <div className="space-y-3">
                {gapDimensions.map((dim, i) => {
                  const percentage = (dim.current / dim.target) * 100
                  return (
                    <div key={i} className="text-[11px]">
                      <div className="flex justify-between text-[#78716C] mb-1">
                        <span className="font-medium truncate max-w-[110px]">{dim.title}</span>
                        <span>{dim.current}/{dim.target}</span>
                      </div>
                      <div className="w-full bg-[#FAF9F6] h-1.5 rounded-full overflow-hidden border border-[#E8E4DC]">
                        <div className="bg-[#92400E] h-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="text-[10px] text-[#A8A29E] pt-2 border-t border-[#F5F3EE]">
              Inner polygon geometry is actively trending outward toward target parameters.
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Tray: Metric Reviews and Self-Reflection Input [cite: 275, 276] */}
        <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#166534] block">Rotating Self-Efficacy Parameter</span>
              <p className="text-sm font-medium text-[#1C1917]">What did you execute today that your future self will look back on with pride?</p>
              <p className="font-sinhala text-[12px] text-[#A8A29E] mt-1">සිංහල: ඔබ future self proud වන ONE thing ඔබ අද කළදේ කුමක්ද? [cite: 279]</p>
            </div>
            <input 
              type="text" 
              value={reflection}
              onChange={e => setReflection(e.target.value)}
              placeholder="Record one short observation line..."
              className="w-full md:w-64 text-xs p-3 bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#1C1917]"
            />
          </div>
        </div>

        {/* Tree Structural Visual Blueprint Segment [cite: 384, 387] */}
        <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#78716C] uppercase tracking-wider">
            <Layers size={14} />
            <span>Active Journey Architecture</span>
          </div>
          <div className="font-mono text-[11px] leading-relaxed p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E4DC] text-[#78716C]">
            <div><span className="text-[#1E3A5F] font-bold">★ DREAM:</span> "{dream}" [cite: 385]</div>
            <div>&nbsp;└── <span className="text-[#0F5E52] font-bold">👁 VISION:</span> Operational framework verified inside core regional tracks. [cite: 386]</div>
            <div>&nbsp; &nbsp; └── <span className="text-[#5B2D8E] font-bold">📋 MISSION 1:</span> Establish blueprint configurations. <span className="text-[#166534] font-bold">[ACTIVE TRACK] [cite: 387]</span></div>
            <div>&nbsp; &nbsp; &nbsp; &nbsp; ├── <span className="text-[#92400E] font-bold">◉ MILESTONE 1:</span> System validation tests pass. [cite: 388]</div>
            <div>&nbsp; &nbsp; &nbsp; &nbsp; └── <span className="text-[#B45309] font-bold">🎯 GOAL 1:</span> Secure 1 functional workspace model. [cite: 388]</div>
          </div>
        </div>

      </div>
    </div>
  )
}