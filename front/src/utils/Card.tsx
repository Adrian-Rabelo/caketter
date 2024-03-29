import { ReactNode } from "react";
export default function Card({title, text, textButton, image, imageAlt} : any) {

  interface Props {
    children: ReactNode;
  }


  return (
    <>
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
          <img
            className="rounded-t-lg object-cover w-full h-40"
            src={image}
            alt={imageAlt}
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 h-20 overflow-hidden">
              {text}
            </p>
            { textButton ? (
              <>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              {textButton}
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            </>
            ): null}
          </a>
        </div>
      </div>
      
    </>
  );
}
