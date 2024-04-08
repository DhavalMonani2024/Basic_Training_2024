function slide(direction)
{
    let width = document.querySelector('.carasoul').getBoundingClientRect().width;
    document.querySelector('.carasoul-container').scrollLeft+=direction==1?width:-width;
}