import { useMemo } from 'react'
// Using only built-ins and Tailwind for styling

function Pill({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/60 text-gray-700 ring-1 ring-black/5">
      {children}
    </span>
  )
}

function ProjectCard({ title, description, tags, link, image }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-xl ring-1 ring-black/5 bg-white/70 hover:bg-white/90 transition shadow-sm hover:shadow-md">
      <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 text-sm">Preview</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags?.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
    </a>
  )
}

function SectionHeading({ id, eyebrow, title, subtitle }) {
  return (
    <div id={id} className="max-w-3xl mx-auto text-center mb-10">
      {eyebrow && <div className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-2">{eyebrow}</div>}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      {subtitle && <p className="text-gray-600 leading-relaxed">{subtitle}</p>}
    </div>
  )
}

export default function App() {
  const projects = useMemo(
    () => [
      {
        title: 'Landing Page Modern',
        description:
          'Halaman promosi dengan animasi halus, desain responsif, dan performa tinggi menggunakan React + Tailwind.',
        tags: ['React', 'Tailwind', 'SEO'],
        link: 'https://example.com',
      },
      {
        title: 'Dashboard Analitik',
        description:
          'Dasbor data interaktif dengan grafik realtime dan filter dinamis, fokus pada kecepatan dan kejelasan.',
        tags: ['Charts', 'API', 'UX'],
        link: 'https://example.com',
      },
      {
        title: 'Aplikasi Portfolio',
        description:
          'Template portfolio pribadi yang elegan, mudah dikustomisasi, dan siap produksi.',
        tags: ['Portfolio', 'Responsive', 'Accessibility'],
        link: 'https://example.com',
      },
    ],
    []
  )

  const skills = [
    'JavaScript',
    'React',
    'Tailwind CSS',
    'Node.js',
    'REST API',
    'Git',
    'UI/UX',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-bold text-lg tracking-tight">Portfolio</a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm text-gray-600 hover:text-gray-900">Tentang</a>
            <a href="#projects" className="text-sm text-gray-600 hover:text-gray-900">Proyek</a>
            <a href="#skills" className="text-sm text-gray-600 hover:text-gray-900">Keahlian</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">Kontak</a>
          </nav>
          <a href="#contact" className="text-sm font-medium px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Hubungi Saya
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative pt-28 md:pt-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium ring-1 ring-blue-300/50">
                Tersedia untuk proyek freelance
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
                Saya Bangun Website Modern yang Cepat dan Elegan
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Developer front-end yang fokus pada performa, aksesibilitas, dan pengalaman pengguna yang menyenangkan. Saya membantu brand tampil beda melalui web yang dirancang dengan cermat.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#projects" className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-black">
                  Lihat Proyek
                </a>
                <a href="#contact" className="px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50">
                  Kontak
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-200 via-white to-purple-200 ring-1 ring-black/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto w-24 h-24 rounded-full bg-white/70 ring-1 ring-black/5 flex items-center justify-center text-2xl font-bold text-blue-700">FB</div>
                  <div className="mt-4 font-semibold">Flames.Blue</div>
                  <div className="text-sm text-gray-600">Front-end Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Tentang Saya"
            title="Menciptakan antarmuka yang indah dan fungsional"
            subtitle="Saya percaya bahwa detail kecil membuat perbedaan besar. Setiap komponen dirancang dengan presisi, diuji, dan dioptimalkan untuk performa."
          />
          <div className="max-w-3xl mx-auto text-center text-gray-700 leading-relaxed">
            Saya berpengalaman membangun SPA, landing page, dan dashboard modern. Terbiasa bekerja dengan tim menggunakan Git, code review, dan praktik terbaik industri.
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Portofolio"
            title="Proyek Pilihan"
            subtitle="Kumpulan karya yang menonjolkan kualitas desain, kerapian kode, dan pengalaman pengguna."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />)
            )}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Keahlian"
            title="Teknologi yang saya gunakan"
            subtitle="Selalu mengikuti tren modern tanpa mengorbankan stabilitas dan kemudahan maintenance."
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            {skills.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 bg-white/70">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Kontak"
            title="Mari berdiskusi tentang proyek Anda"
            subtitle="Butuh landing page, dashboard, atau website perusahaan? Saya siap membantu mulai dari ide hingga peluncuran."
          />
          <div className="max-w-xl mx-auto">
            <div className="rounded-xl bg-white/80 ring-1 ring-black/5 p-5">
              <form action="mailto:you@example.com" method="post" className="grid gap-4">
                <input required type="text" name="name" placeholder="Nama" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input required type="email" name="email" placeholder="Email" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea required name="message" rows="4" placeholder="Pesan" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="inline-flex justify-center items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                  Kirim Pesan
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">Ganti alamat email pada tombol kirim agar pesan masuk ke inbox Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Portfolio — Dibuat dengan cinta dan perhatian pada detail.
      </footer>
    </div>
  )
}
