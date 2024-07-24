interface Props {
  finished: boolean;
}

function MatchStateBubbles({ finished }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[0, 0].map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full ${finished ? "bg-green-400" : i === 0 ? "animate-blink" : "animate-blinkDelay"} border border-slate-400`}
        />
      ))}
    </div>
  );
}

export default MatchStateBubbles;
