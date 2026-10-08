import HomePage from '@/components/home/HomePage'
import { resolveLang } from '@/i18n/params'

export default async function Page({ params }: PageProps<'/[lang]'>) {
  return <HomePage lang={await resolveLang(params)} />
}
