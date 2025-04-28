import { Button } from "@/components/ui/button"

export default function Hero() {
    return (
        <section className="w-full text-center py-20 bg-gradient-to-br from-white bg-slate-200">
            <h1 className="text-4xl font-bold">Planeje em pouco tempo a sua sprint</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Um Gestor inteligente que entende você e organiza o trabalho da equipe.
            </p>
            <div className="mt-6">
                <Button size="lg">Experimente Grátis</Button>
            </div>
        </section>
    )
}
