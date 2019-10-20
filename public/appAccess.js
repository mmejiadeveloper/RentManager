const app = new Vue({
    el: '#app',
    data: {
        accesskey: '',
        message: ''
    },
    methods: {
        enviar() {
            const accesskey = this.accesskey;
            (async() => {
                const rawResponse = await fetch('verifiyAccessKey', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        accesskey
                    })
                });
                const content = await rawResponse.json();
                console.log(content.data);

                if (content.data.response == 1) {
                    alert('Bienvenid@');
                    location.href = 'dashboard';
                    this.message = '';
                } else {
                    this.message = 'Clave de accesso no valida';
                }
            })();
        },
    }
});