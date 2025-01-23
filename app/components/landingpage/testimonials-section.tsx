import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Ekas",
    handle: "@Ekas_7",
    content:
      "Devmux is a game changer. It's like having a personal assistant that can help you design, code, and communicate with your team all in one place.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Ekas",
    handle: "@Ekas_7",
    content:
      "Devmux is a game changer. It's like having a personal assistant that can help you design, code, and communicate with your team all in one place.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Ekas",
    handle: "@Ekas_7",
    content:
      "Devmux is a game changer. It's like having a personal assistant that can help you design, code, and communicate with your team all in one place.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Ekas",
    handle: "@Ekas_7",
    content:
      "Devmux is a game changer. It's like having a personal assistant that can help you design, code, and communicate with your team all in one place.",
    avatar: "/placeholder.svg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">See what people say</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.handle}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

