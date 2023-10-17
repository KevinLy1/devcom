const CategoryCard = (props) => {
  return (
    <a
      className="relative cursor-pointer hover:shadow-sm space-y-8 flex flex-col justify-between md:min-h-[178px]"
      href={props.link}>
      <div className="flex before:rounded-lg before:block before:absolute before:-inset-[5px] before:top-[5px] before:left-2 relative sm:max-w-none h-full flex-col">
        <div className="flex flex-1 flex-col bg-white z-20 rounded-lg">
          <div className="flex flex-1 p-6 flex-col h-full space-y-4 dark:bg-slate-950">
            <div className="flex-row flex-1 justify-start space-y-0">
              <span className="absolute right-6 top-5" aria-hidden="true">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path>
                </svg>
              </span>
            </div>
            <div className="flex-row justify-end pt-2 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{props.title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
