const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes',() => {
  test('for populated blog array', () => {
    const blogs = [
      {
        title: 'testaaminen',
        author: 'Samuli',
        url: 'ei ole',
        likes: 5
      },
      {
        title: 'jotain muuta',
        author: 'joku muu',
        url: 'löytyy',
        likes: 2
      },
      {
        title: 'testaaminen',
        author: 'Samuli',
        url: 'ei ole',
        likes: 0
      },
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(7)
  }),
  test('for array of one blog', () => {
    const blogs = [
      {
        title: 'testaaminen',
        author: 'Samuli',
        url: 'ei ole',
        likes: 5
      }
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  }),
  test('of empty is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe('Favorite blog', () => {
  test('from populated blog array', () => {
    const blogs = [
      {
        title: 'testaaminen',
        author: 'Samuli',
        url: 'ei ole',
        likes: 5
      },
      {
        title: 'jotain muuta',
        author: 'joku muu',
        url: 'löytyy',
        likes: 2
      },
      {
        title: 'testaaminen',
        author: 'Samuli',
        url: 'ei ole',
        likes: 0
      },
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  }),
  test('from array with one blog', () => {
    const blogs = [
      {
        title: 'jotain muuta',
        author: 'joku muu',
        url: 'löytyy',
        likes: 2
      }
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })
})

describe('Most blogs', () => {
  test('from populated blog array', () => {
    const blogs = [
      {
        id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
      {
        id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      },
      {
        id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      },
      {
        id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
      },
      {
        id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
      }
    ]
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('Most like', () => {
  test('from populated blog array', () => {
    const blogs = [
      {
        id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
      {
        id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      },
      {
        id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      },
      {
        id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
      },
      {
        id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
      }
    ]
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})