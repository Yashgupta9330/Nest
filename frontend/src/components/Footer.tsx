

export default function Footer() {
  return (
    <footer className="border-t bg-slate-200 dark:bg-slate-800">
      <div className="container px-4 py-4 md:py-8 text-slate-800 dark:text-slate-200">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About OWASP</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
                  Our Mission
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
                  Team
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="https://nest.owasp.dev/projects/contribute/">
                  Contribute
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="https://nest.owasp.dev/projects/">
                  Projects
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="https://nest.owasp.dev/chapters/">
                  Chapters
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="https://nest.owasp.dev/committees/">
                  Committees
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
                  Events
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
                  Forum
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="relative flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span>Locations</span>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
                  Support
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="https://owasp.org/contact/">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:ml-[52%]">
            <p className="text-sm text-slate-600 dark:text-slate-400">© 2024 OWASP Nest. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
