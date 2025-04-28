import { CircleAlert, Timer, Users } from "lucide-react"

export default function ProblemSection() {
    const problems = [
        {
            icon: <Timer className="w-6 h-6 text-rose-500" />,
            title: "Perda de tempo em reuniões longas",
            desc: "Boa parte do sprint é consumida apenas discutindo como quebrar as funcionalidades."
        },
        {
            icon: <Users className="w-6 h-6 text-yellow-500" />,
            title: "Falta de alinhamento entre times",
            desc: "A comunicação entre PMs e devs nem sempre é clara — gerando retrabalho."
        },
        {
            icon: <CircleAlert className="w-6 h-6 text-red-500" />,
            title: "Execução desalinhada",
            desc: "Tarefas mal definidas levam a entregas fora do esperado e bugs evitáveis."
        }
    ]

    return (
        <section className="py-20 px-6 bg-gradient-to-br from-white to-slate-200">
            <div className="w-full mx-auto text-center">
                <h2 className="text-3xl font-bold mb-10">
                    Os desafios que <span className="text-primary">eliminamos</span>
                </h2>
                <div className="grid gap-8 md:grid-cols-3 text-left">
                    {problems.map((problem, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl p-6 shadow-md border hover:shadow-xl transition duration-300"
                        >
                            <div className="mb-4">{problem.icon}</div>
                            <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
                            <p className="text-muted-foreground text-sm">{problem.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
