import { motion } from 'motion/react'
import type { SceneConfig } from '../types'
import { LiveProof } from './LiveProof'
import { SceneFrame } from './SceneFrame'

const toneClass = (tone?: string) => tone ? `tone-${tone}` : ''

export function SceneRenderer({ scene, brand }: { scene: SceneConfig; brand: { primary: { logo: string; alt: string }; partner: { logo: string; alt: string } } }) {
  if (scene.type === 'custom') {
    const Custom = scene.component
    return <Custom />
  }
  if (scene.type === 'live-proof') return <LiveProof scene={scene} />

  if (scene.type === 'intro') {
    return (
      <SceneFrame scene={scene}>
        <div className="brand-lockup brand-lockup-hero">
          <img src={brand.primary.logo} alt={brand.primary.alt} />
          <span>×</span>
          <img src={brand.partner.logo} alt={brand.partner.alt} />
        </div>
        <h1>{scene.title}</h1>
        <div className="subtitle">{scene.subtitle}</div>
      </SceneFrame>
    )
  }

  if (scene.type === 'metric') {
    return <SceneFrame scene={scene}><div className={`hero-metric ${toneClass(scene.tone)}`}>{scene.value}</div><div className="hero-label">{scene.label}</div></SceneFrame>
  }

  if (scene.type === 'quote') {
    return <SceneFrame scene={scene}><blockquote>“{scene.quote}”</blockquote>{scene.attribution && <div className="quote-attribution">— {scene.attribution}</div>}</SceneFrame>
  }

  if (scene.type === 'stat-grid') {
    return <SceneFrame scene={scene}><div className="stat-grid">{scene.stats.map((stat) => <div className="stat" key={`${stat.value}-${stat.label}`}><div className={`stat-value ${toneClass(stat.tone)}`}>{stat.value}</div><div>{stat.label}</div></div>)}</div></SceneFrame>
  }

  if (scene.type === 'reframe') {
    return <SceneFrame scene={scene}><div className="reframe"><div className="reframe-before">{scene.before}</div><div className="reframe-arrow">→</div><div className="reframe-after">{scene.after}</div></div>{scene.detail && <p className="supporting">{scene.detail}</p>}</SceneFrame>
  }

  if (scene.type === 'architecture') {
    return <SceneFrame scene={scene}><div className="architecture">{scene.nodes.map((node, index) => <motion.div className={`architecture-node ${toneClass(node.tone)}`} key={node.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }}><strong>{node.label}</strong>{node.detail && <span>{node.detail}</span>}</motion.div>)}</div></SceneFrame>
  }

  if (scene.type === 'pipeline') {
    return <SceneFrame scene={scene}><div className="pipeline">{scene.steps.map((step, index) => <div className="pipeline-wrap" key={step.label}><motion.div className="pipeline-step" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.14 }}><span>{index + 1}</span><strong>{step.label}</strong>{step.detail && <small>{step.detail}</small>}</motion.div>{index < scene.steps.length - 1 && <div className="connector">→</div>}</div>)}</div></SceneFrame>
  }

  if (scene.type === 'comparison') {
    return <SceneFrame scene={scene}><div className="comparison-grid">{scene.columns.map((column) => <div className={`comparison-card ${toneClass(column.tone)}`} key={column.label}><div className="metric-label">{column.label}</div><div className="comparison-value">{column.value}</div>{column.detail && <p>{column.detail}</p>}</div>)}</div></SceneFrame>
  }

  if (scene.type === 'scale') {
    return <SceneFrame scene={scene}><div className="scale-track">{scene.stages.map((stage, index) => <motion.div className="scale-stage" key={stage.label} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.14 }}><div><strong>{stage.label}</strong><span>{stage.detail}</span></div><b>{stage.value}</b></motion.div>)}</div></SceneFrame>
  }

  if (scene.type === 'tradeoff') {
    return <SceneFrame scene={scene}><div className="tradeoff-grid">{scene.options.map((option) => <div className="tradeoff-card" key={option.title}><h2>{option.title}</h2><p className="strength">{option.strength}</p><p>{option.tradeoff}</p></div>)}</div><div className="decision">{scene.decision}</div></SceneFrame>
  }

  return <SceneFrame scene={scene}><div className="punchline"><div>{scene.line1}</div><strong>{scene.line2}</strong>{scene.cta && <span>{scene.cta}</span>}</div></SceneFrame>
}
