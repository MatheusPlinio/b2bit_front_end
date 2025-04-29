'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type RequestFn<T> = (data: T) => Promise<{ message?: string }>;

type FormSubmitOptions<T> = {
    request: RequestFn<T>;
    onSuccessRedirect?: string;
};

export function useFormSubmit<T>() {
    const router = useRouter();

    const handleSubmit = async (
        data: T,
        options: FormSubmitOptions<T>
    ): Promise<{ success: boolean }> => {
        try {
            const res = await options.request(data);

            const successMessage =
                res?.message || 'Operação realizada com sucesso.';
            toast.success(successMessage);

            if (options.onSuccessRedirect) {
                router.push(options.onSuccessRedirect);
            } else {
                router.refresh();
            }

            return { success: true };
        } catch (err) {
            let errorMessage = 'Ocorreu um erro inesperado.';

            if (err instanceof Error) {
                try {
                    const parsed = JSON.parse(err.message);
                    if (typeof parsed === 'object' && parsed !== null) {
                        const firstKey = Object.keys(parsed)[0];
                        const messages = parsed[firstKey];
                        if (Array.isArray(messages)) {
                            errorMessage = messages[0];
                        }
                    }
                } catch {
                    errorMessage = err.message;
                }
            }

            toast.error(errorMessage);
            return { success: false };
        }
    };

    return handleSubmit;
}
