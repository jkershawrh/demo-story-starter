import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { demoConfig } from '../demo.config'
import '../live/demoAdapter'
import type { SceneConfig } from '../types'
import { SceneRenderer } from './SceneRenderer'

describe('SceneRenderer', () => {
  const scenes = demoConfig.acts.flatMap((act) => act.scenes)

  for (const scene of scenes) {
    it(`renders ${scene.type}: ${scene.id}`, () => {
      const { container } = render(<SceneRenderer scene={scene} brand={demoConfig.brand} />)
      expect(container.querySelector('.scene')).toBeInTheDocument()
    })
  }

  it('labels rehearsal data instead of presenting it as live', async () => {
    const scene = scenes.find((item) => item.type === 'live-proof')!
    render(<SceneRenderer scene={scene} brand={demoConfig.brand} />)
    fireEvent.click(screen.getByRole('button', { name: /run live proof/i }))
    expect(await screen.findByText('rehearsal')).toBeInTheDocument()
  })

  it('renders the statistic-grid scene', () => {
    const scene: SceneConfig = {
      id: 'coverage-stat-grid',
      type: 'stat-grid',
      beat: 'stakes',
      title: 'The stakes',
      stats: [{ value: '3×', label: 'Faster', tone: 'success' }],
    }
    render(<SceneRenderer scene={scene} brand={demoConfig.brand} />)
    expect(screen.getByText('3×')).toBeInTheDocument()
    expect(screen.getByText('Faster')).toBeInTheDocument()
  })

  it('renders the custom React scene escape hatch', () => {
    const scene: SceneConfig = {
      id: 'coverage-custom',
      type: 'custom',
      beat: 'live-proof',
      component: () => <div>Custom proof scene</div>,
    }
    render(<SceneRenderer scene={scene} brand={demoConfig.brand} />)
    expect(screen.getByText('Custom proof scene')).toBeInTheDocument()
  })
})
