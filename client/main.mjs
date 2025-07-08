var gServerUrl = '';

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
    const newClientUrl = `${gServerUrl}/client_versions/${clientVersion}/main.html`;
    // redirect to the new URL
    window.location.href = newClientUrl;
}

async function onPageLoaded()
{
    document.title = 'Multi version client demo app';

    // assemble local backend URL
    gServerUrl = `${window.location.protocol}//${window.location.host}`;

    // fetch local frontend's accessible versions (and fill the option list!)
    const response = await fetch(`${gServerUrl}/api/client_versions`);
    const fileList = await response.json();

    fileList.forEach(folder => {
        const optionEl = document.createElement('option');
        optionEl.value = folder.name;
        optionEl.innerText = folder.name;
        document.getElementById('client-versions').appendChild(optionEl);
    })


    document.getElementById('calculator').addEventListener('keydown', onTextKeyDown);
    document.getElementById('client-versions').addEventListener('change', onAppVersionChanged);
}

window.addEventListener("load", onPageLoaded);
