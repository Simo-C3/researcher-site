import { useEffect, useState } from 'react'

type OrcidNormalized = {
  name?: string
  affiliation?: string
  biography?: string
  keywords?: string[]
  fetchedAt?: string
  links?: { label: string; url: string }[]
}

type WorkItem = {
  title: string
  venue?: string
  year?: string
  type?: string
  url?: string
  doi?: string
  putCode?: number
}

type NormalizedWorks = {
  journal: WorkItem[]
  conference: WorkItem[]
  preprints: WorkItem[]
  others: WorkItem[]
}

const MAX_PER_SECTION = 6

const cv = {
  basicInfo: {
    nameJa: '博士 いくみ',
    nameEn: 'Ikumi Hakase',
    role: 'Ph.D. Candidate · Human-Centered AI',
    affiliation: '九州工業大学 情報工学府 / 情報創成工学専攻',
    location: 'Fukuoka, Japan',
    contact: 'ikumi [at] example.com',
    orcid: '0000-0003-1977-4690',
    website: 'https://example.com',
  },
  summary:
    '歩容解析と3Dヒューマンポーズ推定を軸に、グラフニューラルネットワークやスマートチェアを用いた人間工学的計測を研究。高齢者ケアや職場の安全性向上を目的に、センシングから推定・可視化まで一貫した手法を開発。',
  researchInterests: [
    'Computer Vision',
    '3D Human Pose Estimation',
    'Graph Neural Networks',
    'Smart Chair Systems',
  ],
  education: [
    {
      years: '2023–Present',
      degree: 'Ph.D. in Computer Science',
      org: 'Kyushu Institute of Technology (Kyutech)',
      detail: 'Thesis: Graph-based gait analysis for ergonomic monitoring.',
    },
    {
      years: '2019–2023',
      degree: 'B.S. in Engineering',
      org: 'Kyushu Institute of Technology',
      detail: 'Graduated with distinction; focus on CV and HCI.',
    },
  ],
  employment: [
    {
      years: '2024–Present',
      role: 'Research Assistant',
      org: 'Human-Centered AI Lab, Kyutech',
      detail: 'Wearable/ambient sensing, graph learning for gait estimation.',
    },
    {
      years: '2023–2024',
      role: 'Research Intern (CV/ML)',
      org: 'Smart Mobility Lab, Fukuoka',
      detail: 'Pose estimation for in-cabin safety and ergonomics.',
    },
  ],
  publications: {
    selected: [
      {
        title: 'Self-Supervised 3D Pose from Wearables',
        venue: 'CVPR 2024 (Oral)',
        links: [
          { label: 'PDF', url: '#' },
          { label: 'arXiv', url: '#' },
          { label: 'DOI', url: '#' },
        ],
      },
      {
        title: 'Spatio-Temporal GNNs for Multi-view Gait Analysis',
        venue: 'IEEE T-PAMI 2024',
        links: [
          { label: 'PDF', url: '#' },
          { label: 'DOI', url: '#' },
        ],
      },
    ],
    journal: [
      {
        title: 'Multi-view gait analysis with spatio-temporal GNNs',
        venue: 'IEEE T-PAMI 2024',
        links: [{ label: 'DOI', url: '#' }],
      },
      {
        title: 'Pose-aware fall-risk estimation for elderly care',
        venue: 'CVIU 2023',
        links: [{ label: 'DOI', url: '#' }],
      },
    ],
    conference: [
      {
        title: 'Self-supervised 3D human pose estimation',
        venue: 'CVPR 2024',
        links: [
          { label: 'arXiv', url: '#' },
          { label: 'Code', url: '#' },
        ],
      },
      {
        title: 'Smart chair sensing for ergonomic feedback',
        venue: 'IROS 2023 (Best Demo)',
        links: [{ label: 'PDF', url: '#' }],
      },
    ],
    preprints: [
      {
        title: 'Graph fusion for clinical gait assessment',
        venue: 'arXiv:2401.12345',
        links: [{ label: 'arXiv', url: '#' }],
      },
    ],
  },
  grants: [
    '科研費 若手研究: グラフ学習を用いた歩容計測 (2024–2026)',
    '企業共同研究: スマートチェア開発と姿勢推定 (2023–2024)',
  ],
  awards: [
    'CVPR 2024 Honorable Mention',
    'IROS 2023 Best Demo Award',
    "Dean's Award, Kyutech (2023)",
  ],
  talks: [
    'CVPR 2024 Oral: Self-supervised 3D Pose from Wearables',
    'IROS 2023 Demo: Smart Chair Ergonomic Feedback',
    'Kyutech Invited Talk 2024: Human-Centered Sensing for Care',
  ],
  teaching: [
    'TA: Computer Vision (2024 Spring)',
    'Guest Lecture: Graph Neural Networks for Sensing (2023)',
  ],
  service: [
    'Reviewer: CVPR, ICCV, ICRA, IEEE T-CSVT',
    'Program Committee: WACV Workshop on Human Sensing (2024)',
  ],
  links: [
    { label: 'ORCID', url: 'https://orcid.org/0000-0002-1234-5678' },
    { label: 'Google Scholar', url: 'https://scholar.google.com' },
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com' },
    { label: 'ResearchGate', url: 'https://www.researchgate.net' },
  ],
  lastUpdated: '2025-01-10',
}

const toc = [
  { href: '#summary', label: '概要' },
  { href: '#education', label: 'Education' },
  { href: '#employment', label: 'Employment' },
  { href: '#publications', label: 'Publications' },
  { href: '#grants', label: 'Grants' },
  { href: '#awards', label: 'Awards' },
  { href: '#talks', label: 'Talks' },
  { href: '#teaching', label: 'Teaching' },
  { href: '#service', label: 'Service' },
  { href: '#links', label: 'Links' },
]

export default function CV() {
  const [orcidData, setOrcidData] = useState<OrcidNormalized | null>(null)
  const [orcidStatus, setOrcidStatus] = useState<
    'idle' | 'loading' | 'ok' | 'error'
  >('idle')
  const [worksData, setWorksData] = useState<NormalizedWorks | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchOrcid = async () => {
      try {
        setOrcidStatus('loading')
        const headers = { Accept: 'application/json' }
        const base = `https://pub.orcid.org/v3.0/${cv.basicInfo.orcid}`
        const [personRes, empRes, urlRes, worksRes] = await Promise.all([
          fetch(`${base}/person`, { headers, signal: controller.signal }),
          fetch(`${base}/employments`, { headers, signal: controller.signal }),
          fetch(`${base}/researcher-urls`, {
            headers,
            signal: controller.signal,
          }),
          fetch(`${base}/works`, { headers, signal: controller.signal }),
        ])
        if (!personRes.ok)
          throw new Error(`ORCID person failed: ${personRes.status}`)
        const person = (await personRes.json()) as any
        const employments = empRes.ok ? ((await empRes.json()) as any) : null
        const urls = urlRes.ok ? ((await urlRes.json()) as any) : null

        const norm: OrcidNormalized = {
          name:
            person?.name?.['credit-name']?.value ??
            [
              person?.name?.['given-names']?.value,
              person?.name?.['family-name']?.value,
            ]
              .filter(Boolean)
              .join(' '),
          affiliation:
            employments?.['employment-summary']?.[0]?.organization?.name ??
            cv.basicInfo.affiliation,
          biography: person?.biography?.content ?? cv.summary,
          keywords: person?.keywords?.keyword
            ?.map((k: any) => k?.content)
            .filter(Boolean),
          fetchedAt: new Date().toISOString(),
          links:
            urls?.['researcher-url']?.map((u: any) => ({
              label: u?.['url-name'] ?? 'Link',
              url: u?.url?.value ?? '#',
            })) ?? cv.links,
        }
        setOrcidData(norm)
        if (worksRes.ok) {
          const worksJson = (await worksRes.json()) as any
          const summaries =
            worksJson?.group
              ?.flatMap((g: any) => g?.['work-summary'] ?? [])
              ?.filter(Boolean) ?? []
          const items: WorkItem[] = summaries.map((w: any) => {
            const doi =
              w?.['external-ids']?.['external-id']?.find(
                (e: any) =>
                  e?.['external-id-type']?.toLowerCase() === 'doi' &&
                  e?.['external-id-value']
              )?.['external-id-value'] ?? undefined
            return {
              title: w?.title?.title?.value ?? 'Untitled work',
              venue: w?.['journal-title']?.value,
              year: w?.['publication-date']?.year?.value,
              type: w?.type,
              url: w?.url?.value,
              doi,
              putCode: w?.['put-code'],
            }
          })
          const toList = (f: (t?: string) => boolean) =>
            items.filter((i) => f(i.type?.toLowerCase()))
          const journal = toList((t) => t === 'journal-article')
          const conference = toList((t) => t === 'conference-paper')
          const preprints = toList((t) => t === 'preprint')
          const used = new Set([
            ...journal.map((i) => i.putCode),
            ...conference.map((i) => i.putCode),
            ...preprints.map((i) => i.putCode),
          ])
          const others = items.filter((i) => !used.has(i.putCode))
          setWorksData({ journal, conference, preprints, others })
        }
        setOrcidStatus('ok')
      } catch (err) {
        if (controller.signal.aborted) return
        setOrcidStatus('error')
      }
    }
    fetchOrcid()
    return () => controller.abort()
  }, [])

  const summaryText = orcidData?.biography ?? cv.summary
  const interests = orcidData?.keywords?.length
    ? orcidData.keywords
    : cv.researchInterests
  const affiliation = orcidData?.affiliation ?? cv.basicInfo.affiliation
  const journalPubs = worksData?.journal?.length
    ? worksData.journal
    : cv.publications.journal
  const confPubs = worksData?.conference?.length
    ? worksData.conference
    : cv.publications.conference
  const preprintPubs = worksData?.preprints?.length
    ? worksData.preprints
    : cv.publications.preprints
  const othersPubs = worksData?.others ?? []

  const normalizeVenue = (item: any) => {
    const venue = (item as WorkItem).venue ?? (item as any).venue
    const year = (item as WorkItem).year
    if (venue && year) return `${venue} · ${year}`
    if (venue) return venue
    if (year) return year
    return (item as WorkItem).type ?? ''
  }

  const renderLinks = (item: any) => {
    const chips: { label: string; url: string }[] = []
    if (Array.isArray((item as any).links)) {
      chips.push(...((item as any).links as { label: string; url: string }[]))
    }
    if ((item as WorkItem).doi) {
      chips.push({
        label: 'DOI',
        url: `https://doi.org/${(item as WorkItem).doi}`,
      })
    }
    if ((item as WorkItem).url) {
      chips.push({ label: 'Link', url: (item as WorkItem).url as string })
    }
    if ((item as WorkItem).putCode) {
      chips.push({
        label: 'ORCID',
        url: `https://orcid.org/${cv.basicInfo.orcid}/work/${
          (item as WorkItem).putCode
        }`,
      })
    }
    return chips
  }

  const limitList = (list: WorkItem[], max = MAX_PER_SECTION) => {
    const slice = list.slice(0, max)
    const hasMore = list.length > max
    const moreCount = list.length - max
    return { slice, hasMore, moreCount }
  }

  const journalLimited = limitList(journalPubs)
  const confLimited = limitList(confPubs)
  const preprintLimited = limitList(preprintPubs)
  const othersLimited = limitList(othersPubs, 4)

  return (
    <div className="glass" style={{ padding: 20, display: 'grid', gap: 18 }}>
      <header className="cv-hero">
        <div className="cv-identity">
          <h1 className="cv-name">
            {cv.basicInfo.nameJa} /{' '}
            <span className="cv-en">{cv.basicInfo.nameEn}</span>
          </h1>
          <p className="cv-role">{cv.basicInfo.role}</p>
          <div className="cv-meta">
            <span>所属: {affiliation}</span>
            <span>拠点: {cv.basicInfo.location}</span>
            <span>ORCID: {cv.basicInfo.orcid}</span>
          </div>
          <div className="cv-links-row">
            {(orcidData?.links ?? cv.links).map((link) => (
              <a
                key={link.label}
                className="chip"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="cv-updated">
            Last updated:{' '}
            {orcidData?.fetchedAt ? orcidData.fetchedAt : cv.lastUpdated}
          </div>
          {orcidStatus === 'loading' && (
            <div className="cv-status">ORCIDから取得中…</div>
          )}
          {orcidStatus === 'error' && (
            <div className="cv-status error">
              ORCID取得に失敗しました。モックデータを表示しています。
            </div>
          )}
          {worksData && (
            <div className="cv-updated">
              Works fetched from ORCID (
              {worksData.journal.length +
                worksData.conference.length +
                worksData.preprints.length +
                worksData.others.length}{' '}
              items)
            </div>
          )}
        </div>
        <div className="cv-summary" id="summary">
          <div className="cv-title">Summary</div>
          <p className="cv-text">{summaryText}</p>
          <div className="cv-title" style={{ marginTop: 8 }}>
            Research Interests
          </div>
          <div className="chip-row">
            {interests.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      <nav className="cv-toc">
        {toc.map((item) => (
          <a key={item.href} href={item.href} className="toc-link">
            {item.label}
          </a>
        ))}
      </nav>

      <section id="education" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Education</h2>
        </div>
        <div className="cv-grid two">
          {cv.education.map((edu) => (
            <div className="cv-block" key={edu.degree}>
              <div className="cv-title">{edu.degree}</div>
              <div className="cv-note">{edu.org}</div>
              <div className="cv-note">{edu.years}</div>
              <div className="cv-text">{edu.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="employment" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Employment / Academic Positions</h2>
        </div>
        <div className="cv-grid two">
          {cv.employment.map((job) => (
            <div className="cv-block" key={job.role}>
              <div className="cv-title">{job.role}</div>
              <div className="cv-note">{job.org}</div>
              <div className="cv-note">{job.years}</div>
              <div className="cv-text">{job.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="publications" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Publications</h2>
          <span className="badge">
            {worksData ? 'ORCID (works)' : 'ORCID mock + local'}
          </span>
        </div>
        <div className="cv-block" style={{ marginBottom: 10 }}>
          <div className="cv-title">Selected</div>
          <div className="simple-list">
            {cv.publications.selected.map((pub) => (
              <div className="simple-item" key={pub.title}>
                <strong>{pub.title}</strong>
                <span className="simple-meta">{pub.venue}</span>
                <div className="chip-row">
                  {pub.links.map((link) => (
                    <a key={link.label} className="chip" href={link.url}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cv-grid three">
          <div className="cv-block">
            <div className="cv-title">Journal Papers</div>
            <div className="simple-list">
              {journalLimited.slice.map((pub) => (
                <div className="simple-item" key={pub.title}>
                  <strong>{pub.title}</strong>
                  <span className="simple-meta">{normalizeVenue(pub)}</span>
                  <div className="chip-row">
                    {renderLinks(pub).map((link) => (
                      <a
                        key={link.label}
                        className="chip"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              {journalLimited.hasMore && (
                <div className="cv-more">
                  and {journalLimited.moreCount} more from ORCID…
                </div>
              )}
            </div>
          </div>
          <div className="cv-block">
            <div className="cv-title">Conference Papers</div>
            <div className="simple-list">
              {confLimited.slice.map((pub) => (
                <div className="simple-item" key={pub.title}>
                  <strong>{pub.title}</strong>
                  <span className="simple-meta">{normalizeVenue(pub)}</span>
                  <div className="chip-row">
                    {renderLinks(pub).map((link) => (
                      <a
                        key={link.label}
                        className="chip"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              {confLimited.hasMore && (
                <div className="cv-more">
                  and {confLimited.moreCount} more from ORCID…
                </div>
              )}
            </div>
          </div>
          <div className="cv-block">
            <div className="cv-title">Preprints (arXiv)</div>
            <div className="simple-list">
              {preprintLimited.slice.map((pub) => (
                <div className="simple-item" key={pub.title}>
                  <strong>{pub.title}</strong>
                  <span className="simple-meta">{normalizeVenue(pub)}</span>
                  <div className="chip-row">
                    {renderLinks(pub).map((link) => (
                      <a
                        key={link.label}
                        className="chip"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              {preprintLimited.hasMore && (
                <div className="cv-more">
                  and {preprintLimited.moreCount} more from ORCID…
                </div>
              )}
            </div>
          </div>
        </div>
        {othersPubs.length > 0 && (
          <div className="cv-block" style={{ marginTop: 12 }}>
            <div className="cv-title">Other Works</div>
            <div className="simple-list">
              {othersLimited.slice.map((pub) => (
                <div
                  className="simple-item"
                  key={`${pub.title}-${
                    pub.putCode ?? pub.url ?? pub.doi ?? pub.year
                  }`}
                >
                  <strong>{pub.title}</strong>
                  <span className="simple-meta">{normalizeVenue(pub)}</span>
                  <div className="chip-row">
                    {renderLinks(pub).map((link) => (
                      <a
                        key={link.label}
                        className="chip"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              {othersLimited.hasMore && (
                <div className="cv-more">
                  and {othersLimited.moreCount} more from ORCID…
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <section id="grants" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Grants / Funding</h2>
        </div>
        <div className="cv-block">
          <ul className="cv-list">
            {cv.grants.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="awards" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Awards / Honors</h2>
        </div>
        <div className="cv-block">
          <ul className="cv-list">
            {cv.awards.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="talks" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Talks & Presentations</h2>
        </div>
        <div className="cv-block">
          <ul className="cv-list">
            {cv.talks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="teaching" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Teaching Experience</h2>
        </div>
        <div className="cv-block">
          <ul className="cv-list">
            {cv.teaching.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="service" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Service</h2>
        </div>
        <div className="cv-block">
          <ul className="cv-list">
            {cv.service.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="links" className="section" style={{ marginTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Links</h2>
        </div>
        <div className="chip-row">
          {cv.links.map((link) => (
            <a
              key={link.label}
              className="chip"
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
