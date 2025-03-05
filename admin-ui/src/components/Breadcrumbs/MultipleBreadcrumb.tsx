import Link from "next/link";

interface MultipleBreadcrumbProps {
  pages: {
    label: string;
    path: string;
  }[];
}

const MultipleBreadcrumb = ({ pages }: MultipleBreadcrumbProps) => {
  const pageName = pages[pages.length - 1].label;

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard
            </Link>
          </li>
          {pages.map((page, index) => (
            <li key={index} className="font-medium">
              <span>/ </span> 
              <Link className="text-primary" href={page.path}>
                {page.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default MultipleBreadcrumb;
