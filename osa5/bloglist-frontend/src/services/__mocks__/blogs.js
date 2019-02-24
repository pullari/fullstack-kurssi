let token

const notes = [
  {
    id: '5c61733dd6e236546075f11b',
    title: 'Jokin hieno uusi blogi asia',
    author: 'Samuli Rouvinen',
    url: 'jotain.com/uudempi',
    likes: 5,
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Tärkeä blogi',
    author: 'Martti',
    url: 'jotain.com/vanha',
    likes: 0,
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'Miksi testaus on tärkeää',
    author: 'Hessu',
    url: 'testi.com/uudempi',
    likes: 12,
  },
]

const getAll = () => {
  return Promise.resolve(notes)
}

const setToken = (param) => {
  token = param
}

export default { getAll, setToken }