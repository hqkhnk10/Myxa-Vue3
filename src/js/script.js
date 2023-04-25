loadScript('/js/components/validate.js')
loadScript('/js/components/formvalidate.js')
loadScript('/js/components/dialog.js')
loadScript('/js/components/popup.js')
loadScript('/js/components/select.js')
loadScript('/js/components/checkbox.js')
loadScript('/js/components/table.js')
loadScript('/js/components/dropdown.js')
loadScript('/js/components/menu.js')
loadScript('/libs/mcombobox/js/mcombobox.js')

/**
 * load all the scripts
 * @param {*} url 
 */
function loadScript(url)
{    
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}