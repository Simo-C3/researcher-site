import { useEffect, useState } from 'react'

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

const ORCID_ID = '0000-0003-1977-4690'
const MAX_PER_SECTION = 8

const mockWorks: NormalizedWorks = {
  journal: [
    {
      title: 'Multi-view gait analysis with spatio-temporal GNNs',
      venue: 'IEEE T-PAMI 2024',
      year: '2024',
    },
    {
      title: 'Pose-aware fall-risk estimation for elderly care',
      venue: 'CVIU 2023',
      year: '2023',
    },
  ],
  conference: [
    {
      title: 'Self-supervised 3D human pose estimation',
      venue: 'CVPR 2024',
      year: '2024',
    },
    {
      title: 'Smart chair sensing for ergonomic feedback',
      venue: 'IROS 2023 (Best Demo)',
      year: '2023',
    },
  ],
  preprints: [
    {
      title: 'Graph fusion for clinical gait assessment',
      venue: 'arXiv:2401.12345',
      year: '2024',
    },
  ],
  others: [],
}

const normalizeVenue = (item: WorkItem) => {
  if (item.venue && item.year) return `${item.venue} · ${item.year}`
  if (item.venue) return item.venue
  if (item.year) return item.year
  return item.type ?? ''
}

const renderLinks = (item: WorkItem) => {
  const chips: { label: string; url: string }[] = []
  if (item.doi) chips.push({ label: 'DOI', url: `https://doi.org/${item.doi}` })
  if (item.url) chips.push({ label: 'Link', url: item.url })
  if (item.putCode)
    chips.push({
      label: 'ORCID',
      url: `https://orcid.org/${ORCID_ID}/work/${item.putCode}`,
    })
  return chips
}

const limitList = (list: WorkItem[]) => {
  const slice = list.slice(0, MAX_PER_SECTION)
  const hasMore = list.length > MAX_PER_SECTION
  const moreCount = list.length - MAX_PER_SECTION
  return { slice, hasMore, moreCount }
}

export default function Publications() {
  const [works, setWorks] = useState<NormalizedWorks | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>(
    'idle'
  )

  useEffect(() => {
    const controller = new AbortController()
    const fetchWorks = async () => {
      try {
        setStatus('loading')
        const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`ORCID works failed ${res.status}`)
        const worksJson = (await res.json()) as any
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
        setWorks({ journal, conference, preprints, others })
        setStatus('ok')
      } catch (err) {
        if (controller.signal.aborted) return
        setStatus('error')
      }
    }
    fetchWorks()
    return () => controller.abort()
  }, [])

  const journalList = works?.journal?.length ? works.journal : mockWorks.journal
  const confList = works?.conference?.length
    ? works.conference
    : mockWorks.conference
  const preprintList = works?.preprints?.length
    ? works.preprints
    : mockWorks.preprints
  const otherList = works?.others?.length ? works.others : mockWorks.others

  const jLimited = limitList(journalList)
  const cLimited = limitList(confList)
  const pLimited = limitList(preprintList)
  const oLimited = limitList(otherList)

  return (
    <div className="glass" style={{ padding: 24, display: 'grid', gap: 16 }}>
      <div className="section-header">
        <div>
          <p className="section-subtitle">
            ORCIDの公開worksをベースに最新の論文・発表を表示します。
          </p>
          <h1 className="section-title">Publications</h1>
        </div>
        <div className="meta">
          <a
            className="button secondary"
            href={`https://orcid.org/${ORCID_ID}`}
            target="_blank"
            rel="noreferrer"
          >
            ORCID Record
          </a>
          <a
            className="button secondary"
            href="https://scholar.google.com"
            target="_blank"
            rel="noreferrer"
          >
            Google Scholar
          </a>
          <span className="badge">
            {status === 'ok' ? 'ORCID live' : 'Mock fallback'}
          </span>
        </div>
      </div>

      {status === 'loading' && (
        <div className="cv-status">ORCIDから取得中…</div>
      )}
      {status === 'error' && (
        <div className="cv-status error">
          ORCID取得に失敗しました。モックデータを表示しています。
        </div>
      )}

      <div className="cv-block">
        <div className="cv-title">Journal Papers</div>
        <div className="simple-list">
          {jLimited.slice.map((pub) => (
            <div className="simple-item" key={`${pub.title}-${pub.year}`}>
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
          {jLimited.hasMore && (
            <div className="cv-more">and {jLimited.moreCount} more from ORCID…</div>
          )}
        </div>
      </div>

      <div className="cv-block">
        <div className="cv-title">Conference Papers</div>
        <div className="simple-list">
          {cLimited.slice.map((pub) => (
            <div className="simple-item" key={`${pub.title}-${pub.year}`}>
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
          {cLimited.hasMore && (
            <div className="cv-more">and {cLimited.moreCount} more from ORCID…</div>
          )}
        </div>
      </div>

      <div className="cv-block">
        <div className="cv-title">Preprints (arXiv)</div>
        <div className="simple-list">
          {pLimited.slice.map((pub) => (
            <div className="simple-item" key={`${pub.title}-${pub.year}`}>
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
          {pLimited.hasMore && (
            <div className="cv-more">and {pLimited.moreCount} more from ORCID…</div>
          )}
        </div>
      </div>

      {oLimited.slice.length > 0 && (
        <div className="cv-block">
          <div className="cv-title">Other Works</div>
          <div className="simple-list">
            {oLimited.slice.map((pub) => (
              <div
                className="simple-item"
                key={`${pub.title}-${pub.year ?? pub.putCode ?? pub.url ?? pub.doi ?? 'other'}`}
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
            {oLimited.hasMore && (
              <div className="cv-more">and {oLimited.moreCount} more from ORCID…</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
