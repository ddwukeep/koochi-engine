import './threejs-override.js'
import { Game } from './Game/Game.js'
import consoleLog from './data/consoleLog.js'

const contractAddress = '0xb7a2cf03ccac98fbf7e5e9e8016a06a0b5bddc96'
const caTrigger = document.querySelector('.js-ca-trigger')
const caPopover = document.querySelector('.js-ca-popover')
const caCopy = document.querySelector('.js-ca-copy')
const caCopyLabel = document.querySelector('.js-ca-copy-label')

const setCaPopoverOpen = (open) =>
{
    caTrigger.setAttribute('aria-expanded', String(open))
    caPopover.setAttribute('aria-hidden', String(!open))
    caPopover.classList.toggle('is-visible', open)
}

caTrigger.addEventListener('click', () =>
{
    setCaPopoverOpen(caTrigger.getAttribute('aria-expanded') !== 'true')
})

caCopy.addEventListener('click', async () =>
{
    try
    {
        await navigator.clipboard.writeText(contractAddress)
    }
    catch
    {
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(document.querySelector('.js-ca-address'))
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('copy')
        selection.removeAllRanges()
    }

    caCopy.classList.add('is-copied')
    caCopyLabel.textContent = 'Copied'

    window.setTimeout(() =>
    {
        caCopy.classList.remove('is-copied')
        caCopyLabel.textContent = 'Copy'
    }, 1600)
})

document.addEventListener('click', (event) =>
{
    if(!event.target.closest('.ca-control'))
        setCaPopoverOpen(false)
})

document.addEventListener('keydown', (event) =>
{
    if(event.key === 'Escape')
        setCaPopoverOpen(false)
})

if(import.meta.env.VITE_LOG)
    console.log(
        ...consoleLog
    )

if(import.meta.env.VITE_GAME_PUBLIC)
    window.game = new Game()
else
    new Game()
