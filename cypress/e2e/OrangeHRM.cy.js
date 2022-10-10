import data from '../fixtures/data.json'

/// <reference types = 'cypress'/>

describe ('Automation of landing page', ()=> {
    beforeEach(()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
    it('Validate user lands on the landing Page', ()=>{
        
        cy.get('.orangehrm-login-branding > img').should('be.visible')
    })
    it('User can log in', ()=>{
        cy.login('Admin', 'admin123')
    })
    it('validate user can not login with invalid credentials', ()=>{
        cy.login('Admin', 'admin123')
        cy.get('.oxd-alert').should('be.visible').and('have.text', 'Invalid credentials')
    })
    it('User can log out', ()=>{
        // login
        cy.login('Admin', 'admin123')
        cy.wait(2000)

        // log out
        cy.get('.oxd-userdropdown-tab > .oxd-icon').click()
        cy.get(':nth-child(4) > .oxd-userdropdown-link').click()
        cy.get('.oxd-text--h5').should('have.text','Login')
    })
    it('User can click Admin tab', ()=>{
        cy.login('Admin', 'admin123')
        cy.wait(2000)
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('be.visible')
    })
    it('user should be able to click PIM', ()=>{
        cy.login('Admin', 'admin123')
        cy.wait(2000)
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('be.visible')
        cy.get(':nth-child(2) > .oxd-main-menu-item').click()  
    })
    it('Create an Employee', ()=>{
        cy.login('Admin', 'admin123')
        cy.wait(2000)
        
        // navigate to PIM module and click on Add Button
        cy.get(':nth-child(2) > .oxd-main-menu-item').click()
        cy.get('.orangehrm-header-container > .oxd-button').click()

        //Enter employee fill name and ID
        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type(data.OrangeHRM.employeeFirstName)
        cy.get(':nth-child(2) > :nth-child(2) > .oxd-input').type(data.OrangeHRM.employeeMiddleName)
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type(data.OrangeHRM.employeeLastName)
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(data.OrangeHRM.employeeID)
        
        //cy.screenshot('image')
        // cy.get('.employee-image')
        // .attachFile('../screenshots/image.png');

        //create login details
        cy.get('.oxd-switch-input').click()
        cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type(data.OrangeHRM.username)
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(data.OrangeHRM.password)
        cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(data.OrangeHRM.password)
        cy.get('.oxd-button--secondary').click()
        
        //assert that employee is created
        cy.get('.oxd-text--toast-message').should('have.text','Successfully Saved')
        //cy.get('.orangehrm-edit-employee-content > :nth-child(1) > .oxd-text--h6').should('be.visible')
        cy.wait(6000)

        cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button').click()
        cy.wait(5000)
        cy.get('.orangehrm-card-container > .oxd-form > .oxd-form-actions > .oxd-button').click()
        cy.wait(5000)
       
        //search for employee by employee id
        cy.get(':nth-child(2) > .oxd-main-menu-item').click()
        cy.wait(5000)
        cy.get(':nth-child(2) > .oxd-input').type(data.OrangeHRM.employeeID)
        cy.get('.oxd-form-actions > .oxd-button--secondary').click({force: true})
        cy.wait(5000)
        cy.get('.oxd-table-card > .oxd-table-row > :nth-child(3) > div').should('have.text',data.OrangeHRM.employeeFirstName + ' ' + data.OrangeHRM.employeeMiddleName)


        //search for employee by employee name
        cy.get(':nth-child(2) > .oxd-main-menu-item').click()
        cy.wait(5000)
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').type(data.OrangeHRM.employeeFirstName)
        cy.get(':nth-child(2) > .oxd-input').type(data.OrangeHRM.employeeID)
        cy.get('.oxd-form-actions > .oxd-button--secondary').click({force: true})
        cy.wait(5000)
        cy.get('.oxd-table-card > .oxd-table-row > :nth-child(3) > div').should('have.text',data.OrangeHRM.employeeFirstName + ' ' + data.OrangeHRM.employeeMiddleName)

    })
    it.only('create an Admin', ()=>{
        cy.login('Admin','admin123')
        cy.wait(2000)

        // click on the admin tab and click on add button
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        cy.get('.orangehrm-header-container > .oxd-button').click()

        //select role
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
        cy.contains('ESS').click()

        //select employee name
        cy.get('.oxd-autocomplete-text-input > input').type(data.OrangeHRM.employeeFirstName)
        cy.wait(2000)
        cy.contains(data.OrangeHRM.employeeFirstName + ' ' + data.OrangeHRM.employeeMiddleName + ' ' + data.OrangeHRM.employeeLastName).click()

        //select employee status
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
        cy.contains('Enabled').click()

        //Enter admin username and password
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(data.OrangeHRM.AdminUsername)
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(data.OrangeHRM.password)
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(data.OrangeHRM.password)
        cy.wait(2000)
        //click submit
        cy.get('.oxd-button--secondary').click()
        cy.get('.oxd-text--toast-message').should('have.text','Successfully Saved')
        
    })
    it('User can add an Admin', ()=>{
        cy.login('Admin', 'admin123')
        cy.wait(2000)

        // click on Admin tab
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('be.visible')

        // create a add button
        cy.get('.orangehrm-header-container > .oxd-button').click()

        // select a user role
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').then(()=>{
            cy.get('.oxd-select-dropdrown > :nth-child(2)').click()
        })        

    })
})