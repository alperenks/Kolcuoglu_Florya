'use client'

import { useState } from 'react'
import { ga4Event } from '@/components/analytics/ga4'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, ChevronRight, ChevronLeft, Calendar, Users } from 'lucide-react'
import { ReservationForm } from '@/types'
import type { Dictionary } from '@/i18n/dictionaries/tr'
import type { Locale } from '@/i18n/config'

type T = Dictionary['reservation']

// ─── Validation Schemas (messages in the page's language) ───────────────────
const step1Schema = (t: T) => z.object({
  date: z.string().min(1, t.errors.date),
  time: z.string().min(1, t.errors.time),
  guests: z.number().min(1).max(20),
})

const step2Schema = (t: T) => z.object({
  firstName: z.string().min(2, t.errors.firstName),
  lastName: z.string().min(2, t.errors.lastName),
  email: z.string().email(t.errors.email),
  phone: z.string().min(10, t.errors.phone),
  notes: z.string().optional(),
})

// ─── Available times ──────────────────────────────────────────────────────────
const availableTimes = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
]

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      {[1, 2].map((s) => (
        <div key={s} className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500"
            style={{
              background: s < step
                ? 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))'
                : s === step
                  ? 'rgba(163,33,36,0.15)'
                  : 'var(--color-card-inner-bg)',
              color: s <= step ? (s < step ? 'white' : 'var(--color-gold)') : 'var(--color-muted)',
              border: s === step ? '1px solid var(--color-gold)' : '1px solid transparent',
            }}
          >
            {s < step ? <Check size={16} /> : s}
          </div>
          {s < 2 && (
            <div
              className="w-16 h-px transition-all duration-500"
              style={{ background: s < step ? 'var(--color-gold)' : 'var(--color-border-strong)' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Input Component ──────────────────────────────────────────────────────────
function FormInput({
  label, error, ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}>
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 text-sm transition-all duration-300 outline-none"
        style={{
          background: 'var(--color-card-inner-bg)',
          border: error ? '1px solid var(--color-terracotta)' : '1px solid var(--color-border-strong)',
          color: 'var(--color-cream)',
          fontFamily: 'var(--font-sans)',
          borderRadius: '2px',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-gold)'
          e.currentTarget.style.background = 'rgba(163,33,36,0.05)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? 'var(--color-terracotta)' : 'var(--color-border-strong)'
          e.currentTarget.style.background = 'var(--color-card-inner-bg)'
        }}
      />
      {error && <p className="text-xs mt-1" style={{ color: 'var(--color-terracotta)' }}>{error}</p>}
    </div>
  )
}

// ─── Step 1: Date & Time ──────────────────────────────────────────────────────
function Step1({
  t,
  data,
  onNext,
}: {
  t: T
  data: Partial<ReservationForm>
  onNext: (d: Partial<ReservationForm>) => void
}) {
  const [schema] = useState(() => step1Schema(t))
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date: data.date ?? '',
      time: data.time ?? '',
      guests: data.guests ?? 2,
    },
  })

  const selectedTime = watch('time')
  const guests = watch('guests')
  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit((d) => onNext(d as Partial<ReservationForm>))}>
      <div className="space-y-8">
        {/* Date */}
        <div>
          <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}>
            <Calendar size={12} className="inline mr-2" />
            {t.selectDate}
          </label>
          <input
            type="date"
            min={today}
            {...register('date')}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{
              background: 'var(--color-card-inner-bg)',
              border: errors.date ? '1px solid var(--color-terracotta)' : '1px solid var(--color-border-strong)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-sans)',
              borderRadius: '2px',
            }}
          />
          {errors.date && <p className="text-xs mt-1" style={{ color: 'var(--color-terracotta)' }}>{errors.date.message as string}</p>}
        </div>

        {/* Time Slots */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}>
            {t.selectTime}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {availableTimes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValue('time', t)}
                className="py-2 text-sm text-center transition-all duration-200 rounded"
                style={{
                  background: selectedTime === t
                    ? 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))'
                    : 'var(--color-card-inner-bg)',
                  color: selectedTime === t ? 'white' : 'var(--color-muted)',
                  border: selectedTime === t
                    ? '1px solid transparent'
                    : '1px solid var(--color-border-strong)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.time && <p className="text-xs mt-2" style={{ color: 'var(--color-terracotta)' }}>{t.errors.time}</p>}
        </div>

        {/* Guest Count */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}>
            <Users size={12} className="inline mr-2" />
            {t.guests}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setValue('guests', Math.max(1, guests - 1))}
              className="w-10 h-10 flex items-center justify-center text-lg transition-all"
              style={{
                background: 'var(--color-card-inner-bg)',
                border: '1px solid var(--color-border-strong)',
                color: 'var(--color-cream)',
                borderRadius: '2px',
              }}
            >−</button>
            <span
              className="font-serif text-4xl w-12 text-center"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}
            >
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setValue('guests', Math.min(20, guests + 1))}
              className="w-10 h-10 flex items-center justify-center text-lg transition-all"
              style={{
                background: 'var(--color-card-inner-bg)',
                border: '1px solid var(--color-border-strong)',
                color: 'var(--color-cream)',
                borderRadius: '2px',
              }}
            >+</button>
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{guests === 1 ? t.guestsUnitOne : t.guestsUnit}</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-10 py-4 flex items-center justify-center gap-2 text-sm tracking-widest uppercase font-semibold"
        style={{
          background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
          color: 'white',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.15em',
          borderRadius: '2px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {t.continue} <ChevronRight size={16} />
      </button>
    </form>
  )
}

// ─── Step 2: Guest Info ───────────────────────────────────────────────────────
function Step2({
  t,
  data,
  onNext,
  onBack,
}: {
  t: T
  data: Partial<ReservationForm>
  onNext: (d: Partial<ReservationForm>) => void
  onBack: () => void
}) {
  const [schema] = useState(() => step2Schema(t))
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      notes: data.notes ?? '',
    },
  })

  return (
    <form onSubmit={handleSubmit((d) => onNext(d as Partial<ReservationForm>))}>
      <div className="space-y-6">
        {/* Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput label={t.firstName} placeholder={t.placeholders.firstName} error={errors.firstName?.message as string} {...register('firstName')} />
          <FormInput label={t.lastName} placeholder={t.placeholders.lastName} error={errors.lastName?.message as string} {...register('lastName')} />
        </div>

        <FormInput label={t.email} type="email" placeholder={t.placeholders.email} error={errors.email?.message as string} {...register('email')} />
        <FormInput label={t.phone} type="tel" placeholder={t.placeholders.phone} error={errors.phone?.message as string} {...register('phone')} />

        {/* Notes */}
        <div>
          <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}>
            {t.notes}
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            placeholder={t.placeholders.notes}
            className="w-full px-4 py-3 text-sm outline-none resize-none"
            style={{
              background: 'var(--color-card-inner-bg)',
              border: '1px solid var(--color-border-strong)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-sans)',
              borderRadius: '2px',
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-4 text-sm tracking-wider uppercase"
          style={{
            background: 'transparent',
            color: 'var(--color-muted)',
            border: '1px solid var(--color-border-strong)',
            borderRadius: '2px',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <ChevronLeft size={16} /> {t.back}
        </button>
        <button
          type="submit"
          className="flex-1 py-4 flex items-center justify-center gap-2 text-sm tracking-widest uppercase font-semibold"
          style={{
            background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
            color: 'white',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.15em',
            borderRadius: '2px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t.submit} <ChevronRight size={16} />
        </button>
      </div>
    </form>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ t }: { t: T['success'] }) {
  return (
    <motion.div
      className="text-center py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.2 }}
      >
        <Check className="text-white" size={40} />
      </motion.div>
      <h2
        className="font-serif text-3xl mb-3"
        style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-serif)' }}
      >
        {t.title}
      </h2>
      <p className="text-base mb-2" style={{ color: 'var(--color-muted)' }}>
        {t.text}
      </p>
      <p className="text-sm" style={{ color: 'var(--color-copper)' }}>
        {t.contact}{' '}
        <a href="https://wa.me/905331315401" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
          +90 533 131 54 01
        </a>
      </p>
      <div className="gold-line my-10 mx-auto" style={{ width: '60px' }} />
      <p className="font-serif text-xl italic" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>
        &ldquo;{t.quote}&rdquo;
      </p>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReservationClient({ t, lang }: { t: T; lang: Locale }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<ReservationForm>>({ guests: 2 })
  const [completed, setCompleted] = useState(false)

  const updateData = (d: Partial<ReservationForm>) => {
    setFormData(prev => ({ ...prev, ...d }))
  }

  return (
    <div style={{ background: 'var(--color-antracite)', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Header */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: 'var(--color-antracite)' }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(196,75,59,0.2) 0%, transparent 65%)' }}
        />
        <div className="relative z-10">
          <p className="section-label mb-4">{t.label}</p>
          <h1
            className="font-serif mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-cream)',
            }}
          >
            {t.title}
          </h1>
          <p className="text-base" style={{ color: 'var(--color-muted)', maxWidth: '576px', margin: '0 auto', width: '100%' }}>
            {t.intro}
          </p>
          <div className="gold-line mt-8 mx-auto" style={{ width: '60px' }} />
        </div>
      </section>

      {/* Wizard */}
      <section className="py-12 px-6">
        <div style={{ maxWidth: '576px', margin: '0 auto', width: '100%' }}>
          {!completed ? (
            <>
              <StepIndicator step={step} />
              <div
                className="rounded p-8"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h2
                  className="font-serif text-xl mb-6"
                  style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-serif)' }}
                >
                  {step === 1 && <><Calendar size={18} className="inline mr-2" style={{ color: 'var(--color-gold)' }} />{t.step1Title}</>}
                  {step === 2 && <><Users size={18} className="inline mr-2" style={{ color: 'var(--color-gold)' }} />{t.step2Title}</>}
                </h2>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step === 1 && (
                      <Step1
                        t={t}
                        data={formData}
                        onNext={(d) => { updateData(d); setStep(2); ga4Event('reservation_step', { step: 1 }) }}
                      />
                    )}
                    {step === 2 && (
                      <Step2
                        t={t}
                        data={formData}
                        onNext={async (d) => {
                          const updated = { ...formData, ...d }
                          updateData(d)
                          try {
                            const res = await fetch('/api/reservations', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ ...updated, lang }),
                            })
                            if (res.ok) ga4Event('generate_lead', { form_name: 'rezervasyon', party_size: Number(updated.guests) || 0 })
                            else ga4Event('reservation_error', { form_name: 'rezervasyon', error_type: `http_${res.status}` })
                          } catch (err) {
                            console.error('Submission error:', err)
                            ga4Event('reservation_error', { form_name: 'rezervasyon', error_type: 'network' })
                          }
                          setCompleted(true)
                        }}
                        onBack={() => setStep(1)}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div
              className="rounded p-8"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid rgba(163,33,36,0.2)',
              }}
            >
              <SuccessScreen t={t.success} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
