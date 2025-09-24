/**
 * Sistema de Formulario de Contacto
 * Maneja validaciones, APIs de países/ciudades y envío de datos
 */

export class ContactForm {
    constructor() {
        this.form = null;
        this.modal = null;
        this.isSubmitting = false;
        this.countriesData = {};
        this.phonePatterns = {};

        this.init();
    }

    async init() {
        this.bindElements();
        this.bindEvents();
        await this.loadCountriesData();
        await this.loadPhoneCodesData();
        this.setupFormValidation();
    }

    bindElements() {
        this.modal = document.getElementById('contact-modal');
        this.form = document.getElementById('contact-form');
        this.closeBtn = document.getElementById('contact-modal-close');

        // Form fields
        this.fields = {
            nombres: document.getElementById('nombres'),
            apellidos: document.getElementById('apellidos'),
            fechaNacimiento: document.getElementById('fecha_nacimiento'),
            edad: document.getElementById('edad'),
            correo: document.getElementById('correo'),
            indicativo: document.getElementById('indicativo'),
            telefono: document.getElementById('telefono'),
            pais: document.getElementById('pais'),
            ciudad: document.getElementById('ciudad')
        };
    }

    bindEvents() {
        // Abrir modal desde botones CTA
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-cta')) {
                e.preventDefault();
                this.openModal();
            }
        });

        // Cerrar modal
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('show')) {
                this.closeModal();
            }
        });

        // Form events
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Calcular edad automáticamente
            this.fields.fechaNacimiento?.addEventListener('change', () => this.calculateAge());

            // Validar email en tiempo real
            this.fields.correo?.addEventListener('blur', () => this.validateEmail());

            // Validar teléfono en tiempo real
            this.fields.telefono?.addEventListener('input', () => this.validatePhone());

            // Cambio de país
            this.fields.pais?.addEventListener('change', () => this.handleCountryChange());

            // Validaciones en tiempo real
            Object.values(this.fields).forEach(field => {
                field?.addEventListener('input', () => this.validateField(field));
                field?.addEventListener('blur', () => this.validateField(field));
            });
        }
    }

    async loadCountriesData() {
        try {
            // Datos de países de África y Europa con sus ciudades principales
            this.countriesData = {
                // Europa
                'ES': {
                    name: 'España',
                    cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao']
                },
                'FR': {
                    name: 'Francia',
                    cities: ['París', 'Marsella', 'Lyon', 'Toulouse', 'Niza', 'Nantes', 'Estrasburgo', 'Montpellier', 'Burdeos', 'Lille']
                },
                'IT': {
                    name: 'Italia',
                    cities: ['Roma', 'Milán', 'Nápoles', 'Turín', 'Palermo', 'Génova', 'Bolonia', 'Florencia', 'Bari', 'Catania']
                },
                'DE': {
                    name: 'Alemania',
                    cities: ['Berlín', 'Hamburgo', 'Múnich', 'Colonia', 'Fráncfort', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig']
                },
                'PT': {
                    name: 'Portugal',
                    cities: ['Lisboa', 'Oporto', 'Vila Nova de Gaia', 'Amadora', 'Braga', 'Funchal', 'Coimbra', 'Setúbal', 'Almada', 'Aveiro']
                },
                'GB': {
                    name: 'Reino Unido',
                    cities: ['Londres', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford', 'Liverpool', 'Edimburgo', 'Manchester', 'Bristol']
                },
                'NL': {
                    name: 'Países Bajos',
                    cities: ['Ámsterdam', 'Rotterdam', 'La Haya', 'Utrecht', 'Eindhoven', 'Tilburgo', 'Groningen', 'Almere', 'Breda', 'Nijmegen']
                },
                'BE': {
                    name: 'Bélgica',
                    cities: ['Bruselas', 'Amberes', 'Gante', 'Charleroi', 'Lieja', 'Brujas', 'Namur', 'Lovaina', 'Mons', 'Aalst']
                },
                'CH': {
                    name: 'Suiza',
                    cities: ['Zúrich', 'Ginebra', 'Basilea', 'Lausana', 'Berna', 'Winterthur', 'Lucerna', 'St. Gallen', 'Lugano', 'Biel']
                },
                'AT': {
                    name: 'Austria',
                    cities: ['Viena', 'Graz', 'Linz', 'Salzburgo', 'Innsbruck', 'Klagenfurt', 'Villach', 'Wels', 'St. Pölten', 'Dornbirn']
                },
                // África
                'GQ': {
                    name: 'Guinea Ecuatorial',
                    cities: ['Malabo', 'Bata', 'Ebebiyín', 'Aconibe', 'Añisoc', 'Luba', 'Evinayong', 'Mengomeyén', 'Ayene', 'Machinda']
                },
                'NG': {
                    name: 'Nigeria',
                    cities: ['Lagos', 'Kano', 'Ibadán', 'Benin City', 'Port Harcourt', 'Jos', 'Ilorin', 'Abuja', 'Kaduna', 'Maiduguri']
                },
                'GH': {
                    name: 'Ghana',
                    cities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Tema', 'Cape Coast', 'Sekondi', 'Koforidua', 'Sunyani', 'Ho']
                },
                'CM': {
                    name: 'Camerún',
                    cities: ['Duala', 'Yaundé', 'Bamenda', 'Bafoussam', 'Garoua', 'Maroua', 'Nkongsamba', 'Bertoua', 'Edéa', 'Loum']
                },
                'SN': {
                    name: 'Senegal',
                    cities: ['Dakar', 'Touba', 'Thiès', 'Kaolack', 'Saint-Louis', 'Ziguinchor', 'Diourbel', 'Tambacounda', 'Mbour', 'Rufisque']
                },
                'CI': {
                    name: 'Costa de Marfil',
                    cities: ['Abiyán', 'Bouaké', 'Daloa', 'Korhogo', 'San-Pédro', 'Yamoussoukro', 'Divo', 'Anyama', 'Gagnoa', 'Abengourou']
                },
                'KE': {
                    name: 'Kenia',
                    cities: ['Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Kisumu', 'Thika', 'Malindi', 'Kitale', 'Garissa', 'Kakamega']
                },
                'UG': {
                    name: 'Uganda',
                    cities: ['Kampala', 'Gulu', 'Lira', 'Mbarara', 'Jinja', 'Bwizibwera', 'Mbale', 'Mukono', 'Kasese', 'Masaka']
                },
                'TZ': {
                    name: 'Tanzania',
                    cities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Mbeya', 'Morogoro', 'Tanga', 'Kahama', 'Tabora', 'Zanzibar', 'Kigoma']
                },
                'ZA': {
                    name: 'Sudáfrica',
                    cities: ['Johannesburgo', 'Ciudad del Cabo', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Nelspruit', 'Kimberley', 'Polokwane']
                },
                'EG': {
                    name: 'Egipto',
                    cities: ['El Cairo', 'Alejandría', 'Guiza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El-Mahalla El-Kubra', 'Tanta']
                },
                'MA': {
                    name: 'Marruecos',
                    cities: ['Casablanca', 'Rabat', 'Fez', 'Salé', 'Marrakech', 'Agadir', 'Tánger', 'Meknés', 'Oujda', 'Kenitra']
                },
                'DZ': {
                    name: 'Argelia',
                    cities: ['Argel', 'Orán', 'Constantina', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif', 'Sidi Bel Abbès', 'Biskra']
                },
                'TN': {
                    name: 'Túnez',
                    cities: ['Túnez', 'Sfax', 'Sousse', 'Ettadhamen', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana', 'Kasserine', 'Gafsa']
                },
                'LY': {
                    name: 'Libia',
                    cities: ['Trípoli', 'Bengasi', 'Misrata', 'Tarhuna', 'Al Khums', 'Az Zawiya', 'Ajdabiya', 'Tobruk', 'Sabha', 'Zliten']
                }
            };

            this.populateCountries();
        } catch (error) {
            console.error('Error loading countries data:', error);
        }
    }

    async loadPhoneCodesData() {
        // Códigos telefónicos de países europeos y africanos
        this.phoneCodesData = {
            // Europa
            '+34': { country: 'España', code: 'ES', pattern: /^[6-9]\d{8}$/ },
            '+33': { country: 'Francia', code: 'FR', pattern: /^[1-9]\d{8}$/ },
            '+39': { country: 'Italia', code: 'IT', pattern: /^3\d{8,9}$/ },
            '+49': { country: 'Alemania', code: 'DE', pattern: /^1[5-7]\d{8,9}$/ },
            '+351': { country: 'Portugal', code: 'PT', pattern: /^9[1236]\d{7}$/ },
            '+44': { country: 'Reino Unido', code: 'GB', pattern: /^7\d{9}$/ },
            '+31': { country: 'Países Bajos', code: 'NL', pattern: /^6\d{8}$/ },
            '+32': { country: 'Bélgica', code: 'BE', pattern: /^4\d{8}$/ },
            '+41': { country: 'Suiza', code: 'CH', pattern: /^7[5-9]\d{7}$/ },
            '+43': { country: 'Austria', code: 'AT', pattern: /^6\d{8,9}$/ },

            // África
            '+240': { country: 'Guinea Ecuatorial', code: 'GQ', pattern: /^[235]\d{8}$/ },
            '+234': { country: 'Nigeria', code: 'NG', pattern: /^[789]\d{9}$/ },
            '+233': { country: 'Ghana', code: 'GH', pattern: /^[2459]\d{8}$/ },
            '+237': { country: 'Camerún', code: 'CM', pattern: /^6\d{8}$/ },
            '+221': { country: 'Senegal', code: 'SN', pattern: /^7[0678]\d{7}$/ },
            '+225': { country: 'Costa de Marfil', code: 'CI', pattern: /^[0-9]\d{7}$/ },
            '+254': { country: 'Kenia', code: 'KE', pattern: /^[17]\d{8}$/ },
            '+256': { country: 'Uganda', code: 'UG', pattern: /^7\d{8}$/ },
            '+255': { country: 'Tanzania', code: 'TZ', pattern: /^[67]\d{8}$/ },
            '+27': { country: 'Sudáfrica', code: 'ZA', pattern: /^[6-8]\d{8}$/ },
            '+20': { country: 'Egipto', code: 'EG', pattern: /^1[0-5]\d{8}$/ },
            '+212': { country: 'Marruecos', code: 'MA', pattern: /^[5-7]\d{8}$/ },
            '+213': { country: 'Argelia', code: 'DZ', pattern: /^[567]\d{8}$/ },
            '+216': { country: 'Túnez', code: 'TN', pattern: /^[2459]\d{7}$/ },
            '+218': { country: 'Libia', code: 'LY', pattern: /^9[1-6]\d{7}$/ }
        };

        this.populatePhoneCodes();
    }

    populateCountries() {
        const select = this.fields.pais;
        if (!select) return;

        select.innerHTML = '<option value="">Seleccionar país...</option>';

        Object.entries(this.countriesData).forEach(([code, data]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = data.name;
            select.appendChild(option);
        });
    }

    populatePhoneCodes() {
        const select = this.fields.indicativo;
        if (!select) return;

        select.innerHTML = '<option value="">Seleccionar...</option>';

        Object.entries(this.phoneCodesData).forEach(([code, data]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${code} ${data.country}`;
            select.appendChild(option);
        });
    }

    handleCountryChange() {
        const countryCode = this.fields.pais?.value;
        const citySelect = this.fields.ciudad;

        if (!countryCode || !citySelect) return;

        citySelect.innerHTML = '<option value="">Seleccionar ciudad...</option>';
        citySelect.disabled = false;

        const cities = this.countriesData[countryCode]?.cities || [];
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    calculateAge() {
        const birthDate = new Date(this.fields.fechaNacimiento?.value);
        const today = new Date();

        if (isNaN(birthDate.getTime())) return;

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (this.fields.edad) {
            this.fields.edad.value = age;
        }

        // Validar rango de edad permitido (18-35 años)
        if (age < 18) {
            this.showFieldError('fecha_nacimiento', 'Edad no permitida. Debes tener al menos 18 años para inscribirte.');
            return false;
        } else if (age > 35) {
            this.showFieldError('fecha_nacimiento', 'Edad no permitida. La edad máxima permitida es de 35 años.');
            return false;
        } else {
            this.hideFieldError('fecha_nacimiento');
            return true;
        }
    }

    async validateEmail() {
        const email = this.fields.correo?.value;
        if (!email) return true;

        // Validación de formato
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFieldError('correo', 'Formato de correo inválido');
            return false;
        }

        // Verificar si el email ya existe
        try {
            const exists = await this.checkEmailExists(email);
            if (exists) {
                this.showFieldError('correo', 'Este correo ya está registrado');
                return false;
            }
        } catch (error) {
            console.error('Error checking email:', error);
        }

        this.hideFieldError('correo');
        return true;
    }

    validatePhone() {
        const indicativo = this.fields.indicativo?.value;
        const telefono = this.fields.telefono?.value;

        if (!indicativo || !telefono) return true;

        const phoneData = this.phoneCodesData[indicativo];
        if (!phoneData) return true;

        const isValid = phoneData.pattern.test(telefono);
        if (!isValid) {
            this.showFieldError('telefono', 'Formato de teléfono inválido para este país');
            return false;
        }

        this.hideFieldError('telefono');
        return true;
    }

    async checkEmailExists(email) {
        // Simulación de verificación en base de datos
        // En producción, esto sería una llamada a la API
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simular algunos emails existentes
                const existingEmails = ['test@example.com', 'admin@impulso.com'];
                resolve(existingEmails.includes(email.toLowerCase()));
            }, 500);
        });
    }

    async checkPhoneExists(fullPhone) {
        // Simulación de verificación en base de datos
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simular algunos teléfonos existentes
                const existingPhones = ['+34666666666', '+240222333444'];
                resolve(existingPhones.includes(fullPhone));
            }, 500);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;

        // Limpiar error previo
        this.hideFieldError(fieldName);

        if (field.hasAttribute('required') && !value) {
            this.showFieldError(fieldName, 'Este campo es obligatorio');
            return false;
        }

        // Validaciones específicas
        switch (fieldName) {
            case 'nombres':
            case 'apellidos':
                if (value && value.length < 2) {
                    this.showFieldError(fieldName, 'Mínimo 2 caracteres');
                    return false;
                }
                break;
            case 'correo':
                return this.validateEmail();
            case 'telefono':
                return this.validatePhone();
            case 'fecha_nacimiento':
                if (value) {
                    // Usar la función calculateAge para validación precisa
                    const isValidAge = this.calculateAge();
                    if (!isValidAge) {
                        return false;
                    }
                }
                break;
        }

        return true;
    }

    showFieldError(fieldName, message) {
        const field = this.fields[fieldName];
        if (!field) return;

        field.classList.add('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    hideFieldError(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;

        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    async validateForm() {
        let isValid = true;

        // Validar todos los campos
        for (const field of Object.values(this.fields)) {
            if (!field) continue;
            if (!this.validateField(field)) {
                isValid = false;
            }
        }

        // Verificar teléfono completo no duplicado
        const indicativo = this.fields.indicativo?.value;
        const telefono = this.fields.telefono?.value;

        if (indicativo && telefono) {
            const fullPhone = indicativo + telefono;
            const phoneExists = await this.checkPhoneExists(fullPhone);
            if (phoneExists) {
                this.showFieldError('telefono', 'Este número ya está registrado');
                isValid = false;
            }
        }

        return isValid;
    }

    setupFormValidation() {
        // Configuración adicional de validación
        this.fields.fechaNacimiento?.setAttribute('max', new Date().toISOString().split('T')[0]);
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) return;

        const isValid = await this.validateForm();
        if (!isValid) return;

        this.isSubmitting = true;
        const submitBtn = this.form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());

            // Combinar código de país y teléfono
            data.telefono_completo = `${data.indicativo}${data.telefono}`;

            // Aquí enviarías los datos a tu API/base de datos
            console.log('Datos del formulario:', data);

            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mostrar mensaje de éxito
            this.showSuccess('¡Registro completado exitosamente!');
            this.form.reset();
            setTimeout(() => this.closeModal(), 2000);

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            this.showError('Error al enviar el formulario. Inténtalo de nuevo.');
        } finally {
            this.isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    showSuccess(message) {
        // Implementar notificación de éxito
        console.log('Éxito:', message);
    }

    showError(message) {
        // Implementar notificación de error
        console.log('Error:', message);
    }

    openModal() {
        this.modal?.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Focus en el primer campo
        setTimeout(() => {
            this.fields.nombres?.focus();
        }, 300);
    }

    closeModal() {
        this.modal?.classList.remove('show');
        document.body.style.overflow = '';

        // Limpiar errores
        Object.keys(this.fields).forEach(fieldName => {
            this.hideFieldError(fieldName);
        });
    }
}

// Comentado - ahora se inicializa desde main.js
// document.addEventListener('DOMContentLoaded', () => {
//     new ContactForm();
// });