import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-background-secondary min-h-screen flex items-center justify-center px-4">
      <div className="hero bg-background w-full max-w-7xl mx-auto p-8 md:p-16 rounded-lg shadow-lg">
        <div className="text-center">
          {/* Morse Code 404 */}
          <div className="mb-8">
            <div className="flex justify-center items-center gap-6 mb-4 text-5xl md:text-7xl font-mono">
              <span className="text-foreground opacity-80">....-</span>
              <span className="text-foreground opacity-80">-----</span>
              <span className="text-foreground opacity-80">....-</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base font-maitree">
              (That&apos;s &quot;404&quot; in Morse Code)
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-foreground tracking-tight mb-6 font-poppins">
            Page Not Found
          </h1>
          
          {/* Gradient Subtitle */}
          <p className="text-2xl md:text-3xl bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium mb-8 font-poppins">
            Signal Lost!
          </p>

          {/* Description */}
          <p className="text-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-maitree leading-relaxed">
            Oops! It seems like this page has disappeared into the dots and dashes. 
            The URL you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Morse Code Animation */}
          <div className="mb-12 flex justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-8 h-3 bg-teal-600 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
            <div className="w-8 h-3 bg-teal-600 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '800ms' }}></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/" 
              className="bg-primary text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
            >
              Return Home
            </Link>
            <Link 
              href="/morse-code-translator-audio" 
              className="bg-card border-2 border-border text-foreground px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-muted/50 transition-colors w-full sm:w-auto text-center"
            >
              Try Morse Translator
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-foreground/60 font-maitree mb-4">Or explore these popular pages:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <Link href="/morse-code-alphabets" className="text-sm text-foreground/80 hover:text-primary transition-colors font-maitree hover:underline">
                Morse Alphabets
              </Link>
              <Link href="/morse-code-numbers" className="text-sm text-foreground/80 hover:text-primary transition-colors font-maitree hover:underline">
                Morse Numbers
              </Link>
              <Link href="/blog" className="text-sm text-foreground/80 hover:text-primary transition-colors font-maitree hover:underline">
                Blog
              </Link>
              <Link href="/morse-code-machine" className="text-sm text-foreground/80 hover:text-primary transition-colors font-maitree hover:underline">
                Morse Machine
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}