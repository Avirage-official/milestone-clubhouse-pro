
import NotesApp from "@/app/components/apps/notes";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Work Notes",
};

const BCrumb = [
  {
    to: "/dashboard",
    title: "Home",
  },
  {
    title: "Work Notes",
  },
];
const Notes = () => {

  return (
    <>
     
        <BreadcrumbComp title="Work Notes" items={BCrumb} />
        <NotesApp/>
    </>
  );
};

export default Notes;
