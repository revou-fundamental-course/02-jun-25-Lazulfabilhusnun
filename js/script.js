document.addEventListener('DOMContentLoaded', function() {
    // Sambutan dengan nama
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');
    const welcomeMessage = document.getElementById('welcome-message');
    
    if (nameParam) {
        welcomeMessage.textContent = `Hi ${nameParam}, Selamat Datang di websitse coba-coba saya`;
    }
    
    // Toggle menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Validasi form
    const contactForm = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation flags
        let isValid = true;
        
        // Name validation
        if (name === '') {
            showError('name-error', 'Nama tidak boleh kosong');
            isValid = false;
        } else if (name.length < 3) {
            showError('name-error', 'Nama minimal 3 karakter');
            isValid = false;
        }
        
        // Email validation
        if (email === '') {
            showError('email-error', 'Email tidak boleh kosong');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Email tidak valid');
            isValid = false;
        }
        
        // Phone validation
        if (phone === '') {
            showError('phone-error', 'Nomor telepon tidak boleh kosong');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone-error', 'Nomor telepon tidak valid');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            showError('message-error', 'Pesan tidak boleh kosong');
            isValid = false;
        } else if (message.length < 10) {
            showError('message-error', 'Pesan minimal 10 karakter');
            isValid = false;
        }
        
        // If form is valid, show result
        if (isValid) {
            showFormResult(name, email, phone, message);
            contactForm.reset();
        }
    });
    
    // Helper functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[0-9]{10,13}$/;
        return re.test(phone);
    }
    
    function showFormResult(name, email, phone, message) {
        formResult.innerHTML = `
            <h3>Terima Kasih Telah Menghubungi Kami</h3>
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Nomor Telepon:</strong> ${phone}</p>
            <p><strong>Pesan:</strong> ${message}</p>
        `;
        formResult.style.display = 'block';
        
        // Scroll to result
        formResult.scrollIntoView({ behavior: 'smooth' });
    }
});