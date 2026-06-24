/**
 * Scène animée du QCM « niveau IA » : un petit robot (Troyie) grimpe les
 * marches pas à pas vers une étoile qui scintille. SVG + CSS, aucune
 * dépendance, désactivé si prefers-reduced-motion. DA TROIE (trait à l'encre).
 */
export function ClimbScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <svg
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        role="img"
        aria-label="Un petit robot grimpe les marches vers une étoile"
      >
        {/* Marches */}
        <polyline
          points="18,138 54,138 54,110 90,110 90,82 126,82 126,54 164,54"
          fill="none"
          stroke="#231b12"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Étoile qui scintille */}
        <g transform="translate(170,30)">
          <g className="qcm-star">
            <path
              d="M0,-11 L3.1,-3.4 L11,-3.4 L4.8,1.6 L7,9 L0,4.4 L-7,9 L-4.8,1.6 L-11,-3.4 L-3.1,-3.4 Z"
              fill="none"
              stroke="#231b12"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
            <g stroke="#231b12" strokeWidth="1.5" strokeLinecap="round">
              <line x1="0" y1="-15" x2="0" y2="-19" />
              <line x1="13" y1="0" x2="17" y2="0" />
              <line x1="-13" y1="0" x2="-17" y2="0" />
              <line x1="10" y1="-11" x2="12.5" y2="-13.5" />
              <line x1="-10" y1="-11" x2="-12.5" y2="-13.5" />
            </g>
          </g>
        </g>

        {/* Robot grimpeur */}
        <g className="qcm-robot">
          <image href="/images/mascot/troyie-face.png" x="14" y="94" width="30" />
        </g>
      </svg>
    </div>
  );
}
