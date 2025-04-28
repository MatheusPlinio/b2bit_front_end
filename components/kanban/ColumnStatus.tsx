import { useColumnTasks } from "@/hooks/useColumnTasks";
import { IColumn } from "@/types/column";
import { ITask } from "@/types/task";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function Column({ column }: { column: IColumn }) {
    const { data: tasks, isLoading } = useColumnTasks(column.id);

    return (
        <div className="flex flex-col bg-muted/20 border border-muted border-b-gray-400 rounded p-4 w-72 max-h-[85vh]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: column.color }}
                    />
                    <h3 className="font-semibold text-muted-foreground text-lg">
                        {column.title}
                    </h3>
                </div>
                <Button size="icon" variant="ghost" className="hover:bg-muted cursor-pointer">
                    <Plus className="w-4 h-4 text-muted-foreground" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
                {isLoading ? (
                    <p className="text-sm text-muted-foreground">Carregando Tasks</p>
                ) : (
                    tasks?.map((task: ITask) => (
                        <div
                            key={task.id}
                            className="bg-background border border-muted rounded-xl p-3 text-sm shadow-sm hover:shadow-md transition"
                        >
                            {task.title}
                        </div>
                    ))
                )}
            </div>

            <div className="pt-4">
                <Button 
                    className="w-full cursor-pointer" 
                    variant="ghost"
                    size="sm"
                >
                    + Adicionar tarefa
                </Button>
            </div>
        </div>
    );
}
