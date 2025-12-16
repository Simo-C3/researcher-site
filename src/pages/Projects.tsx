const projects = [
  {
    name: 'Realtime Field Notes Assistant',
    status: 'パイロット',
    description:
      'オンデバイスLLMで現場インタビューを要約・タグ付け。低リソース環境向け蒸留モデルと音声前処理を統合。',
    impact: 'インタビュー後の整理時間を42%削減。',
    stack: ['LLM distillation', 'On-device ASR', 'React Native'],
  },
  {
    name: 'Knowledge-Rich Agent Benchmarks',
    status: '進行中',
    description:
      '検索・メモリ・スケジューリング戦略の差分を週単位のロングホライズンタスクで測定する公開ベンチマーク。',
    impact: '再現可能な評価のためのオープンベンチマークとリーダーボード。',
    stack: ['Retrieval', 'Vector DB', 'Agent orchestration'],
  },
  {
    name: 'Safety by Design Toolkit',
    status: 'ベータ',
    description:
      '中断・透明性・説明を備えたエージェントUIコンポーネント。リスクカードと安全インタースティシャルを提供。',
    impact: '3つのパートナーが責任あるエージェントUIを出荷する際に採用。',
    stack: ['Design system', 'TypeScript', 'Storybook'],
  },
  {
    name: 'Commonsense Graph Interface',
    status: '完了',
    description:
      '常識グラフを編集・可視化し、マルチモーダルQAへヒントとして渡すWeb UIとAPI。',
    impact: 'マルチホップQAの幻覚を18%削減。',
    stack: ['Graph database', 'Next.js', 'd3.js'],
  },
]

export default function Projects() {
  return (
    <div className="glass" style={{ padding: 24 }}>
      <div className="section-header">
        <div>
          <p className="section-subtitle">手を動かし、可能な限りオープンに。</p>
          <h1 className="section-title">プロジェクト</h1>
        </div>
        <span className="badge">継続＋アーカイブ</span>
      </div>
      <div className="card-grid">
        {projects.map((project) => (
          <article className="card" key={project.name}>
            <div className="badge">{project.status}</div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="meta">
              <span className="tag">Impact</span>
              <span className="tag">{project.impact}</span>
              {project.stack && (
                <span className="tag">Stack: {project.stack.join(', ')}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
