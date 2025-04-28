import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Pricing() {
    return (
        <section className="py-20 px-4 text-center w-full bg-gradient-to-br from-white to-slate-200">
            <h2 className="text-2xl font-bold mb-10">Planos e Preços</h2>
            <div className="flex flex-wrap justify-center gap-6">
                <Card className="w-[280px]">
                    <CardHeader>
                        <CardTitle>Starter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold mb-4">R$0/mês</p>
                        <ul className="text-left space-y-2 mb-4">
                            <li>✅ 1 projeto</li>
                            <li>✅ Até 3 usuários</li>
                            <li>✅ Geração limitada</li>
                        </ul>
                        <Button>Comece agora</Button>
                    </CardContent>
                </Card>

                <Card className="w-[280px]">
                    <CardHeader>
                        <CardTitle>Premium</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold mb-4">R$49/mês</p>
                        <ul className="text-left space-y-2 mb-4">
                            <li>✅ Projetos ilimitados</li>
                            <li>✅ 10 usuários</li>
                            <li>✅ Prioridade e integrações</li>
                        </ul>
                        <Button>Assinar</Button>
                    </CardContent>
                </Card>

                <Card className="w-[280px]">
                    <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold mb-4">Personalizado</p>
                        <ul className="text-left space-y-2 mb-4">
                            <li>🔒 Times grandes</li>
                            <li>🔒 Suporte dedicado</li>
                            <li>🔒 IA customizada</li>
                        </ul>
                        <Button variant="outline" asChild>
                            <a href="mailto:contato@kanbrain.com">Fale conosco</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
