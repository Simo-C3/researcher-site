import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© 2025 研究者ラボ</span>
        <div className="footer-links">
          <NavLink to="/publications">論文</NavLink>
          <NavLink to="/projects">プロジェクト</NavLink>
          <NavLink to="/cv">CV</NavLink>
          <NavLink to="/contact">問い合わせ</NavLink>
        </div>
      </div>
    </footer>
  )
}
