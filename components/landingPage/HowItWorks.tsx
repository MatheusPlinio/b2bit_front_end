export default function HowItWorks() {
    return (
        <section className="py-16 px-4 w-full mx-auto text-center bg-gradient-to-br from-white bg-slate-200">
            <h2 className="text-2xl font-semibold mb-6">Veja como funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted h-64 flex items-center justify-center italic text-muted-foreground">
                    Mockup do Input da Feature
                </div>
                <div className="bg-muted h-64 flex items-center justify-center italic text-muted-foreground">
                    Mockup do Kanban Gerado
                </div>
            </div>
        </section>
    )
}
