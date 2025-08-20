import { useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export default function Features() {
  const [prompt, setPrompt] = useState('Lighthouse on a cliff overlooking the ocean')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [stylePreset, setStylePreset] = useState('digital-art')
  const [outputFormat, setOutputFormat] = useState('png')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [seed, setSeed] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onGenerate = async () => {
    setLoading(true)
    setError('')
    setImageUrl('')

    try {
      const res = await axios.post(`${API_BASE}/api/images/generate`, {
        prompt,
        aspectRatio: aspectRatio || undefined,
        stylePreset: stylePreset || undefined,
        outputFormat: outputFormat || 'png',
        negativePrompt: negativePrompt || undefined,
        seed: seed ? Number(seed) : undefined
      })

      const { format, image } = res.data
      const dataUrl = `data:image/${format};base64,${image}`
      setImageUrl(dataUrl)
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to generate image')
    } finally {
      setLoading(false)
    }
  }

  const canDownload = Boolean(imageUrl)

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Stable Image Core – Demo</h1>
      <p>Generate images via Spring Boot + Feign + Stability API</p>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
        <label>
          <div>Prompt</div>
          <textarea
            rows={4}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            style={{ width: '100%' }}
          />
        </label>

        <div style={{ display: 'grid', gap: 12 }}>
          <label>
            <div>Aspect Ratio</div>
            <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)}>
              {['1:1', '16:9', '9:16', '3:2', '2:3', '4:5', '5:4', '21:9', '9:21'].map(ar => (
                <option key={ar} value={ar}>{ar}</option>
              ))}
            </select>
          </label>

          <label>
            <div>Style Preset</div>
            <select value={stylePreset} onChange={e => setStylePreset(e.target.value)}>
              {[
                'digital-art', 'photographic', 'cinematic', 'anime', 'comic-book', 'fantasy-art',
                'low-poly', 'pixel-art', 'line-art', '3d-model', 'isometric', 'analog-film',
                'origami', 'neon-punk', 'tile-texture', 'enhance', 'modeling-compound'
              ].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label>
            <div>Output Format</div>
            <select value={outputFormat} onChange={e => setOutputFormat(e.target.value)}>
              {['png', 'jpeg', 'webp'].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>

          <label>
            <div>Negative Prompt (optional)</div>
            <input value={negativePrompt} onChange={e => setNegativePrompt(e.target.value)} />
          </label>

          <label>
            <div>Seed (optional)</div>
            <input type="number" value={seed} onChange={e => setSeed(e.target.value)} />
          </label>

          <button onClick={onGenerate} disabled={loading}>
            {loading ? 'Generating…' : 'Generate Image'}
          </button>
        </div>
      </div>

      {error && <div style={{ marginTop: 16, color: 'crimson' }}>{error}</div>}

      {imageUrl && (
        <div style={{ marginTop: 24 }}>
          <img
            src={imageUrl}
            alt="Generated"
            style={{ maxWidth: '100%', borderRadius: 12, boxShadow: '0 4px 14px rgba(0,0,0,.15)' }}
          />
          <div style={{ marginTop: 8 }}>
            <a href={imageUrl} download={`stable-image.${outputFormat}`}>Download</a>
          </div>
        </div>
      )}
    </div>
  )
}
