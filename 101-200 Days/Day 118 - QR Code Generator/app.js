document.getElementById('generate-btn').addEventListener('click', function () {
    // Clear any previous QR code
    document.getElementById('qrcode').innerHTML = "";

    const inputText = document.getElementById('qr-input').value.trim();
    if (!inputText) {
        alert("Please enter text or URL to generate a QR Code");
        return;
    }

    new QRCode(document.getElementById('qrcode'), {
        text: inputText,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
});
