async function onPageLoaded()
{
    document.title = 'Multi version client demo app';
    document.getElementById('calculator').addEventListener('keydown', (event) => {
        if (event.which == 13) {
            const textarea = document.getElementById('calculator');
            const inputExpr = textarea.value;

            const resultMsg = `Calculation result: ${inputExpr} = ${ eval(inputExpr)}`;
            const resEl = document.createElement('div');
            resEl.innerHTML = resultMsg;
            document.body.appendChild(resEl);

            textarea.value = '';
            alert(resultMsg);
        }
    } );
}

window.addEventListener("load", onPageLoaded);
