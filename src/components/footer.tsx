import Link from "next/link"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative w-full bg-background text-white">
      {/* Newsletter Section */}
      {/* <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Subscribe to our Email Newsletter!</h2>
          <p className="mt-4 text-muted-foreground">
            Whether you're a sports and media professional or simply passionate about AI's impact on improving content
            accessibility, this newsletter is your go-to guide for valuable insights and updates
          </p>
          <div className="mt-6 flex max-w-md gap-x-4">
            <Input type="email" placeholder="Email address" className="bg-white/10" aria-label="Email address" />
            <Button className="bg-primary hover:bg-primary/90 text-white">Subscribe</Button>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-y-12 md:flex-row md:items-center">
            {/* Brand */}
            <div>
              <Link href="/" className="text-2xl font-semibold">
                RELQ.AI
              </Link>
            </div>

            {/* Navigation */}
            {/* <nav className="flex flex-wrap gap-8">
              <Link href="/products" className="hover:text-white/80">
                Products
              </Link>
              <Link href="/case-studies" className="hover:text-white/80">
                Case Studies
              </Link>
              <Link href="/research" className="hover:text-white/80">
                Research
              </Link>
              <Link href="/enterprise" className="hover:text-white/80">
                For Enterprise
              </Link>
            </nav> */}

            {/* Social Links */}
            <div className="flex gap-6">
              {/* <a href="#" className="text-white/80 hover:text-white" aria-label="Discord">
                <Discord className="h-6 w-6" />
              </a> */}
              <a href="#" className="text-white/80 hover:text-white" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-white" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-white" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-12 flex flex-col items-center justify-between gap-y-6 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-sm text-white/60">© {new Date().getFullYear()} RELQ.AI. All Rights Reserved</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
              {/* <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <Link href="/help" className="hover:text-white">
                Help
              </Link>
              <Link href="/careers" className="hover:text-white">
                Careers
              </Link> */}
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
              <button
                type="button"
                className="hover:text-white"
                onClick={() => {
                  // Add cookie consent logic here
                }}
              >
                Cookie Consent Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

