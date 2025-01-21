"use client";
import { useRouter } from 'next/navigation';
import {Button} from "@/components/Button";

export default function Pagination({ limit, page, total }: { limit: number, page: number, total: number }) {
    const router = useRouter();

    const handleNavigation = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage.toString());
        params.set('limit', limit.toString());
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    return (
        <div className={"flex gap-3 items-center border-t-[1px] border-solid border-slate-200 pt-4"}>
            {<Button disabled={page == 1} onClick={() => handleNavigation(page - 1)}>Page précédente</Button>}
            {<Button disabled={!(page * limit < total )} onClick={() => handleNavigation(page + 1)}>Page suivante</Button>}
            <span className={'font-medium opacity-50 text-sm'}>
                Page {page} sur {Math.ceil(total / limit)} ({total} éléments)
            </span>
        </div>
    );
}
