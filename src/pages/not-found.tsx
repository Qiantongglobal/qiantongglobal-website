import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Seo } from '@/components/Seo'

const NotFoundPage = () => {
  const { pathname } = useLocation()

  return (
    <main className="min-h-screen bg-surface-50 px-6 py-10 text-ink-900">
      <Seo
        title="Page not found"
        description="The page you requested does not exist on qiantongglobal.com."
        path={pathname}
        noindex
      />
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center">
        <Card className="w-full p-8 shadow-panel">
          <div className="flex max-w-2xl flex-col gap-6">
            <div className="text-6xl font-bold text-accent-600">404</div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-normal text-ink-900 sm:text-4xl">
                Page not found
              </h1>
              <p className="text-base leading-7 text-ink-700">
                The page you are looking for does not exist. Please check the address and try again.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/">
                <Button>Back to home</Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </main>
  )
}

export default NotFoundPage
