export default function BackgroundDecor() {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full"
      >
        {/* Gradiente full height */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0FDFA] to-[#E0F2FE]" />
  
        {/* Forma superior esquerda */}
        <svg
          className="absolute top-[-150px] left-[-100px] w-[500px] opacity-30 blur-2xl"
          viewBox="0 0 500 500"
          fill="none"
        >
          <circle cx="250" cy="250" r="250" fill="#14B8A6" />
        </svg>
  
        {/* Forma inferior direita */}
        <svg
          className="absolute bottom-[-150px] right-[-100px] w-[400px] opacity-40 blur-2xl"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="200" fill="#A78BFA" />
        </svg>
      </div>
    )
  }
  