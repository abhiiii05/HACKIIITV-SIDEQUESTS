"use client"

export function Particles() {
    return (
        <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
                <div
                    key={i}
                    className="particle absolute rounded-full bg-[#87CEFA]/10"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        animationDuration: `${Math.random() * 20 + 10}s`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}
            <style jsx>{`
        .particle {
          animation: float linear infinite;
          opacity: 0.4;
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
        </div>
    )
}

