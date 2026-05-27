export default function StepProgress({ current, total, color = '#1E3A5F' }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            style={{
              width: i < current ? '28px' : '8px',
              height: '8px',
              borderRadius: '99px',
              background: i < current ? color : '#E8E4DC',
              transition: 'all 0.4s ease',
            }}
          />
        </div>
      ))}
      <span className="ml-2 text-[11px] font-semibold uppercase tracking-widest text-[#A8A29E]">
        {current} / {total}
      </span>
    </div>
  )
}