document.addEventListener('DOMContentLoaded', function() {
    Array.from(document.querySelectorAll('.page-footer .link-item a')).forEach(function(anchor) {
        var target = anchor.getAttribute('href')
        anchor.onclick = function () {
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
            return false
        }
    })

    var pageWrapper = document.querySelector('.page-wrapper')

    function checkLogoShouldBeLarge () {
        var logo = document.querySelector('.rir-header-logo')
        logo.style.width = pageWrapper.scrollTop < 100 ? '360px' : '240px'
    }

    pageWrapper.addEventListener('scroll', checkLogoShouldBeLarge)

    checkLogoShouldBeLarge()
})
