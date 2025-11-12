import { useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

// Scroll progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[60]"
    />
  )
}

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
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(Math.max(-50, Math.min(50, dx / 4)))
    y.set(Math.max(-50, Math.min(50, dy / 4)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      href={link}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group block overflow-hidden rounded-xl ring-1 ring-black/5 bg-white/70 hover:bg-white/90 transition shadow-sm hover:shadow-xl will-change-transform perspective-1000"
    >
      <div className="relative aspect-video w-full overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200" />
        <motion.div
          className="absolute -inset-8 opacity-0 group-hover:opacity-30 blur-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          initial={false}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        {image && (
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>
      <div className="p-4" style={{ transform: 'translateZ(30px)' }}>
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

function FloatingOrbs() {
  const orbs = [
    { size: 'w-72 h-72', color: 'from-blue-300/40 to-purple-300/40', top: '10%', left: '5%', duration: 18 },
    { size: 'w-64 h-64', color: 'from-pink-300/40 to-orange-300/40', top: '70%', left: '10%', duration: 22 },
    { size: 'w-80 h-80', color: 'from-sky-300/40 to-indigo-300/40', top: '30%', left: '70%', duration: 20 },
  ]
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {orbs.map((o, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${o.size} blur-3xl rounded-full bg-gradient-to-br ${o.color}`}
          style={{ top: o.top, left: o.left }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0] }}
          transition={{ duration: o.duration, repeat: Infinity, ease: 'easeInOut', delay: idx * 1.5 }}
        />
      ))}
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

  // Hero parallax
  const heroRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const tiltX = useTransform(my, [-30, 30], [6, -6])
  const tiltY = useTransform(mx, [-30, 30], [-6, 6])

  const onHeroMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    mx.set(Math.max(-30, Math.min(30, dx / 8)))
    my.set(Math.max(-30, Math.min(30, dy / 8)))
  }

  const words = 'Website Modern dengan Animasi Halus dan Gradasi Elegan'.split(' ')

  return (
    <div className="relative min-h-screen overflow-x-clip text-gray-900">
      <ScrollProgress />
      <FloatingOrbs />

      {/* Animated gradient base */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute -top-32 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl bg-gradient-to-br from-blue-300/40 via-purple-300/30 to-pink-300/30" />
        <div className="absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl bg-gradient-to-tr from-sky-200/40 via-white to-indigo-200/30" />
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
            <motion.a whileHover={{ y: -1 }} whileTap={{ y: 0 }} href="#contact" className="text-sm font-medium px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black">
              Hubungi
            </motion.a>
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
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium ring-1 ring-blue-300/50">
                Tersedia untuk proyek freelance
              </motion.div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
                {words.map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.04, duration: 0.5 }}
                    className="inline-block mr-2 bg-clip-text text-transparent bg-[linear-gradient(90deg,#0ea5e9,#8b5cf6,#ec4899)] bg-[length:200%_100%]"
                    style={{ backgroundPositionX: `${(i % 10) * 10}%` }}
                  >
                    {w}
                  </motion.span>
                ))}
              </h1>
              <motion.p className="mt-4 text-gray-600 leading-relaxed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                Saya membangun antarmuka yang cepat, rapi, dan menyenangkan dengan fokus pada performa dan pengalaman pengguna.
              </motion.p>
              <div className="mt-6 flex items-center gap-3">
                <motion.a whileHover={{ y: -2 }} whileTap={{ y: 0 }} href="#projects" className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-black inline-flex items-center gap-2">
                  Lihat Proyek <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} whileTap={{ y: 0 }} href="#contact" className="px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50">
                  Kontak
                </motion.a>
              </div>
              <div className="mt-6 flex items-center gap-3 text-gray-600">
                <motion.a whileHover={{ y: -2 }} href="#" className="inline-flex items-center gap-2 hover:text-gray-900"><Github className="w-4 h-4" /> Github</motion.a>
                <motion.a whileHover={{ y: -2 }} href="#" className="inline-flex items-center gap-2 hover:text-gray-900"><Linkedin className="w-4 h-4" /> LinkedIn</motion.a>
                <motion.a whileHover={{ y: -2 }} href="#contact" className="inline-flex items-center gap-2 hover:text-gray-900"><Mail className="w-4 h-4" /> Email</motion.a>
              </div>
            </motion.div>

            <motion.div
              ref={heroRef}
              onMouseMove={onHeroMove}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <motion.div
                className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-200 via-white to-purple-200 ring-1 ring-black/5 flex items-center justify-center"
                style={{ rotateX: tiltX, rotateY: tiltY }}
              >
                <motion.div
                  className="mx-auto w-24 h-24 rounded-full bg-white/70 ring-1 ring-black/5 flex items-center justify-center text-2xl font-bold text-blue-700"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  FB
                </motion.div>
                <motion.div
                  className="absolute -inset-10 blur-3xl rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
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
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((p, i) => (
              <motion.div key={p.title} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                <ProjectCard {...p} i={i} />
              </motion.div>
            ))}
          </motion.div>
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
            className="relative"
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-3 will-change-transform"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              >
                {[...skills, ...skills].map((s, idx) => (
                  <motion.div
                    key={idx}
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                  >
                    <Pill>{s}</Pill>
                  </motion.div>
                ))}
              </motion.div>
            </div>
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
            <div className="rounded-xl bg-white/80 ring-1 ring-black/5 p-5 relative overflow-hidden">
              <motion.div
                aria-hidden
                className="absolute -inset-20 blur-3xl bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <form action="mailto:you@example.com" method="post" className="grid gap-4 relative">
                <input required type="text" name="name" placeholder="Nama" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input required type="email" name="email" placeholder="Email" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea required name="message" rows="4" placeholder="Pesan" className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} type="submit" className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                  Kirim Pesan <ArrowRight className="w-4 h-4" />
                </motion.button>
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
