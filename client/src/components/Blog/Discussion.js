import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@material-tailwind/react';

export const Discussion = (props) => {
  const categoriesTitles =
    props.categories.length > 0 ? props.categories.map((category) => category.title) : [];

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <Breadcrumbs separator=">" className="bg-gray-500 dark:bg-slate-900">
          <Link to="/" className="opacity-60 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <Link to="/discussions" className="opacity-60 dark:text-white">
            Discussions
          </Link>
          <span className="dark:text-white">{props.title}</span>
        </Breadcrumbs>
        {/* PETITS ÉCRANS */}
        <aside className="flex flex-wrap gap-2 mt-5 xl:hidden">
          {categoriesTitles.map((category, index) => (
            <div
              key={index}
              className="uppercase px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-800 dark:bg-slate-800 rounded cursor-pointer hover:bg-gray-500 dark:hover:bg-blue-900">
              {category}
            </div>
          ))}
        </aside>
        <h1 className="text-3xl font-extrabold leading-tight lg:text-4xl">{props.title}</h1>
        <p className="italic">{props.description}</p>
        <address className="flex items-center mb-6 not-italic">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img
              className="mr-4 w-16 h-16 rounded-full"
              src={props.authorAvatar}
              alt={props.author}
            />
            <div>
              <Link to={`/users/${props.idUser}`} rel="author" className="text-xl font-bold">
                {props.author}
              </Link>
              <p className="text-base font-light text-gray-700 dark:text-gray-400">
                Publié le : <time>{props.dateCreation}</time>
                <br />
                Dernière mise à jour : <time>{props.dateUpdate}</time>
              </p>
            </div>
          </div>
        </address>
      </div>
      <div className="xl:flex">
        <div className="xl:flex xl:justify-between mx-auto max-w-screen-xl">
          <article className="mx-auto w-full px-5">
            {props.image && (
              <div className="w-full h-52 max-h-52 mb-10">
                <img src={props.image} alt={props.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>{props.content}</div>
          </article>
        </div>
        <aside className="hidden xl:flex flex-col before:rounded-xl before:block before:absolute before:-inset-[5px] before:top-[5px] before:left-2 relative sm:max-w-none h-full w-full xl:w-auto">
          <div className="block w-full xl:w-96 shrink-0 xl:mb-0 xl:block border dark:border-slate-900 bg-white dark:bg-slate-950 rounded-lg p-6 sm:p-8 py-10 z-20">
            <div className="hidden xl:flex items-center space-x-4 mb-4 xl:mb-0">
              <h2 className="inline sm:block lg:inline xl:block font-semibold tracking-tight text-eclipse text-xl">
                {props.title}
              </h2>
            </div>
            <div className="xl:my-8 mb-6 xl:mb-0">
              <p className="font-normal text-eclipse text-base leading-7">{props.description}</p>
              <hr className="h-px w-full my-8 flex-shrink-0 border-0 bg-cloud/50" />
            </div>
            <div className="xl:my-8 mb-6 xl:mb-0">
              <p className="font-normal text-eclipse text-base leading-7">LIKER ICI</p>
              <p className="font-normal text-eclipse text-base leading-7">Statistiques</p>
              <hr className="h-px w-full my-8 flex-shrink-0 border-0 bg-cloud/50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:grid-cols-1">
              <div className="my-2">
                <div className="flex flex-col space-y-4">
                  <p className="text-sm font-medium text-eclipse/60 uppercase tracking-wide">
                    Catégories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoriesTitles.map((category, index) => (
                      <div
                        key={index}
                        className="uppercase px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-800 dark:bg-slate-800 rounded cursor-pointer hover:bg-gray-500 dark:hover:bg-blue-900">
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center text-sm rounded-lg px-2.5 py-1.5 font-medium text-eclipse select-none bg-[#05a82e]/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="white"
                        viewBox="0 0 256 256"
                        className="mr-2"
                        aria-hidden="true">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                      </svg>
                      Collaboration
                    </span>
                    <span className="inline-flex items-center text-sm rounded-lg px-2.5 py-1.5 font-medium text-eclipse select-none bg-[#05a82e]/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="white"
                        viewBox="0 0 256 256"
                        className="mr-2"
                        aria-hidden="true">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                      </svg>
                      Study Notes
                    </span>
                    <span className="inline-flex items-center text-sm rounded-lg px-2.5 py-1.5 font-medium text-eclipse select-none bg-[#05a82e]/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="white"
                        viewBox="0 0 256 256"
                        className="mr-2"
                        aria-hidden="true">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                      </svg>
                      AI Chat
                    </span>
                    <span className="inline-flex items-center text-sm rounded-lg px-2.5 py-1.5 font-medium text-eclipse select-none bg-[#f45051]/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="white"
                        viewBox="0 0 256 256"
                        className="mr-2"
                        aria-hidden="true">
                        <path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                      </svg>
                      Limited Transcription on Free Plan
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="flex flex-col bg-linen rounded-lg p-4 space-y-4">
                  <button
                    type="button"
                    className="flex flex-col text-center rounded-lg transition duration-100 ease-in-out focus:rounded-lg items-center justify-center bg-transparent ring-1 ring-inset ring-cloud hover:bg-gray-50/80 bg-white dark:bg-slate-950 p-4 shadow-sm text-eclipse font-medium py-3.5 px-2 text-base opacity-100">
                    Ajouter l'article aux favoris
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
  // return (
  //   <div className="flex flex-col gap-3">
  //     <Breadcrumbs
  //       separator={<ArrowLongRightIcon className="h-4 w-4 text-white" strokeWidth={2.5} />}
  //       className="rounded-full border border-white bg-gradient-to-tr from-gray-900 to-gray-800 p-1">
  //       <a href="#" className="rounded-full bg-white px-3 py-1 font-medium text-gray-900">
  //         Docs
  //       </a>
  //       <a href="#" className="rounded-full bg-white px-3 py-1 font-medium text-gray-900">
  //         Components
  //       </a>
  //       <a href="#" className="rounded-full bg-white px-3 py-1 font-medium text-gray-900">
  //         Breadcrumbs
  //       </a>
  //     </Breadcrumbs>
  //     <div className="flex justify-center space-x-2 mb-4">
  //       {categoriesTitles.map((category, index) => (
  //         <div
  //           key={index}
  //           className="uppercase px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-800 dark:bg-slate-800 rounded cursor-pointer hover:bg-gray-500 dark:hover:bg-blue-900">
  //           {category}
  //         </div>
  //       ))}
  //     </div>
  //     <div className="flex justify-between mx-auto max-w-screen-xl">
  //       <article className="mx-auto w-full max-w-2xl">
  //         <div className="mb-4 lg:mb-6">
  //           <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl">
  //             {props.title}
  //           </h1>
  //           <address className="flex items-center mb-6 not-italic my-10">
  //             <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
  //               <img
  //                 className="mr-4 w-16 h-16 rounded-full"
  //                 src={props.authorAvatar}
  //                 alt={props.author}
  //               />
  //               <div>
  //                 <Link to={`/users/${props.idUser}`} rel="author" className="text-xl font-bold">
  //                   {props.author}
  //                 </Link>
  //                 <p className="text-base font-light text-gray-700 dark:text-gray-400">
  //                   Publié le : <time>{props.dateCreation}</time>
  //                   <br />
  //                   Dernière mise à jour : <time>{props.dateUpdate}</time>
  //                 </p>
  //               </div>
  //             </div>
  //           </address>
  //         </div>
  //         {props.image && (
  //           <div className="w-full h-52 max-h-52">
  //             <img src={props.image} alt={props.title} className="w-full h-full object-cover" />
  //           </div>
  //         )}
  //         <div className="italic my-10">{props.description}</div>
  //         <div>{props.content}</div>
  //       </article>
  //     </div>
  //   </div>
  // );
};
