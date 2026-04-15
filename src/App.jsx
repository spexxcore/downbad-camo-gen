import { useState } from 'react'

const CAMOS = [
  {
    id: 'dpm', name: 'British DPM', tag: 'DISRUPTIVE PATTERN',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in British DPM camouflage pattern dark green brown black khaki irregular shapes, white stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, British DPM disruptive pattern material, irregular organic blobs dark forest green deep brown black tan khaki, tightly packed pattern fills entire frame edge to edge, flat lay fabric texture overhead view, no background, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'flecktarn', name: 'Flecktarn', tag: 'BUNDESWEHR SPOTS',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in German Flecktarn camouflage small irregular spots dark olive green moss green reddish brown black tan, white stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, German Flecktarn pattern, small irregular dots and spots dark olive green moss green reddish brown black tan on light olive base, densely packed spots fill entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'm81', name: 'M81 Woodland', tag: 'US MILITARY BDU',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in US M81 Woodland camouflage large irregular blobs medium green dark green brown black, white stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, US M81 Woodland pattern, large irregular blobs medium green dark green earth brown black, fills entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'multicam', name: 'MultiCam OCP', tag: 'US ARMY CURRENT',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in MultiCam OCP camouflage muted olive green tan beige dark brown blended organic shapes, white stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, MultiCam OCP pattern, muted olive green tan beige dark brown blended gradient organic shapes, fills entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'marpat', name: 'MARPAT Digital', tag: 'US MARINE CORPS',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in MARPAT woodland digital camouflage small pixel blocks dark green coyote brown black medium green, white stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, MARPAT woodland digital pattern, small rectangular pixel blocks dark green coyote brown black on medium green base, fills entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'strichtarn', name: 'Strichtarn', tag: 'WARSAW PACT RAIN',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in Strichtarn East German rain camouflage vertical thin dark streaks olive green grey-green lines, white stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, Strichtarn East German rain camo pattern, vertical thin dark streaks and lines olive green dark green grey-green on medium olive base, fills entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'partizan', name: 'Partizan', tag: 'SOVIET BRUSHSTROKE',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in Soviet Partizan camouflage large brushstroke blobs dark olive green very dark green deep forest green, white stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, Soviet Partizan brushstroke pattern, large bold brushstroke blobs dark olive deep green forest green black green no orange, fills entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'ghost', name: 'Dark Ghost', tag: 'BLACKOUT OPS',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in near-black ghost camouflage extremely dark barely visible shadow shapes on black base, light grey stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, near-black ghost camouflage pattern, extremely dark olive black barely visible shadow blobs on near-black base, very subtle low-contrast shapes, fills entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'urban', name: 'Slate Urban', tag: 'CITY CONCRETE',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in dark urban slate camouflage charcoal grey black medium grey irregular polygon shapes, white stripe down each arm and each leg, black boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, dark urban slate camouflage pattern, charcoal grey black medium grey irregular polygon shapes concrete city tones, fills entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
  {
    id: 'deepblue', name: 'Deep Blue Digital', tag: 'NAVAL DIGITAL',
    figurePrompt: 'single military soldier full body standing upright front view, wearing tracksuit joggers and zip jacket covered in deep navy blue digital camouflage dark navy teal near-black pixelated blocks, light blue stripe down each arm and each leg, dark boots, isolated on solid pure black background, full figure head to feet visible, photorealistic, high detail clothing texture, no cropping',
    patternPrompt: 'seamless camouflage fabric swatch square, deep navy blue digital camouflage pattern, dark navy dark teal near-black pixelated rectangular blocks, fills entire frame edge to edge, flat lay fabric overhead view, photorealistic textile detail, 4 inches square',
  },
]

function buildUrl(prompt, mode) {
  const seed = Math.floor(Math.random() * 999999)
  const encoded = encodeURIComponent(prompt)
  const w = mode === 'pattern' ? 512 : 400
  const h = mode === 'pattern' ? 512 : 720
  return `https://image.pollinations.ai/prompt/${encoded}?width=${w}&height=${h}&seed=${seed}&nologo=true&enhance=true&model=flux`
}

function IconBtn({ onClick, title, children, href, download, target, rel, isLink }) {
  const base = {
    background: 'none', border: '1px solid #1e1e1e', color: '#444',
    width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', transition: 'all 0.15s', flexShrink: 0, cursor: 'pointer', fontFamily: 'inherit',
  }
  const hov = e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#fff' }
  const lev = e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#444' }
  if (isLink) return <a href={href} download={download} target={target} rel={rel} onClick={onClick} title={title} style={base} onMouseEnter={hov} onMouseLeave={lev}>{children}</a>
  return <button onClick={onClick} title={title} style={base} onMouseEnter={hov} onMouseLeave={lev}>{children}</button>
}

function CamoCard({ camo, mode, autoFire }) {
  const [state, setState] = useState('idle')
  const [imgUrl, setImgUrl] = useState(null)
  const [fired, setFired] = useState(false)
  const [prevMode, setPrevMode] = useState(mode)

  // Reset when mode changes
  if (mode !== prevMode) {
    setPrevMode(mode)
    setState('idle')
    setImgUrl(null)
    setFired(false)
  }

  if (autoFire && !fired && state === 'idle') {
    setFired(true)
    setTimeout(() => run(), 0)
  }

  async function run() {
    if (state === 'loading') return
    setState('loading')
    setImgUrl(null)
    const prompt = mode === 'pattern' ? camo.patternPrompt : camo.figurePrompt
    const url = buildUrl(prompt, mode)
    try {
      await new Promise((res, rej) => {
        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        img.onload = res
        img.onerror = rej
        img.src = url
      })
      setImgUrl(url)
      setState('done')
    } catch {
      setState('error')
    }
  }

  function handleClick() {
    if (state === 'loading' || state === 'done') return
    run()
  }

  function handleRegen(e) {
    e.stopPropagation()
    setState('idle')
    setImgUrl(null)
    setFired(false)
    setTimeout(run, 50)
  }

  const isPattern = mode === 'pattern'

  return (
    <div
      onClick={handleClick}
      style={{
        background: '#0c0c0c',
        border: '1px solid #161616',
        cursor: state === 'loading' || state === 'done' ? 'default' : 'pointer',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => { if (state !== 'loading') e.currentTarget.style.borderColor = '#2a2a2a' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#161616' }}
    >
      {/* Image area */}
      <div style={{
        position: 'relative',
        aspectRatio: isPattern ? '1 / 1' : '4 / 7',
        background: '#080808',
        overflow: 'hidden',
      }}>
        {state === 'done' && imgUrl && (
          <img
            src={imgUrl}
            alt={camo.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'fadeIn 0.4s ease' }}
          />
        )}

        {state === 'loading' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 7 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#2a2a2a', animation: `pulse 1.4s ease-in-out ${i*0.18}s infinite` }} />
              ))}
            </div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 10, color: '#333', letterSpacing: '0.14em' }}>
              GENERATING
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg,transparent,#2a2a2a,transparent)',
              backgroundSize: '200% 100%', animation: 'shimmer 1.6s linear infinite',
            }} />
          </div>
        )}

        {(state === 'idle' || state === 'error') && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 44, border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {state === 'error'
                  ? <><path d="M7 3v5M7 10v1" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round"/><circle cx="7" cy="7" r="6" stroke="#1e1e1e"/></>
                  : <path d="M7 1v12M1 7h12" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round"/>
                }
              </svg>
            </div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 9, color: '#252525', letterSpacing: '0.14em' }}>
              {state === 'error' ? 'FAILED · RETRY' : 'CLICK TO GENERATE'}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '9px 11px', borderTop: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#080808', minHeight: 50 }}>
        <div>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.07em', color: '#ccc', lineHeight: 1.1 }}>
            {camo.name.toUpperCase()}
          </div>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, color: '#2e2e2e', letterSpacing: '0.14em', marginTop: 3 }}>
            {camo.tag}
          </div>
        </div>
        {state === 'done' && (
          <div style={{ display: 'flex', gap: 5 }}>
            <IconBtn onClick={handleRegen} title="Regenerate">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M10 6A4 4 0 112 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M10 3v3H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconBtn>
            <IconBtn isLink href={imgUrl} download={`downbad-${camo.id}-${mode}.jpg`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} title="Download">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v6M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconBtn>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [mode, setMode] = useState('figure')  // 'figure' | 'pattern'
  const [genTick, setGenTick] = useState({})
  const [allLoading, setAllLoading] = useState(false)

  function handleGenerateAll() {
    if (allLoading) return
    setAllLoading(true)
    CAMOS.forEach((c, i) => {
      setTimeout(() => {
        setGenTick(prev => ({ ...prev, [`${c.id}_${mode}`]: (prev[`${c.id}_${mode}`] || 0) + 1 }))
      }, i * 700)
    })
    setTimeout(() => setAllLoading(false), CAMOS.length * 700 + 1000)
  }

  function switchMode(m) {
    if (m === mode) return
    setMode(m)
    setGenTick({})
  }

  const cols = mode === 'pattern'
    ? 'repeat(auto-fill, minmax(220px, 1fr))'
    : 'repeat(auto-fill, minmax(180px, 1fr))'

  return (
    <div style={{ minHeight: '100vh', background: '#060606' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid #111', padding: '24px 24px 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 10, color: '#2e2e2e', letterSpacing: '0.24em', marginBottom: 5 }}>
            DOWNBAD DAYZ NETWORK
          </div>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 44, letterSpacing: '0.1em', color: '#fff', lineHeight: 1 }}>
            CAMO GENERATOR
          </h1>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 10, color: '#222', letterSpacing: '0.2em', marginTop: 5 }}>
            TRACKSUIT RETEXTURES · AI POWERED
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Mode toggle */}
          <div style={{ display: 'flex', border: '1px solid #1e1e1e', overflow: 'hidden' }}>
            {['figure', 'pattern'].map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                style={{
                  background: mode === m ? '#1a1a1a' : 'transparent',
                  border: 'none',
                  borderRight: m === 'figure' ? '1px solid #1e1e1e' : 'none',
                  color: mode === m ? '#fff' : '#444',
                  padding: '8px 16px',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700, fontSize: 11, letterSpacing: '0.14em',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (mode !== m) e.currentTarget.style.color = '#888' }}
                onMouseLeave={e => { if (mode !== m) e.currentTarget.style.color = '#444' }}
              >
                {m === 'figure' ? 'FIGURE' : '4×4 PATTERN'}
              </button>
            ))}
          </div>

          {/* Generate all */}
          <button
            onClick={handleGenerateAll}
            disabled={allLoading}
            style={{
              background: 'transparent', border: `1px solid ${allLoading ? '#1a1a1a' : '#2a2a2a'}`,
              color: allLoading ? '#333' : '#777', padding: '8px 20px',
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: 11, letterSpacing: '0.16em', cursor: allLoading ? 'default' : 'pointer',
              transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={e => { if (!allLoading) { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#fff' }}}
            onMouseLeave={e => { if (!allLoading) { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#777' }}}
          >
            {allLoading ? (
              <>{[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#333', animation: `pulse 1.2s ease ${i*0.2}s infinite` }}/>)}&nbsp;GENERATING ALL</>
            ) : (
              <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> GENERATE ALL</>
            )}
          </button>
        </div>
      </header>

      {/* Mode label */}
      <div style={{ padding: '10px 24px', borderBottom: '1px solid #0e0e0e', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#2a2a2a' }} />
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 10, color: '#2a2a2a', letterSpacing: '0.18em' }}>
          {mode === 'figure' ? 'TRACKSUIT FIGURE — FRONT VIEW FULL BODY' : '4×4 INCH SEAMLESS PATTERN TILE — SQUARE FORMAT'}
        </span>
      </div>

      {/* Grid */}
      <main style={{ display: 'grid', gridTemplateColumns: cols, gap: 1, padding: 1 }}>
        {CAMOS.map(camo => (
          <CamoCard
            key={`${camo.id}_${mode}`}
            camo={camo}
            mode={mode}
            autoFire={!!(genTick[`${camo.id}_${mode}`])}
          />
        ))}
      </main>

      <footer style={{ padding: '24px', textAlign: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, color: '#1a1a1a', letterSpacing: '0.2em' }}>
        DOWNBAD CAMO SELECTIONS · POLLINATIONS.AI · FREE
      </footer>
    </div>
  )
}
