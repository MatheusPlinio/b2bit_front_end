import { Sparkles, ListTodo, KanbanSquare } from "lucide-react"

export default function SolutionSection() {
    const solutions = [
        {
            icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
            title: "Interpretação inteligente de requisitos",
            desc: "Nossa IA entende a descrição em linguagem natural e converte para especificações técnicas claras."
        },
        {
            icon: <ListTodo className="w-6 h-6 text-sky-500" />,
            title: "Geração automática de tasks",
            desc: "A quebra da feature em tarefas é feita automaticamente, reduzindo o tempo de planejamento."
        },
        {
            icon: <KanbanSquare className="w-6 h-6 text-indigo-500" />,
            title: "Organização no Kanban",
            desc: "As tarefas já são priorizadas e organizadas no seu board para facilitar o fluxo de desenvolvimento."
        }
    ]

    return (
        <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-200">
            <div className="w-full mx-auto text-center">
                <h2 className="text-3xl font-bold mb-10">
                    Como o <span className="text-primary">KANBRAIN</span> transforma seu processo
                </h2>
                <div className="grid gap-8 md:grid-cols-3 text-left">
                    {solutions.map((solution, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl p-6 shadow-md border hover:shadow-xl transition duration-300"
                        >
                            <div className="mb-4">{solution.icon}</div>
                            <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
                            <p className="text-muted-foreground text-sm">{solution.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
