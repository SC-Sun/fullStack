// eslint-disable quotes

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset` )
      .then(res => console.err(res))
    const user = {
      name: 'sun',
      username: 'sun',
      password: 'abcd',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    const userNew = {
      name: 'coco',
      username: 'coco',
      password: '123',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, userNew)
  })
})
it('Login form is shown', function() {
  cy.visit('')
  cy.contains('login')
})

it('succeeds with correct credentials', function() {
  cy.visit('')
  cy.contains('login').click()
  cy.get('#username').type('sun')
  cy.get('#password').type('abcd')
  cy.get('#login').click()
})

it('fails with wrong credentials', function() {
  cy.visit('')
  cy.contains('login').click()
  cy.get('#username').type('sun')
  cy.get('#password').type('aaaa')
  cy.get('#login').click()
  cy.get('#notification')
  cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    .and('contain', 'Wrong username or password')

  cy.get('html').should('not.contain', 'sun logged in')

})


describe('When logged in', function () {
  beforeEach(function () {
    cy.login({ username: 'try', password: 'cocoSchrader' })
  })


  it('a new blog can be created', function () {
    cy.contains('New Blog').click()
    cy.get('#title').type('created with cypress')
    cy.get('#author').type('Joe')
    cy.get('#url').type('www.example.com')
    cy.get('#create').click()
    cy.contains('created with cypress by Joe added')
  })

  it('blog can be liked', function () {
    cy.createBlog({
      title: 'created with cypress',
      author: 'Joe',
      url: 'www.example.com',
    })
    cy.get('#view').click()
    cy.contains('Likes: 0')
    cy.get('#like_btn').click()
    cy.contains('Likes: 1')
  })

  it('blogs are in descending order by likes', function () {
    cy.get('#view').click()
    cy.get('.blog').eq(0).should('contain', 'created with cypress by Joe')
    cy.get('.blog').eq(1).should('contain', 'created with cypress by Joe')
  })
})

describe('When logged in only the post entry creator can delete it', function () {
  beforeEach(function () {
    cy.login({ username: 'sunny', password: 'sunny' })
    cy.createBlog({
      title: 'sunny_blog',
      author: 'sunny',
      url: 'wwww',
    })
    cy.login({ username: 'sunny', password: 'sunShine' })

    cy.createBlog({
      title: 'sunny_blog_new',
      author: 'sunShine',
      url: 'wwww',
    })

    it('removing blogs', function () {
      cy.contains('sunny_blog by sunny')
        .parent()
        .find('button')
        .should('contain', 'View')
        .click()
      cy.contains('sunny_blog by sunny')
        .parent()
        .parent()
        .find('button')
        .should('not.contain', 'delete')

      cy.contains('sunny_blog_new')
        .parent()
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('sunny_blog_new')
        .parent()
        .find('button')
        .should('contain', 'Remove')
      cy.get('.remove-btn').click()
      cy.contains('sunny_blog_new by sunShine').should('not.exist')
    })
  })


})

