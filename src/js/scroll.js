document.addEventListener('DOMContentLoaded', function() {
    Array.from(document.querySelectorAll('.page-footer .link-item a')).forEach(function(anchor) {
        var target = anchor.getAttribute('href')
        anchor.onclick = function () {
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
            return false
        }
    })
})
