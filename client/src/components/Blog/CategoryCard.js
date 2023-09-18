import { Link } from 'react-router-dom';

const CategoryCard = (props) => {
  return (
    <Link
      className="relative cursor-pointer hover:shadow-sm space-y-8 flex flex-col justify-between md:min-h-[178px]"
      to={props.link}>
      <div className="flex before:rounded-lg before:block before:absolute before:-inset-[5px] before:top-[5px] before:left-2 relative sm:max-w-none h-full flex-col">
        <div className="flex flex-1 flex-col bg-white z-20 rounded-lg">
          <div className="flex flex-1 p-6 flex-col h-full space-y-4 dark:bg-slate-950">
            <div className="flex-row flex-1 justify-start space-y-0">
              {/* <span className="bg-teal-100 text-teal-700 inline-flex rounded-3xl p-3 ring-4 ring-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="h-6 w-6"
                  aria-hidden="true">
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
                </svg>
              </span> */}
              <span
                className="group-hover:text-steel transition duration-100 ease-in-out pointer-events-none absolute right-6 top-5 text-gray-300"
                aria-hidden="true">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path>
                </svg>
              </span>
            </div>
            <div className="flex-row justify-end pt-2 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-eclipse">{props.title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
