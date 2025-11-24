import MorseCodeGame from "@/components/ui/game"

export const metadata = {
  title: "Morse Code Game - Guess the Word",
  description: "Test your Morse code skills with this interactive listening game. Guess the word played in Morse code before your tries run out!",
}

export default function GamePage() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">Morse Code Challenge</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Train your ears and improve your Morse code copying speed with this fun game.
          </p>
        </div>
        <MorseCodeGame />
      </div>
    </main>
  )
}

