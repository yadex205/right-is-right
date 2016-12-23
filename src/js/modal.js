window.$modals = {}

document.addEventListener('DOMContentLoaded', function() {
    'use strict'
    var transitionTime = 800
    Array.from(document.querySelectorAll('[data-modal]')).forEach(function(modalSrc) {
        var modal = modalSrc.parentNode.removeChild(modalSrc)
        window.$modals[modal.id] = modal

        modal.$getStatus = function() { return modal.getAttribute('data-modal-status') }
        modal.$setStatus = function(status) { modal.setAttribute('data-modal-status', status) }
        modal.$isMoving = function() {
            return modal.$getStatus() === 'enter' || modal.$getStatus() === 'leave'
        }
        modal.classList.add('modal')
        modal.$setStatus('hidden')

        modal.$open = function() {
            if (modal.$isMoving()) { return }
            modal.style.left = '100%'
            document.body.appendChild(modal)
            modal.$setStatus('enter')
            setTimeout(function() { modal.style.left = '0%' }, 20)
            setTimeout(function() { modal.$setStatus('show') }, transitionTime)
        }
        modal.$close = function() {
            if (modal.$isMoving()) { return }
            modal.$setStatus('leave')
            modal.style.left = '-100%'
            setTimeout(function () {
                modal.parentNode.removeChild(modal)
                modal.$setStatus('hidden')
            }, transitionTime)
        }

        Array.from(modal.querySelectorAll('[data-modal-close]')).forEach(function(modalCloser) {
            modalCloser.addEventListener('click', modal.$close)
        })
    })

    Array.from(document.querySelectorAll('[data-modal-open]')).forEach(function(modalOpener) {
        var targetId = modalOpener.getAttribute('data-modal-open')
        var target = window.$modals[targetId]
        if (!target) { return }
        modalOpener.addEventListener('click', target.$open)
    })
})
