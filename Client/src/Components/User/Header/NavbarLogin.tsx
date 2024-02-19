import React from 'react'

function NavbarLogin() {
  return (
    <>
  {/* component */}
  {/*
Change class "fixed" to "sticky" in "navbar" (l. 33) so the navbar doesn't hide any of your page content!
*/}
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n    ul.breadcrumb li+li::before {\n        content: "\\276F";\n        padding-left: 8px;\n        padding-right: 4px;\n        color: inherit;\n    }\n\n    ul.breadcrumb li span {\n        opacity: 60%;\n    }\n\n    #sidebar {\n        -webkit-transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);\n        transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);\n    }\n\n    #sidebar.show {\n        transform: translateX(0);\n    }\n\n    #sidebar ul li a.active {\n        background: #1f2937;\n        background-color: #1f2937;\n    }\n'
    }}
  />
  {/* Navbar start */}
  <nav
    id="navbar"
    className="flex w-full flex-row justify-end border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700 px-1 sm:justify-between"
  >
    <ul className="breadcrumb hidden flex-row items-center py-4 text-m text-white sm:flex">
      <li className="inline">
        <a href="#">Category</a>
      </li>
      <li className="inline">
        <span>Homepage</span>
      </li>
      <li className="inline">
        <span>Homepage</span>
      </li>
     
    </ul>
    
  </nav>
  {/* Navbar end */}
  {/* Sidebar start*/}
  <div id="containerSidebar" className="z-40">
    <div className="navbar-menu relative z-40">
      <nav
        id="sidebar"
        className="fixed left-0 bottom-0 flex w-3/4 -translate-x-full flex-col overflow-y-auto bg-gray-700 pt-6 pb-8 sm:max-w-xs lg:w-80"
      >
        {/* one category / navigation group */}
        <div className="px-4 pb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
            Main
          </h3>
          <ul className="mb-8 text-sm font-medium">
            <li>
              <a
                className="active flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                href="#homepage"
              >
                <span className="select-none">Homepage</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                href="#link1"
              >
                <span className="select-none">link1</span>
              </a>
            </li>
          </ul>
        </div>
        {/* navigation group end*/}
        {/* example copies start */}
        <div className="px-4 pb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
            Legal
          </h3>
          <ul className="mb-8 text-sm font-medium">
            <li>
              <a
                className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                href="#tc"
              >
                <span className="select-none">Terms and Condition</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                href="#privacy"
              >
                <span className="select-none">Privacy policy</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                href="#imprint"
              >
                <span className="select-none">Imprint</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="px-4 pb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
            Others
          </h3>
          <ul className="mb-8 text-sm font-medium">
            <li>
              <a
                className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                href="#ex1"
              >
                <span className="select-none">...</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                href="#ex2"
              >
                <span className="select-none">...</span>
              </a>
            </li>
          </ul>
        </div>
        {/* example copies end */}
      </nav>
    </div>
    <div className="mx-auto lg:ml-80" />
  </div>
  {/* Sidebar end */}
  <main>{/* your content goes here */}</main>
</>
   
    
  )
}

export default NavbarLogin



