export default function Contact() {
  const externalLinks = [
    { label: 'Google Scholar', href: 'https://scholar.google.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'ResearchGate', href: 'https://www.researchgate.net' },
  ]

  return (
    <div className="glass" style={{ padding: 24 }}>
      <div className="section-header">
        <div>
          <p className="section-subtitle">
            共同研究、学生の相談、登壇依頼などお気軽にどうぞ。
          </p>
          <h1 className="section-title">問い合わせ</h1>
        </div>
        <span className="badge">3日以内に返信</span>
      </div>
      <div className="info-grid" style={{ marginBottom: 16 }}>
        <div className="info-card">
          <strong>メール</strong>
          <span style={{ color: 'var(--muted)' }}>saki [at] example.com</span>
          <span style={{ color: 'var(--muted)' }}>lab [at] university.edu</span>
        </div>
        <div className="info-card">
          <strong>所在地</strong>
          <span style={{ color: 'var(--muted)' }}>
            University Lab, Tokyo / Industry Lab, Remote
          </span>
        </div>
        <div className="info-card">
          <strong>SNS / External</strong>
          <div className="chip-row">
            {externalLinks.map((link) => (
              <a key={link.label} className="chip" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <form className="contact-form">
        <div className="field">
          <label htmlFor="name">お名前</label>
          <input id="name" name="name" placeholder="お名前を入力" />
        </div>
        <div className="field">
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="field">
          <label htmlFor="topic">トピック</label>
          <select id="topic" name="topic" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option>研究コラボ</option>
            <option>学生・メンター相談</option>
            <option>登壇・イベント依頼</option>
            <option>その他</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="message">メッセージ</label>
          <textarea
            id="message"
            name="message"
            placeholder="概要や目的、希望時期、質問などをお書きください"
          />
        </div>
        <button type="submit" className="button" style={{ width: 'fit-content' }}>
          送信する
        </button>
      </form>
    </div>
  )
}
