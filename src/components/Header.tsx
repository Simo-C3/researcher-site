import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'ホーム' },
  { to: '/publications', label: '論文' },
  { to: '/projects', label: 'プロジェクト' },
  { to: '/cv', label: '業績' },
  { to: '/contact', label: '問い合わせ' },
]

export default function Header() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">
          <div className="brand-mark">R</div>
          <div className="brand-text">
            <span className="brand-title">博士 いくみ</span>
            <span className="brand-sub">Human-Centered AI · Kyutech</span>
          </div>
        </div>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
