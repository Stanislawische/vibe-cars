import { prisma } from "@/prisma/prisma-client";
import { CreateCategoryForm } from "@/shared/components/shared/dashboard/forms/create-category-form/create-category-form";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";

export default async function DashboardCategoriesId(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    const {
        id
    } = params;

    const categories = await prisma.categoryDB.findFirst({
		where: {
			id: Number(id),
		},
	})

    const session = await getUserSession();

    if (!session) {
		return redirect('/access-denied');
	}

    const user = await prisma.userDB.findFirst({
		where: {
			id: Number(session?.id),
		},
	});

    if (!user) {
		return redirect('/access-denied');
	}

    if (!session || session.role !== 'ADMIN') {
		return <div>Доступ запрещен</div>;
	}

    return (
        <CreateCategoryForm values={categories}/>        
    );
}
 
