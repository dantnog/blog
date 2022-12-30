const btnbase = 'px-3 py-1 text-gray-200 disabled:opacity-30'

export const Styles = {
  window: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-screen min-h-screen',

  header: 'w-full bg-gray-800 p-4 flex justify-between place-items-center text-gray-200',
  headerh2: 'text-2xl font-semibold text-sky-400',
  nav: 'space-x-2',

  centerbox: 'flex justify-center',
  rightbox: 'flex justify-end',

  linkbutton: `${btnbase} hover:bg-sky-500/50 rounded-md`,
  pributton: `${btnbase} bg-sky-600 hover:bg-sky-500 rounded-md`,
  pributtongroup: `${btnbase} bg-sky-600 hover:bg-sky-500`,
  secbutton: `${btnbase} bg-gray-600 hover:bg-gray-500 rounded-md`,
  secbuttongroup: `${btnbase} bg-gray-600 hover:bg-gray-500`,
  danbutton: `${btnbase} bg-red-600 hover:bg-red-500 rounded-md`,
  danbuttongroup: `${btnbase} bg-red-600 hover:bg-red-500`,

  home: 'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-screen p-4 sm:p-8',
  figure: 'bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-md',
  figimage: 'bg-gray-300 object-cover h-36',
  figcaption: 'p-4 space-y-2',
  figtitle: 'text-lg font-semibold truncate',
  figdesc: '',
  figdate: 'text-xs',
  groupbutton: 'flex rounded-md overflow-hidden',

  newpost: 'mx-auto max-w-xl py-4 sm:py-8 px-4',
  form: 'p-4 bg-gray-200 dark:bg-gray-800 space-y-4 rounded-md',
  formh2: 'text-2xl text-sky-400 font-semibold mb-4 mt-2',
  formcontrol: 'flex flex-col',
  label: 'block text-sm',
  inputtext: 'block px-2 py-1 border-2 border-gray-500/50 bg-gray-100 dark:bg-gray-900 outline-none focus:ring-4 ring-sky-500/50 rounded-md',
  formbuttons: 'flex justify-end space-x-4',
  inputspan: 'text-sm font-semibold text-amber-500',

  postpage: 'max-w-2xl mx-auto space-y-4 my-4',
  postbuttons: 'flex',
  postimage: 'object-cover h-60 bg-gray-500/50',
  posth1: 'text-sky-400 text-3xl',
  postdesc: 'text-xl',
  postdate: 'ml-8',
  posttext: '',

  userform: 'mx-auto max-w-sm py-4 sm:py-8 px-4',
}