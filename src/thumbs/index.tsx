import type { CSSProperties, ReactNode } from 'react'
import './thumbs.css'

/* ------------------------------------------------------------------ helpers */

const Frame = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 320 180" className="th" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    {children}
  </svg>
)

/** Raccourci pour décaler une animation. */
const d = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` })

/** Trait qui se dessine en boucle : `len` doit approcher la longueur du chemin. */
const draw = (len: number, delay = 0): CSSProperties =>
  ({ '--len': len, animationDelay: `${delay}s` }) as CSSProperties

const travel = (path: string, delay = 0): CSSProperties =>
  ({ offsetPath: `path("${path}")`, animationDelay: `${delay}s` }) as CSSProperties

const mono = { fontFamily: 'var(--mono)', fontWeight: 600 } as const

/* ------------------------------------------------------------- applications */

const GccExplorer = () => {
  const flags = ['-Wall', '-O2', '-fPIC', '-Wextra', '-flto', '-fanalyzer', '-Os', '-g3']
  return (
    <Frame>
      <rect x="34" y="24" width="252" height="132" rx="10" className="th-s-dim" strokeWidth="1.5" opacity="0.55" />
      <line x1="34" y1="44" x2="286" y2="44" className="th-s-dim" strokeWidth="1.5" opacity="0.35" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={48 + i * 13} cy="34" r="3.5" className="th-dim" opacity="0.5" />
      ))}
      {flags.map((f, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        return (
          <g key={f} className="a-pulse" style={d(i * 0.28)}>
            <rect
              x={50 + col * 74}
              y={58 + row * 28}
              width="66"
              height="19"
              rx="6"
              className="th-acc"
              opacity="0.16"
            />
            <text
              x={83 + col * 74}
              y={71.5 + row * 28}
              textAnchor="middle"
              fontSize="10"
              className="th-acc"
              style={mono}
              fill="currentColor"
            >
              {f}
            </text>
          </g>
        )
      })}
      <rect x="50" y="142" width="120" height="5" rx="2.5" className="th-dim" opacity="0.3" />
      <g className="a-scan">
        <rect x="0" y="24" width="44" height="132" className="th-acc" opacity="0.08" />
        <rect x="42" y="24" width="2" height="132" className="th-acc" opacity="0.6" />
      </g>
    </Frame>
  )
}

const MetamathExplorer = () => {
  const edges = [
    { p: 'M160 42 L100 88', l: 76 },
    { p: 'M160 42 L220 88', l: 76 },
    { p: 'M100 88 L64 138', l: 62 },
    { p: 'M100 88 L136 138', l: 62 },
    { p: 'M220 88 L184 138', l: 62 },
    { p: 'M220 88 L256 138', l: 62 },
  ]
  const nodes = [
    [160, 42],
    [100, 88],
    [220, 88],
    [64, 138],
    [136, 138],
    [184, 138],
    [256, 138],
  ] as const
  return (
    <Frame>
      {edges.map((e, i) => (
        <path
          key={i}
          d={e.p}
          className="th-s-acc a-draw"
          strokeWidth="1.6"
          opacity="0.75"
          style={draw(e.l, i * 0.18)}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i} className="a-pulse" style={d(i * 0.3)}>
          <circle cx={x} cy={y} r="13" className="th-acc" opacity="0.14" />
          <circle cx={x} cy={y} r="7.5" className="th-s-acc" strokeWidth="1.8" />
        </g>
      ))}
      <text x="160" y="26" textAnchor="middle" fontSize="12" className="th-ink" style={mono} opacity="0.55">
        ⊢ (φ → φ)
      </text>
      <circle r="3" className="th-acc a-travel" style={travel('M160 42 L100 88 L64 138')} />
      <circle r="3" className="th-acc a-travel" style={travel('M160 42 L220 88 L256 138', 1.4)} />
    </Frame>
  )
}

const CampingSimulator = () => {
  const tiles: Array<[number, number]> = []
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) tiles.push([i, j])
  const pos = (i: number, j: number) => [160 + (i - j) * 30, 74 + (i + j) * 15] as const
  const tents: Array<[number, number]> = [
    [0, 1],
    [2, 0],
    [1, 3],
    [3, 2],
  ]
  return (
    <Frame>
      {tiles.map(([i, j]) => {
        const [x, y] = pos(i, j)
        return (
          <polygon
            key={`${i}-${j}`}
            points={`${x},${y - 15} ${x + 30},${y} ${x},${y + 15} ${x - 30},${y}`}
            className="th-s-dim"
            strokeWidth="1"
            opacity={(i + j) % 2 ? 0.5 : 0.26}
            fill="var(--accent)"
            fillOpacity={(i + j) % 2 ? 0.06 : 0.12}
          />
        )
      })}
      {tents.map(([i, j], k) => {
        const [x, y] = pos(i, j)
        return (
          <g key={k} className="a-pop" style={d(k * 0.5)}>
            <polygon points={`${x},${y - 24} ${x + 15},${y + 2} ${x - 15},${y + 2}`} className="th-acc" opacity="0.85" />
            <polygon points={`${x},${y - 24} ${x + 4},${y + 2} ${x - 4},${y + 2}`} className="th-ink" opacity="0.35" />
          </g>
        )
      })}
      {/* feu de camp */}
      <g>
        <ellipse cx="160" cy="122" rx="14" ry="6" className="th-dim" opacity="0.35" />
        <path
          d="M160 100 C168 108 166 114 160 118 C154 114 152 108 160 100 Z"
          className="th-acc a-flicker"
          opacity="0.95"
        />
      </g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={150 + i * 10} cy="96" r="1.8" className="th-acc a-rise" style={d(i * 0.7)} opacity="0.5" />
      ))}
    </Frame>
  )
}

const CalendarGenerator = () => (
  <Frame>
    <rect x="36" y="22" width="248" height="136" rx="10" className="th-s-dim" strokeWidth="1.5" opacity="0.5" />
    <line x1="36" y1="46" x2="284" y2="46" className="th-s-dim" strokeWidth="1.5" opacity="0.35" />
    {[0, 1].map((i) => (
      <rect key={i} x={60 + i * 180} y="14" width="5" height="16" rx="2.5" className="th-dim" opacity="0.5" />
    ))}
    {Array.from({ length: 21 }, (_, i) => {
      const col = i % 7
      const row = Math.floor(i / 7)
      return (
        <g key={i}>
          <rect
            x={48 + col * 33}
            y={56 + row * 26}
            width="26"
            height="20"
            rx="4"
            className="th-dim"
            opacity="0.12"
          />
          {i % 3 === 0 && (
            <circle
              cx={61 + col * 33}
              cy={66 + row * 26}
              r="3.6"
              className="th-acc a-pop"
              style={d((i % 9) * 0.28)}
            />
          )}
        </g>
      )
    })}
    <path
      d="M48 140 L81 132 L114 136 L147 124 L180 128 L213 116 L246 120 L272 112"
      className="th-s-acc a-draw"
      strokeWidth="2.2"
      style={draw(240)}
    />
    {[48, 114, 180, 246].map((x, i) => (
      <circle key={x} cx={x} cy={[140, 136, 128, 120][i]} r="2.8" className="th-acc a-pulse" style={d(i * 0.4)} />
    ))}
  </Frame>
)

const AcronymsServer = () => {
  const rows = [
    ['NASA', 'National Aeronautics…'],
    ['LEO', 'Low Earth Orbit'],
    ['EVA', 'Extravehicular Activity'],
  ]
  return (
    <Frame>
      <rect x="40" y="26" width="240" height="30" rx="15" className="th-s-dim" strokeWidth="1.5" opacity="0.5" />
      <circle cx="61" cy="41" r="6" className="th-s-acc" strokeWidth="2" />
      <line x1="65.5" y1="45.5" x2="70" y2="50" className="th-s-acc" strokeWidth="2" />
      <rect x="82" y="37" width="52" height="8" rx="4" className="th-acc" opacity="0.35" />
      <rect x="138" y="33" width="2" height="16" className="th-acc a-blink" />
      {rows.map(([a, e], i) => (
        <g key={a} className="a-rise" style={d(i * 1.1)}>
          <rect x="40" y={70 + i * 32} width="240" height="26" rx="7" className="th-acc" opacity="0.09" />
          <text x="54" y={87 + i * 32} fontSize="12" className="th-acc" style={mono} fill="currentColor">
            {a}
          </text>
          <text x="112" y={87 + i * 32} fontSize="10.5" className="th-dim" fill="currentColor" opacity="0.9">
            {e}
          </text>
        </g>
      ))}
    </Frame>
  )
}

const WordsServer = () => {
  const words = ['running', 'ran', 'runs', 'runner']
  return (
    <Frame>
      <text x="160" y="46" textAnchor="middle" fontSize="17" className="th-acc" style={mono} fill="currentColor">
        run
      </text>
      <circle cx="160" cy="40" r="20" className="th-s-acc" strokeWidth="1.4" opacity="0.3" />
      {words.map((w, i) => {
        const x = 46 + i * 62
        return (
          <g key={w}>
            <path
              d={`M160 62 C160 84 ${x + 26} 84 ${x + 26} 106`}
              className="th-s-acc a-draw"
              strokeWidth="1.4"
              opacity="0.55"
              style={draw(90, i * 0.2)}
            />
            <g className="a-floatsm" style={d(i * 0.4)}>
              <rect x={x} y="108" width="52" height="24" rx="7" className="th-acc" opacity="0.13" />
              <text
                x={x + 26}
                y="124"
                textAnchor="middle"
                fontSize="10"
                className="th-ink"
                style={mono}
                fill="currentColor"
                opacity="0.8"
              >
                {w}
              </text>
            </g>
          </g>
        )
      })}
      <g className="a-scan">
        <rect x="0" y="0" width="38" height="180" className="th-acc" opacity="0.07" />
        <rect x="36" y="0" width="2" height="180" className="th-acc" opacity="0.5" />
      </g>
    </Frame>
  )
}

/* ---------------------------------------------- librairies, services, outils */

const AudioQualityReducer = () => (
  <Frame>
    {Array.from({ length: 11 }, (_, i) => (
      <rect
        key={`hi${i}`}
        x={26 + i * 9}
        y="60"
        width="4.5"
        height="60"
        rx="2.2"
        className="th-acc a-bars"
        opacity="0.85"
        style={d(i * 0.09)}
      />
    ))}
    <path d="M140 90 L176 90" className="th-s-dim" strokeWidth="2" opacity="0.6" />
    <path d="M170 84 L177 90 L170 96" className="th-s-dim" strokeWidth="2" opacity="0.6" />
    {Array.from({ length: 6 }, (_, i) => (
      <rect
        key={`lo${i}`}
        x={192 + i * 16}
        y="76"
        width="8"
        height="28"
        rx="3"
        className="th-dim a-bars"
        opacity="0.55"
        style={d(i * 0.22)}
      />
    ))}
    <text x="82" y="140" textAnchor="middle" fontSize="11" className="th-dim" style={mono} fill="currentColor">
      4.2 MB
    </text>
    <text x="228" y="140" textAnchor="middle" fontSize="11" className="th-acc a-pulse" style={mono} fill="currentColor">
      38 KB
    </text>
    <rect x="26" y="46" width="110" height="3" rx="1.5" className="th-dim" opacity="0.3" />
    <rect x="192" y="46" width="102" height="3" rx="1.5" className="th-acc a-width" opacity="0.5" />
  </Frame>
)

const VoiceNumberGenerator = () => (
  <Frame>
    <g className="a-floatsm">
      <path d="M74 74 L94 74 L118 54 L118 126 L94 106 L74 106 Z" className="th-acc" opacity="0.85" />
    </g>
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M${130 + i * 14} ${76 - i * 9} A ${26 + i * 14} ${26 + i * 14} 0 0 1 ${130 + i * 14} ${104 + i * 9}`}
        className="th-s-acc a-pulse"
        strokeWidth="2.4"
        style={d(i * 0.25)}
      />
    ))}
    <clipPath id="digitClip">
      <rect x="212" y="62" width="60" height="56" />
    </clipPath>
    <rect x="212" y="62" width="60" height="56" rx="10" className="th-acc" opacity="0.12" />
    <g clipPath="url(#digitClip)">
      <g className="a-tick">
        {[0, 1, 2].map((i) => (
          <text
            key={i}
            x="242"
            y={102 + i * 48}
            textAnchor="middle"
            fontSize="30"
            className="th-acc"
            style={mono}
            fill="currentColor"
          >
            {i + 3}
          </text>
        ))}
      </g>
    </g>
    {['fr', 'en', 'de'].map((l, i) => (
      <text
        key={l}
        x={92 + i * 46}
        y="152"
        textAnchor="middle"
        fontSize="10"
        className="th-dim a-pulse"
        style={{ ...mono, ...d(i * 0.5) }}
        fill="currentColor"
      >
        {l}
      </text>
    ))}
  </Frame>
)

const Cylinder = ({ y, o = 1 }: { y: number; o?: number }) => (
  <g opacity={o}>
    <ellipse cx="160" cy={y} rx="46" ry="13" className="th-acc" opacity="0.18" />
    <ellipse cx="160" cy={y} rx="46" ry="13" className="th-s-acc" strokeWidth="1.6" />
  </g>
)

const WikipediaSqlite = () => (
  <Frame>
    <path d="M114 62 L114 118" className="th-s-acc" strokeWidth="1.6" />
    <path d="M206 62 L206 118" className="th-s-acc" strokeWidth="1.6" />
    <Cylinder y={118} />
    <Cylinder y={90} o={0.75} />
    <Cylinder y={62} />
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={142 + i * 14}
        y="18"
        width="9"
        height="9"
        rx="2"
        className="th-acc a-rise"
        style={d(i * 0.5)}
      />
    ))}
    <g className="a-sweep" style={{ transformOrigin: '160px 62px' }}>
      <path d="M160 62 L160 150" className="th-s-acc" strokeWidth="1.2" opacity="0.35" strokeDasharray="4 5" />
    </g>
    <text x="160" y="168" textAnchor="middle" fontSize="10" className="th-dim" style={mono} fill="currentColor">
      FTS5
    </text>
  </Frame>
)

const WikipediaServer = () => (
  <Frame>
    <circle cx="160" cy="90" r="46" className="th-s-acc" strokeWidth="1.6" opacity="0.8" />
    <ellipse cx="160" cy="90" rx="18" ry="46" className="th-s-acc" strokeWidth="1.2" opacity="0.45" />
    <path d="M116 74 L204 74 M114 106 L206 106" className="th-s-acc" strokeWidth="1.2" opacity="0.45" />
    <g className="a-spin" style={{ transformOrigin: '160px 90px' }}>
      <circle cx="160" cy="44" r="3.5" className="th-acc" />
      <circle cx="160" cy="136" r="3.5" className="th-acc" opacity="0.6" />
    </g>
    {[0, 1].map((i) => (
      <circle
        key={i}
        r="3"
        className="th-acc a-travel"
        style={travel('M42 150 C 90 150 92 96 160 90 C 228 84 230 30 278 30', i * 1.5)}
      />
    ))}
    <path
      d="M42 150 C 90 150 92 96 160 90 C 228 84 230 30 278 30"
      className="th-s-dim"
      strokeWidth="1.2"
      opacity="0.28"
      strokeDasharray="3 6"
    />
  </Frame>
)

const CrossrefServer = () => {
  const pts = [
    [70, 48],
    [250, 48],
    [70, 132],
    [250, 132],
    [58, 90],
    [262, 90],
  ] as const
  return (
    <Frame>
      {pts.map(([x, y], i) => (
        <path
          key={i}
          d={`M160 90 L${x} ${y}`}
          className="th-s-acc a-draw"
          strokeWidth="1.4"
          opacity="0.6"
          style={draw(120, i * 0.22)}
        />
      ))}
      {pts.map(([x, y], i) => (
        <g key={`n${i}`} className="a-floatsm" style={d(i * 0.35)}>
          <rect x={x - 15} y={y - 10} width="30" height="20" rx="5" className="th-acc" opacity="0.16" />
          <rect x={x - 9} y={y - 3} width="18" height="2.4" rx="1.2" className="th-acc" opacity="0.7" />
        </g>
      ))}
      <circle cx="160" cy="90" r="26" className="th-acc" opacity="0.15" />
      <circle cx="160" cy="90" r="26" className="th-s-acc" strokeWidth="1.8" />
      <text x="160" y="95" textAnchor="middle" fontSize="13" className="th-acc" style={mono} fill="currentColor">
        DOI
      </text>
    </Frame>
  )
}

const ArxivServer = () => (
  <Frame>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} className="a-float" style={d(i * 0.45)}>
        <rect
          x={62 + i * 12}
          y={104 - i * 22}
          width="130"
          height="52"
          rx="7"
          className="th-acc"
          opacity={0.1 + i * 0.05}
        />
        <rect
          x={62 + i * 12}
          y={104 - i * 22}
          width="130"
          height="52"
          rx="7"
          className="th-s-acc"
          strokeWidth="1.3"
          opacity="0.7"
        />
        <rect x={74 + i * 12} y={116 - i * 22} width={72 - i * 6} height="3.6" rx="1.8" className="th-acc" opacity="0.6" />
        <rect x={74 + i * 12} y={126 - i * 22} width={94 - i * 10} height="3" rx="1.5" className="th-dim" opacity="0.45" />
        <rect x={74 + i * 12} y={134 - i * 22} width={58 - i * 4} height="3" rx="1.5" className="th-dim" opacity="0.3" />
      </g>
    ))}
    <text x="248" y="150" textAnchor="middle" fontSize="14" className="th-acc a-pulse" style={mono} fill="currentColor">
      arXiv
    </text>
  </Frame>
)

const Gear = ({ cx, cy, r, teeth, cls }: { cx: number; cy: number; r: number; teeth: number; cls: string }) => {
  const path = Array.from({ length: teeth }, (_, i) => {
    const a = (i / teeth) * Math.PI * 2
    const x = cx + Math.cos(a) * (r + 7)
    const y = cy + Math.sin(a) * (r + 7)
    return `M${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r} L${x} ${y}`
  }).join(' ')
  return (
    <g className={cls} style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={r} className="th-s-acc" strokeWidth="2.4" />
      <circle cx={cx} cy={cy} r={r * 0.36} className="th-acc" opacity="0.35" />
      <path d={path} className="th-s-acc" strokeWidth="3.4" />
    </g>
  )
}

const CommonGoUtils = () => (
  <Frame>
    <Gear cx={116} cy={82} r={30} teeth={9} cls="a-spin" />
    <Gear cx={196} cy={116} r={20} teeth={7} cls="a-spinb" />
    <text x="248" y="52" textAnchor="middle" fontSize="13" className="th-dim a-pulse" style={mono} fill="currentColor">
      go get
    </text>
    <rect x="196" y="60" width="104" height="2.6" rx="1.3" className="th-dim" opacity="0.3" />
  </Frame>
)

const WordLists = () => (
  <Frame>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="30" y={48 + i * 24} width="86" height="14" rx="4" className="th-dim" opacity="0.16" />
        <rect x="38" y={53 + i * 24} width={44 - i * 6} height="4" rx="2" className="th-dim" opacity="0.5" />
      </g>
    ))}
    <text x="160" y="96" textAnchor="middle" fontSize="26" className="th-acc a-pulse" style={mono} fill="currentColor">
      {'{ }'}
    </text>
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        r="3"
        className="th-acc a-travel"
        style={travel('M120 60 C 146 60 146 90 160 90 C 176 90 176 60 200 60', i * 1)}
      />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <g key={`r${i}`} className="a-pop" style={d(i * 0.4)}>
        <rect x="204" y={48 + i * 24} width="86" height="14" rx="4" className="th-acc" opacity="0.14" />
        <rect x="212" y={53 + i * 24} width={54 - i * 8} height="4" rx="2" className="th-acc" opacity="0.6" />
      </g>
    ))}
  </Frame>
)



const AlgoExplorer = () => (
  <Frame>
    <path d="M46 140 H274" className="th-s-dim" strokeWidth="1.4" opacity="0.4" />
    {[36, 60, 46, 88, 70, 108].map((height, i) => (
      <g key={i} className="a-floatsm" style={d(i * 0.45)}>
        <rect x={54 + i * 36} y={140 - height} width="24" height={height} rx="4"
          className="th-acc" opacity={0.25 + i * 0.1} />
      </g>
    ))}
    <path d="M66 22 H246 M240 16 L246 22 L240 28"
      className="th-s-acc a-draw" strokeWidth="1.6" style={draw(200)} />
  </Frame>
)

const IsaExplorer = () => (
  <Frame>
    <rect x="118" y="48" width="84" height="84" rx="10"
      className="th-s-acc" strokeWidth="1.6" />
    <text x="160" y="95" textAnchor="middle" fontSize="14" className="th-acc" style={mono}>ISA</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <path d={`M92 ${60 + i * 20} H118 M202 ${60 + i * 20} H228`}
          className="th-s-dim" strokeWidth="1.4" opacity="0.5" />
        <rect x="54" y={54 + i * 20} width="34" height="12" rx="3"
          className="th-acc a-pulse" style={d(i * 0.6)} />
        <rect x="232" y={54 + i * 20} width="34" height="12" rx="3"
          className="th-acc a-pulse" style={d(i * 0.6 + 1.5)} />
      </g>
    ))}
    <path d="M140 32 V48 M160 32 V48 M180 32 V48 M140 132 V148 M160 132 V148 M180 132 V148"
      className="th-s-dim" strokeWidth="1.4" opacity="0.5" />
  </Frame>
)

/* ------------------------------------------------------------------ mapping */

const thumbs: Record<string, () => ReactNode> = {
  algo_explorer: AlgoExplorer,
  isa_explorer: IsaExplorer,
  gcc_explorer: GccExplorer,
  metamath_explorer: MetamathExplorer,
  camping_simulator: CampingSimulator,
  calendar_generator: CalendarGenerator,
  'acronyms-server': AcronymsServer,
  'words-server': WordsServer,
  audio_quality_reducer: AudioQualityReducer,
  translinguistic_voice_number_generator: VoiceNumberGenerator,
  wikipedia_sqlite: WikipediaSqlite,
  wikipedia_server: WikipediaServer,
  crossref_server: CrossrefServer,
  arxiv_server: ArxivServer,
  common_go_utils: CommonGoUtils,
  word_lists: WordLists,
}

export function Thumb({ slug }: { slug: string }) {
  const C = thumbs[slug]
  return C ? <C /> : null
}
