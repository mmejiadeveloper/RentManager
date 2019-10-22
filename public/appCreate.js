const app = new Vue({
    el: '#app',
    data: {
        enlace: '',
        municipio: '0',
        direccion: '',
        contacto: '',
        visitado: 'Si',
        estado: '0',
        deseable: 'Si',
        observaciones: '',
        request: null,
        estadosDisponibles: [{
            id: '0',
            name: "No existen estados cargados."
        }],
        municipiosDisponibles: [{
            id: '0',
            name: "No existen municipios cargados."
        }]
    },
    methods: {
        guardar() {

            this.request = (async() => {
                const url = new URL(window.location.href);
                const e = url.searchParams.get("e");
                const dir = e != null ? 'editRow' : 'save';
                let data = this.$data;
                if (e != null) {
                    data.id = e;
                }
                const rawResponse = await fetch(dir, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.$data)
                });
                const content = await rawResponse.json();
                console.log(content);

                $.notify(content.message, content.state);
                if (content.result == 1) {
                    setTimeout(() => {
                        location.href = '/dashboard';
                    }, 2000);
                } else {
                    this.request = null;
                }

            })();
        },

        verificarEdicionYCargarRegistro() {
            const url = new URL(window.location.href);
            const e = url.searchParams.get("e");
            if (e != null) {
                (async() => {
                    const rawResponse = await fetch('loadRow    ', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: e
                        })
                    });
                    const content = await rawResponse.json();
                    this.enlace = content.data.link;
                    this.municipio = content.data.location.id;
                    this.observaciones = content.data.notes;
                    this.estado = String(content.data.state.id);
                    this.contacto = content.data.contact;
                    this.direccion = content.data.adress;
                    this.visitado = content.data.checked == 1 ? "Si" : "No";
                    console.log(content.data);

                })();
            }
        }
    },
    created() {

        (async() => {
            const rawResponse = await fetch('loadSettings', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const content = await rawResponse.json();


            if (content.data.states.length > 1) {
                app.estadosDisponibles = content.data.states;
                app.estado = content.data.states[0].id;
            }
            if (content.data.locations.length > 1) {
                app.municipiosDisponibles = content.data.locations;
                app.municipio = content.data.locations[0].id;
            }
        })();
        this.verificarEdicionYCargarRegistro();
    },

    computed: {
        permitirGuardado: function() {
            return (this.municipio != '0' && this.estado != '0') && ((this.enlace.length > 0 || this.contacto.length > 0) && this.request == null) ? false : true;
        }
    }
});