document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typing-text");
    const text = "Selamat Datang di Portofolio Saya";
    let charIndex = 0;
    let isTyping = false;

    function typeEffect() {
        if (charIndex < text.length) {
            textElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 75); // Kecepatan mengetik lebih smooth
        } else {
            isTyping = false; // Selesai mengetik
        }
    }

    function startTyping() {
        if (!isTyping) {
            isTyping = true;
            charIndex = 0;
            textElement.textContent = ""; // Reset teks sebelum mengetik ulang
            typeEffect();
        }
    }

    // Intersection Observer untuk mendeteksi saat elemen muncul di viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTyping();
            }
        });
    }, { threshold: 0.5 }); // Jalankan jika 50% elemen terlihat

    observer.observe(textElement); // Observasi elemen typing-text
});
