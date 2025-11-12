import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

// Small UI helpers
function Pill({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/70 text-gray-700 ring-1 ring-black/5">
      {children}
    </span>
  )
}

function SectionHeading({ id, eyebrow, title, subtitle }) {
  return (
    <div id={id} className="max-w-3xl mx-auto text-center mb-12">
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-2"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-gray-600 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

function ProjectCard({ title, description, tags, link, image, i }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-xl ring-1 ring-black/5 bg-white/70 hover:bg-white/90 transition shadow-sm hover:shadow-lg will-change-transform"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200" />
        <motion.div
          className="absolute -inset-8 opacity-0 group-hover:opacity-20 blur-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          initial={false}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        {image && (
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
            {title}
          </h3>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition translate-x-0 group-hover:translate-x-1" />
        </div>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags?.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
    </motion.a>
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
    <div className="relative min-h-screen overflow-x-clip text-gray-900">
      {/* Animated gradient background */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute -top-32 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl bg-gradient-to-br from-blue-300/50 via-purple-300/40 to-pink-300/40" />
        <div className="absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl bg-gradient-to-tr from-sky-200/50 via-white to-indigo-200/40" />
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-blue-400/20 via-purple-300/20 to-pink-300/20"
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/40 backdrop-blur bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-bold text-lg tracking-tight">Portfolio</a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm text-gray-600 hover:text-gray-900">Tentang</a>
            <a href="#projects" className="text-sm text-gray-600 hover:text-gray-900">Proyek</a>
            <a href="#skills" className="text-sm text-gray-600 hover:text-gray-900">Keahlian</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">Kontak</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="text-sm font-medium px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black">
              Hubungi
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative pt-28 md:pt-32 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium ring-1 ring-blue-300/50">
                Tersedia untuk proyek freelance
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
                Website Modern dengan Animasi Halus dan Gradasi Elegan
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Saya membangun antarmuka yang cepat, rapi, dan menyenangkan dengan fokus pada performa dan pengalaman pengguna.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#projects" className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-black inline-flex items-center gap-2">
                  Lihat Proyek <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50">
                  Kontak
                </a>
              </div>
              <div className="mt-6 flex items-center gap-3 text-gray-600">
                <a href="#" className="inline-flex items-center gap-2 hover:text-gray-900"><Github className="w-4 h-4" /> Github</a>
                <a href="#" className="inline-flex items-center gap-2 hover:text-gray-900"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                <a href="#contact" className="inline-flex items-center gap-2 hover:text-gray-900"><Mail className="w-4 h-4" /> Email</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-200 via-white to-purple-200 ring-1 ring-black/5 flex items-center justify-center">
                <motion.div
                  className="mx-auto w-24 h-24 rounded-full bg-white/70 ring-1 ring-black/5 flex items-center justify-center text-2xl font-bold text-blue-700"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  FB
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Tentang Saya"
            title="Menciptakan antarmuka yang indah dan fungsional"
            subtitle="Setiap detail dirancang dengan presisi, diuji, dan dioptimalkan untuk performa."
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-gray-700 leading-relaxed"
          >
            Berpengalaman membangun SPA, landing page, dan dashboard modern menggunakan React dan Tailwind dengan standar industri terbaik.
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-24 bg-white/70">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Portofolio"
            title="Proyek Pilihan"
            subtitle="Memadukan kualitas desain, kerapian kode, dan pengalaman pengguna."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} {...p} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Keahlian"
            title="Teknologi yang saya gunakan"
            subtitle="Mengikuti tren modern tanpa mengorbankan stabilitas dan maintainability."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {skills.map((s) => (
              <motion.div
                key={s}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              >
                <Pill>{s}</Pill>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 bg-white/70">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Kontak"
            title="Mari berdiskusi tentang proyek Anda"
            subtitle="Butuh landing page, dashboard, atau website perusahaan? Saya siap membantu."
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <div className="rounded-xl bg-white/80 ring-1 ring-black/5 p-5">
              <form action="mailto:you@example.com" method="post" className="grid gap-4">
                <input required type="text" name="name" placeholder="Nama" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input required type="email" name="email" placeholder="Email" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea required name="message" rows="4" placeholder="Pesan" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                  Kirim Pesan <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">Ganti alamat email pada tombol kirim agar pesan masuk ke inbox Anda.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Portfolio — Dibuat dengan animasi modern dan gradasi lembut.
      </footer>
    </div>
  )
}
