import data from '../fixtures/data.json'


describe('Sabi Web Application', () => {
  beforeEach(() => {
    cy.visit(data.staging.url)
    //Login
    cy.get("input[placeholder='Email Address']").click().type(data.staging.username)
    cy.get("input[placeholder='Enter Password']").click().type(data.staging.password)
    cy.get('.login-btn').click()
  })

  it('Create Manufacturer', () => {
    cy.get('.side-nav-toggle.pointer.color-white.ng-tns-c93-0').click() //Click Hamburger Menu 

    cy.get(':nth-child(8) > .pointer > .icon-holder').click() //Product Menu 
    cy.wait(3000)

    cy.get('.side-nav .side-nav-inner ul li:nth-child(8) ul li a[href="/manufacturers"]').click() //Click Manufacturer Menu

    cy.get('.btn > span').click() //click add button 

    cy.get('form.ng-untouched > .row > :nth-child(1) > .form-control').type(data.staging.manu_name) //Enter Manufacturer name 
    cy.get(':nth-child(2) > .form-control').type(data.staging.manu_address) //Enter Manufacturer address 

    cy.wait(3000)
    cy.get('form.ng-dirty > .btn').click();  //Click Create button 

    cy.get('#swal2-content').should('have.text', 'Manufacturer was succesfully created')//Confirm manufacturer created 

    cy.get('.swal2-confirm').click() //Click OK 

  })


  it('Create Brand', () => {
    cy.get('.side-nav-toggle.pointer.color-white.ng-tns-c93-0').click() //Click Hamburger Menu 

    cy.get(':nth-child(8) > .pointer > .icon-holder').click() //Product Menu 
    cy.wait(3000)

    cy.get('.side-nav .side-nav-inner ul li:nth-child(8) ul li a[href="/brand"]').click() //Click Brand Menu

    cy.get('.btn').click() //Click add brand button 

    cy.get('form.ng-untouched > .row > :nth-child(1) > .form-control').type(data.staging.brand_name) //Enter Brand name 

    cy.get('.ng-arrow-wrapper').then(($el) => { //Select the manufacturer
      cy.wrap($el).click()
      cy.contains(data.staging.manu_name).click()
    })

    cy.get('.row > :nth-child(3) > .form-control').type(data.staging.brand_desc) //Enter brand description 

    cy.get('form.ng-touched > .btn').click() //Click create button 

    cy.get('#swal2-content').should('have.text', 'Brand was succesfully created') // confirm brand was created successfully

    cy.get('.swal2-confirm').click()


  })

  it('Create Product', () => {
    cy.get('.side-nav-toggle.pointer.color-white.ng-tns-c93-0').click() //Click Hamburger Menu 

    cy.get(':nth-child(8) > .pointer > .icon-holder').click() //Product Menu 
    cy.wait(3000)

    cy.get('.side-nav .side-nav-inner ul li:nth-child(8) ul li a[href="/catalogs"]').click() //Click Product catalog Menu

    cy.get('.page-title > .btn > span').click() //Click add product button 

    cy.get(':nth-child(1) > .col-md-12 > .form-control').type(data.staging.product_name) //Enter Product name 

    cy.get('ng-select[placeholder=\'Select Brands\'] span[class=\'ng-arrow-wrapper\']').then(($el) => { //select brand
      cy.wrap($el).click()
      cy.contains(data.staging.brand_name).click()
    })

    cy.get(':nth-child(3) > .col-md-12 > .ng-select > .ng-select-container > .ng-arrow-wrapper').then(($el) => { //select manufactrer
      cy.wrap($el).click()
      cy.contains(data.staging.manu_name).click()
    })

    cy.get(':nth-child(4) > .col-md-12 > .ng-select > .ng-select-container > .ng-arrow-wrapper').then(($el) => { //Select category
      cy.wrap($el).click()
      cy.contains(data.staging.category).click()
    })

    cy.get(':nth-child(5) > .col-md-12 > .ng-select > .ng-select-container > .ng-arrow-wrapper').then(($el) => { //Select sub category
      cy.wrap($el).click()
      cy.contains(data.staging.sub_category).click()
    })

    cy.get(':nth-child(6) > .col-md-12 > .form-control').type(data.staging.product_desc) //Enter product description 

    cy.get('.btn').click(); //Click create button 

    cy.get('#swal2-content').should('have.text', 'Product Catelogue was succesfully created') //confimr product was created

    cy.get('.swal2-confirm').click()

  })

  it.only('Approve product', () => {
    cy.get('.side-nav-toggle.pointer.color-white.ng-tns-c93-0').click() //Click Hamburger Menu 

    cy.get(':nth-child(8) > .pointer > .icon-holder').click() //Product Menu 
    cy.wait(3000)

    cy.get('.side-nav .side-nav-inner ul li:nth-child(8) ul li a[href="/catalogs"]').click() //Click product catalog Menu

    cy.get("a[class='btn btn-sm btn-default'] span").click() //Click awaiting approval button 
    cy.wait(3000)

    cy.get(':nth-child(1) > :nth-child(4) > .mrg-top-10 > .user-profile > .dropdown-toggle > .fa').click() //click on the action button for the product

    cy.get(':nth-child(1) > :nth-child(4) > .mrg-top-10 > .user-profile > .dropdown-menu > :nth-child(1) > .ng-star-inserted > span').click() //Approve the product item

    cy.get('.swal2-confirm').click() //click on approve

    cy.get('#swal2-content').should('have.text', 'Successfully  Approveed') //confimr the item was approved

    cy.get('.swal2-confirm')

  })

})