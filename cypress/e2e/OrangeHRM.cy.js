/// <reference types = 'cypress'/>

describe ('Automation of landing page', ()=> {
    beforeEach(()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
    it('Validate user lands on the landing Page', ()=>{
        
        cy.get('.orangehrm-login-branding > img').should('be.visible')
    })

    it('User can log in', ()=>{
        // cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.login('Admin', 'admin123')
    })

    it('validate user can not login with invalid credentials', ()=>{
        // cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
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

    it('User can cLICK Admin tab', ()=>{
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
    it.only('User can cLICK Admin tab', ()=>{
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