export default function ResearchNote({ researcher, finding, sinhala }) {
  return (
    <div className="mt-4 rounded-xl border border-[#E8E4DC] border-l-4 border-l-[#A8A29E] bg-[#F5F3EE] px-5 py-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-[10px] font-semibold uppercase tracking-widest text-[#A8A29E]">
          Research
        </span>
        <p className="text-[13.5px] italic leading-relaxed text-[#78716C]">
          {researcher && (
            <strong className="not-italic font-semibold text-[#1C1917]">
              {researcher} —{' '}
            </strong>
          )}
          {finding}
        </p>
      </div>

      {sinhala && (
        <p className="font-sinhala mt-3 border-t border-[#E8E4DC] pt-3 text-[13px] text-[#A8A29E]">
          {sinhala}
        </p>
      )}
    </div>
  )
}
