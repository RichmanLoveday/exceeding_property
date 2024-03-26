function PageHeader({ title, children }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <h1 className="py-10 text-2xl font-semibold text-left">{title}</h1>
      {children}
    </div>
  );
}

export default PageHeader;
