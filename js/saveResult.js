// saveResult.js

function saveResultAsPNG() {
    var resultContainer = document.getElementById('resultContainer');
    var saveAsPNGButton = document.getElementById('saveAsPNGButton');

    // Temporarily remove the "Save as PNG" button
    if (saveAsPNGButton) {
        saveAsPNGButton.style.display = 'none';
    }

    var currentTime = new Date().getTime(); // Get the current time

    html2canvas(resultContainer, { backgroundColor: 'white', scale: 2 }).then(function (canvas) {
        // Convert canvas to data URL
        var dataURL = canvas.toDataURL('image/png');

        // Create a link element and trigger a download
        var a = document.createElement('a');
        a.href = dataURL;
        a.download = `(OkeyMeta)_Ataoja_eResult_Checker_${currentTime}.png`; // Updated download attribute
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Reinsert the "Save as PNG" button
        if (saveAsPNGButton) {
            saveAsPNGButton.style.display = 'block';
        }
    });
}


function saveResultAsPDF() {
    var resultContainer = document.getElementById('resultContainer');

    html2pdf(resultContainer, {
        margin: 10,
        filename: 'result.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}


