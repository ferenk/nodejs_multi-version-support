
function onTextKeyDown(event)
{
    if (event.which == 13) {
        const textarea = document.getElementById('calculator');
        const inputExpr = textarea.value;

        const resultMsg = `Calculation result: ${inputExpr} = ${ eval(inputExpr) }`;  // "+1" (the "bug") is fixed
        const resEl = document.createElement('div');
        resEl.innerHTML = resultMsg;
        document.body.appendChild(resEl);

        textarea.value = '';
        alert(resultMsg);
    }
}

function onAppVersionChanged(event)
{
    const clientVersion = event.target.value;
    const newClientUrl = `${window.location.protocol}//${window.location.host}/client_versions/${clientVersion}/main.html`;
    // redirect to the new URL
    window.location.href = newClientUrl;
}

async function onPageLoaded()
{
    document.title = 'Multi version client demo app';

    document.getElementById('calculator').addEventListener('keydown', onTextKeyDown);
    document.getElementById('client-versions').addEventListener('change', onAppVersionChanged);
}

window.addEventListener("load", onPageLoaded);
