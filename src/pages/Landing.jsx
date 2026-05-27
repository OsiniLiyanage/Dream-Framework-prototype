import { useNavigate } from 'react-router-dom'
import { ArrowRight, Star, Compass } from 'lucide-react'
import ResearchNote from '../components/ResearchNote'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center px-6 py-16 pb-24">

      {/* Brand */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] flex items-center justify-center">
            <span className="text-white text-lg">◈</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#1C1917]">Dream</span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#A8A29E]">
          Your Life Framework
        </p>
      </div>

      {/* Hero */}
      <div className="max-w-2xl w-full text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#1C1917] mb-5">
          Every person has a dream.
          <br />
          <span className="text-[#1E3A5F]">
            Most dreams die not from lack of ambition —
          </span>
          <br />
          but from lack of system.
        </h1>

        <p className="text-lg text-[#78716C] leading-relaxed mb-4">
          Dream gives you that system. It meets you exactly where you are —
          whether you know your dream or are still searching for it — and walks
          you all the way through.
        </p>

        <p className="font-sinhala text-[15px] text-[#A8A29E]">
          සෑම කෙනෙකුටම සිහිනයක් ඇත. බොහෝ සිහින මිය යන්නේ ශක්‍යතාව නොමැතිකමින් නොව,
          system එකක් නොමැතිකමෙනි. Dream ඔබට ඒ system එක දෙයි.
        </p>
      </div>

      {/* What makes Dream different */}
      <div className="max-w-xl w-full bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-8 mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-5">
          What makes Dream different
        </p>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-[#F5F3EE] rounded-xl p-4 border border-[#E8E4DC]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-2">
              Most apps ask
            </p>
            <p className="text-[15px] italic text-[#78716C] leading-snug">
              "What do you want to achieve?"
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F] mb-2">
              Dream asks
            </p>
            <p className="text-[15px] font-semibold text-[#1E3A5F] leading-snug">
              "Who are you becoming — and what does closing that gap look like today?"
            </p>
          </div>
        </div>

        <p className="text-sm text-[#78716C] leading-relaxed">
          The gap between your <strong className="text-[#1C1917]">Present Self</strong> and
          your <strong className="text-[#1C1917]">Dream Self</strong> is the only metric that
          matters. Everything in this app exists to close that gap — and as it closes,
          you see it closing.
        </p>

        <ResearchNote
          researcher="Ryan & Deci (Self-Determination Theory)"
          finding="Goals rooted in growth, relationships, and meaning sustain motivation far longer than goals rooted in money or status — even when both are equally specific."
          sinhala="ඔබේ inner growth සහ meaning සමඟ connect වන goals, external rewards මත based goals වලට වඩා දිගු කාලයක් motivation keep කරයි. Science එකෙන් prove කරන ලද සත්‍යයකි."
        />
      </div>

      {/* Two paths */}
      <div className="max-w-xl w-full">
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E] mb-5">
          Where are you right now?
        </p>

        <div className="flex flex-col gap-4">

          {/* Path A */}
          <button
            onClick={() => navigate('/path-a')}
            className="group w-full bg-white border border-[#E8E4DC] rounded-2xl p-7 text-left cursor-pointer
                       shadow-sm hover:shadow-md hover:border-[#1E3A5F] hover:-translate-y-0.5
                       transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Star size={14} className="text-[#1E3A5F]" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F]">
                    Path A
                  </span>
                </div>

                <p className="text-xl font-bold text-[#1C1917] mb-2 tracking-tight">
                  I know my dream
                </p>
                <p className="text-sm text-[#78716C] leading-relaxed mb-2">
                  You have a dream. We validate it, understand it deeply, and build
                  the full hierarchy that takes you there.
                </p>
                <p className="font-sinhala text-[13px] text-[#A8A29E]">
                  ඔබේ සිහිනය ඔබ දන්නවා. අපි එය validate කර, hierarchy build කරමු.
                </p>
              </div>
              <ArrowRight
                size={20}
                className="text-[#A8A29E] group-hover:text-[#1E3A5F] group-hover:translate-x-1
                           transition-all duration-200 mt-1 ml-4 shrink-0"
              />
            </div>
          </button>

          {/* Path B */}
          <button
            onClick={() => navigate('/path-b')}
            className="group w-full bg-white border border-[#E8E4DC] rounded-2xl p-7 text-left cursor-pointer
                       shadow-sm hover:shadow-md hover:border-[#0F5E52] hover:-translate-y-0.5
                       transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Compass size={14} className="text-[#0F5E52]" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0F5E52]">
                    Path B
                  </span>
                </div>

                <p className="text-xl font-bold text-[#1C1917] mb-2 tracking-tight">
                  Help me find my dream
                </p>
                <p className="text-sm text-[#78716C] leading-relaxed mb-2">
                  You are not sure yet what you truly want. We run the Dream Discovery
                  Protocol — values, future casting, Ikigai — and help you find it.
                </p>
                <p className="font-sinhala text-[13px] text-[#A8A29E]">
                  ඔබේ සිහිනය මොකක්ද කියලා තවම හරියටම දන්නෙ නෑ. අපි Discovery Protocol
                  එකෙන් ඔබට ඒ සිහිනය සොයා ගැනීමට උදව් කරමු.
                </p>
              </div>
              <ArrowRight
                size={20}
                className="text-[#A8A29E] group-hover:text-[#0F5E52] group-hover:translate-x-1
                           transition-all duration-200 mt-1 ml-4 shrink-0"
              />
            </div>
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-[12px] text-[#A8A29E] mt-8 leading-relaxed">
          No account required to explore. Your data stays on your device.
          <br />
          
        </p>
      </div>

    </div>
  )
}