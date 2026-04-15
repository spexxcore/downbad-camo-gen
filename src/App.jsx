import { useState, useCallback } from 'react'

const CAMOS = [
  {
    id: 'dpm', name: 'British DPM', tag: 'DISRUPTIVE PATTERN',
    prompt: 'full body military tracksuit outfit, British DPM camouflage pattern disruptive pattern material, irregular dark green brown black tan blobs on khaki base, white stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'flecktarn', name: 'Flecktarn', tag: 'BUNDESWEHR SPOTS',
    prompt: 'full body military tracksuit outfit, German Flecktarn camouflage, small irregular spots dark olive green moss green reddish brown black tan on light olive base, white stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'm81', name: 'M81 Woodland', tag: 'US MILITARY BDU',
    prompt: 'full body military tracksuit outfit, US M81 Woodland camouflage, large irregular blobs medium green dark green brown black, white stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'multicam', name: 'MultiCam OCP', tag: 'US ARMY CURRENT',
    prompt: 'full body military tracksuit outfit, MultiCam OCP camouflage, muted olive green tan beige dark brown blended organic shapes, white stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'marpat', name: 'MARPAT Digital', tag: 'US MARINE CORPS',
    prompt: 'full body military tracksuit outfit, MARPAT woodland digital camouflage, small pixel blocks dark green coyote brown black on medium green base, white stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'strichtarn', name: 'Strichtarn', tag: 'WARSAW PACT RAIN',
    prompt: 'full body military tracksuit outfit, Strichtarn East German rain camouflage, vertical thin dark streaks olive green grey-green lines on medium olive base, white stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'partizan', name: 'Partizan', tag: 'SOVIET BRUSHSTROKE',
    prompt: 'full body military tracksuit outfit, Soviet Partizan camouflage, large brushstroke blobs dark olive green very dark green deep forest green, white stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'ghost', name: 'Dark Ghost', tag: 'BLACKOUT OPS',
    prompt: 'full body military tracksuit outfit, near-black ghost camouflage, extremely dark olive black barely visible shapes on near black base, light grey stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'urban', name: 'Slate Urban', tag: 'CITY CONCRETE',
    prompt: 'full body military tracksuit outfit, dark urban slate camouflage, charcoal grey black medium grey irregular shapes city concrete tones, white stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, black sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
  {
    id: 'deepblue', name: 'Deep Blue Digital', tag: 'NAVAL DIGITAL',
    prompt: 'full body military tracksuit outfit, deep navy blue digital camouflage, dark navy dark teal near-black pixelated rectangular blocks, light blue stripes down both arms and both legs, jogger tracksuit pants, zip-up tracksuit jacket, dark navy sneakers, pure black background, front-facing standing pose, full body head to toe, photorealistic detailed fabric texture, game character reference sheet style',
  },
]

function buildUrl(prompt) {
  const seed = Math.floor(Math.random() * 999999)
  const encoded = encodeURIComponent(prompt)
  return `https://image.pollinations.ai/prompt/${encoded}?width=512&height=896&seed=${seed}&nologo=true&enhance=true&model=flux`
}

function IconBtn({ onClick, title, children, as: Tag = 'button', href, download, target, rel }) {
  const style = {
    background: 'none', border: '1px solid #1e1e1e', color: '#444',
    width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', transition: 'all 0.15s', flexShrink: 0, cursor: 'pointer',
    fontFamily: 'inherit',
  }
  const hover = e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#fff' }
  const leave = e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#444' }

  if (Tag === 'a') {
    return <a href={href} download={download} target={target} rel={rel} onClick={onClick} title={title} style={style} onMouseEnter={hover} onMouseLeave={leave}>{children}</a>
  }
  return <button onClick={onClick} title={title} style={style} onMouseEnter={hover} onMouseLeave={leave}>{children}</button>
}

function CamoCard({ camo, autoTrigger }) {
  const [state, setState] = useState('idle')
  const [imgUrl, setImgUrl] = useState(null)
  const [triggered, setTriggered] = useState(false)

  if (autoTrigger && !triggered) {
    setTriggered(true)
    setTimeout(() => generate(), 0)
  }

  async function generate() {
    if (state === 'loading') return
    setState('loading')
    setImgUrl(null)
    const url = buildUrl(camo.prompt)
    try {
      await new Promise((resolve, reject) => {
        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        img.onload = resolve
        img.onerror = reject
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
    generate()
  }

  function handleRegen(e) {
    e.stopPropagation()
    setState('idle')
    setImgUrl(null)
    setTimeout(generate, 50)
  }

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
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '4/7', background: '#080808', overflow: 'hidden' }}>
        {state === 'done' && imgUrl && (
          <img src={imgUrl} alt={camo.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'fadeIn 0.4s ease' }} />
        )}

        {state === 'loading' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 7 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#2a2a2a', animation: `pulse 1.4s ease-in-out ${i*0.18}s infinite` }}/>
              ))}
            </div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 10, color: '#333', letterSpacing: '0.14em' }}>
              GENERATING
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg,transparent,#2a2a2a,transparent)',
              backgroundSize: '200% 100%', animation: 'shimmer 1.6s linear infinite',
            }}/>
          </div>
        )}

        {(state === 'idle' || state === 'error') && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 44, border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={state === 'error' ? 'M7 3v5M7 10v1' : 'M7 1v12M1 7h12'} stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round"/>
                {state === 'error' && <circle cx="7" cy="7" r="6" stroke="#1e1e1e"/>}
              </svg>
            </div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 9, color: '#252525', letterSpacing: '0.14em' }}>
              {state === 'error' ? 'FAILED · RETRY' : 'CLICK TO GENERATE'}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '9px 11px', borderTop: '1px solid #121212', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a', minHeight: 50 }}>
        <div>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.07em', color: '#ddd', lineHeight: 1.1 }}>
            {camo.name.toUpperCase()}
          </div>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, color: '#333', letterSpacing: '0.14em', marginTop: 3 }}>
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
            <IconBtn as="a" href={imgUrl} download={`downbad-${camo.id}.jpg`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} title="Download">
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
  const [genTick, setGenTick] = useState({})
  const [allLoading, setAllLoading] = useState(false)

  function handleGenerateAll() {
    if (allLoading) return
    setAllLoading(true)
    const ticks = {}
    CAMOS.forEach((c, i) => {
      setTimeout(() => {
        setGenTick(prev => ({ ...prev, [c.id]: (prev[c.id] || 0) + 1 }))
      }, i * 650)
    })
    setTimeout(() => setAllLoading(false), CAMOS.length * 650 + 500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060606' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #111', padding: '28px 28px 22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 10, color: '#333', letterSpacing: '0.24em', marginBottom: 6 }}>
            DOWNBAD DAYZ NETWORK
          </div>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 48, letterSpacing: '0.1em', color: '#fff', lineHeight: 1 }}>
            CAMO GENERATOR
          </h1>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 10, color: '#2a2a2a', letterSpacing: '0.2em', marginTop: 5 }}>
            TRACKSUIT RETEXTURES · AI POWERED
          </div>
        </div>
        <button
          onClick={handleGenerateAll}
          disabled={allLoading}
          style={{
            background: 'transparent', border: `1px solid ${allLoading ? '#1e1e1e' : '#2a2a2a'}`,
            color: allLoading ? '#333' : '#888', padding: '9px 22px',
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 12,
            letterSpacing: '0.16em', cursor: allLoading ? 'default' : 'pointer', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: 9,
          }}
          onMouseEnter={e => { if (!allLoading) { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#fff' }}}
          onMouseLeave={e => { if (!allLoading) { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888' }}}
        >
          {allLoading ? (
            <>{[0,1,2].map(i => <div key={i} style={{ width:4, height:4, borderRadius:'50%', background:'#333', animation:`pulse 1.2s ease ${i*0.2}s infinite`}}/>)} GENERATING ALL</>
          ) : (
            <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> GENERATE ALL</>
          )}
        </button>
      </header>

      {/* Grid */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 1, padding: 1 }}>
        {CAMOS.map((camo, i) => (
          <CamoCard
            key={camo.id}
            camo={camo}
            autoTrigger={genTick[camo.id] > 0}
          />
        ))}
      </main>

      <footer style={{ padding: '28px', textAlign: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, color: '#1e1e1e', letterSpacing: '0.2em' }}>
        DOWNBAD CAMO SELECTIONS · POLLINATIONS.AI · FREE
      </footer>
    </div>
  )
}
