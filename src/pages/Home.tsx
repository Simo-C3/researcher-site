import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaLinkedin,
  FaResearchgate,
  FaXTwitter,
} from 'react-icons/fa6'
import { SiGooglescholar } from 'react-icons/si'

const profile = {
  jpName: '博士 いくみ',
  enName: 'Ikumi Hakase',
  role: 'Ph.D. Candidate · Human-Centered AI',
  affiliation: '九州工業大学 情報工学府 / 情報創成工学専攻',
  focus: 'AI, HCI, 画像処理',
  email: 'ikumi [at] example.com',
  portraitUrl: 'prof-image.png',
}

const researchKeywords = ['歩容', '疾患推定', '画像認識', '人間工学']

const featuredPublications = [
  {
    title: 'Human Values via Interactive Feedback for LLMs',
    venue: 'NeurIPS 2024 (Oral)',
    summary:
      '人間の嗜好モデルと検索型の批評生成を組み合わせ、事実性と制御性を向上。',
    tags: ['Alignment', 'LLM', 'Human-in-the-loop'],
  },
  {
    title: 'Commonsense Graphs for Multimodal Reasoning',
    venue: 'ACL 2024',
    summary: '常識グラフをヒントとして与え、複雑なQAにおける幻覚を抑制。',
    tags: ['Reasoning', 'Graphs', 'Multimodal'],
  },
  {
    title: 'Trust Signals for Collaborative AI Agents',
    venue: 'CHI 2023',
    summary:
      'エージェントの意図と不確実性を可視化し、人が介入しやすいUIパターンを提案。',
    tags: ['HCI', 'Agents', 'Trust'],
  },
]

const ongoingProjects = [
  {
    title: 'Realtime Field Notes Assistant',
    description:
      '現場インタビューを端末上で要約・タグ付け。低リソース環境に最適化したLLM蒸留モデルを利用。',
    status: 'パイロット',
  },
  {
    title: 'Knowledge-Rich Agent Benchmarks',
    description:
      '検索・メモリ・スケジューリング戦略が週単位タスクの信頼性へ与える影響を測定する公開ベンチマーク。',
    status: '進行中',
  },
  {
    title: 'Safety by Design Toolkit',
    description:
      '透明性と中断性を備えたエージェントUXコンポーネント。パートナー企業3社で導入中。',
    status: 'ベータ',
  },
]

const highlights = [
  { label: '査読論文', value: '8' },
  { label: '被引用数', value: '410+' },
  { label: '共同研究', value: '3件' },
  { label: '公開データセット', value: '2' },
]

const interests = [
  'Human-centered AI (Alignment, Co-design)',
  'Multimodal reasoning with structured priors',
  'Interactive learning & preference modeling',
  'Trustworthy agent UX / transparency',
  'Evaluation for long-horizon agents',
]

const links = [
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com',
    note: '最新情報',
    icon: <FaXTwitter aria-hidden />,
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com',
    note: '論文・引用',
    icon: <SiGooglescholar aria-hidden />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    note: 'コード・デモ',
    icon: <FaGithub aria-hidden />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    note: '職歴',
    icon: <FaLinkedin aria-hidden />,
  },
  {
    label: 'ResearchGate',
    href: 'https://www.researchgate.net',
    note: '出版物',
    icon: <FaResearchgate aria-hidden />,
  },
]

const updates = [
  { title: 'NeurIPS 2024 Oral に採択 (LLM Alignment)', date: '2024-12' },
  { title: '新ベンチマーク「Agent Memory Stress Test」公開', date: '2024-10' },
  { title: 'CHI 2023 Trust Signals デモ版をOSS化', date: '2024-07' },
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-shell">
        <div className="hero-header">
          <div className="portrait-wrap">
            <img
              src={profile.portraitUrl}
              alt={`Portrait of ${profile.enName}`}
              className="portrait"
              loading="lazy"
            />
          </div>
          <h1 className="hero-name">{profile.jpName}</h1>
          <p className="hero-en">{profile.enName}</p>
          <p className="hero-role">{profile.role}</p>
          <div className="hero-meta-lines">
            <div>
              <span className="label">所属</span>
              <span>{profile.affiliation}</span>
            </div>
            <div>
              <span className="label">分野</span>
              <span>{profile.focus}</span>
            </div>
            <div>
              <span className="label">連絡</span>
              <span>{profile.email}</span>
            </div>
          </div>
          <div className="hero-links">
            {links.map((item) => (
              <a
                className="icon-link"
                key={item.label}
                href={item.href}
                title={item.label}
                target="_blank"
                rel="noreferrer"
              >
                {item.icon}
                <span className="sr-only">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="hero-body">
          <div className="hero-block">
            <div className="hero-block-title">自己紹介</div>
            <p className="hero-text">
              博士
              いくみです。人間中心AIを専門とする博士課程の学生で、AIエージェントの信頼性とユーザ体験の向上に取り組んでいます。
              インタラクティブな学習手法や設計パターンを通じて、人とAIの協働を促進することを目指しています。
            </p>
          </div>
          <div className="hero-block">
            <div className="hero-block-title">研究分野</div>
            <p className="hero-text">
              エージェントのアラインメントとトラストできるUXを研究する博士課程の学生です。長期タスクの評価やデザインパターンを実験・ユーザ調査で検証し、
              再現性の高いベンチマークと設計指針を公開しています。
            </p>
          </div>
          <div className="hero-areas">
            <span className="label">研究キーワード</span>
            <div className="chip-row">
              {researchKeywords.map((kw) => (
                <span className="chip" key={kw}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-stats-row">
            {highlights.map((item) => (
              <div className="stat-plain" key={item.label}>
                <span className="stat-value">{item.value}</span>
                <span className="stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">研究関心分野</h2>
          </div>
        </div>
        <div className="chip-row">
          {interests.map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">最近の論文・出版物</h2>
          </div>
          <Link to="/publications" className="button secondary">
            すべての論文
          </Link>
        </div>
        <div className="simple-list">
          {featuredPublications.map((pub) => (
            <article className="simple-item" key={pub.title}>
              <div className="simple-meta">{pub.venue}</div>
              <strong>{pub.title}</strong>
              <p>{pub.summary}</p>
              <div className="chip-row">
                {pub.tags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">進行中のプロジェクト</h2>
          </div>
          <Link to="/projects" className="button secondary">
            プロジェクト一覧
          </Link>
        </div>
        <div className="simple-list">
          {ongoingProjects.map((proj) => (
            <div className="simple-item" key={proj.title}>
              <div className="simple-meta">{proj.status}</div>
              <strong>{proj.title}</strong>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">リンク</h2>
          </div>
          <Link to="/contact" className="button secondary">
            連絡する
          </Link>
        </div>
        <div className="simple-list">
          {links.map((item) => (
            <a
              className="simple-item"
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{item.label}</strong>
              <p style={{ margin: 0 }}>{item.note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">最近の更新</h2>
          </div>
        </div>
        <div className="simple-list">
          {updates.map((item) => (
            <div className="simple-item" key={item.title}>
              <div className="simple-meta">{item.date}</div>
              <strong>{item.title}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
