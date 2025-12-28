const SidebarLayout = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <div className="w-full px-(--default-margin-sm) sm:px-(--default-margin-lg) 2xl:pr-70 flex gap-8">
      <aside className="hidden lg:block">{left}</aside>
      {right}
    </div>
  );
};

export default SidebarLayout;
